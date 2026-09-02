import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, X } from 'lucide-react';
import { ContrastPractice } from '@/components/contrasts/contrast-practice';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { content, contentMaps } from '@/lib/content/data';

interface ContrastDetailProps {
  params: Promise<{ id: string }>;
}
export function generateStaticParams() {
  return content.contrasts.map((item) => ({ id: item.id }));
}
export async function generateMetadata({
  params,
}: ContrastDetailProps): Promise<Metadata> {
  const { id } = await params;
  const item = contentMaps.contrasts.get(id);
  return item
    ? { title: item.title, description: item.core_question }
    : { title: '找不到對比組' };
}
export default async function ContrastDetailPage({
  params,
}: ContrastDetailProps) {
  const { id } = await params;
  const item = contentMaps.contrasts.get(id);
  if (!item) notFound();
  const practiceQuestion = item.question_template_ids.find(
    (questionId) => contentMaps.questions.get(questionId)?.options.length,
  );
  return (
    <main id="main-content" className="page-shell pb-28">
      <article className="content-shell max-w-5xl">
        <Link
          href="/contrasts"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Contrast Lab
        </Link>
        <header className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-9">
          <Badge variant="secondary">{item.category}</Badge>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
            {item.core_question}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.semantic_dimensions.map((dimension) => (
              <span
                key={dimension}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
              >
                {dimension}
              </span>
            ))}
          </div>
        </header>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">語境決策規則</h2>
          <div className="mt-4 grid gap-3">
            {item.decision_rules.map((rule) => {
              const target = contentMaps.vocabulary.get(
                rule.choose.split(':form:')[0],
              );
              return (
                <Card
                  key={`${rule.when}-${rule.choose}`}
                  className="border-0 bg-card shadow-sm ring-border"
                >
                  <CardContent className="grid gap-3 sm:grid-cols-[1fr_auto_1.2fr] sm:items-center">
                    <p className="text-sm leading-6">{rule.when}</p>
                    <span className="rounded-xl bg-secondary px-4 py-2 text-center font-bold text-primary">
                      選 {target?.surface ?? rule.choose}
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {rule.because}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-bold">最小對比</h2>
          <div className="mt-4 grid gap-4">
            {item.minimal_pairs.map((pair) => (
              <Card
                key={pair.context}
                className="border-0 bg-card shadow-sm ring-border"
              >
                <CardContent>
                  <p className="text-xs font-bold text-muted-foreground">
                    情境：{pair.context}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <p className="japanese-serif rounded-xl bg-emerald-50 p-4 text-lg font-semibold text-emerald-950">
                      <Check aria-hidden="true" className="mb-2 size-4" />
                      {pair.left}
                    </p>
                    <p className="japanese-serif rounded-xl bg-sky-50 p-4 text-lg font-semibold text-sky-950">
                      <Check aria-hidden="true" className="mb-2 size-4" />
                      {pair.right}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {pair.explanation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <Card className="border-0 bg-rose-50 shadow-sm ring-rose-200">
            <CardContent>
              <h2 className="flex items-center gap-2 font-bold text-rose-950">
                <X aria-hidden="true" className="size-5" />
                常見錯誤
              </h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-rose-900">
                {item.common_errors.map((error) => (
                  <li key={error}>• {error}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 bg-[oklch(0.92_0.065_86)] shadow-sm ring-0">
            <CardContent>
              <p className="eyebrow text-muted-foreground">MEMORY HOOK</p>
              <p className="mt-3 text-lg font-bold leading-7">
                {item.memory_hook}
              </p>
            </CardContent>
          </Card>
        </section>
        {practiceQuestion && (
          <section className="mt-10">
            <ContrastPractice questionId={practiceQuestion} />
          </section>
        )}
      </article>
    </main>
  );
}
