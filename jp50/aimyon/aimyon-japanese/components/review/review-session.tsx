'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/app-link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { content, contentMaps } from '@/lib/content/data';
import { getGraduatedFeedback, gradeAnswer } from '@/lib/questions';
import { buildDailyQueue, detectRepairModules } from '@/lib/review';
import { cn } from '@/lib/utils';
import { readLearningSettings } from '@/lib/settings/repository';
import type { QuestionSeed } from '@/types/content';
import type { DailyQueueItem } from '@/lib/review';
import type { ReviewAttempt, ReviewProfile } from '@/types/review';
import { useReviewProfile } from './review-provider';

const poolLabels = {
  DUE: '快忘記',
  WEAK: '近期弱點',
  CONTRAST: 'Contrast',
  NEW: '新連結',
  OUTPUT: '造句',
} as const;

function makeAttemptId(questionId: string, answeredAt: Date, sequence: number) {
  return `${questionId}:${answeredAt.toISOString()}:${sequence}`;
}

function isLongAnswer(question: QuestionSeed) {
  return [
    'controlled_generation',
    'free_generation',
    'micro_narrative',
    'error_correction',
  ].includes(question.type);
}

export function ReviewSession({
  limit = 15,
  title = '今日複習',
}: {
  limit?: number;
  title?: string;
}) {
  const { profile, ready } = useReviewProfile();
  const [configuredLimit, setConfiguredLimit] = useState<number | null>(
    limit === 15 ? null : limit,
  );
  useEffect(() => {
    if (limit === 15) {
      queueMicrotask(() =>
        setConfiguredLimit(readLearningSettings(window.localStorage).dailyGoal),
      );
    }
  }, [limit]);

  if (!ready || !profile || configuredLimit === null) return <ReviewLoading />;
  return (
    <ReadyReviewSession
      initialProfile={profile}
      limit={configuredLimit}
      title={title}
    />
  );
}

function ReadyReviewSession({
  initialProfile,
  limit,
  title,
}: {
  initialProfile: ReviewProfile;
  limit: number;
  title: string;
}) {
  const { profile, recordAttempt } = useReviewProfile();
  const [sessionNow] = useState(() => new Date());
  const [initialQueue] = useState(() =>
    buildDailyQueue({
      learningObjects: content.learningObjects,
      questions: content.questions,
      progress: initialProfile.progress,
      attempts: initialProfile.attempts,
      now: sessionNow,
      lastActiveAt: initialProfile.lastActiveAt,
      limit,
      seed: sessionNow.toISOString().slice(0, 10),
    }),
  );
  const startedAt = useRef(sessionNow.getTime());
  const [items, setItems] = useState<DailyQueueItem[]>(initialQueue.items);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<ReturnType<
    typeof getGraduatedFeedback
  > | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const item = items[index];
  if (!item) {
    const repairs = detectRepairModules(
      profile?.attempts ?? initialProfile.attempts,
    );
    return (
      <main id="main-content" className="page-shell pb-12">
        <section className="mx-auto max-w-2xl py-10 sm:py-16">
          <Card className="overflow-hidden border-0 bg-card shadow-lg ring-border">
            <CardHeader className="items-center text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                <Check aria-hidden="true" className="size-7" />
              </span>
              <p className="eyebrow mt-3 text-muted-foreground">
                SESSION COMPLETE
              </p>
              <CardTitle className="text-3xl">今天的記憶迴路接好了</CardTitle>
              <p className="max-w-lg text-sm leading-6 text-muted-foreground">
                完成 {items.length} 題，其中 {correctCount}{' '}
                題在提示揭露前答對。錯誤已拆成能力維度，會在更合適的時機回來。
              </p>
            </CardHeader>
            <CardContent className="grid gap-3">
              {repairs.map((repair) => (
                <div key={repair.id} className="rounded-2xl bg-secondary p-4">
                  <p className="font-bold">{repair.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {repair.reason}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary">
                    {repair.chain.join(' → ')}
                  </p>
                </div>
              ))}
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <Link
                  href="/progress"
                  className={cn(buttonVariants({ variant: 'outline' }), 'h-11')}
                >
                  查看進度
                </Link>
                <Link href="/" className={cn(buttonVariants(), 'h-11')}>
                  回到今天
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  const question = contentMaps.questions.get(item.questionId)!;
  const object = contentMaps.learningObjects.get(item.learningObjectId)!;
  const progressValue = Math.round((index / Math.max(1, items.length)) * 100);
  const recovery = initialQueue.mode === 'recovery';

  const submit = () => {
    if (!answer.trim() || answered) return;
    const grading = gradeAnswer(question, answer);
    const nextFeedback = getGraduatedFeedback(
      question,
      grading.correct,
      wrongAttempts,
    );
    setFeedback(nextFeedback);

    if (!grading.correct && nextFeedback.stage !== 'explanation') {
      setWrongAttempts((count) => count + 1);
      return;
    }

    const answeredAt = new Date();
    const attempt: ReviewAttempt = {
      id: makeAttemptId(
        question.id,
        answeredAt,
        initialProfile.attempts.length + index,
      ),
      learningObjectId: object.id,
      questionId: question.id,
      questionType: question.type,
      targetId: question.target_id,
      targetDimension: question.target_dimension,
      correct: grading.correct,
      rating: grading.correct ? (wrongAttempts > 0 ? 'hard' : 'good') : 'again',
      submittedAnswer: answer,
      errorTags: grading.errorTags,
      hintsUsed: wrongAttempts,
      responseTimeMs: Math.max(500, answeredAt.getTime() - startedAt.current),
      confidence: wrongAttempts === 0 ? 0.8 : 0.55,
      contextId: question.id,
      templateId: question.type,
      answeredAt: answeredAt.toISOString(),
    };
    recordAttempt(object, attempt);
    if (grading.correct) setCorrectCount((count) => count + 1);
    setAnswered(true);

    if (!grading.correct) {
      const alternativeQuestion = content.questions.find(
        (candidate) =>
          candidate.target_id === question.target_id &&
          candidate.id !== question.id &&
          candidate.type !== question.type,
      );
      const alternativeObject = alternativeQuestion
        ? content.learningObjects.find((candidate) =>
            candidate.question_ids.includes(alternativeQuestion.id),
          )
        : undefined;
      const remaining = items.slice(index + 1);
      const firstTwoTargets = remaining.slice(0, 2).map((candidate) => {
        const seed = contentMaps.questions.get(candidate.questionId);
        return seed?.target_id;
      });
      if (
        alternativeQuestion &&
        alternativeObject &&
        firstTwoTargets.length === 2 &&
        firstTwoTargets.every(
          (target) => target && target !== question.target_id,
        ) &&
        new Set(firstTwoTargets).size === 2 &&
        !remaining.some(
          (candidate) => candidate.questionId === alternativeQuestion.id,
        )
      ) {
        const retry: DailyQueueItem = {
          learningObjectId: alternativeObject.id,
          questionId: alternativeQuestion.id,
          pool: item.pool,
          score: item.score,
          reason: '間隔兩題後，換語境重新提取',
        };
        setItems([
          ...items.slice(0, index + 3),
          retry,
          ...items.slice(index + 3),
        ]);
      }
    }
  };

  const next = () => {
    setIndex((value) => value + 1);
    setAnswer('');
    setWrongAttempts(0);
    setFeedback(null);
    setAnswered(false);
    startedAt.current = new Date().getTime();
  };

  return (
    <main id="main-content" className="page-shell pb-12">
      <section className="mx-auto max-w-3xl py-5 sm:py-9">
        <div className="mb-5 flex items-center gap-3">
          <Link
            href="/review"
            aria-label="離開複習"
            className="icon-link shrink-0 bg-card ring-1 ring-border"
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
              <span>{recovery ? 'Recovery Mode · 溫和恢復' : title}</span>
              <span className="tabular-nums">
                {index + 1} / {items.length}
              </span>
            </div>
            <Progress
              value={progressValue}
              aria-label={`複習進度 ${progressValue}%`}
            />
          </div>
        </div>

        <Card className="border-0 bg-card shadow-xl ring-border">
          <CardHeader className="border-b border-border/70">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="secondary">{poolLabels[item.pool]}</Badge>
              <span className="text-xs text-muted-foreground">
                難度 {question.difficulty} · {item.reason}
              </span>
            </div>
            <CardTitle className="pt-4 text-pretty text-2xl leading-relaxed sm:text-3xl">
              {question.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 pt-6">
            {question.options.length > 0 ? (
              <fieldset className="grid gap-2">
                <legend className="sr-only">答案選項</legend>
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={answer === option}
                    disabled={answered}
                    onClick={() => setAnswer(option)}
                    className={cn(
                      'min-h-12 rounded-xl border bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/70',
                      answer === option &&
                        'border-primary bg-secondary ring-2 ring-primary/15',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </fieldset>
            ) : isLongAnswer(question) ? (
              <Textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                disabled={answered}
                placeholder="請用日文作答"
                aria-label="你的答案"
                className="min-h-28 text-base"
              />
            ) : (
              <Input
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && submit()}
                disabled={answered}
                placeholder="請輸入答案"
                aria-label="你的答案"
                className="h-12 text-base"
              />
            )}

            {feedback && (
              <output
                className={cn(
                  'block rounded-2xl border p-4',
                  feedback.stage === 'correct'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                    : feedback.stage === 'explanation'
                      ? 'border-rose-200 bg-rose-50 text-rose-950'
                      : 'border-amber-200 bg-amber-50 text-amber-950',
                )}
              >
                <div className="flex items-start gap-3">
                  {feedback.stage === 'correct' ? (
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0"
                    />
                  ) : feedback.stage === 'explanation' ? (
                    <X aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  ) : (
                    <Sparkles
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-bold">
                      {feedback.stage === 'correct'
                        ? '答對了'
                        : feedback.stage === 'hint_1'
                          ? '線索 1'
                          : feedback.stage === 'hint_2'
                            ? '線索 2'
                            : '先看清楚錯誤根因'}
                    </p>
                    <p className="mt-1 text-sm leading-6">{feedback.message}</p>
                  </div>
                </div>
              </output>
            )}

            <div className="flex justify-end">
              {answered ? (
                <Button onClick={next} className="h-11 min-w-36">
                  下一題 <ArrowRight aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  onClick={submit}
                  disabled={!answer.trim()}
                  className="h-11 min-w-36"
                >
                  {wrongAttempts > 0 ? <RotateCcw aria-hidden="true" /> : null}
                  {wrongAttempts > 0 ? '再試一次' : '確認答案'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function ReviewLoading() {
  return (
    <main id="main-content" className="page-shell pb-12">
      <section className="mx-auto max-w-3xl py-9" aria-busy="true">
        <div className="h-3 animate-pulse rounded-full bg-muted" />
        <Card className="mt-5 min-h-96 animate-pulse border-0 bg-card ring-border" />
        <p className="sr-only">正在讀取本機學習進度</p>
      </section>
    </main>
  );
}
