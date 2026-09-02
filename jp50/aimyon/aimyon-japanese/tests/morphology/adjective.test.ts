import { describe, expect, it } from 'vitest';
import {
  adjectiveSurfaceTable,
  attachAdjectiveToNoun,
  conjugateAdjective,
} from '@/lib/morphology';

describe('形容詞活用引擎', () => {
  it('產生一般い形容詞完整表', () => {
    expect(
      adjectiveSurfaceTable({ display: '強い', reading: 'つよい', class: 'i' }),
    ).toEqual({
      dictionary: '強い',
      predicate: '強い',
      attributive: '強い',
      negative: '強くない',
      past: '強かった',
      negative_past: '強くなかった',
      te: '強くて',
      adverbial: '強く',
      naru: '強くなる',
      sugiru: '強すぎる',
      conditional: '強ければ',
    });
  });

  it('いい 顯示不變，但活用基底使用 よい', () => {
    const result = conjugateAdjective({
      display: 'いい',
      reading: 'いい',
      class: 'i',
      conjugationBase: 'よい',
    });
    expect(result.dictionary.surface).toBe('いい');
    expect(result.negative.surface).toBe('よくない');
    expect(result.past.surface).toBe('よかった');
    expect(result.conditional.surface).toBe('よければ');
    expect(result.negative.steps[0].ruleId).toBe(
      'adjective.i.ii_irregular.negative',
    );
  });

  it('好き 使用ナ形容詞連接，永不產生 好きい', () => {
    const input = { display: '好き', reading: 'すき', class: 'na' as const };
    const table = adjectiveSurfaceTable(input);
    expect(table).toMatchObject({
      predicate: '好きだ',
      attributive: '好きな',
      negative: '好きじゃない',
      past: '好きだった',
      naru: '好きになる',
      conditional: '好きなら',
    });
    expect(attachAdjectiveToNoun(input, '人')).toBe('好きな人');
    expect(Object.values(table).some((value) => value.includes('好きい'))).toBe(
      false,
    );
  });
});
