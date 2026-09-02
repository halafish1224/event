import type { LearningObject } from '@/types/content';
import type {
  DimensionProgress,
  MasteryState,
  ReviewAttempt,
  ReviewProfile,
  ReviewRating,
} from '@/types/review';

const DAY_MS = 86_400_000;
const MINUTE_MS = 60_000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function createInitialProgress(
  object: Pick<LearningObject, 'id' | 'dimension'>,
  now: Date,
): DimensionProgress {
  return {
    learningObjectId: object.id,
    dimension: object.dimension,
    difficulty: 5,
    stability: 0.8,
    retrievability: 0,
    dueAt: now.toISOString(),
    reviewCount: 0,
    lapseCount: 0,
    correctStreak: 0,
    recentErrorTags: [],
    confidenceEma: 0.5,
    responseTimeEmaMs: 0,
    hintsUsedEma: 0,
    successfulSessionDates: [],
    contrastContextIds: [],
    productionContextIds: [],
  };
}

export function createEmptyReviewProfile(now: Date): ReviewProfile {
  return {
    version: 1,
    startedAt: now.toISOString(),
    progress: {},
    attempts: [],
  };
}

export function calculateRetrievability(
  progress: DimensionProgress,
  now: Date,
) {
  if (!progress.lastReviewedAt || progress.reviewCount === 0) return 0;
  const elapsedDays = Math.max(
    0,
    (now.getTime() - Date.parse(progress.lastReviewedAt)) / DAY_MS,
  );
  return clamp(
    Math.exp(-elapsedDays / Math.max(0.1, progress.stability)),
    0,
    1,
  );
}

function effectiveRating(attempt: ReviewAttempt): ReviewRating {
  if (!attempt.correct) return 'again';
  if (attempt.hintsUsed >= 2) return 'hard';
  if (attempt.hintsUsed === 1 && attempt.rating === 'easy') return 'good';
  return attempt.rating;
}

function updateEma(previous: number, value: number, count: number) {
  if (count === 0) return value;
  return previous * 0.72 + value * 0.28;
}

function sessionDate(iso: string) {
  return iso.slice(0, 10);
}

function addUnique(values: string[], value: string, max = 12) {
  return [...new Set([...values, value])].slice(-max);
}

export function scheduleDimensionReview(
  progress: DimensionProgress,
  attempt: ReviewAttempt,
  now: Date,
): DimensionProgress {
  const rating = effectiveRating(attempt);
  const retrievabilityBefore = calculateRetrievability(progress, now);
  const ratingValue = { again: 1, hard: 2, good: 3, easy: 4 }[rating];
  const difficultyDelta =
    (3 - ratingValue) * 0.55 +
    attempt.hintsUsed * 0.2 -
    attempt.confidence * 0.08;
  const difficulty = clamp(progress.difficulty + difficultyDelta, 1, 10);

  let stability: number;
  let dueAt: Date;
  if (!attempt.correct) {
    stability = Math.max(0.25, progress.stability * 0.45);
    dueAt = new Date(now.getTime() + 20 * MINUTE_MS);
  } else {
    const multiplier = { hard: 1.25, good: 1.85, easy: 2.6 }[
      rating as Exclude<ReviewRating, 'again'>
    ];
    const desirableDifficulty = 1 + (10 - difficulty) / 20;
    const retrievalBonus = 1 + (1 - retrievabilityBefore) * 0.25;
    stability = Math.max(
      1,
      progress.stability * multiplier * desirableDifficulty * retrievalBonus,
    );
    const intervalModifier = { hard: 0.6, good: 1, easy: 1.35 }[
      rating as Exclude<ReviewRating, 'again'>
    ];
    dueAt = new Date(now.getTime() + stability * intervalModifier * DAY_MS);
  }

  const isContrast =
    attempt.targetDimension === 'contrast' ||
    attempt.questionType === 'contrast_selection';
  const isProduction =
    attempt.targetDimension === 'production' ||
    ['controlled_generation', 'free_generation', 'micro_narrative'].includes(
      attempt.questionType,
    );

  return {
    ...progress,
    difficulty,
    stability,
    retrievability: attempt.correct ? 1 : 0.35,
    dueAt: dueAt.toISOString(),
    lastReviewedAt: now.toISOString(),
    reviewCount: progress.reviewCount + 1,
    lapseCount: progress.lapseCount + (attempt.correct ? 0 : 1),
    correctStreak: attempt.correct ? progress.correctStreak + 1 : 0,
    recentErrorTags: attempt.correct
      ? progress.recentErrorTags.slice(-7)
      : [...progress.recentErrorTags, ...attempt.errorTags].slice(-8),
    confidenceEma: updateEma(
      progress.confidenceEma,
      clamp(attempt.confidence, 0, 1),
      progress.reviewCount,
    ),
    responseTimeEmaMs: updateEma(
      progress.responseTimeEmaMs,
      attempt.responseTimeMs,
      progress.reviewCount,
    ),
    hintsUsedEma: updateEma(
      progress.hintsUsedEma,
      attempt.hintsUsed,
      progress.reviewCount,
    ),
    successfulSessionDates: attempt.correct
      ? addUnique(
          progress.successfulSessionDates,
          sessionDate(attempt.answeredAt),
        )
      : progress.successfulSessionDates,
    contrastContextIds:
      attempt.correct && isContrast
        ? addUnique(progress.contrastContextIds, attempt.contextId)
        : progress.contrastContextIds,
    productionContextIds:
      attempt.correct && isProduction
        ? addUnique(progress.productionContextIds, attempt.contextId)
        : progress.productionContextIds,
    lastQuestionId: attempt.questionId,
  };
}

export function applyReviewAttempt(
  profile: ReviewProfile,
  object: Pick<LearningObject, 'id' | 'dimension'>,
  attempt: ReviewAttempt,
  now: Date,
): ReviewProfile {
  if (profile.attempts.some((existing) => existing.id === attempt.id))
    return profile;
  if (attempt.learningObjectId !== object.id) {
    throw new Error(`作答 ${attempt.id} 與學習物件 ${object.id} 不一致。`);
  }

  const current =
    profile.progress[object.id] ?? createInitialProgress(object, now);
  const updated = scheduleDimensionReview(current, attempt, now);
  return {
    ...profile,
    lastActiveAt: now.toISOString(),
    progress: { ...profile.progress, [object.id]: updated },
    attempts: [...profile.attempts, attempt].slice(-500),
  };
}

export function getMasteryState(progress?: DimensionProgress): MasteryState {
  if (!progress || progress.reviewCount < 2) return 'learning';
  if (progress.productionContextIds.length >= 2 && progress.correctStreak >= 2)
    return 'productive';
  if (progress.contrastContextIds.length >= 2 && progress.correctStreak >= 2)
    return 'flexible';
  if (progress.successfulSessionDates.length >= 3 && progress.stability >= 7)
    return 'stable';
  return 'developing';
}
