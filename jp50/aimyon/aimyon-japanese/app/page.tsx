import Link from '@/components/app-link';
import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  CircleAlert,
  Languages,
  Sparkles,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const reviewPools = [
  { label: '快忘記', value: 3, tone: 'bg-amber-100 text-amber-950' },
  { label: '近期弱點', value: 4, tone: 'bg-rose-100 text-rose-950' },
  { label: 'Contrast', value: 3, tone: 'bg-emerald-100 text-emerald-950' },
  { label: '造句', value: 2, tone: 'bg-sky-100 text-sky-950' },
];

export default function Home() {
  const today = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date())
    .replaceAll('/', '.');

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AIMYON Japanese',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Web',
            inLanguage: ['zh-Hant', 'ja'],
            description:
              '以檢索練習、語意對比、形態生成與自適應複習建立日文理解和主動產出能力。',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
          }),
        }}
      />
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-8 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)] lg:px-8 lg:pt-10">
        <Card className="review-card relative min-h-[430px] justify-between border-0 py-0 text-[oklch(0.24_0.045_148)] ring-0">
          <CardHeader className="relative z-10 gap-4 px-6 pt-7 sm:px-9 sm:pt-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">今日複習 · 15 分鐘</p>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[oklch(0.35_0.04_148)]">
                {today}
              </span>
            </div>
            <div className="max-w-xl">
              <CardTitle className="text-balance text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
                今天把「看得到」
                <br />
                說得更準確。
              </CardTitle>
              <CardDescription className="mt-4 max-w-lg text-base leading-7 text-[oklch(0.32_0.035_148)] sm:text-lg">
                系統會依記憶風險、最近錯誤與造句缺口，安排真正需要的下一題。
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 grid gap-5 px-6 pb-7 sm:px-9 sm:pb-9">
            <div
              id="today-plan"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {reviewPools.map((pool) => (
                <div
                  key={pool.label}
                  className={cn('rounded-2xl px-4 py-3', pool.tone)}
                >
                  <strong className="block text-2xl tabular-nums">
                    {pool.value}
                  </strong>
                  <span className="text-xs font-semibold tracking-wide">
                    {pool.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/review/daily"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 w-full justify-between rounded-xl bg-[oklch(0.28_0.06_148)] px-5 text-base hover:bg-[oklch(0.34_0.06_148)] sm:w-fit sm:min-w-64',
              )}
            >
              開始今日複習
              <ArrowRight aria-hidden="true" />
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Card className="border-0 bg-card/92 shadow-sm ring-[oklch(0.83_0.025_88)]">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[oklch(0.92_0.04_88)] text-[oklch(0.43_0.08_67)]">
                <BookOpenText aria-hidden="true" />
              </div>
              <p className="eyebrow text-muted-foreground">繼續學習</p>
              <CardTitle className="text-xl font-bold">
                Lesson 03 · 看與看得見
              </CardTitle>
              <CardDescription className="leading-6">
                見る／見える／見られる／見つめる
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/learn/lesson_03"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-10 w-full justify-between',
                )}
              >
                回到上次進度
                <ArrowRight aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 bg-[oklch(0.25_0.045_148)] text-white ring-0">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white/12 text-[oklch(0.88_0.12_88)]">
                <BrainCircuit aria-hidden="true" />
              </div>
              <p className="eyebrow text-white/65">本週正在變穩</p>
              <CardTitle className="text-xl font-bold text-white">
                讀音 → 造句
              </CardTitle>
              <CardDescription className="leading-6 text-white/70">
                讀音已穩定，今天會少一點辨認、多一點主動產出。
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section
        aria-labelledby="learning-pulse"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-muted-foreground">Learning pulse</p>
            <h2
              id="learning-pulse"
              className="mt-1 text-2xl font-bold tracking-tight"
            >
              系統今天為什麼這樣安排
            </h2>
          </div>
          <Link
            href="/progress"
            className="hidden text-sm font-semibold text-primary underline-offset-4 hover:underline sm:block"
          >
            查看完整進度
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <InsightCard
            icon={<CircleAlert aria-hidden="true" />}
            title="Contrast 需要修補"
            body="最近兩次把「自然看得到」選成了「有條件能看」。"
          />
          <InsightCard
            icon={<Languages aria-hidden="true" />}
            title="五段て形是根因"
            body="先修復 聞く → 聞いて，再回到 ～てほしい。"
          />
          <InsightCard
            icon={<Sparkles aria-hidden="true" />}
            title="產出仍在發展"
            body="今天保留兩題造句，不用辨認題把弱點藏起來。"
          />
        </div>
      </section>

      <section
        className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="explore-title"
      >
        <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
          <p className="eyebrow text-muted-foreground">EXPLORE THE SYSTEM</p>
          <h2 id="explore-title" className="mt-1 text-2xl font-bold">
            需要查清楚時，直接進入教材網絡
          </h2>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['/vocabulary', '核心詞彙', '30 名詞與核心詞類'],
              ['/verbs', '動詞活用', '完整 17 形'],
              ['/adjectives', '形容詞', 'い／ナ／いい'],
              ['/grammar', '文法網絡', '先備與形成規則'],
              ['/songs', '五首歌曲', '語意與聆聽任務'],
            ].map(([href, label, note]) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl bg-secondary/70 p-4 hover:bg-accent"
              >
                <strong className="block">{label}</strong>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {note}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-4 size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InsightCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card
      size="sm"
      className="border-0 bg-card/75 shadow-sm ring-[oklch(0.86_0.018_88)]"
    >
      <CardContent className="grid grid-cols-[auto_1fr] gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
          {icon}
        </span>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
