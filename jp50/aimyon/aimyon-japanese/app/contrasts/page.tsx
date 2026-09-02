import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { ArrowRight } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { content } from '@/lib/content/data';

export const metadata: Metadata = {
  title: 'Contrast Lab',
  description: '以語境決策規則、最小對比與錯誤修復分清日文近義詞與相似文法。',
};
export default function ContrastsPage() {
  return (
    <main id="main-content" className="page-shell pb-28">
      <div className="content-shell">
        <PageIntro
          eyebrow="CONTRAST LAB"
          title="不是問「哪個都能翻成中文」，而是問此刻該選哪一個。"
          description="每組對比拆成主動性、自然感知、條件、時間方向、觸感等決策維度；先做語境選擇，再練解釋與產出。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {content.contrasts.map((contrast, index) => (
            <Link
              key={contrast.id}
              href={`/contrasts/${contrast.id}`}
              className="group"
            >
              <Card className={cnContrast(index)}>
                <CardContent className="flex h-full min-h-64 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <Badge variant="secondary">{contrast.category}</Badge>
                      <span className="text-xs font-black tabular-nums opacity-50">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold">
                      {contrast.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 opacity-70">
                      {contrast.core_question}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                    <span>
                      {contrast.semantic_dimensions.length} 個判斷維度
                    </span>
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
      </div>
    </main>
  );
}
function cnContrast(index: number) {
  return `h-full border-0 shadow-sm ring-0 transition group-hover:-translate-y-0.5 group-hover:shadow-md ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-card ring-1 ring-border'}`;
}
