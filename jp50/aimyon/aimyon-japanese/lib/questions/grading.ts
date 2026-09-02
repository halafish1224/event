import type { QuestionSeed } from '@/types/content';

const japanesePunctuation = /[。、「」『』！？!?・]/g;

export function normalizeAnswer(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .replace(japanesePunctuation, '')
    .replace(/\s+/g, '')
    .toLocaleLowerCase('ja-JP');
}

export interface GradingResult {
  correct: boolean;
  normalizedAnswer: string;
  matchedAnswer?: string;
  errorTags: string[];
}

export function gradeAnswer(
  question: QuestionSeed,
  answer: string,
): GradingResult {
  const normalizedAnswer = normalizeAnswer(answer);
  const matchedAnswer = question.accepted_answers.find(
    (accepted) => normalizeAnswer(accepted) === normalizedAnswer,
  );
  return {
    correct: !!matchedAnswer,
    normalizedAnswer,
    ...(matchedAnswer ? { matchedAnswer } : {}),
    errorTags: matchedAnswer ? [] : question.error_tags,
  };
}

export interface FeedbackStage {
  stage: 'correct' | 'hint_1' | 'hint_2' | 'explanation';
  message: string;
  revealAnswer: boolean;
}

export function getGraduatedFeedback(
  question: QuestionSeed,
  correct: boolean,
  previousWrongAttempts: number,
): FeedbackStage {
  if (correct) {
    return {
      stage: 'correct',
      message: question.explanation,
      revealAnswer: false,
    };
  }
  if (previousWrongAttempts === 0) {
    return { stage: 'hint_1', message: question.hint_1, revealAnswer: false };
  }
  if (previousWrongAttempts === 1) {
    return { stage: 'hint_2', message: question.hint_2, revealAnswer: false };
  }
  return {
    stage: 'explanation',
    message: `${question.explanation} 參考答案：${question.accepted_answers[0]}`,
    revealAnswer: true,
  };
}
