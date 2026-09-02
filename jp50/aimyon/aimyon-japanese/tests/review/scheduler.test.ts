import { describe, expect, it } from 'vitest';
import { contentMaps } from '@/lib/content/data';
import {
  applyReviewAttempt,
  calculateRetrievability,
  createEmptyReviewProfile,
  createInitialProgress,
  getMasteryState,
} from '@/lib/review';
import type { ReviewAttempt } from '@/types/review';

const now = new Date('2026-09-02T02:00:00.000Z');
const object = contentMaps.learningObjects.get('lo_mieru_contrast')!;

function attempt(overrides: Partial<ReviewAttempt> = {}): ReviewAttempt {
  return {
    id: 'attempt_1',
    learningObjectId: object.id,
    questionId: 'q_contrast_mieru_01',
    questionType: 'contrast_selection',
    targetId: 'v_mieru',
    targetDimension: 'contrast',
    correct: true,
    rating: 'good',
    submittedAnswer: '山が見える。',
    errorTags: [],
    hintsUsed: 0,
    responseTimeMs: 8_000,
    confidence: 0.8,
    contextId: 'window_mountain',
    templateId: 'contrast_context_selection',
    answeredAt: now.toISOString(),
    ...overrides,
  };
}

describe('記憶排程器', () => {
  it('依時間與 stability 計算 retrievability，不採固定 D1/D3/D7', () => {
    const progress = {
      ...createInitialProgress(object, now),
      reviewCount: 3,
      stability: 10,
      lastReviewedAt: '2026-08-28T02:00:00.000Z',
    };
    expect(calculateRetrievability(progress, now)).toBeCloseTo(
      Math.exp(-0.5),
      5,
    );
  });

  it('成功會增加 stability，失敗會記錄 lapse 並安排當日重學', () => {
    const profile = createEmptyReviewProfile(now);
    const success = applyReviewAttempt(profile, object, attempt(), now);
    expect(success.progress[object.id].stability).toBeGreaterThan(0.8);
    expect(success.progress[object.id].dueAt).not.toBe(
      '2026-09-03T02:00:00.000Z',
    );

    const failedAt = new Date('2026-09-02T03:00:00.000Z');
    const failed = applyReviewAttempt(
      success,
      object,
      attempt({
        id: 'attempt_2',
        correct: false,
        rating: 'again',
        answeredAt: failedAt.toISOString(),
      }),
      failedAt,
    );
    expect(failed.progress[object.id].lapseCount).toBe(1);
    expect(
      Date.parse(failed.progress[object.id].dueAt) - failedAt.getTime(),
    ).toBe(20 * 60_000);
  });

  it('同一 attempt id 只更新一次排程', () => {
    const profile = createEmptyReviewProfile(now);
    const once = applyReviewAttempt(profile, object, attempt(), now);
    const twice = applyReviewAttempt(once, object, attempt(), now);
    expect(twice).toBe(once);
    expect(twice.progress[object.id].reviewCount).toBe(1);
  });

  it('前台 mastery 使用可理解狀態而非小數百分比', () => {
    const progress = {
      ...createInitialProgress(object, now),
      reviewCount: 6,
      stability: 12,
      correctStreak: 3,
      successfulSessionDates: ['2026-08-20', '2026-08-27', '2026-09-02'],
    };
    expect(getMasteryState(progress)).toBe('stable');
    expect(
      getMasteryState({
        ...progress,
        contrastContextIds: ['window', 'theater'],
      }),
    ).toBe('flexible');
    expect(
      getMasteryState({
        ...progress,
        productionContextIds: ['travel', 'daily'],
      }),
    ).toBe('productive');
  });
});
