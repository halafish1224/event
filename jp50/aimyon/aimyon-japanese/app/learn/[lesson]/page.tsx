import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  MessageSquareText,
  Music2,
  Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { content, contentMaps } from '@/lib/content/data';
import { cn } from '@/lib/utils';

interface LessonPageProps {
  params: Promise<{ lesson: string }>;
}

export function generateStaticParams() {
  return content.lessons.map((lesson) => ({ lesson: lesson.id }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { lesson: lessonId } = await params;
  const lesson = contentMaps.lessons.get(lessonId);
  return lesson
    ? {
        title: `Lesson ${String(lesson.order).padStart(2, '0')} · ${lesson.title}`,
        description: lesson.objective,
      }
    : { title: '找不到課程' };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lesson: lessonId } = await params;
  const lesson = contentMaps.lessons.get(lessonId);
  if (!lesson) notFound();

  const vocabulary = lesson.vocabulary_ids.flatMap((id) => {
    const item = contentMaps.vocabulary.get(id);
    return item ? [item] : [];
  });
  const grammar = lesson.grammar_ids.flatMap((id) => {
    const item = contentMaps.grammar.get(id);
    return item ? [item] : [];
  });
  const contrasts = lesson.contrast_ids.flatMap((id) => {
    const item = contentMaps.contrasts.get(id);
    return item ? [item] : [];
  });
  const examples = lesson.example_sentence_ids.flatMap((id) => {
    const item = contentMaps.examples.get(id);
    return item ? [item] : [];
  });
  const songs = lesson.song_ids.flatMap((id) => {
    const item = contentMaps.songs.get(id);
    return item ? [item] : [];
  });
  const previous = contentMaps.lessons.get(
    `lesson_${String(lesson.order - 1).padStart(2, '0')}`,
  );
  const next = contentMaps.lessons.get(
    `lesson_${String(lesson.order + 1).padStart(2, '0')}`,
  );

  return (
    <main id="main-content" className="page-shell pb-28">
      <article className="content-shell max-w-5xl">
        <Link
          href="/learn"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> 全部 30 課
        </Link>

        <header className="mb-8 grid gap-4 rounded-3xl bg-[oklch(0.92_0.065_86)] p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>UNIT {lesson.unit_id.slice(-2)}</Badge>
            <Badge variant="secondary">
              LESSON {String(lesson.order).padStart(2, '0')}
            </Badge>
            <Badge variant="outline">
              {lesson.status === 'seeded' ? '完整教材' : '課程綱要'}
            </Badge>
          </div>
          <h1 className="max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[oklch(0.34_0.035_145)] sm:text-lg">
            {lesson.objective}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <LearningPrompt
            icon={<Target aria-hidden="true" />}
            label="核心概念"
            text={lesson.core_concept}
          />
          <LearningPrompt
            icon={<BrainCircuit aria-hidden="true" />}
            label="先不看答案，試著追回來"
            text={lesson.retrieval_prompt}
          />
        </div>

        {vocabulary.length > 0 && (
          <LessonSection
            title="本課詞彙"
            description="點進詞彙頁可查看讀音、搭配、粒度拆分與活用。"
          >
            <div className="data-grid">
              {vocabulary.map((item) => (
                <Link
                  key={item.id}
                  href={`/vocabulary/${item.id}`}
                  className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border hover:ring-primary/40"
                >
                  <span className="japanese-serif text-3xl font-bold">
                    {item.surface}
                  </span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    {item.reading_hiragana}
                  </span>
                  <p className="mt-3 text-sm leading-6">
                    {item.meanings.core.join('；')}
                  </p>
                </Link>
              ))}
            </div>
          </LessonSection>
        )}

        {grammar.length > 0 && (
          <LessonSection
            title="文法骨架"
            description="先理解連接規則，再把句意放進去。"
          >
            <div className="grid gap-3">
              {grammar.map((item) => (
                <Link
                  key={item.id}
                  href={`/grammar/${item.id}`}
                  className="grid gap-2 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border sm:grid-cols-[13rem_1fr]"
                >
                  <strong className="text-xl">{item.title}</strong>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {item.meaning_core}
                  </span>
                </Link>
              ))}
            </div>
          </LessonSection>
        )}

        {contrasts.length > 0 && (
          <LessonSection
            title="Contrast Lab"
            description="中文相近，不代表日文能在同一個語境互換。"
          >
            {contrasts.map((contrast) => (
              <Link
                key={contrast.id}
                href={`/contrasts/${contrast.id}`}
                className="block rounded-2xl bg-[oklch(0.26_0.05_148)] p-6 text-white shadow-sm"
              >
                <p className="eyebrow text-white/60">DECISION PRACTICE</p>
                <h3 className="mt-2 text-2xl font-bold">{contrast.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  {contrast.core_question}
                </p>
              </Link>
            ))}
          </LessonSection>
        )}

        {examples.length > 0 && (
          <LessonSection
            title="原創例句"
            description="每句都是教學用原創內容，不重製歌曲歌詞。"
          >
            <div className="grid gap-3">
              {examples.map((example) => (
                <Card
                  key={example.id}
                  className="border-0 bg-card py-0 shadow-sm ring-border"
                >
                  <CardContent className="p-5">
                    <p className="japanese-serif text-xl font-semibold leading-8">
                      {example.japanese}
                    </p>
                    <p className="reading-note mt-1">{example.reading}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {example.translation_zh_tw}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </LessonSection>
        )}

        {songs.length > 0 && (
          <LessonSection
            title="歌曲語意線索"
            description="聆聽任務聚焦辨識概念與語境，不提供完整歌詞。"
          >
            <div className="flex flex-wrap gap-2">
              {songs.map((song) => (
                <Link
                  key={song.id}
                  href={`/songs/${song.id}`}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'bg-card',
                  )}
                >
                  <Music2 aria-hidden="true" /> {song.title_ja}
                </Link>
              ))}
            </div>
          </LessonSection>
        )}

        <section className="mt-10 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="eyebrow text-primary-foreground/60">
                OUTPUT CHALLENGE
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                現在把概念變成自己的句子
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-foreground/75">
                {lesson.generation_prompt}
              </p>
            </div>
            <Link
              href="/review/daily"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'shrink-0',
              )}
            >
              進入複習 <MessageSquareText aria-hidden="true" />
            </Link>
          </div>
        </section>

        <nav aria-label="相鄰課程" className="mt-8 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/learn/${previous.id}`}
              className="rounded-2xl bg-card p-4 text-sm ring-1 ring-border hover:ring-primary/40"
            >
              <span className="text-muted-foreground">上一課</span>
              <strong className="mt-1 block">← {previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/learn/${next.id}`}
              className="rounded-2xl bg-card p-4 text-right text-sm ring-1 ring-border hover:ring-primary/40"
            >
              <span className="text-muted-foreground">下一課</span>
              <strong className="mt-1 flex items-center justify-end gap-2">
                {next.title}{' '}
                <ArrowRight aria-hidden="true" className="size-4" />
              </strong>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}

function LearningPrompt({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) {
  return (
    <Card className="border-0 bg-card shadow-sm ring-border">
      <CardHeader>
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
          {icon}
        </span>
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-base font-semibold leading-7">
        {text}
      </CardContent>
    </Card>
  );
}

function LessonSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mb-4 mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {children}
    </section>
  );
}
