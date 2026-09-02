export type VerbClass = 'godan' | 'ichidan' | 'suru' | 'kuru';

export type VerbForm =
  | 'dictionary'
  | 'polite'
  | 'negative'
  | 'te'
  | 'past'
  | 'potential'
  | 'volitional'
  | 'conditional_ba'
  | 'conditional_tara'
  | 'tari'
  | 'masu_stem'
  | 'nagara'
  | 'tai'
  | 'te_hoshii'
  | 'te_iru'
  | 'te_iku'
  | 'te_kuru';

export const verbForms: VerbForm[] = [
  'dictionary',
  'polite',
  'negative',
  'te',
  'past',
  'potential',
  'volitional',
  'conditional_ba',
  'conditional_tara',
  'tari',
  'masu_stem',
  'nagara',
  'tai',
  'te_hoshii',
  'te_iru',
  'te_iku',
  'te_kuru',
];

export interface MorphologyStep {
  ruleId: string;
  description: string;
  before: string;
  after: string;
}

export interface GeneratedForm {
  surface: string;
  reading?: string;
  steps: MorphologyStep[];
}

export interface VerbInput {
  dictionary: string;
  reading?: string;
  class: VerbClass;
  exception?: 'iku';
  overrides?: Partial<Record<VerbForm, string>>;
}

export type VerbParadigm = Record<VerbForm, GeneratedForm>;

export type AdjectiveClass = 'i' | 'na';

export type AdjectiveForm =
  | 'dictionary'
  | 'predicate'
  | 'attributive'
  | 'negative'
  | 'past'
  | 'negative_past'
  | 'te'
  | 'adverbial'
  | 'naru'
  | 'sugiru'
  | 'conditional';

export interface AdjectiveInput {
  display: string;
  class: AdjectiveClass;
  reading?: string;
  conjugationBase?: string;
}

export type AdjectiveParadigm = Record<AdjectiveForm, GeneratedForm>;
