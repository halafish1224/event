import topicMap from './tae-kim-topics.json';

export function TaeKimLinks({ lessonId }: { lessonId?: string }) {
  const topics = lessonId
    ? (topicMap as Record<string, Array<{ id: string; title: string }>>)[lessonId]
    : undefined;
  if (lessonId && !topics?.length) return null;

  return (
    <aside className="mb-8 rounded-2xl bg-card p-5 ring-1 ring-border" aria-label="Tae Kim 對照速學">
      <h2 className="text-lg font-bold">先用一句話抓住概念</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Tae Kim 對照速學：短例句 → 回想 → 回到本課練習。
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {topics ? topics.map((topic) => (
          <a key={topic.id} href={`https://event.itigre.com/jp50/tae-kim/#${topic.id}`}
            className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-offset-4">
            {topic.title} →
          </a>
        )) : (
          <a href="https://event.itigre.com/jp50/tae-kim/"
            className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-offset-4">
            開啟基礎速學卡 →
          </a>
        )}
      </div>
    </aside>
  );
}
