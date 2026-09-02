import type { LearningObject, QuestionSeed } from '@/types/content';
import type {
  DimensionProgress,
  RepairModule,
  ReviewAttempt,
  ReviewPool,
} from '@/types/review';
import { calculateRetrievability, createInitialProgress } from './scheduler';

const DAY_MS = 86_400_000;

export interface DailyQueueItem {
  learningObjectId: string;
  questionId: string;
  pool: ReviewPool;
  score: number;
  reason: string;
}

export interface DailyQueueResult {
  mode: 'standard' | 'recovery';
  items: DailyQueueItem[];
  repairs: RepairModule[];
  productionGapTargets: string[];
  quotas: Record<ReviewPool, number>;
}

export interface BuildDailyQueueInput {
  learningObjects: LearningObject[];
  questions: QuestionSeed[];
  progress: Record<string, DimensionProgress>;
  attempts: ReviewAttempt[];
  now: Date;
  lastActiveAt?: string;
  seed?: string;
  limit?: number;
}

interface Candidate {
  object: LearningObject;
  question: QuestionSeed;
  progress: DimensionProgress;
  pools: Set<ReviewPool>;
  baseScore: number;
  reasonByPool: Partial<Record<ReviewPool, string>>;
  tieBreaker: number;
}

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4_294_967_296;
}

function targetBase(targetId: string) {
  return targetId.split(':form:')[0];
}

function recentAttemptsFor(attempts: ReviewAttempt[], objectId: string) {
  return attempts
    .filter((attempt) => attempt.learningObjectId === objectId)
    .slice(-8);
}

function calculateProductionGaps(
  objects: LearningObject[],
  progress: Record<string, DimensionProgress>,
  now: Date,
) {
  const grouped = new Map<string, LearningObject[]>();
  for (const object of objects) {
    if (object.content_type !== 'vocabulary') continue;
    const key = targetBase(object.target_id);
    grouped.set(key, [...(grouped.get(key) ?? []), object]);
  }

  const gaps: string[] = [];
  for (const [targetId, group] of grouped) {
    const reading = group.find((object) => object.dimension === 'reading');
    const production = group.find(
      (object) => object.dimension === 'production',
    );
    if (!reading || !production) continue;
    const readingProgress = progress[reading.id];
    const productionProgress = progress[production.id];
    const readingHigh =
      !!readingProgress &&
      readingProgress.correctStreak >= 2 &&
      readingProgress.stability >= 7 &&
      calculateRetrievability(readingProgress, now) >= 0.7;
    const productionLow =
      !productionProgress ||
      productionProgress.reviewCount === 0 ||
      productionProgress.stability < 3;
    if (readingHigh && productionLow) gaps.push(targetId);
  }
  return gaps;
}

export function detectRepairModules(attempts: ReviewAttempt[]): RepairModule[] {
  const recent = attempts.slice(-30);
  const modules: RepairModule[] = [];
  const perceptionConfusions = recent.filter(
    (attempt) =>
      !attempt.correct && attempt.errorTags.includes('miru_vs_mieru_error'),
  );
  if (perceptionConfusions.length >= 2) {
    modules.push({
      type: 'contrast',
      id: 'repair_miru_mieru_mirareru',
      title: '見る／見える／見られる 對比修復',
      reason: '近期重複混淆主動觀看、自然可見與條件允許。',
      chain: [
        '見る：主動看',
        '見える：自然進入視野',
        '見られる：能力或條件允許',
      ],
    });
  }

  const teFormFailure = recent.some(
    (attempt) =>
      !attempt.correct &&
      (attempt.submittedAnswer.includes('聞くてほしい') ||
        (attempt.targetId === 'g_te_hoshii' &&
          attempt.errorTags.includes('te_form_sound_change_error'))),
  );
  if (teFormFailure) {
    modules.push({
      type: 'prerequisite',
      id: 'repair_kiku_te_hoshii',
      title: '～てほしい 的 て形先備修復',
      reason: '錯誤根源在 聞く 的音便，不只是在 ～てほしい。',
      chain: ['聞く', '聞いて', '聞いてほしい'],
    });
  }
  return modules;
}

function scoreCandidate(
  object: LearningObject,
  question: QuestionSeed,
  progress: DimensionProgress,
  attempts: ReviewAttempt[],
  now: Date,
  productionGapTargets: string[],
) {
  const retrievability = calculateRetrievability(progress, now);
  const recent = recentAttemptsFor(attempts, object.id);
  const recentFailures = recent.filter((attempt) => !attempt.correct).length;
  const confusion = recent.filter((attempt) =>
    attempt.errorTags.some((tag) => tag.includes('_vs_')),
  ).length;
  const hoursSinceReview = progress.lastReviewedAt
    ? (now.getTime() - Date.parse(progress.lastReviewedAt)) / 3_600_000
    : Number.POSITIVE_INFINITY;
  const overreviewPenalty = hoursSinceReview < 6 ? 1.4 : 0;
  const outputGap =
    object.dimension === 'production' &&
    productionGapTargets.includes(targetBase(object.target_id))
      ? 2.5
      : 0;
  const prerequisiteImportance =
    object.prerequisite_object_ids.length > 0 ? 0.35 : 0;

  return (
    (1 - retrievability) * 2.2 +
    recentFailures * 0.8 +
    confusion * 0.65 +
    outputGap +
    progress.difficulty * 0.08 +
    progress.hintsUsedEma * 0.25 +
    (1 - progress.confidenceEma) * 0.3 +
    object.learning_priority * 1.4 +
    question.pedagogical_priority * 0.7 +
    prerequisiteImportance -
    overreviewPenalty
  );
}

function buildCandidate(
  object: LearningObject,
  question: QuestionSeed,
  input: BuildDailyQueueInput,
  productionGapTargets: string[],
): Candidate {
  const progress =
    input.progress[object.id] ?? createInitialProgress(object, input.now);
  const recent = recentAttemptsFor(input.attempts, object.id);
  const failures = recent.filter((attempt) => !attempt.correct).length;
  const isOutput =
    object.dimension === 'production' ||
    ['controlled_generation', 'free_generation', 'micro_narrative'].includes(
      question.type,
    );
  const isContrast =
    ['contrast', 'explanation'].includes(object.dimension) ||
    question.type === 'contrast_selection' ||
    !!question.contrast_id;
  const pools = new Set<ReviewPool>();
  const reasonByPool: Partial<Record<ReviewPool, string>> = {};

  if (
    progress.reviewCount > 0 &&
    Date.parse(progress.dueAt) <= input.now.getTime()
  ) {
    pools.add('DUE');
    reasonByPool.DUE = '已到個別記憶維度的複習時間';
  }
  if (
    progress.reviewCount > 0 &&
    (failures > 0 || progress.stability < 2.5 || progress.correctStreak === 0)
  ) {
    pools.add('WEAK');
    reasonByPool.WEAK = '近期錯誤或記憶穩定度偏低';
  }
  if (isContrast) {
    pools.add('CONTRAST');
    reasonByPool.CONTRAST = '需要在近義或形態選項間做語境判斷';
  }
  if (progress.reviewCount === 0 && !isContrast && !isOutput) {
    pools.add('NEW');
    reasonByPool.NEW = '尚未建立初始記憶紀錄';
  }
  if (isOutput) {
    pools.add('OUTPUT');
    reasonByPool.OUTPUT = productionGapTargets.includes(
      targetBase(object.target_id),
    )
      ? '辨認已穩定，但主動產出仍不足'
      : '需要以主動生成建立可用能力';
  }

  return {
    object,
    question,
    progress,
    pools,
    baseScore: scoreCandidate(
      object,
      question,
      progress,
      input.attempts,
      input.now,
      productionGapTargets,
    ),
    reasonByPool,
    tieBreaker: hashSeed(
      `${input.seed ?? input.now.toISOString().slice(0, 10)}:${question.id}`,
    ),
  };
}

function isRecoveryMode(input: BuildDailyQueueInput) {
  if (!input.lastActiveAt) return false;
  const absentDays =
    (input.now.getTime() - Date.parse(input.lastActiveAt)) / DAY_MS;
  return (
    absentDays >= 7 &&
    Object.values(input.progress).some((progress) => progress.reviewCount > 0)
  );
}

export function buildDailyQueue(input: BuildDailyQueueInput): DailyQueueResult {
  const questionMap = new Map(
    input.questions.map((question) => [question.id, question]),
  );
  const productionGapTargets = calculateProductionGaps(
    input.learningObjects,
    input.progress,
    input.now,
  );
  const recovery = isRecoveryMode(input);
  const requestedLimit = input.limit ?? 15;
  const limit = recovery ? Math.min(10, requestedLimit) : requestedLimit;
  const quotas: Record<ReviewPool, number> = recovery
    ? { DUE: 4, WEAK: 3, CONTRAST: 2, NEW: 0, OUTPUT: 1 }
    : productionGapTargets.length > 0
      ? { DUE: 4, WEAK: 3, CONTRAST: 2, NEW: 2, OUTPUT: 4 }
      : { DUE: 5, WEAK: 3, CONTRAST: 3, NEW: 2, OUTPUT: 2 };

  const candidates = input.learningObjects.flatMap((object) => {
    const question = object.question_ids
      .map((id) => questionMap.get(id))
      .find(Boolean);
    return question
      ? [buildCandidate(object, question, input, productionGapTargets)]
      : [];
  });
  const selected = new Map<string, DailyQueueItem>();

  const sortedForPool = (pool: ReviewPool) =>
    candidates
      .filter(
        (candidate) =>
          candidate.pools.has(pool) && !selected.has(candidate.question.id),
      )
      .filter(
        (candidate) => !(recovery && candidate.progress.reviewCount === 0),
      )
      .sort((a, b) => b.baseScore - a.baseScore || b.tieBreaker - a.tieBreaker);

  for (const pool of [
    'DUE',
    'WEAK',
    'CONTRAST',
    'NEW',
    'OUTPUT',
  ] as ReviewPool[]) {
    for (const candidate of sortedForPool(pool).slice(0, quotas[pool])) {
      selected.set(candidate.question.id, {
        learningObjectId: candidate.object.id,
        questionId: candidate.question.id,
        pool,
        score: candidate.baseScore,
        reason: candidate.reasonByPool[pool] ?? '依今日學習價值排序',
      });
    }
  }

  const remaining = candidates
    .filter((candidate) => !selected.has(candidate.question.id))
    .filter((candidate) => !(recovery && candidate.progress.reviewCount === 0))
    .sort((a, b) => b.baseScore - a.baseScore || b.tieBreaker - a.tieBreaker);
  for (const candidate of remaining) {
    if (selected.size >= limit) break;
    const pool =
      [...candidate.pools][0] ??
      (candidate.progress.reviewCount === 0 ? 'NEW' : 'WEAK');
    selected.set(candidate.question.id, {
      learningObjectId: candidate.object.id,
      questionId: candidate.question.id,
      pool,
      score: candidate.baseScore,
      reason: candidate.reasonByPool[pool] ?? '依記憶風險與學習優先度補位',
    });
  }

  return {
    mode: recovery ? 'recovery' : 'standard',
    items: [...selected.values()].slice(0, limit),
    repairs: detectRepairModules(input.attempts),
    productionGapTargets,
    quotas,
  };
}

export interface RetryCandidate {
  learningObjectId: string;
  questionId: string;
  targetId: string;
  templateId: string;
  contextId: string;
}

export function planDelayedRetry(
  failed: RetryCandidate,
  intervening: RetryCandidate[],
  alternatives: RetryCandidate[],
) {
  const firstTwo = intervening.slice(0, 2);
  const hasSpacing =
    firstTwo.length === 2 &&
    firstTwo.every((item) => item.targetId !== failed.targetId) &&
    new Set(firstTwo.map((item) => item.targetId)).size === 2;
  if (!hasSpacing) return null;

  const alternative = alternatives.find(
    (candidate) =>
      candidate.targetId === failed.targetId &&
      candidate.questionId !== failed.questionId &&
      candidate.templateId !== failed.templateId &&
      candidate.contextId !== failed.contextId,
  );
  return alternative ? { insertAt: 2, candidate: alternative } : null;
}
