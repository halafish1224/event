import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpenText, Headphones, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { content, contentMaps } from '@/lib/content/data';

interface SongDetailProps {
  params: Promise<{ id: string }>;
}
export function generateStaticParams() {
  return content.songs.map((song) => ({ id: song.id }));
}
export async function generateMetadata({
  params,
}: SongDetailProps): Promise<Metadata> {
  const { id } = await params;
  const song = contentMaps.songs.get(id);
  return song
    ? {
        title: song.title_ja,
        description: `${song.title_ja} 的日文語意與聆聽學習任務。`,
      }
    : { title: '找不到歌曲' };
}
export default async function SongDetailPage({ params }: SongDetailProps) {
  const { id } = await params;
  const song = contentMaps.songs.get(id);
  if (!song) notFound();
  const vocabulary = song.vocabulary_ids.flatMap((ref) => {
    const value = contentMaps.vocabulary.get(ref);
    return value ? [value] : [];
  });
  const grammar = song.grammar_ids.flatMap((ref) => {
    const value = contentMaps.grammar.get(ref);
    return value ? [value] : [];
  });
  return (
    <main id="main-content" className="page-shell pb-28">
      <article className="content-shell max-w-5xl">
        <Link
          href="/songs"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          五首核心歌曲
        </Link>
        <header className="rounded-3xl bg-[oklch(0.9_0.1_83)] p-6 sm:p-10">
          <p className="eyebrow text-muted-foreground">
            {song.metadata.release_year ?? 'RELEASE YEAR UNKNOWN'} · あいみょん
          </p>
          <h1 className="japanese-serif mt-4 text-5xl font-black tracking-tight sm:text-7xl">
            {song.title_ja}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {song.title_zh_tw}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {song.semantic_clusters.map((cluster) => (
              <Badge key={cluster} variant="secondary">
                {cluster}
              </Badge>
            ))}
          </div>
        </header>
        <section className="mt-8 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <Card className="border-0 bg-card shadow-sm ring-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones
                  aria-hidden="true"
                  className="size-5 text-primary"
                />
                聆聽任務
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-4">
                {song.listening_missions.map((mission, index) => (
                  <li
                    key={mission}
                    className="grid grid-cols-[2.2rem_1fr] gap-3 text-sm leading-6"
                  >
                    <span className="grid size-8 place-items-center rounded-xl bg-secondary text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>{mission}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card className="border-0 bg-primary text-primary-foreground shadow-sm ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ShieldCheck aria-hidden="true" className="size-5" />
                著作權邊界
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-white/75">
                {song.metadata.copyright_note}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/75">
                本頁只提供語意觀察與原創學習任務；聆聽請使用合法音樂服務。
              </p>
            </CardContent>
          </Card>
        </section>
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <BookOpenText aria-hidden="true" className="size-5 text-primary" />
            跨語境檢索節點
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            先回想歌中情境的語意功能，再用下列教材節點重新組成原創句。
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {vocabulary.map((item) => (
              <Link
                key={item.id}
                href={`/vocabulary/${item.id}`}
                className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border hover:ring-primary/40"
              >
                <strong className="japanese-serif text-xl">
                  {item.surface}
                </strong>
                <span className="ml-2 text-xs text-muted-foreground">
                  {item.reading_hiragana}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.meanings.core.join('；')}
                </p>
              </Link>
            ))}
            {grammar.map((item) => (
              <Link
                key={item.id}
                href={`/grammar/${item.id}`}
                className="rounded-2xl bg-secondary p-4 shadow-sm hover:bg-accent"
              >
                <strong className="text-xl">{item.title}</strong>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.meaning_core}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
