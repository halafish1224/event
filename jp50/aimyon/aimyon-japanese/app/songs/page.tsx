import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { ArrowRight, Headphones } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Card, CardContent } from '@/components/ui/card';
import { content } from '@/lib/content/data';

export const metadata: Metadata = {
  title: '五首核心歌曲',
  description:
    '以五首 AIMYON 歌曲作為日文語意、聆聽與跨語境檢索線索；不收錄完整歌詞。',
};
export default function SongsPage() {
  return (
    <main id="main-content" className="page-shell pb-12">
      <div className="content-shell">
        <PageIntro
          eyebrow="FIVE CORE SONGS"
          title="歌曲提供記憶入口，教材負責把能力練出來。"
          description="每首歌只整理作品資料、語意群與聆聽任務。核心教學句全部原創，不重製完整或大段歌詞。"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.songs.map((song, index) => (
            <Link key={song.id} href={`/songs/${song.id}`} className="group">
              <Card
                className={`h-full min-h-72 border-0 shadow-sm ring-0 transition group-hover:-translate-y-0.5 group-hover:shadow-md ${index === 0 ? 'bg-[oklch(0.9_0.1_83)]' : index === 1 ? 'bg-primary text-primary-foreground' : 'bg-card ring-1 ring-border'}`}
              >
                <CardContent className="flex h-full flex-col justify-between">
                  <div>
                    <span className="grid size-11 place-items-center rounded-2xl bg-white/20">
                      <Headphones aria-hidden="true" />
                    </span>
                    <p className="eyebrow mt-7 opacity-55">
                      {song.metadata.release_year ?? '—'} · AIMYON
                    </p>
                    <h2 className="japanese-serif mt-2 text-3xl font-bold">
                      {song.title_ja}
                    </h2>
                    <p className="mt-1 text-sm opacity-65">
                      {song.title_zh_tw}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {song.semantic_clusters.map((cluster) => (
                        <span
                          key={cluster}
                          className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold"
                        >
                          {cluster}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs font-semibold opacity-65">
                    <span>{song.listening_missions.length} 個聆聽任務</span>
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
