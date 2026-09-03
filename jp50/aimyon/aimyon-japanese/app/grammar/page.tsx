import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { ArrowRight } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { content } from '@/lib/content/data';

export const metadata: Metadata = {
  title: '文法網絡',
  description: '以先備關係、構形規則、語意功能與錯誤標籤組織的日文文法教材。',
};

export default function GrammarPage() {
  return (
    <main id="main-content" className="page-shell pb-12">
      <div className="content-shell">
        <PageIntro
          eyebrow="GRAMMAR NETWORK"
          title="文法不是孤立句型，而是一條可追回的形成路徑。"
          description="當組合句型答錯，系統會沿先備關係回到真正斷裂的位置，例如先修正聞く的て形，再回到～てほしい。"
        />
        <div className="data-grid">
          {content.grammar.map((grammar) => (
            <Link
              key={grammar.id}
              href={`/grammar/${grammar.id}`}
              className="group"
            >
              <Card className="h-full border-0 bg-card shadow-sm ring-border transition group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary/40">
                <CardContent className="flex h-full min-h-56 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant="secondary">{grammar.level}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {grammar.category}
                      </span>
                    </div>
                    <h2 className="mt-5 text-2xl font-bold">{grammar.title}</h2>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {grammar.surface_pattern}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {grammar.meaning_core}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{grammar.prerequisites.length} 個先備節點</span>
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
