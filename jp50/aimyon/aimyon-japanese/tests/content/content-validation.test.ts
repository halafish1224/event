import { describe, expect, it } from 'vitest';
import { content } from '@/lib/content/data';
import { validateContent } from '@/lib/validation/content';

describe('教材資料契約', () => {
  it('完整通過 schema 與跨檔引用驗證', () => {
    expect(validateContent(content)).toEqual({ valid: true, errors: [] });
  });

  it('固定保留 6 單元、30 課與 5 首核心歌曲', () => {
    expect(content.lessons).toHaveLength(30);
    expect(new Set(content.lessons.map((lesson) => lesson.unit_id)).size).toBe(
      6,
    );
    expect(content.lessons.map((lesson) => lesson.order)).toEqual(
      Array.from({ length: 30 }, (_, index) => index + 1),
    );
    expect(content.songs).toHaveLength(5);
  });

  it('完整包含規格凍結的核心詞彙與 20 組獨立 Contrast', () => {
    const topNouns = [
      '恋',
      '今',
      '人',
      '今日',
      '愛',
      '心',
      '夜',
      '夢',
      '世界',
      '空',
      '言葉',
      '未来',
      '声',
      '日々',
      '思い出',
      '目',
      '手',
      '部屋',
      '朝',
      '花',
      '気持ち',
      '場所',
      '涙',
      '名前',
      '影',
      '光',
      '幸せ',
      '時',
      '風',
      '身体',
    ];
    const coreVerbs = [
      '言う',
      '思う',
      '見る',
      '行く',
      '知る',
      'なる',
      '会う',
      '聞く',
      '愛する',
      '伝える',
      '笑う',
      '泣く',
      '待つ',
      '帰る',
      '抱く',
      '離れる',
      '揺れる',
      '生きる',
      '見つめる',
      '歩く',
    ];
    const coreAdjectives = [
      '好き',
      '寂しい',
      '強い',
      'いい',
      '恋しい',
      '優しい',
      '大切',
      '遠い',
      '懐かしい',
      '冷たい',
      '新しい',
      '弱い',
      '悲しい',
      '小さい',
      '青い',
      '白い',
      '赤い',
      '暗い',
      '寒い',
      '甘い',
    ];
    const surfaces = new Set(content.vocabulary.map((item) => item.surface));
    for (const word of [...topNouns, ...coreVerbs, ...coreAdjectives])
      expect(surfaces.has(word)).toBe(true);
    expect(content.contrasts).toHaveLength(20);
    const contrastLearningObjects = content.learningObjects.filter(
      (object) => object.content_type === 'contrast',
    );
    expect(
      new Set(contrastLearningObjects.map((object) => object.target_id)).size,
    ).toBe(20);
  });

  it('每一道種子題都由且只由一個學習物件承接', () => {
    const ownership = new Map<string, number>();
    for (const object of content.learningObjects) {
      for (const questionId of object.question_ids) {
        ownership.set(questionId, (ownership.get(questionId) ?? 0) + 1);
      }
    }

    for (const question of content.questions)
      expect(ownership.get(question.id)).toBe(1);
  });

  it('能辨識並回報破損的跨檔引用', () => {
    const broken = structuredClone(content);
    broken.lessons[0].vocabulary_ids.push('v_missing');

    const result = validateContent(broken);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('lesson_01 引用了不存在的詞彙：v_missing');
  });

  it('能阻擋學習物件先備循環', () => {
    const broken = structuredClone(content);
    broken.learningObjects[0].prerequisite_object_ids.push(
      'lo_mieru_production',
    );
    const production = broken.learningObjects.find(
      (item) => item.id === 'lo_mieru_production',
    );
    production?.prerequisite_object_ids.push('lo_kokoro_reading');

    const result = validateContent(broken);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((error) => error.includes('學習物件先備關係形成循環')),
    ).toBe(true);
  });
});
