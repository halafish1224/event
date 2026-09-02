import type { ContentBundle, LearningObject } from '@/types/content';

export interface ContentValidationResult {
  valid: boolean;
  errors: string[];
}

function findDuplicateIds(
  items: Array<{ id: string }>,
  label: string,
): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) duplicates.add(item.id);
    seen.add(item.id);
  }

  return [...duplicates].map((id) => `${label} 出現重複 id：${id}`);
}

function verifyReferences(
  errors: string[],
  owner: string,
  refs: string[],
  validIds: Set<string>,
  targetLabel: string,
) {
  for (const ref of refs) {
    if (!validIds.has(ref))
      errors.push(`${owner} 引用了不存在的${targetLabel}：${ref}`);
  }
}

function detectCycles<T extends { id: string }>(
  items: T[],
  getDependencies: (item: T) => string[],
  label: string,
): string[] {
  const itemMap = new Map(items.map((item) => [item.id, item]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const errors: string[] = [];

  const visit = (id: string, trail: string[]) => {
    if (visiting.has(id)) {
      const start = trail.indexOf(id);
      errors.push(
        `${label}先備關係形成循環：${[...trail.slice(start), id].join(' → ')}`,
      );
      return;
    }
    if (visited.has(id)) return;

    const item = itemMap.get(id);
    if (!item) return;

    visiting.add(id);
    for (const dependency of getDependencies(item))
      visit(dependency, [...trail, id]);
    visiting.delete(id);
    visited.add(id);
  };

  for (const item of items) visit(item.id, []);
  return [...new Set(errors)];
}

function expectedTargetIds(bundle: ContentBundle) {
  const vocabIds = new Set(bundle.vocabulary.map((item) => item.id));
  const grammarIds = new Set(bundle.grammar.map((item) => item.id));
  const contrastIds = new Set(bundle.contrasts.map((item) => item.id));
  const generatedVerbForms = [
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
  const derivedFormIds = new Set(
    bundle.vocabulary.flatMap((item) => {
      const forms = new Set(Object.keys(item.forms));
      if (item.part_of_speech === 'verb')
        generatedVerbForms.forEach((form) => forms.add(form));
      return [...forms].map((form) => `${item.id}:form:${form}`);
    }),
  );

  return {
    vocabIds,
    grammarIds,
    contrastIds,
    derivedFormIds,
    all: new Set([
      ...vocabIds,
      ...grammarIds,
      ...contrastIds,
      ...derivedFormIds,
    ]),
  };
}

function learningObjectTargetIsValid(
  object: LearningObject,
  targetIds: ReturnType<typeof expectedTargetIds>,
) {
  if (object.content_type === 'grammar')
    return targetIds.grammarIds.has(object.target_id);
  if (object.content_type === 'contrast')
    return targetIds.contrastIds.has(object.target_id);
  return (
    targetIds.vocabIds.has(object.target_id) ||
    targetIds.derivedFormIds.has(object.target_id)
  );
}

export function validateContent(
  bundle: ContentBundle,
): ContentValidationResult {
  const errors: string[] = [];
  const collections = [
    ['課程', bundle.lessons],
    ['詞彙', bundle.vocabulary],
    ['文法', bundle.grammar],
    ['對比組', bundle.contrasts],
    ['歌曲', bundle.songs],
    ['例句', bundle.examples],
    ['題目', bundle.questions],
    ['學習物件', bundle.learningObjects],
  ] as const;

  for (const [label, collection] of collections)
    errors.push(...findDuplicateIds(collection, label));

  const lessonIds = new Set(bundle.lessons.map((item) => item.id));
  const songIds = new Set(bundle.songs.map((item) => item.id));
  const exampleIds = new Set(bundle.examples.map((item) => item.id));
  const questionIds = new Set(bundle.questions.map((item) => item.id));
  const learningObjectIds = new Set(
    bundle.learningObjects.map((item) => item.id),
  );
  const targetIds = expectedTargetIds(bundle);

  const orderedLessons = [...bundle.lessons].sort((a, b) => a.order - b.order);
  orderedLessons.forEach((lesson, index) => {
    const expectedOrder = index + 1;
    if (lesson.order !== expectedOrder) {
      errors.push(
        `課程順序必須完整涵蓋 1–30；位置 ${expectedOrder} 實際為 ${lesson.order}`,
      );
    }
    if (lesson.id !== `lesson_${String(expectedOrder).padStart(2, '0')}`) {
      errors.push(
        `第 ${expectedOrder} 課 id 應為 lesson_${String(expectedOrder).padStart(2, '0')}，實際為 ${lesson.id}`,
      );
    }
    verifyReferences(
      errors,
      lesson.id,
      lesson.prerequisite_lesson_ids,
      lessonIds,
      '先備課程',
    );
    verifyReferences(
      errors,
      lesson.id,
      lesson.vocabulary_ids,
      targetIds.vocabIds,
      '詞彙',
    );
    verifyReferences(
      errors,
      lesson.id,
      lesson.grammar_ids,
      targetIds.grammarIds,
      '文法',
    );
    verifyReferences(
      errors,
      lesson.id,
      lesson.contrast_ids,
      targetIds.contrastIds,
      '對比組',
    );
    verifyReferences(
      errors,
      lesson.id,
      lesson.example_sentence_ids,
      exampleIds,
      '例句',
    );
    verifyReferences(errors, lesson.id, lesson.song_ids, songIds, '歌曲');
  });

  for (const vocab of bundle.vocabulary) {
    verifyReferences(
      errors,
      vocab.id,
      vocab.related_vocab_ids,
      targetIds.vocabIds,
      '關聯詞彙',
    );
    verifyReferences(
      errors,
      vocab.id,
      vocab.contrast_set_ids,
      targetIds.contrastIds,
      '對比組',
    );
    verifyReferences(
      errors,
      vocab.id,
      vocab.example_sentence_ids,
      exampleIds,
      '例句',
    );
    verifyReferences(errors, vocab.id, vocab.lesson_ids, lessonIds, '課程');
    verifyReferences(errors, vocab.id, vocab.song_ids, songIds, '歌曲');
    verifyReferences(
      errors,
      vocab.id,
      vocab.grammar_ids,
      targetIds.grammarIds,
      '文法',
    );
  }

  for (const grammar of bundle.grammar) {
    verifyReferences(
      errors,
      grammar.id,
      grammar.prerequisites,
      targetIds.grammarIds,
      '先備文法',
    );
    verifyReferences(
      errors,
      grammar.id,
      grammar.contrast_set_ids,
      targetIds.contrastIds,
      '對比組',
    );
    verifyReferences(
      errors,
      grammar.id,
      grammar.example_sentence_ids,
      exampleIds,
      '例句',
    );
    verifyReferences(errors, grammar.id, grammar.lesson_ids, lessonIds, '課程');
    verifyReferences(errors, grammar.id, grammar.song_ids, songIds, '歌曲');
    verifyReferences(
      errors,
      grammar.id,
      grammar.question_template_ids,
      questionIds,
      '題目',
    );
  }

  for (const contrast of bundle.contrasts) {
    verifyReferences(
      errors,
      contrast.id,
      contrast.item_ids,
      targetIds.all,
      '學習項目',
    );
    verifyReferences(
      errors,
      contrast.id,
      contrast.decision_rules.map((rule) => rule.choose),
      targetIds.all,
      '決策規則目標',
    );
    verifyReferences(
      errors,
      contrast.id,
      contrast.lesson_ids,
      lessonIds,
      '課程',
    );
    verifyReferences(errors, contrast.id, contrast.song_ids, songIds, '歌曲');
    verifyReferences(
      errors,
      contrast.id,
      contrast.question_template_ids,
      questionIds,
      '題目',
    );
  }

  for (const example of bundle.examples) {
    verifyReferences(
      errors,
      example.id,
      example.target_vocab_ids,
      targetIds.vocabIds,
      '詞彙',
    );
    verifyReferences(
      errors,
      example.id,
      example.target_grammar_ids,
      targetIds.grammarIds,
      '文法',
    );
    verifyReferences(
      errors,
      example.id,
      example.contrast_ids,
      targetIds.contrastIds,
      '對比組',
    );
    verifyReferences(
      errors,
      example.id,
      example.tokens.flatMap((token) =>
        token.vocab_id ? [token.vocab_id] : [],
      ),
      targetIds.vocabIds,
      '詞彙 token',
    );
    verifyReferences(
      errors,
      example.id,
      example.tokens.flatMap((token) =>
        token.grammar_id ? [token.grammar_id] : [],
      ),
      targetIds.grammarIds,
      '文法 token',
    );
  }

  for (const song of bundle.songs) {
    verifyReferences(
      errors,
      song.id,
      song.vocabulary_ids,
      targetIds.vocabIds,
      '詞彙',
    );
    verifyReferences(
      errors,
      song.id,
      song.grammar_ids,
      targetIds.grammarIds,
      '文法',
    );
  }

  for (const question of bundle.questions) {
    if (!targetIds.all.has(question.target_id)) {
      errors.push(
        `${question.id} 引用了不存在的題目目標：${question.target_id}`,
      );
    }
    verifyReferences(
      errors,
      question.id,
      question.lesson_ids,
      lessonIds,
      '課程',
    );
    if (
      question.contrast_id &&
      !targetIds.contrastIds.has(question.contrast_id)
    ) {
      errors.push(
        `${question.id} 引用了不存在的對比組：${question.contrast_id}`,
      );
    }
    if (
      question.prerequisite_target_id &&
      !targetIds.all.has(question.prerequisite_target_id)
    ) {
      errors.push(
        `${question.id} 引用了不存在的先備目標：${question.prerequisite_target_id}`,
      );
    }
  }

  for (const object of bundle.learningObjects) {
    if (!learningObjectTargetIsValid(object, targetIds)) {
      errors.push(
        `${object.id} 的 ${object.content_type} 目標不存在：${object.target_id}`,
      );
    }
    verifyReferences(errors, object.id, object.lesson_ids, lessonIds, '課程');
    verifyReferences(
      errors,
      object.id,
      object.question_ids,
      questionIds,
      '題目',
    );
    verifyReferences(
      errors,
      object.id,
      object.prerequisite_object_ids,
      learningObjectIds,
      '先備學習物件',
    );
  }

  errors.push(
    ...detectCycles(bundle.grammar, (item) => item.prerequisites, '文法'),
  );
  errors.push(
    ...detectCycles(
      bundle.learningObjects,
      (item) => item.prerequisite_object_ids,
      '學習物件',
    ),
  );

  return { valid: errors.length === 0, errors };
}

export function assertValidContent(bundle: ContentBundle): ContentBundle {
  const result = validateContent(bundle);
  if (!result.valid) {
    throw new Error(`教材資料驗證失敗：\n- ${result.errors.join('\n- ')}`);
  }
  return bundle;
}
