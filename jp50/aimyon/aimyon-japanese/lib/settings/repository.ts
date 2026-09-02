export const SETTINGS_STORAGE_KEY = 'aimyon-japanese:settings:v1';

export interface LearningSettings {
  version: 1;
  dailyGoal: 5 | 10 | 15;
}

export const defaultLearningSettings: LearningSettings = {
  version: 1,
  dailyGoal: 15,
};

export function readLearningSettings(
  storage: Pick<Storage, 'getItem'>,
): LearningSettings {
  try {
    const raw = storage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultLearningSettings;
    const parsed = JSON.parse(raw) as Partial<LearningSettings>;
    if (
      parsed.version === 1 &&
      (parsed.dailyGoal === 5 ||
        parsed.dailyGoal === 10 ||
        parsed.dailyGoal === 15)
    ) {
      return { version: 1, dailyGoal: parsed.dailyGoal };
    }
  } catch {
    // Corrupt preferences never block the learning flow.
  }
  return defaultLearningSettings;
}

export function writeLearningSettings(
  storage: Pick<Storage, 'setItem'>,
  settings: LearningSettings,
) {
  storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
