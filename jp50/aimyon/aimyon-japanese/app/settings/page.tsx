import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { SettingsPanel } from '@/components/settings/settings-panel';

export const metadata: Metadata = {
  title: '設定',
  description: '調整本機日文學習偏好與管理此裝置上的複習進度。',
  robots: { index: false, follow: false },
};
export default function SettingsPage() {
  return (
    <main id="main-content" className="page-shell pb-12">
      <div className="content-shell max-w-4xl">
        <PageIntro
          eyebrow="LOCAL-FIRST SETTINGS"
          title="進度留在這台裝置，由你控制。"
          description="AIMYON Japanese 的 MVP 採本機優先，不要求登入；你可以調整練習長度或清除本機紀錄。"
        />
        <SettingsPanel />
      </div>
    </main>
  );
}
