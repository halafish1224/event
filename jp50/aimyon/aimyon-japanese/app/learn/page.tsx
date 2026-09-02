import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { ArrowRight, CheckCircle2, CircleDashed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageIntro } from '@/components/page-intro';
import { content } from '@/lib/content/data';

export const metadata: Metadata = {
  title: '30 課學習路徑',
  description: '依語意、形態、對比與產出循序前進的 6 單元 30 課日文學習路徑。',
};

const units = Array.from(
  content.lessons.reduce((map, lesson) => {
    const current = map.get(lesson.unit_id) ?? {
      id: lesson.unit_id,
      title: lesson.unit_title,
      lessons: [],
    };
    current.lessons.push(lesson);
    map.set(lesson.unit_id, current);
    return map;
  }, new Map<string, { id: string; title: string; lessons: typeof content.lessons }>()),
).map(([, unit]) => unit);

export default function LearnPage() {
  return (
    <main id="main-content" className="page-shell pb-28">
      <div className="content-shell">
        <PageIntro
          eyebrow="6 UNITS · 30 LESSONS"
          title="不是照表背誦，而是一路練到能選、能說。"
          description="每課先建立一個可理解的概念，再透過檢索、形態變化、近義對比與原創產出反覆取用。歌曲只作為語意與聆聽線索，不重製完整歌詞。"
        />

        <div className="grid gap-8">
          {units.map((unit, unitIndex) => (
            <section key={unit.id} aria-labelledby={`${unit.id}-title`}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-sm font-black tabular-nums text-primary">
                  0{unitIndex + 1}
                </span>
                <h2
                  id={`${unit.id}-title`}
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  {unit.title}
                </h2>
              </div>
              <div className="grid gap-2 lg:grid-cols-5">
                {unit.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/learn/${lesson.id}`}
                    className="group rounded-2xl focus-visible:outline-offset-3"
                  >
                    <Card className="h-full border-0 bg-card/85 py-0 shadow-sm ring-border transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md">
                      <CardContent className="flex h-full min-h-36 flex-col justify-between gap-5 p-4">
                        <div>
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <span className="text-xs font-bold tabular-nums text-muted-foreground">
                              LESSON {String(lesson.order).padStart(2, '0')}
                            </span>
                            {lesson.status === 'seeded' ? (
                              <CheckCircle2
                                aria-label="已有完整教材"
                                className="size-4 text-emerald-700"
                              />
                            ) : (
                              <CircleDashed
                                aria-label="課程綱要"
                                className="size-4 text-muted-foreground"
                              />
                            )}
                          </div>
                          <h3 className="font-bold leading-snug group-hover:text-primary">
                            {lesson.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {lesson.status === 'seeded'
                              ? '可完整學習'
                              : '課程綱要'}
                          </Badge>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
