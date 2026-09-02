import type { Metadata } from 'next';
import { ReviewSession } from '@/components/review/review-session';

export const metadata: Metadata = {
  title: '今日複習',
  description:
    '依今日記憶風險、近期弱點、近義對比與主動產出缺口安排的自適應練習。',
  robots: { index: false, follow: false },
};

export default function DailyReviewPage() {
  return <ReviewSession />;
}
