import type { ReviewProfile } from '@/types/review';
import { createEmptyReviewProfile } from './scheduler';

export const REVIEW_STORAGE_KEY = 'aimyon-japanese:review:v1';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function isReviewProfile(value: unknown): value is ReviewProfile {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ReviewProfile>;
  return (
    candidate.version === 1 &&
    typeof candidate.startedAt === 'string' &&
    !!candidate.progress &&
    typeof candidate.progress === 'object' &&
    Array.isArray(candidate.attempts)
  );
}

export function loadReviewProfile(
  storage: StorageLike,
  now: Date,
): ReviewProfile {
  const raw = storage.getItem(REVIEW_STORAGE_KEY);
  if (!raw) return createEmptyReviewProfile(now);
  try {
    const parsed: unknown = JSON.parse(raw);
    return isReviewProfile(parsed) ? parsed : createEmptyReviewProfile(now);
  } catch {
    return createEmptyReviewProfile(now);
  }
}

export function saveReviewProfile(
  storage: StorageLike,
  profile: ReviewProfile,
) {
  storage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(profile));
}

export function resetReviewProfile(storage: StorageLike) {
  storage.removeItem(REVIEW_STORAGE_KEY);
}
