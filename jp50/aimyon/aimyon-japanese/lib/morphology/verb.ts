import type {
  GeneratedForm,
  MorphologyStep,
  VerbForm,
  VerbInput,
  VerbParadigm,
} from './types';

const godanRows = {
  う: { a: 'わ', i: 'い', e: 'え', o: 'お' },
  く: { a: 'か', i: 'き', e: 'け', o: 'こ' },
  ぐ: { a: 'が', i: 'ぎ', e: 'げ', o: 'ご' },
  す: { a: 'さ', i: 'し', e: 'せ', o: 'そ' },
  つ: { a: 'た', i: 'ち', e: 'て', o: 'と' },
  ぬ: { a: 'な', i: 'に', e: 'ね', o: 'の' },
  ぶ: { a: 'ば', i: 'び', e: 'べ', o: 'ぼ' },
  む: { a: 'ま', i: 'み', e: 'め', o: 'も' },
  る: { a: 'ら', i: 'り', e: 'れ', o: 'ろ' },
} as const;

type GodanEnding = keyof typeof godanRows;

function step(
  ruleId: string,
  description: string,
  before: string,
  after: string,
): MorphologyStep {
  return { ruleId, description, before, after };
}

function form(
  surface: string,
  steps: MorphologyStep[],
  reading?: string,
): GeneratedForm {
  return { surface, ...(reading ? { reading } : {}), steps };
}

function replaceLast(value: string, replacement: string) {
  return `${value.slice(0, -1)}${replacement}`;
}

function godanTeOrPast(
  word: string,
  ending: GodanEnding,
  kind: 'te' | 'past',
  iku: boolean,
) {
  if (iku) return replaceLast(word, kind === 'te' ? 'って' : 'った');
  if (['う', 'つ', 'る'].includes(ending))
    return replaceLast(word, kind === 'te' ? 'って' : 'った');
  if (['む', 'ぶ', 'ぬ'].includes(ending))
    return replaceLast(word, kind === 'te' ? 'んで' : 'んだ');
  if (ending === 'く')
    return replaceLast(word, kind === 'te' ? 'いて' : 'いた');
  if (ending === 'ぐ')
    return replaceLast(word, kind === 'te' ? 'いで' : 'いだ');
  return replaceLast(word, kind === 'te' ? 'して' : 'した');
}

function conjugateGodanWord(
  word: string,
  input: VerbInput,
): Record<VerbForm, string> {
  const ending = word.at(-1) as GodanEnding;
  const row = godanRows[ending];
  if (!row) throw new Error(`不支援的五段動詞字尾：${word}`);

  const iku =
    input.exception === 'iku' ||
    input.dictionary === '行く' ||
    input.reading === 'いく';
  const masuStem = replaceLast(word, row.i);
  const te = godanTeOrPast(word, ending, 'te', iku);
  const past = godanTeOrPast(word, ending, 'past', iku);

  return {
    dictionary: word,
    polite: `${masuStem}ます`,
    negative: `${replaceLast(word, row.a)}ない`,
    te,
    past,
    potential: `${replaceLast(word, row.e)}る`,
    volitional: `${replaceLast(word, row.o)}う`,
    conditional_ba: `${replaceLast(word, row.e)}ば`,
    conditional_tara: `${past}ら`,
    tari: `${past}り`,
    masu_stem: masuStem,
    nagara: `${masuStem}ながら`,
    tai: `${masuStem}たい`,
    te_hoshii: `${te}ほしい`,
    te_iru: `${te}いる`,
    te_iku: `${te}いく`,
    te_kuru: `${te}くる`,
  };
}

function conjugateIchidanWord(word: string): Record<VerbForm, string> {
  if (!word.endsWith('る')) throw new Error(`一段動詞必須以 る 結尾：${word}`);
  const stem = word.slice(0, -1);
  const te = `${stem}て`;
  const past = `${stem}た`;

  return {
    dictionary: word,
    polite: `${stem}ます`,
    negative: `${stem}ない`,
    te,
    past,
    potential: `${stem}られる`,
    volitional: `${stem}よう`,
    conditional_ba: `${stem}れば`,
    conditional_tara: `${past}ら`,
    tari: `${past}り`,
    masu_stem: stem,
    nagara: `${stem}ながら`,
    tai: `${stem}たい`,
    te_hoshii: `${te}ほしい`,
    te_iru: `${te}いる`,
    te_iku: `${te}いく`,
    te_kuru: `${te}くる`,
  };
}

function conjugateSuruWord(word: string): Record<VerbForm, string> {
  if (!word.endsWith('する'))
    throw new Error(`する動詞必須以 する 結尾：${word}`);
  const prefix = word.slice(0, -2);
  const withPrefix = (value: string) => `${prefix}${value}`;

  return {
    dictionary: word,
    polite: withPrefix('します'),
    negative: withPrefix('しない'),
    te: withPrefix('して'),
    past: withPrefix('した'),
    potential: withPrefix('できる'),
    volitional: withPrefix('しよう'),
    conditional_ba: withPrefix('すれば'),
    conditional_tara: withPrefix('したら'),
    tari: withPrefix('したり'),
    masu_stem: withPrefix('し'),
    nagara: withPrefix('しながら'),
    tai: withPrefix('したい'),
    te_hoshii: withPrefix('してほしい'),
    te_iru: withPrefix('している'),
    te_iku: withPrefix('していく'),
    te_kuru: withPrefix('してくる'),
  };
}

function conjugateKuruWord(word: string): Record<VerbForm, string> {
  if (word !== '来る' && word !== 'くる')
    throw new Error(`来る類必須明示為 来る 或 くる：${word}`);
  const kanji = word === '来る';
  const pick = (surface: string, reading: string) =>
    kanji ? surface : reading;

  return {
    dictionary: word,
    polite: pick('来ます', 'きます'),
    negative: pick('来ない', 'こない'),
    te: pick('来て', 'きて'),
    past: pick('来た', 'きた'),
    potential: pick('来られる', 'こられる'),
    volitional: pick('来よう', 'こよう'),
    conditional_ba: pick('来れば', 'くれば'),
    conditional_tara: pick('来たら', 'きたら'),
    tari: pick('来たり', 'きたり'),
    masu_stem: pick('来', 'き'),
    nagara: pick('来ながら', 'きながら'),
    tai: pick('来たい', 'きたい'),
    te_hoshii: pick('来てほしい', 'きてほしい'),
    te_iru: pick('来ている', 'きている'),
    te_iku: pick('来ていく', 'きていく'),
    te_kuru: pick('来てくる', 'きてくる'),
  };
}

function ruleFor(input: VerbInput, formName: VerbForm) {
  if (formName === 'dictionary') return 'verb.dictionary';
  if (input.class === 'kuru') return `verb.kuru.${formName}`;
  if (input.class === 'suru') return `verb.suru.${formName}`;
  if (input.class === 'ichidan') return `verb.ichidan.drop_ru.${formName}`;
  if (
    (input.exception === 'iku' ||
      input.dictionary === '行く' ||
      input.reading === 'いく') &&
    [
      'te',
      'past',
      'conditional_tara',
      'tari',
      'te_hoshii',
      'te_iru',
      'te_iku',
      'te_kuru',
    ].includes(formName)
  ) {
    return `verb.godan.iku_exception.${formName}`;
  }
  return `verb.godan.${formName}`;
}

function describeRule(input: VerbInput, formName: VerbForm) {
  if (formName === 'dictionary') return '保留辭書形。';
  if (input.class === 'godan') return `依五段動詞規則產生 ${formName}。`;
  if (input.class === 'ichidan') return `移除末尾 る，再產生 ${formName}。`;
  if (input.class === 'suru') return `套用 する 的不規則 ${formName}。`;
  return `套用 来る 的不規則 ${formName}。`;
}

export function conjugateVerb(input: VerbInput): VerbParadigm {
  const generatedSurfaces =
    input.class === 'godan'
      ? conjugateGodanWord(input.dictionary, input)
      : input.class === 'ichidan'
        ? conjugateIchidanWord(input.dictionary)
        : input.class === 'suru'
          ? conjugateSuruWord(input.dictionary)
          : conjugateKuruWord(input.dictionary);
  const surfaces = { ...generatedSurfaces, ...input.overrides };

  const readings = input.reading
    ? input.class === 'godan'
      ? conjugateGodanWord(input.reading, {
          ...input,
          dictionary: input.reading,
        })
      : input.class === 'ichidan'
        ? conjugateIchidanWord(input.reading)
        : input.class === 'suru'
          ? conjugateSuruWord(input.reading)
          : conjugateKuruWord('くる')
    : undefined;

  return Object.fromEntries(
    (Object.keys(surfaces) as VerbForm[]).map((formName) => {
      const surface = surfaces[formName];
      return [
        formName,
        form(
          surface,
          [
            step(
              ruleFor(input, formName),
              describeRule(input, formName),
              input.dictionary,
              surface,
            ),
          ],
          readings?.[formName],
        ),
      ];
    }),
  ) as VerbParadigm;
}

export function verbSurfaceTable(input: VerbInput): Record<VerbForm, string> {
  return Object.fromEntries(
    Object.entries(conjugateVerb(input)).map(([formName, generated]) => [
      formName,
      generated.surface,
    ]),
  ) as Record<VerbForm, string>;
}
