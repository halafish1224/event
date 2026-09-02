import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { ArrowRight, BrainCircuit, Clock3, Layers3, Zap } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: '自適應複習',
  description: '依記憶風險、弱點、近義對比與主動產出缺口組成今日複習佇列。',
};

const signals = [
  [
    '記憶風險',
    '每個 reading、meaning、morphology、contrast、production 維度各自排程。',
  ],
  ['錯誤根因', '不只記錄答錯，還保留五段音便、助詞與近義混淆等 error tags。'],
  ['產出缺口', '辨認很強但不會說時，系統會主動減少辨認題並增加造句。'],
  ['恢復節奏', '離開七天後以最多十題的高價值佇列回來，不傾倒全部 backlog。'],
];

export default function ReviewPage() {
  return (
    <main id="main-content" className="page-shell pb-28">
      <div className="content-shell">
        <PageIntro
          eyebrow="ADAPTIVE REVIEW"
          title="複習的是薄弱連結，不是清空紅色數字。"
          description="Language Pedagogy Orchestrator 先判斷今天該練哪一種能力，再交給記憶排程器決定時機。題目因此會隨你的錯誤、信心、提示使用與反應時間改變。"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-0 bg-[oklch(0.9_0.1_83)] shadow-lg ring-0">
            <CardHeader>
              <span className="grid size-11 place-items-center rounded-2xl bg-white/60 text-primary">
                <BrainCircuit aria-hidden="true" />
              </span>
              <CardTitle className="text-2xl">今日複習 · 約 15 分鐘</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-5 text-sm leading-6 text-[oklch(0.34_0.035_145)]">
                Due、Weak、Contrast、New、Output 五個 pool
                會依當下狀態動態補位。
              </p>
              <Link
                href="/review/daily"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'h-12 w-full justify-between sm:w-auto sm:min-w-60',
                )}
              >
                開始完整複習 <ArrowRight aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 bg-primary text-primary-foreground shadow-lg ring-0">
            <CardHeader>
              <span className="grid size-11 place-items-center rounded-2xl bg-white/10">
                <Zap aria-hidden="true" />
              </span>
              <CardTitle className="text-2xl text-white">
                Quick 5 · 約 5 分鐘
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-5 text-sm leading-6 text-white/70">
                時間有限時只取五個高價值項目，仍保留對比與產出，不降格成單純翻卡。
              </p>
              <Link
                href="/review/quick"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'lg' }),
                  'h-12 w-full justify-between sm:w-auto sm:min-w-60',
                )}
              >
                快速開始 <Clock3 aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <section className="mt-10" aria-labelledby="review-signals">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
              <Layers3 aria-hidden="true" />
            </span>
            <h2 id="review-signals" className="text-2xl font-bold">
              佇列如何形成
            </h2>
          </div>
          <div className="data-grid">
            {signals.map(([title, description], index) => (
              <Card
                key={title}
                className="border-0 bg-card shadow-sm ring-border"
              >
                <CardContent>
                  <span className="text-xs font-black tabular-nums text-primary/50">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
