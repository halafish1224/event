import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  GitBranch,
  Layers3,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { content, contentMaps } from '@/lib/content/data';

interface GrammarDetailProps {
  params: Promise<{ id: string }>;
}
export function generateStaticParams() {
  return content.grammar.map((item) => ({ id: item.id }));
}
export async function generateMetadata({
  params,
}: GrammarDetailProps): Promise<Metadata> {
  const { id } = await params;
  const item = contentMaps.grammar.get(id);
  return item
    ? { title: item.title, description: item.meaning_core }
    : { title: '找不到文法' };
}

export default async function GrammarDetailPage({
  params,
}: GrammarDetailProps) {
  const { id } = await params;
  const item = contentMaps.grammar.get(id);
  if (!item) notFound();
  const prerequisites = item.prerequisites.flatMap((ref) => {
    const value = contentMaps.grammar.get(ref);
    return value ? [value] : [];
  });
  const examples = item.example_sentence_ids.flatMap((ref) => {
    const value = contentMaps.examples.get(ref);
    return value ? [value] : [];
  });
  const lessons = item.lesson_ids.flatMap((ref) => {
    const value = contentMaps.lessons.get(ref);
    return value ? [value] : [];
  });
  return (
    <main id="main-content" className="page-shell pb-28">
      <article className="content-shell max-w-5xl">
        <Link
          href="/grammar"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          文法網絡
        </Link>
        <header className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-9">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{item.level}</Badge>
            <Badge className="bg-white/10 text-white">{item.category}</Badge>
          </div>
          <p className="mt-6 text-sm font-bold text-white/60">
            {item.surface_pattern}
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
            {item.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
            {item.meaning_core}
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <Card className="border-0 bg-card shadow-sm ring-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers3 aria-hidden="true" className="size-5 text-primary" />
                形成規則
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-3">
                {item.formation_rules.map((rule, index) => (
                  <li
                    key={rule}
                    className="grid grid-cols-[2rem_1fr] gap-2 text-sm leading-6"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-secondary text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card className="border-0 bg-card shadow-sm ring-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch aria-hidden="true" className="size-5 text-primary" />
                先備關係
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prerequisites.length > 0 ? (
                <div className="grid gap-2">
                  {prerequisites.map((prerequisite) => (
                    <Link
                      key={prerequisite.id}
                      href={`/grammar/${prerequisite.id}`}
                      className="rounded-xl bg-secondary p-3 text-sm font-bold hover:bg-accent"
                    >
                      {prerequisite.title} →
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  這是基礎節點，可直接開始。
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="border-0 bg-card shadow-sm ring-border">
            <CardHeader>
              <CardTitle>語意功能</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.semantic_functions.map((value) => (
                  <Badge key={value} variant="secondary">
                    {value}
                  </Badge>
                ))}
              </div>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
                {item.usage_notes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 bg-rose-50 shadow-sm ring-rose-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-950">
                <CircleAlert aria-hidden="true" className="size-5" />
                容易出錯的位置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.common_error_tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-rose-300 bg-white/60 text-rose-900"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {examples.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">原創例句</h2>
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
        {lessons.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold">出現在哪些課</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/learn/${lesson.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold hover:bg-accent"
                >
                  Lesson {String(lesson.order).padStart(2, '0')} ·{' '}
                  {lesson.title}
                  <ArrowRight aria-hidden="true" className="size-3" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
