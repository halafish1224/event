import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BrainCircuit, Link2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { content, contentMaps } from '@/lib/content/data';
import {
  adjectiveSurfaceTable,
  verbSurfaceTable,
  type AdjectiveClass,
  type VerbClass,
} from '@/lib/morphology';

interface VocabularyPageProps {
  params: Promise<{ id: string }>;
}

const verbFormLabels: Record<string, string> = {
  dictionary: '辭書形',
  polite: 'ます形',
  negative: 'ない形',
  te: 'て形',
  past: 'た形',
  potential: '可能形',
  volitional: '意向形',
  conditional_ba: '～ば',
  conditional_tara: '～たら',
  tari: '～たり',
  masu_stem: 'ます語幹',
  nagara: '～ながら',
  tai: '～たい',
  te_hoshii: '～てほしい',
  te_iru: '～ている',
  te_iku: '～ていく',
  te_kuru: '～てくる',
};

const adjectiveFormLabels: Record<string, string> = {
  dictionary: '基本形',
  predicate: '述語',
  attributive: '名詞前',
  negative: '否定',
  past: '過去',
  negative_past: '過去否定',
  te: 'て形',
  adverbial: '副詞形',
  naru: '～なる',
  sugiru: '～すぎる',
  conditional: '條件形',
};

export function generateStaticParams() {
  return content.vocabulary.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: VocabularyPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = contentMaps.vocabulary.get(id);
  return item
    ? {
        title: `${item.surface}（${item.reading_hiragana}）`,
        description: item.meanings.core.join('、'),
      }
    : { title: '找不到詞彙' };
}

export default async function VocabularyDetailPage({
  params,
}: VocabularyPageProps) {
  const { id } = await params;
  const item = contentMaps.vocabulary.get(id);
  if (!item) notFound();

  const contrastSets = item.contrast_set_ids.flatMap((contrastId) => {
    const contrast = contentMaps.contrasts.get(contrastId);
    return contrast ? [contrast] : [];
  });
  const examples = item.example_sentence_ids.flatMap((exampleId) => {
    const example = contentMaps.examples.get(exampleId);
    return example ? [example] : [];
  });
  const related = item.related_vocab_ids.flatMap((relatedId) => {
    const value = contentMaps.vocabulary.get(relatedId);
    return value ? [value] : [];
  });

  let forms: Array<[string, string]> = [];
  if (item.part_of_speech === 'verb') {
    const metadataOverrides = item.metadata.morphology_overrides;
    const overrides =
      metadataOverrides && typeof metadataOverrides === 'object'
        ? Object.fromEntries(
            Object.entries(metadataOverrides).filter(
              (entry): entry is [string, string] =>
                typeof entry[1] === 'string',
            ),
          )
        : undefined;
    forms = Object.entries(
      verbSurfaceTable({
        dictionary: item.surface,
        reading: item.reading_hiragana,
        class: item.subclass as VerbClass,
        overrides,
      }),
    );
  } else if (item.part_of_speech === 'adjective') {
    const conjugationBase =
      typeof item.metadata.conjugation_base === 'string'
        ? item.metadata.conjugation_base
        : undefined;
    forms = Object.entries(
      adjectiveSurfaceTable({
        display: item.surface,
        reading: item.reading_hiragana,
        class: item.subclass as AdjectiveClass,
        conjugationBase,
      }),
    );
  }

  return (
    <main id="main-content" className="page-shell pb-12">
      <article className="content-shell max-w-5xl">
        <Link
          href="/vocabulary"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> 核心詞彙
        </Link>

        <header className="grid gap-6 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:grid-cols-[1fr_auto] sm:p-9">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{item.part_of_speech.toUpperCase()}</Badge>
              <Badge variant="secondary">{item.subclass}</Badge>
              <Badge variant="outline">
                優先度 {Math.round(item.learning_priority * 100)}
              </Badge>
            </div>
            <h1 className="japanese-serif mt-5 text-6xl font-bold tracking-tight sm:text-7xl">
              {item.surface}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {item.reading_hiragana} · {item.reading_katakana} · {item.romaji}
            </p>
          </div>
          <div className="self-end rounded-2xl bg-secondary p-5 sm:max-w-72">
            <p className="eyebrow text-muted-foreground">CORE MEANING</p>
            <p className="mt-2 text-lg font-bold leading-7">
              {item.meanings.core.join('；')}
            </p>
            {item.meanings.extended.length > 0 && (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.meanings.extended.join('；')}
              </p>
            )}
          </div>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="語意與用法"
            values={item.usage_notes}
            empty="此詞的用法說明仍在教材擴充中。"
          />
          <InfoCard
            title="常用搭配"
            values={item.collocations}
            empty="目前沒有額外搭配。"
          />
          <InfoCard
            title="常見助詞"
            values={item.particles}
            empty="不固定綁定特定助詞。"
          />
          <InfoCard
            title="自然度提醒"
            values={item.naturalness_notes}
            empty="依一般語境使用。"
          />
        </div>

        {forms.length > 0 && (
          <section className="mt-10" aria-labelledby="morphology-table">
            <div className="mb-4">
              <p className="eyebrow text-muted-foreground">MORPHOLOGY ENGINE</p>
              <h2 id="morphology-table" className="mt-1 text-2xl font-bold">
                活用一覽
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                由明示詞類即時計算；不以 る 字尾猜測五段或一段。
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {forms.map(([formName, surface]) => (
                  <div
                    key={formName}
                    className="border-b border-border/70 p-4 sm:border-r"
                  >
                    <span className="block text-xs font-bold text-muted-foreground">
                      {(item.part_of_speech === 'verb'
                        ? verbFormLabels
                        : adjectiveFormLabels)[formName] ?? formName}
                    </span>
                    <strong className="japanese-serif mt-1 block text-xl">
                      {surface}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {contrastSets.length > 0 && (
          <section className="mt-10">
            <p className="eyebrow text-muted-foreground">CONTRAST NETWORK</p>
            <h2 className="mt-1 text-2xl font-bold">不要和鄰近詞混在一起</h2>
            <div className="mt-4 grid gap-3">
              {contrastSets.map((contrast) => (
                <Link
                  key={contrast.id}
                  href={`/contrasts/${contrast.id}`}
                  className="group rounded-2xl bg-primary p-5 text-primary-foreground"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <strong className="text-lg">{contrast.title}</strong>
                      <p className="mt-1 text-sm leading-6 text-primary-foreground/70">
                        {contrast.core_question}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {examples.length > 0 && (
          <section className="mt-10">
            <p className="eyebrow text-muted-foreground">ORIGINAL EXAMPLES</p>
            <h2 className="mt-1 text-2xl font-bold">放回句子裡</h2>
            <div className="mt-4 grid gap-3">
              {examples.map((example) => (
                <Card
                  key={example.id}
                  className="border-0 bg-card shadow-sm ring-border"
                >
                  <CardContent>
                    <p className="japanese-serif text-xl font-semibold">
                      {example.japanese}
                    </p>
                    <p className="reading-note mt-1">{example.reading}</p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {example.translation_zh_tw}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Link2 aria-hidden="true" className="size-5" /> 關聯詞彙
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {related.map((value) => (
                <Link
                  key={value.id}
                  href={`/vocabulary/${value.id}`}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold hover:bg-accent"
                >
                  {value.surface} · {value.meanings.core[0]}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

function InfoCard({
  title,
  values,
  empty,
}: {
  title: string;
  values: string[];
  empty: string;
}) {
  return (
    <Card className="border-0 bg-card shadow-sm ring-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BrainCircuit aria-hidden="true" className="size-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {values.length > 0 ? (
          <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
            {values.map((value) => (
              <li key={value}>• {value}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{empty}</p>
        )}
      </CardContent>
    </Card>
  );
}
