import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProgressDashboard } from '@/components/progress/progress-dashboard';

export const metadata: Metadata = {
  title: '學習進度',
  description: '依跨日穩定、語境彈性與主動產出證據追蹤各個日文能力維度。',
  robots: { index: false, follow: false },
};
export default function ProgressPage() {
  return (
    <main id="main-content" className="page-shell pb-12">
      <div className="content-shell">
        <PageIntro
          eyebrow="LEARNING EVIDENCE"
          title="看見能力怎麼變穩，而不只是一個總分。"
          description="讀音、意思、形態、對比與產出各自保留學習證據；同一個詞可能閱讀穩定，造句仍在發展。"
        />
        <ProgressDashboard />
      </div>
    </main>
  );
}
