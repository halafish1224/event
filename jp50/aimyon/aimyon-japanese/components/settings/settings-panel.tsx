'use client';

import { useEffect, useState } from 'react';
import { Database, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReviewProfile } from '@/components/review/review-provider';
import {
  readLearningSettings,
  writeLearningSettings,
} from '@/lib/settings/repository';

export function SettingsPanel() {
  const { profile, resetProgress } = useReviewProfile();
  const [dailyGoal, setDailyGoal] = useState(15);
  const [confirmReset, setConfirmReset] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    queueMicrotask(() =>
      setDailyGoal(readLearningSettings(window.localStorage).dailyGoal),
    );
  }, []);
  const save = () => {
    writeLearningSettings(window.localStorage, {
      version: 1,
      dailyGoal: dailyGoal as 5 | 10 | 15,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };
  const reset = () => {
    resetProgress();
    setConfirmReset(false);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-0 bg-card shadow-sm ring-border">
        <CardHeader>
          <CardTitle>每日練習長度</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm leading-6 text-muted-foreground">
            這是介面偏好；實際佇列仍會依 Recovery Mode 與高價值項目動態縮減。
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[5, 10, 15].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={dailyGoal === value}
                onClick={() => setDailyGoal(value)}
                className={`rounded-xl border p-3 text-sm font-bold ${dailyGoal === value ? 'border-primary bg-secondary text-primary ring-2 ring-primary/15' : 'bg-background'}`}
              >
                {value} 題
              </button>
            ))}
          </div>
          <Button onClick={save} className="mt-4 w-full">
            {saved ? '已儲存在此裝置' : '儲存偏好'}
          </Button>
        </CardContent>
      </Card>
      <Card className="border-0 bg-primary text-primary-foreground shadow-sm ring-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <ShieldCheck aria-hidden="true" className="size-5" />
            本機優先與隱私
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-white/75">
            學習進度、錯誤標籤與設定保存在此瀏覽器的
            localStorage；目前不需要帳號，也不把答案送到外部資料庫。
          </p>
          <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs text-white/70">
            <Database aria-hidden="true" className="mb-2 size-4" />
            資料版本 1 · 已保存 {profile?.attempts.length ?? 0} 次完成作答
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 bg-rose-50 shadow-sm ring-rose-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-rose-950">
            <RotateCcw aria-hidden="true" className="size-5" />
            重設學習進度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-rose-900">
            這會刪除此瀏覽器內的複習紀錄、能力狀態與錯誤標籤；教材內容本身不受影響。
          </p>
          {confirmReset ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="destructive" onClick={reset}>
                確認刪除本機進度
              </Button>
              <Button variant="outline" onClick={() => setConfirmReset(false)}>
                取消
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="mt-4 border-rose-300 text-rose-900"
              onClick={() => setConfirmReset(true)}
            >
              我要重設
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
