import { describe, expect, it } from 'vitest';
import { content } from '@/lib/content/data';
import {
  buildDailyQueue,
  createInitialProgress,
  detectRepairModules,
  planDelayedRetry,
} from '@/lib/review';
import type { LearningObject, QuestionSeed } from '@/types/content';
import type { DimensionProgress, ReviewAttempt } from '@/types/review';

const now = new Date('2026-09-02T02:00:00.000Z');

function failedAttempt(overrides: Partial<ReviewAttempt>): ReviewAttempt {
  return {
    id: 'failed_1',
    learningObjectId: 'lo_mieru_contrast',
    questionId: 'q_contrast_mieru_01',
    questionType: 'contrast_selection',
    targetId: 'v_mieru',
    targetDimension: 'contrast',
    correct: false,
    rating: 'again',
    submittedAnswer: '山が見られる。',
    errorTags: ['miru_vs_mieru_error'],
    hintsUsed: 0,
    responseTimeMs: 7_000,
    confidence: 0.7,
    contextId: 'window',
    templateId: 'selection',
    answeredAt: now.toISOString(),
    ...overrides,
  };
}

describe('教學編排器', () => {
  it('reading 高而 production 低時，提高 Generation 配額與優先度', () => {
    const reading: LearningObject = {
      id: 'lo_test_reading',
      content_type: 'vocabulary',
      target_id: 'v_test',
      dimension: 'reading',
      lesson_ids: ['lesson_01'],
      question_ids: ['q_test_reading'],
      prerequisite_object_ids: [],
      learning_priority: 0.5,
    };
    const production: LearningObject = {
      ...reading,
      id: 'lo_test_production',
      dimension: 'production',
      question_ids: ['q_test_production'],
    };
    const questionBase: QuestionSeed = {
      id: 'q_test_reading',
      type: 'reading_recall',
      difficulty: 2,
      prompt: '讀音？',
      target_id: 'v_test',
      target_dimension: 'reading',
      options: [],
      accepted_answers: ['test'],
      hint_1: 'h1',
      hint_2: 'h2',
      explanation: 'e',
      error_tags: ['reading_recall_error'],
      lesson_ids: ['lesson_01'],
      naturalness_weight: 1,
      pedagogical_priority: 0.5,
      reviewed: true,
    };
    const productionQuestion: QuestionSeed = {
      ...questionBase,
      id: 'q_test_production',
      type: 'controlled_generation',
      target_dimension: 'production',
    };
    const highReading: DimensionProgress = {
      ...createInitialProgress(reading, now),
      reviewCount: 5,
      stability: 14,
      correctStreak: 4,
      lastReviewedAt: '2026-09-01T02:00:00.000Z',
      dueAt: '2026-09-20T02:00:00.000Z',
    };

    const queue = buildDailyQueue({
      learningObjects: [reading, production],
      questions: [questionBase, productionQuestion],
      progress: { [reading.id]: highReading },
      attempts: [],
      now,
      seed: 'gap-test',
    });
    expect(queue.productionGapTargets).toContain('v_test');
    expect(queue.quotas.OUTPUT).toBe(4);
    expect(queue.items[0]).toMatchObject({
      questionId: 'q_test_production',
      pool: 'OUTPUT',
    });
  });

  it('重複 見える／見られる 混淆時啟動 Contrast Repair', () => {
    const repairs = detectRepairModules([
      failedAttempt({ id: 'a1' }),
      failedAttempt({ id: 'a2', submittedAnswer: '映画が見える。' }),
    ]);
    expect(repairs).toContainEqual(
      expect.objectContaining({
        type: 'contrast',
        id: 'repair_miru_mieru_mirareru',
      }),
    );
  });

  it('聞くてほしい 會向下追到 て形先備', () => {
    const repairs = detectRepairModules([
      failedAttempt({
        id: 'te1',
        learningObjectId: 'lo_tehoshii_formation',
        targetId: 'g_te_hoshii',
        submittedAnswer: '聞くてほしい',
        errorTags: ['te_form_sound_change_error'],
      }),
    ]);
    expect(repairs).toContainEqual(
      expect.objectContaining({
        type: 'prerequisite',
        chain: ['聞く', '聞いて', '聞いてほしい'],
      }),
    );
  });

  it('離開七天後進 Recovery Mode，最多十題且不塞入全新題', () => {
    const learnedObject = content.learningObjects[0];
    const learnedProgress = {
      ...createInitialProgress(learnedObject, now),
      reviewCount: 3,
      correctStreak: 1,
      lastReviewedAt: '2026-08-20T02:00:00.000Z',
      dueAt: '2026-08-21T02:00:00.000Z',
    };
    const queue = buildDailyQueue({
      learningObjects: content.learningObjects,
      questions: content.questions,
      progress: { [learnedObject.id]: learnedProgress },
      attempts: [],
      now,
      lastActiveAt: '2026-08-24T02:00:00.000Z',
      limit: 15,
    });
    expect(queue.mode).toBe('recovery');
    expect(queue.items.length).toBeLessThanOrEqual(10);
    expect(
      queue.items.every((item) => item.learningObjectId === learnedObject.id),
    ).toBe(true);
    expect(queue.quotas.NEW).toBe(0);
  });

  it('同日重學至少隔兩個不同目標，且改用不同模板與語境', () => {
    const failed = {
      learningObjectId: 'lo_a',
      questionId: 'q_a1',
      targetId: 'v_a',
      templateId: 'choice',
      contextId: 'window',
    };
    const retry = {
      learningObjectId: 'lo_a2',
      questionId: 'q_a2',
      targetId: 'v_a',
      templateId: 'correction',
      contextId: 'station',
    };
    const plan = planDelayedRetry(
      failed,
      [
        {
          learningObjectId: 'lo_b',
          questionId: 'q_b',
          targetId: 'v_b',
          templateId: 'recall',
          contextId: 'b',
        },
        {
          learningObjectId: 'lo_c',
          questionId: 'q_c',
          targetId: 'v_c',
          templateId: 'recall',
          contextId: 'c',
        },
      ],
      [retry],
    );
    expect(plan).toEqual({ insertAt: 2, candidate: retry });
  });
});
