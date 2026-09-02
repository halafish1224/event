import Link from '@/components/app-link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="page-shell grid min-h-[70vh] place-items-center pb-28 text-center"
    >
      <div>
        <p className="japanese-serif text-7xl font-bold text-primary/20">迷</p>
        <h1 className="mt-4 text-3xl font-bold">這一頁還沒出現在學習路徑裡</h1>
        <p className="mt-3 text-muted-foreground">
          回到 30 課總覽，從已整理好的課程繼續。
        </p>
        <Link href="/learn" className={cn(buttonVariants(), 'mt-6')}>
          回到課程
        </Link>
      </div>
    </main>
  );
}
