import { describe, expect, it } from 'vitest';
import {
  REVIEW_STORAGE_KEY,
  createEmptyReviewProfile,
  loadReviewProfile,
  resetReviewProfile,
  saveReviewProfile,
  type StorageLike,
} from '@/lib/review';

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
  removeItem(key: string) {
    this.values.delete(key);
  }
}

describe('本機進度儲存庫', () => {
  const now = new Date('2026-09-02T02:00:00.000Z');

  it('以版本化 key 保存並讀回狀態', () => {
    const storage = new MemoryStorage();
    const profile = createEmptyReviewProfile(now);
    saveReviewProfile(storage, profile);
    expect(loadReviewProfile(storage, now)).toEqual(profile);
    resetReviewProfile(storage);
    expect(storage.getItem(REVIEW_STORAGE_KEY)).toBeNull();
  });

  it('損壞或未知版本資料會安全回到空白狀態', () => {
    const storage = new MemoryStorage();
    storage.setItem(REVIEW_STORAGE_KEY, '{broken');
    expect(loadReviewProfile(storage, now).version).toBe(1);
    storage.setItem(REVIEW_STORAGE_KEY, JSON.stringify({ version: 99 }));
    expect(loadReviewProfile(storage, now).attempts).toEqual([]);
  });
});
