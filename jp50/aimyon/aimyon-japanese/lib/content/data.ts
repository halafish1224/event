import contrasts from '@/content/contrasts.json';
import coreContrasts from '@/content/contrasts.core.json';
import examples from '@/content/examples.json';
import grammar from '@/content/grammar.json';
import coreGrammar from '@/content/grammar.core.json';
import learningObjects from '@/content/learning-objects.json';
import coreLearningObjects from '@/content/learning-objects.core.json';
import lessons from '@/content/lessons.json';
import questions from '@/content/questions.seed.json';
import coreQuestions from '@/content/questions.core.json';
import songs from '@/content/songs.json';
import vocabulary from '@/content/vocabulary.json';
import coreVocabulary from '@/content/vocabulary.core.json';
import { assertValidContent } from '@/lib/validation/content';
import { contentFilesSchema } from './schema';

const parsedContent = contentFilesSchema.parse({
  version: '1.0.0',
  lessons,
  vocabulary: [...vocabulary, ...coreVocabulary],
  grammar: [...grammar, ...coreGrammar],
  contrasts: [...contrasts, ...coreContrasts],
  songs,
  examples,
  questions: [...questions, ...coreQuestions],
  learningObjects: [...learningObjects, ...coreLearningObjects],
});

export const content = assertValidContent(parsedContent);

export const contentMaps = {
  lessons: new Map(content.lessons.map((item) => [item.id, item])),
  vocabulary: new Map(content.vocabulary.map((item) => [item.id, item])),
  grammar: new Map(content.grammar.map((item) => [item.id, item])),
  contrasts: new Map(content.contrasts.map((item) => [item.id, item])),
  songs: new Map(content.songs.map((item) => [item.id, item])),
  examples: new Map(content.examples.map((item) => [item.id, item])),
  questions: new Map(content.questions.map((item) => [item.id, item])),
  learningObjects: new Map(
    content.learningObjects.map((item) => [item.id, item]),
  ),
} as const;
