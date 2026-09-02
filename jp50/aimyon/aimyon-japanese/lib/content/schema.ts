import { z } from 'zod';

const id = z
  .string()
  .min(1)
  .regex(/^[a-z0-9_:-]+$/);
const stringList = z.array(z.string()).default([]);
const idList = z.array(id).default([]);
const metadata = z.record(z.string(), z.unknown()).default({});

export const vocabularySchema = z.object({
  id,
  surface: z.string().min(1),
  reading_hiragana: z.string().min(1),
  reading_katakana: z.string().min(1),
  romaji: z.string().min(1),
  part_of_speech: z.enum(['noun', 'verb', 'adjective', 'expression']),
  subclass: z.string().min(1),
  frequency: z
    .object({
      band: z.enum(['high', 'medium', 'low']),
      rank: z.number().int().positive().optional(),
      count_estimate: z.number().nonnegative().optional(),
      share_estimate: z.number().min(0).max(1).optional(),
      confidence: z.enum(['high', 'medium', 'low']).default('medium'),
      label: z.literal('教材語料估計').default('教材語料估計'),
    })
    .default({ band: 'medium', confidence: 'medium', label: '教材語料估計' }),
  learning_priority: z.number().min(0).max(1).default(0.5),
  meanings: z.object({
    core: z.array(z.string()).min(1),
    extended: stringList,
  }),
  usage_notes: stringList,
  semantic_clusters: stringList,
  related_vocab_ids: idList,
  contrast_set_ids: idList,
  collocations: stringList,
  particles: stringList,
  forms: z.record(z.string(), z.string()).default({}),
  example_sentence_ids: idList,
  lesson_ids: idList,
  song_ids: idList,
  grammar_ids: idList,
  naturalness_notes: stringList,
  mnemonics: stringList,
  metadata,
});

export const grammarSchema = z.object({
  id,
  title: z.string().min(1),
  surface_pattern: z.string().min(1),
  level: z.string().min(1),
  category: z.string().min(1),
  meaning_core: z.string().min(1),
  meaning_extended: stringList,
  formation_rules: z.array(z.string()).min(1),
  prerequisites: idList,
  semantic_functions: stringList,
  register: z.string().min(1),
  usage_notes: stringList,
  contrast_set_ids: idList,
  example_sentence_ids: idList,
  lesson_ids: idList,
  song_ids: idList,
  question_template_ids: idList,
  common_error_tags: stringList,
  metadata,
});

export const contrastSchema = z.object({
  id,
  title: z.string().min(1),
  item_ids: z.array(id).min(2),
  category: z.string().min(1),
  priority: z.number().min(0).max(1),
  core_question: z.string().min(1),
  semantic_dimensions: z.array(z.string()).min(1),
  decision_rules: z
    .array(
      z.object({
        when: z.string().min(1),
        choose: id,
        because: z.string().min(1),
      }),
    )
    .min(1),
  minimal_pairs: z
    .array(
      z.object({
        context: z.string().min(1),
        left: z.string().min(1),
        right: z.string().min(1),
        explanation: z.string().min(1),
      }),
    )
    .min(1),
  common_errors: z.array(z.string()).min(1),
  wrong_choice_examples: z
    .array(
      z.object({
        prompt: z.string(),
        wrong: z.string(),
        correction: z.string(),
        reason: z.string(),
      }),
    )
    .min(1),
  memory_hook: z.string().min(1),
  lesson_ids: idList,
  song_ids: idList,
  question_template_ids: idList,
  mastery: z.object({
    recognition: z.number().min(0).max(1),
    explanation: z.number().min(0).max(1),
    selection: z.number().min(0).max(1),
    production: z.number().min(0).max(1),
  }),
});

export const exampleSchema = z.object({
  id,
  japanese: z.string().min(1),
  reading: z.string().min(1),
  translation_zh_tw: z.string().min(1),
  tokens: z.array(
    z.object({
      surface: z.string(),
      reading: z.string().optional(),
      vocab_id: id.optional(),
      grammar_id: id.optional(),
    }),
  ),
  target_vocab_ids: idList,
  target_grammar_ids: idList,
  contrast_ids: idList,
  difficulty: z.number().int().min(0).max(7),
  register: z.string().min(1),
  source_type: z.literal('original'),
  reviewed: z.boolean(),
});

export const lessonSchema = z.object({
  id,
  unit_id: id,
  unit_title: z.string().min(1),
  order: z.number().int().min(1).max(30),
  title: z.string().min(1),
  objective: z.string().min(1),
  core_concept: z.string().min(1),
  status: z.enum(['outline', 'seeded']),
  prerequisite_lesson_ids: idList,
  vocabulary_ids: idList,
  grammar_ids: idList,
  contrast_ids: idList,
  example_sentence_ids: idList,
  song_ids: idList,
  retrieval_prompt: z.string().min(1),
  generation_prompt: z.string().min(1),
});

export const songSchema = z.object({
  id,
  title_ja: z.string().min(1),
  title_zh_tw: z.string().min(1),
  artist: z.literal('あいみょん'),
  metadata: z.object({
    release_year: z.number().int().optional(),
    album: z.string().optional(),
    copyright_note: z.string().min(1),
  }),
  vocabulary_ids: idList,
  grammar_ids: idList,
  semantic_clusters: stringList,
  listening_missions: z.array(z.string()).min(1),
});

export const questionSchema = z.object({
  id,
  type: z.enum([
    'reading_recognition',
    'reading_recall',
    'meaning_recall',
    'reverse_recall',
    'morphology_production',
    'lemma_recovery',
    'particle_selection',
    'contrast_selection',
    'error_correction',
    'sentence_transformation',
    'listening_recognition',
    'controlled_generation',
    'free_generation',
    'micro_narrative',
  ]),
  difficulty: z.number().int().min(0).max(7),
  prompt: z.string().min(1),
  target_id: id,
  target_dimension: z.string().min(1),
  options: stringList,
  accepted_answers: z.array(z.string()).min(1),
  hint_1: z.string().min(1),
  hint_2: z.string().min(1),
  explanation: z.string().min(1),
  error_tags: z.array(z.string()).min(1),
  lesson_ids: z.array(id).min(1),
  contrast_id: id.optional(),
  prerequisite_target_id: id.optional(),
  naturalness_weight: z.number().min(0).max(1),
  pedagogical_priority: z.number().min(0).max(1),
  reviewed: z.boolean(),
});

export const learningObjectSchema = z.object({
  id,
  content_type: z.enum(['vocabulary', 'grammar', 'contrast']),
  target_id: id,
  dimension: z.string().min(1),
  lesson_ids: z.array(id).min(1),
  question_ids: idList,
  prerequisite_object_ids: idList,
  learning_priority: z.number().min(0).max(1),
});

export const contentFilesSchema = z.object({
  version: z.literal('1.0.0'),
  lessons: z.array(lessonSchema).length(30),
  vocabulary: z.array(vocabularySchema).min(1),
  grammar: z.array(grammarSchema).min(1),
  contrasts: z.array(contrastSchema).min(1),
  songs: z.array(songSchema).length(5),
  examples: z.array(exampleSchema).min(1),
  questions: z.array(questionSchema).min(1),
  learningObjects: z.array(learningObjectSchema).min(1),
});
