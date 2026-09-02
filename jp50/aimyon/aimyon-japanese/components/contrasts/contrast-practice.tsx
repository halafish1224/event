'use client';

import { useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { contentMaps } from '@/lib/content/data';
import { getGraduatedFeedback, gradeAnswer } from '@/lib/questions';
import type { ReviewAttempt } from '@/types/review';
import { useReviewProfile } from '@/components/review/review-provider';

export function ContrastPractice({ questionId }: { questionId: string }) {
  const question = contentMaps.questions.get(questionId);
  const object = question
    ? [...contentMaps.learningObjects.values()].find((value) =>
        value.question_ids.includes(question.id),
      )
    : undefined;
  const { recordAttempt } = useReviewProfile();
  const [answer, setAnswer] = useState('');
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState<ReturnType<
    typeof getGraduatedFeedback
  > | null>(null);
  const [complete, setComplete] = useState(false);
  if (!question || !object || question.options.length === 0) return null;

  const submit = () => {
    if (!answer || complete) return;
    const graded = gradeAnswer(question, answer);
    const nextFeedback = getGraduatedFeedback(
      question,
      graded.correct,
      wrongCount,
    );
    setFeedback(nextFeedback);
    if (!graded.correct && nextFeedback.stage !== 'explanation') {
      setWrongCount((value) => value + 1);
      return;
    }
    const now = new Date();
    const attempt: ReviewAttempt = {
      id: `${question.id}:lab:${now.getTime()}`,
      learningObjectId: object.id,
      questionId: question.id,
      questionType: question.type,
      targetId: question.target_id,
      targetDimension: question.target_dimension,
      correct: graded.correct,
      rating: graded.correct ? (wrongCount > 0 ? 'hard' : 'good') : 'again',
      submittedAnswer: answer,
      errorTags: graded.errorTags,
      hintsUsed: wrongCount,
      responseTimeMs: 8_000,
      confidence: wrongCount ? 0.55 : 0.8,
      contextId: `${question.id}:lab`,
      templateId: question.type,
      answeredAt: now.toISOString(),
    };
    recordAttempt(object, attempt);
    setComplete(true);
  };

  return (
    <Card className="border-0 bg-[oklch(0.92_0.065_86)] shadow-lg ring-0">
      <CardHeader>
        <p className="eyebrow text-muted-foreground">TRY THE DECISION</p>
        <CardTitle className="text-xl leading-8">{question.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <fieldset className="grid gap-2">
          <legend className="sr-only">答案選項</legend>
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={answer === option}
              disabled={complete}
              onClick={() => setAnswer(option)}
              className={cn(
                'rounded-xl border border-amber-900/15 bg-white/65 p-3 text-left text-sm font-semibold hover:bg-white',
                answer === option &&
                  'border-primary bg-white ring-2 ring-primary/15',
              )}
            >
              {option}
            </button>
          ))}
        </fieldset>
        {feedback && (
          <output
            className={cn(
              'block rounded-xl p-4 text-sm leading-6',
              feedback.stage === 'correct'
                ? 'bg-emerald-100 text-emerald-950'
                : feedback.stage === 'explanation'
                  ? 'bg-rose-100 text-rose-950'
                  : 'bg-white/65 text-amber-950',
            )}
          >
            <strong className="mb-1 flex items-center gap-2">
              {feedback.stage === 'correct' ? (
                <Check aria-hidden="true" className="size-4" />
              ) : feedback.stage === 'explanation' ? (
                <X aria-hidden="true" className="size-4" />
              ) : (
                <RotateCcw aria-hidden="true" className="size-4" />
              )}
              {feedback.stage === 'correct'
                ? '判斷正確'
                : feedback.stage.startsWith('hint')
                  ? '再抓一次語境焦點'
                  : '完整解析'}
            </strong>
            {feedback.message}
          </output>
        )}
        {!complete && (
          <Button
            onClick={submit}
            disabled={!answer}
            className="justify-self-end"
          >
            {wrongCount ? '換個角度再判斷' : '確認選擇'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
