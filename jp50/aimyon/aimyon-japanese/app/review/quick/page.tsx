import type { Metadata } from 'next';
import { ReviewSession } from '@/components/review/review-session';

export const metadata: Metadata = {
  title: 'Quick 5 快速複習',
  description: '從今日高價值項目中精選五題的快速日文複習。',
  robots: { index: false, follow: false },
};

export default function QuickReviewPage() {
  return <ReviewSession limit={5} title="Quick 5" />;
}
