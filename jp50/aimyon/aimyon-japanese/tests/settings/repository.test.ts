import { describe, expect, it } from 'vitest';
import {
  SETTINGS_STORAGE_KEY,
  defaultLearningSettings,
  readLearningSettings,
  writeLearningSettings,
} from '@/lib/settings/repository';

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe('學習設定儲存庫', () => {
  it('以版本化 key 保存並讀回每日題數', () => {
    const storage = new MemoryStorage();
    writeLearningSettings(storage, { version: 1, dailyGoal: 10 });

    expect(readLearningSettings(storage)).toEqual({
      version: 1,
      dailyGoal: 10,
    });
    expect(storage.getItem(SETTINGS_STORAGE_KEY)).toContain('"version":1');
  });

  it.each([
    ['空白資料', null],
    ['損壞 JSON', '{broken'],
    ['未知版本', JSON.stringify({ version: 2, dailyGoal: 10 })],
    ['無效題數', JSON.stringify({ version: 1, dailyGoal: 20 })],
  ])('%s 會安全回到預設設定', (_label, raw) => {
    const storage = new MemoryStorage();
    if (raw !== null) storage.setItem(SETTINGS_STORAGE_KEY, raw);

    expect(readLearningSettings(storage)).toEqual(defaultLearningSettings);
  });
});
