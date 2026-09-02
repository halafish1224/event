'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { LearningObject } from '@/types/content';
import type { ReviewAttempt, ReviewProfile } from '@/types/review';
import {
  applyReviewAttempt,
  loadReviewProfile,
  resetReviewProfile as resetStoredProfile,
  saveReviewProfile,
} from '@/lib/review';

interface ReviewContextValue {
  profile: ReviewProfile | null;
  ready: boolean;
  recordAttempt: (object: LearningObject, attempt: ReviewAttempt) => void;
  resetProgress: () => void;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ReviewProfile | null>(null);

  useEffect(() => {
    queueMicrotask(() =>
      setProfile(loadReviewProfile(window.localStorage, new Date())),
    );
  }, []);

  const recordAttempt = useCallback(
    (object: LearningObject, attempt: ReviewAttempt) => {
      setProfile((current) => {
        if (!current) return current;
        const next = applyReviewAttempt(
          current,
          object,
          attempt,
          new Date(attempt.answeredAt),
        );
        saveReviewProfile(window.localStorage, next);
        return next;
      });
    },
    [],
  );

  const resetProgress = useCallback(() => {
    resetStoredProfile(window.localStorage);
    setProfile(loadReviewProfile(window.localStorage, new Date()));
  }, []);

  const value = useMemo(
    () => ({ profile, ready: profile !== null, recordAttempt, resetProgress }),
    [profile, recordAttempt, resetProgress],
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReviewProfile() {
  const context = useContext(ReviewContext);
  if (!context)
    throw new Error('useReviewProfile 必須在 ReviewProvider 內使用。');
  return context;
}
