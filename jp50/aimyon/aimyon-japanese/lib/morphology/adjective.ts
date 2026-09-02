import type {
  AdjectiveForm,
  AdjectiveInput,
  AdjectiveParadigm,
  GeneratedForm,
  MorphologyStep,
} from './types';

function step(
  ruleId: string,
  description: string,
  before: string,
  after: string,
): MorphologyStep {
  return { ruleId, description, before, after };
}

function result(
  input: AdjectiveInput,
  formName: AdjectiveForm,
  surface: string,
  reading?: string,
): GeneratedForm {
  const irregular =
    input.display === 'いい' || input.conjugationBase === 'よい';
  const ruleId = irregular
    ? `adjective.i.ii_irregular.${formName}`
    : `adjective.${input.class}.${formName}`;
  const description = irregular
    ? `いい 的活用基底先回到 よい，再產生 ${formName}。`
    : input.class === 'i'
      ? `移除末尾 い，再產生 ${formName}。`
      : `依ナ形容詞連接規則產生 ${formName}。`;

  return {
    surface,
    ...(reading ? { reading } : {}),
    steps: [step(ruleId, description, input.display, surface)],
  };
}

function iAdjectiveSurfaces(
  display: string,
  base: string,
): Record<AdjectiveForm, string> {
  if (!base.endsWith('い'))
    throw new Error(`い形容詞活用基底必須以 い 結尾：${base}`);
  const stem = base.slice(0, -1);
  return {
    dictionary: display,
    predicate: display,
    attributive: display,
    negative: `${stem}くない`,
    past: `${stem}かった`,
    negative_past: `${stem}くなかった`,
    te: `${stem}くて`,
    adverbial: `${stem}く`,
    naru: `${stem}くなる`,
    sugiru: `${stem}すぎる`,
    conditional: `${stem}ければ`,
  };
}

function naAdjectiveSurfaces(display: string): Record<AdjectiveForm, string> {
  return {
    dictionary: display,
    predicate: `${display}だ`,
    attributive: `${display}な`,
    negative: `${display}じゃない`,
    past: `${display}だった`,
    negative_past: `${display}じゃなかった`,
    te: `${display}で`,
    adverbial: `${display}に`,
    naru: `${display}になる`,
    sugiru: `${display}すぎる`,
    conditional: `${display}なら`,
  };
}

export function conjugateAdjective(input: AdjectiveInput): AdjectiveParadigm {
  const base = input.conjugationBase ?? input.display;
  const surfaces =
    input.class === 'i'
      ? iAdjectiveSurfaces(input.display, base)
      : naAdjectiveSurfaces(input.display);
  const readingSurfaces = input.reading
    ? input.class === 'i'
      ? iAdjectiveSurfaces(
          input.reading,
          input.display === 'いい' ? 'よい' : input.reading,
        )
      : naAdjectiveSurfaces(input.reading)
    : undefined;

  return Object.fromEntries(
    (Object.keys(surfaces) as AdjectiveForm[]).map((formName) => [
      formName,
      result(input, formName, surfaces[formName], readingSurfaces?.[formName]),
    ]),
  ) as AdjectiveParadigm;
}

export function attachAdjectiveToNoun(input: AdjectiveInput, noun: string) {
  return `${conjugateAdjective(input).attributive.surface}${noun}`;
}

export function adjectiveSurfaceTable(
  input: AdjectiveInput,
): Record<AdjectiveForm, string> {
  return Object.fromEntries(
    Object.entries(conjugateAdjective(input)).map(([formName, generated]) => [
      formName,
      generated.surface,
    ]),
  ) as Record<AdjectiveForm, string>;
}
