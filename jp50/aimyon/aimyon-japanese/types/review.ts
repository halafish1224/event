import type { QuestionType } from './content';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';
export type MasteryState =
  | 'learning'
  | 'developing'
  | 'stable'
  | 'flexible'
  | 'productive';
export type ReviewPool = 'DUE' | 'WEAK' | 'CONTRAST' | 'NEW' | 'OUTPUT';

export interface DimensionProgress {
  learningObjectId: string;
  dimension: string;
  difficulty: number;
  stability: number;
  retrievability: number;
  dueAt: string;
  lastReviewedAt?: string;
  reviewCount: number;
  lapseCount: number;
  correctStreak: number;
  recentErrorTags: string[];
  confidenceEma: number;
  responseTimeEmaMs: number;
  hintsUsedEma: number;
  successfulSessionDates: string[];
  contrastContextIds: string[];
  productionContextIds: string[];
  lastQuestionId?: string;
}

export interface ReviewAttempt {
  id: string;
  learningObjectId: string;
  questionId: string;
  questionType: QuestionType;
  targetId: string;
  targetDimension: string;
  correct: boolean;
  rating: ReviewRating;
  submittedAnswer: string;
  errorTags: string[];
  hintsUsed: number;
  responseTimeMs: number;
  confidence: number;
  contextId: string;
  templateId: string;
  answeredAt: string;
}

export interface ReviewProfile {
  version: 1;
  startedAt: string;
  lastActiveAt?: string;
  progress: Record<string, DimensionProgress>;
  attempts: ReviewAttempt[];
}

export interface RepairModule {
  type: 'contrast' | 'prerequisite';
  id: string;
  title: string;
  reason: string;
  chain: string[];
}
