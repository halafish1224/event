export type ContentId = string;

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'expression';
export type VerbSubclass = 'godan' | 'ichidan' | 'suru' | 'kuru';
export type AdjectiveSubclass = 'i' | 'na';

export interface Vocabulary {
  id: ContentId;
  surface: string;
  reading_hiragana: string;
  reading_katakana: string;
  romaji: string;
  part_of_speech: PartOfSpeech;
  subclass: string;
  frequency: {
    band: 'high' | 'medium' | 'low';
    rank?: number;
    count_estimate?: number;
    share_estimate?: number;
    confidence: 'high' | 'medium' | 'low';
    label: '教材語料估計';
  };
  learning_priority: number;
  meanings: { core: string[]; extended: string[] };
  usage_notes: string[];
  semantic_clusters: string[];
  related_vocab_ids: ContentId[];
  contrast_set_ids: ContentId[];
  collocations: string[];
  particles: string[];
  forms: Record<string, string>;
  example_sentence_ids: ContentId[];
  lesson_ids: ContentId[];
  song_ids: ContentId[];
  grammar_ids: ContentId[];
  naturalness_notes: string[];
  mnemonics: string[];
  metadata: Record<string, unknown>;
}

export interface Grammar {
  id: ContentId;
  title: string;
  surface_pattern: string;
  level: string;
  category: string;
  meaning_core: string;
  meaning_extended: string[];
  formation_rules: string[];
  prerequisites: ContentId[];
  semantic_functions: string[];
  register: string;
  usage_notes: string[];
  contrast_set_ids: ContentId[];
  example_sentence_ids: ContentId[];
  lesson_ids: ContentId[];
  song_ids: ContentId[];
  question_template_ids: ContentId[];
  common_error_tags: string[];
  metadata: Record<string, unknown>;
}

export interface ContrastSet {
  id: ContentId;
  title: string;
  item_ids: ContentId[];
  category: string;
  priority: number;
  core_question: string;
  semantic_dimensions: string[];
  decision_rules: Array<{ when: string; choose: string; because: string }>;
  minimal_pairs: Array<{
    context: string;
    left: string;
    right: string;
    explanation: string;
  }>;
  common_errors: string[];
  wrong_choice_examples: Array<{
    prompt: string;
    wrong: string;
    correction: string;
    reason: string;
  }>;
  memory_hook: string;
  lesson_ids: ContentId[];
  song_ids: ContentId[];
  question_template_ids: ContentId[];
  mastery: {
    recognition: number;
    explanation: number;
    selection: number;
    production: number;
  };
}

export interface ExampleSentence {
  id: ContentId;
  japanese: string;
  reading: string;
  translation_zh_tw: string;
  tokens: Array<{
    surface: string;
    reading?: string;
    vocab_id?: ContentId;
    grammar_id?: ContentId;
  }>;
  target_vocab_ids: ContentId[];
  target_grammar_ids: ContentId[];
  contrast_ids: ContentId[];
  difficulty: number;
  register: string;
  source_type: 'original';
  reviewed: boolean;
}

export interface Lesson {
  id: ContentId;
  unit_id: ContentId;
  unit_title: string;
  order: number;
  title: string;
  objective: string;
  core_concept: string;
  status: 'outline' | 'seeded';
  prerequisite_lesson_ids: ContentId[];
  vocabulary_ids: ContentId[];
  grammar_ids: ContentId[];
  contrast_ids: ContentId[];
  example_sentence_ids: ContentId[];
  song_ids: ContentId[];
  retrieval_prompt: string;
  generation_prompt: string;
}

export interface Song {
  id: ContentId;
  title_ja: string;
  title_zh_tw: string;
  artist: 'あいみょん';
  metadata: { release_year?: number; album?: string; copyright_note: string };
  vocabulary_ids: ContentId[];
  grammar_ids: ContentId[];
  semantic_clusters: string[];
  listening_missions: string[];
}

export type QuestionType =
  | 'reading_recognition'
  | 'reading_recall'
  | 'meaning_recall'
  | 'reverse_recall'
  | 'morphology_production'
  | 'lemma_recovery'
  | 'particle_selection'
  | 'contrast_selection'
  | 'error_correction'
  | 'sentence_transformation'
  | 'listening_recognition'
  | 'controlled_generation'
  | 'free_generation'
  | 'micro_narrative';

export interface QuestionSeed {
  id: ContentId;
  type: QuestionType;
  difficulty: number;
  prompt: string;
  target_id: ContentId;
  target_dimension: string;
  options: string[];
  accepted_answers: string[];
  hint_1: string;
  hint_2: string;
  explanation: string;
  error_tags: string[];
  lesson_ids: ContentId[];
  contrast_id?: ContentId;
  prerequisite_target_id?: ContentId;
  naturalness_weight: number;
  pedagogical_priority: number;
  reviewed: boolean;
}

export interface LearningObject {
  id: ContentId;
  content_type: 'vocabulary' | 'grammar' | 'contrast';
  target_id: ContentId;
  dimension: string;
  lesson_ids: ContentId[];
  question_ids: ContentId[];
  prerequisite_object_ids: ContentId[];
  learning_priority: number;
}

export interface ContentBundle {
  version: '1.0.0';
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  grammar: Grammar[];
  contrasts: ContrastSet[];
  songs: Song[];
  examples: ExampleSentence[];
  questions: QuestionSeed[];
  learningObjects: LearningObject[];
}
