'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { content } from '@/lib/content/data';

const partOfSpeechLabels = {
  noun: '名詞',
  verb: '動詞',
  adjective: '形容詞',
  expression: '表現',
} as const;

export function VocabularyBrowser() {
  const [query, setQuery] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('all');
  const normalized = query.trim().toLocaleLowerCase();
  const results = useMemo(
    () =>
      content.vocabulary.filter((item) => {
        const matchesPart =
          partOfSpeech === 'all' || item.part_of_speech === partOfSpeech;
        const haystack = [
          item.surface,
          item.reading_hiragana,
          item.reading_katakana,
          item.romaji,
          ...item.meanings.core,
          ...item.meanings.extended,
        ]
          .join(' ')
          .toLocaleLowerCase();
        return matchesPart && (!normalized || haystack.includes(normalized));
      }),
    [normalized, partOfSpeech],
  );

  return (
    <>
      <div className="mb-5 grid gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border sm:grid-cols-[1fr_auto]">
        <label htmlFor="vocabulary-search" className="relative">
          <span className="sr-only">搜尋詞彙</span>
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="vocabulary-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋日文、讀音、羅馬字或中文意思"
            className="h-11 pl-10"
          />
        </label>
        <label htmlFor="part-of-speech-filter">
          <span className="sr-only">依詞性篩選</span>
          <select
            id="part-of-speech-filter"
            value={partOfSpeech}
            onChange={(event) => setPartOfSpeech(event.target.value)}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm font-medium sm:w-36"
          >
            <option value="all">全部詞性</option>
            <option value="noun">名詞</option>
            <option value="verb">動詞</option>
            <option value="adjective">形容詞</option>
            <option value="expression">表現</option>
          </select>
        </label>
      </div>

      <p
        className="mb-3 text-xs font-semibold text-muted-foreground"
        aria-live="polite"
      >
        找到 {results.length} 個學習詞彙
      </p>
      <div className="data-grid">
        {results.map((item) => (
          <Link
            key={item.id}
            href={`/vocabulary/${item.id}`}
            className="group flex min-h-48 flex-col justify-between rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/40"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="japanese-serif text-3xl font-bold">
                    {item.surface}
                  </h2>
                  <p className="reading-note mt-1">
                    {item.reading_hiragana} · {item.romaji}
                  </p>
                </div>
                <Badge variant="secondary">
                  {partOfSpeechLabels[item.part_of_speech]}
                </Badge>
              </div>
              <p className="mt-4 text-sm font-medium leading-6">
                {item.meanings.core.join('；')}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {item.contrast_set_ids.length > 0
                  ? `${item.contrast_set_ids.length} 組對比`
                  : '核心詞彙'}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        ))}
      </div>
      {results.length === 0 && (
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          找不到符合條件的詞彙，試著移除部分搜尋字詞。
        </div>
      )}
    </>
  );
}
