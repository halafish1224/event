import { describe, expect, it } from 'vitest';
import { contentMaps } from '@/lib/content/data';
import {
  getGraduatedFeedback,
  gradeAnswer,
  normalizeAnswer,
} from '@/lib/questions';

describe('題目判分與漸進回饋', () => {
  const question = contentMaps.questions.get('q_contrast_mieru_01')!;

  it('忽略全半形、空白與句末標點，但不做模糊語意猜測', () => {
    expect(normalizeAnswer(' 山 が 見える。 ')).toBe('山が見える');
    expect(gradeAnswer(question, '山が見える。').correct).toBe(true);
    expect(gradeAnswer(question, '山が見られる。')).toMatchObject({
      correct: false,
      errorTags: ['miru_vs_mieru_error', 'wo_vs_ga_perception_error'],
    });
  });

  it('依錯誤次數逐步給 Hint 1、Hint 2、完整解說', () => {
    expect(getGraduatedFeedback(question, false, 0)).toMatchObject({
      stage: 'hint_1',
      revealAnswer: false,
    });
    expect(getGraduatedFeedback(question, false, 1)).toMatchObject({
      stage: 'hint_2',
      revealAnswer: false,
    });
    expect(getGraduatedFeedback(question, false, 2)).toMatchObject({
      stage: 'explanation',
      revealAnswer: true,
    });
    expect(getGraduatedFeedback(question, true, 0)).toMatchObject({
      stage: 'correct',
    });
  });
});
