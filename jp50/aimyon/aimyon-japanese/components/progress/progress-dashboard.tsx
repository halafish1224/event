'use client';

import Link from '@/components/app-link';
import {
  BarChart3,
  BrainCircuit,
  CircleAlert,
  Sprout,
  Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { content, contentMaps } from '@/lib/content/data';
import { getMasteryState } from '@/lib/review';
import type { MasteryState } from '@/types/review';
import { useReviewProfile } from '@/components/review/review-provider';

const masteryLabels: Record<MasteryState, string> = {
  learning: '正在建立',
  developing: '逐漸發展',
  stable: '跨日穩定',
  flexible: '能換語境',
  productive: '能主動產出',
};
const masteryTone: Record<MasteryState, string> = {
  learning: 'bg-slate-100 text-slate-800',
  developing: 'bg-amber-100 text-amber-900',
  stable: 'bg-emerald-100 text-emerald-900',
  flexible: 'bg-sky-100 text-sky-900',
  productive: 'bg-violet-100 text-violet-900',
};

function targetLabel(targetId: string) {
  const baseId = targetId.split(':form:')[0];
  const vocab = contentMaps.vocabulary.get(baseId);
  if (vocab)
    return `${vocab.surface} · ${targetId.includes(':form:') ? targetId.split(':form:')[1] : vocab.reading_hiragana}`;
  return (
    contentMaps.grammar.get(targetId)?.title ??
    contentMaps.contrasts.get(targetId)?.title ??
    targetId
  );
}

export function ProgressDashboard() {
  const { profile, ready } = useReviewProfile();
  if (!ready || !profile)
    return (
      <div
        className="h-72 animate-pulse rounded-3xl bg-card ring-1 ring-border"
        aria-label="正在讀取本機進度"
      />
    );

  const reviewedObjects = content.learningObjects.filter(
    (object) => profile.progress[object.id]?.reviewCount > 0,
  );
  const states = reviewedObjects.map((object) =>
    getMasteryState(profile.progress[object.id]),
  );
  const stateCounts = states.reduce<Record<MasteryState, number>>(
    (counts, state) => ({ ...counts, [state]: counts[state] + 1 }),
    { learning: 0, developing: 0, stable: 0, flexible: 0, productive: 0 },
  );
  const errorCounts = profile.attempts
    .flatMap((attempt) => (attempt.correct ? [] : attempt.errorTags))
    .reduce<Record<string, number>>(
      (counts, tag) => ({ ...counts, [tag]: (counts[tag] ?? 0) + 1 }),
      {},
    );
  const topErrors = Object.entries(errorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const sessionDays = new Set(
    profile.attempts.map((attempt) => attempt.answeredAt.slice(0, 10)),
  ).size;

  if (profile.attempts.length === 0)
    return (
      <Card className="border-0 bg-[oklch(0.92_0.065_86)] shadow-lg ring-0">
        <CardContent className="grid min-h-72 place-items-center text-center">
          <div>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/60 text-primary">
              <Sprout aria-hidden="true" className="size-7" />
            </span>
            <h2 className="mt-5 text-2xl font-bold">
              第一個能力軌跡正等你建立
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              完成一輪複習後，這裡會依
              reading、meaning、morphology、contrast、production 分開顯示狀態。
            </p>
            <Link
              href="/review/daily"
              className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              開始今日複習
            </Link>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <div className="grid gap-8">
      <section className="grid gap-3 sm:grid-cols-3">
        <Metric
          icon={<BrainCircuit aria-hidden="true" />}
          label="已練能力維度"
          value={`${reviewedObjects.length}`}
          note={`共 ${content.learningObjects.length} 個種子節點`}
        />
        <Metric
          icon={<Target aria-hidden="true" />}
          label="完成作答"
          value={`${profile.attempts.length}`}
          note="提示內重試只計一次排程"
        />
        <Metric
          icon={<BarChart3 aria-hidden="true" />}
          label="跨日練習"
          value={`${sessionDays} 天`}
          note="穩定需要不同 spaced sessions"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold">能力狀態</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          不顯示虛假的小數 mastery；狀態由跨日、換語境與主動產出證據決定。
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {(Object.keys(masteryLabels) as MasteryState[]).map((state) => (
            <div
              key={state}
              className={`rounded-2xl p-4 ${masteryTone[state]}`}
            >
              <strong className="block text-3xl tabular-nums">
                {stateCounts[state]}
              </strong>
              <span className="mt-1 block text-xs font-bold">
                {masteryLabels[state]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
        <Card className="border-0 bg-card shadow-sm ring-border">
          <CardHeader>
            <CardTitle>逐能力維度</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {reviewedObjects.map((object) => {
              const progress = profile.progress[object.id];
              const state = getMasteryState(progress);
              return (
                <div
                  key={object.id}
                  className="grid gap-2 rounded-xl border border-border/70 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <div>
                    <p className="font-bold">{targetLabel(object.target_id)}</p>
                    <p className="text-xs text-muted-foreground">
                      {object.dimension} · 複習 {progress.reviewCount} 次
                    </p>
                  </div>
                  <Badge className={masteryTone[state]}>
                    {masteryLabels[state]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    下次{' '}
                    {new Intl.DateTimeFormat('zh-TW', {
                      month: 'numeric',
                      day: 'numeric',
                    }).format(new Date(progress.dueAt))}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="border-0 bg-rose-50 shadow-sm ring-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-950">
              <CircleAlert aria-hidden="true" className="size-5" />
              近期錯誤根因
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topErrors.length > 0 ? (
              <div className="grid gap-2">
                {topErrors.map(([tag, count]) => (
                  <div key={tag} className="rounded-xl bg-white/60 p-3">
                    <p className="break-all text-xs font-bold text-rose-950">
                      {tag}
                    </p>
                    <p className="mt-1 text-xs text-rose-800">
                      出現 {count} 次
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-rose-900">
                目前沒有已保存的錯誤標籤。
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="border-0 bg-card shadow-sm ring-border">
      <CardContent>
        <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
          {icon}
        </span>
        <p className="mt-5 text-xs font-bold text-muted-foreground">{label}</p>
        <strong className="mt-1 block text-3xl">{value}</strong>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}
