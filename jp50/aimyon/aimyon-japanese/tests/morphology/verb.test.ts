import { describe, expect, it } from 'vitest';
import { conjugateVerb, verbForms, verbSurfaceTable } from '@/lib/morphology';

describe('動詞活用引擎', () => {
  it('為 思う 產生完整 17 形', () => {
    expect(
      verbSurfaceTable({
        dictionary: '思う',
        reading: 'おもう',
        class: 'godan',
      }),
    ).toEqual({
      dictionary: '思う',
      polite: '思います',
      negative: '思わない',
      te: '思って',
      past: '思った',
      potential: '思える',
      volitional: '思おう',
      conditional_ba: '思えば',
      conditional_tara: '思ったら',
      tari: '思ったり',
      masu_stem: '思い',
      nagara: '思いながら',
      tai: '思いたい',
      te_hoshii: '思ってほしい',
      te_iru: '思っている',
      te_iku: '思っていく',
      te_kuru: '思ってくる',
    });
  });

  it('明示一段後才移除 見る 的 る', () => {
    const table = verbSurfaceTable({
      dictionary: '見る',
      reading: 'みる',
      class: 'ichidan',
    });
    expect(table).toMatchObject({
      negative: '見ない',
      te: '見て',
      past: '見た',
      potential: '見られる',
      conditional_ba: '見れば',
    });
    expect(Object.keys(table)).toEqual(verbForms);
  });

  it('把 帰る 與 知る 保持為五段分類', () => {
    expect(
      verbSurfaceTable({ dictionary: '帰る', class: 'godan' }),
    ).toMatchObject({
      negative: '帰らない',
      te: '帰って',
      potential: '帰れる',
    });
    expect(
      verbSurfaceTable({ dictionary: '知る', class: 'godan' }),
    ).toMatchObject({
      negative: '知らない',
      te: '知って',
      potential: '知れる',
    });
  });

  it('套用 行く 的 て／た形例外並保留規則軌跡', () => {
    const result = conjugateVerb({
      dictionary: '行く',
      reading: 'いく',
      class: 'godan',
    });
    expect(result.te.surface).toBe('行って');
    expect(result.past.surface).toBe('行った');
    expect(result.te.steps[0].ruleId).toBe('verb.godan.iku_exception.te');
    expect(result.te.reading).toBe('いって');
  });

  it('支援 する 與サ變複合動詞的不規則形', () => {
    expect(
      verbSurfaceTable({ dictionary: 'する', class: 'suru' }),
    ).toMatchObject({
      negative: 'しない',
      te: 'して',
      past: 'した',
      potential: 'できる',
    });
    expect(
      verbSurfaceTable({ dictionary: '勉強する', class: 'suru' }),
    ).toMatchObject({
      polite: '勉強します',
      potential: '勉強できる',
    });
    expect(
      verbSurfaceTable({
        dictionary: '愛する',
        class: 'suru',
        overrides: {
          negative: '愛さない',
          potential: '愛せる',
          volitional: '愛そう',
        },
      }),
    ).toMatchObject({
      negative: '愛さない',
      potential: '愛せる',
      volitional: '愛そう',
    });
  });

  it('支援 来る 的表記與特殊讀音', () => {
    const result = conjugateVerb({
      dictionary: '来る',
      reading: 'くる',
      class: 'kuru',
    });
    expect(result.negative).toMatchObject({
      surface: '来ない',
      reading: 'こない',
    });
    expect(result.te).toMatchObject({ surface: '来て', reading: 'きて' });
    expect(result.past).toMatchObject({ surface: '来た', reading: 'きた' });
    expect(result.potential).toMatchObject({
      surface: '来られる',
      reading: 'こられる',
    });
  });

  it('拒絕字尾不可能套用指定分類的輸入', () => {
    expect(() =>
      conjugateVerb({ dictionary: '聞く', class: 'ichidan' }),
    ).toThrow('一段動詞必須以 る 結尾');
  });
});
