// src/hooks/useAutoSlide.ts
import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoSlide(length: number, delay = 5000, startPaused = false) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef<boolean>(startPaused);
  const delayRef = useRef<number>(delay);

  useEffect(() => { delayRef.current = delay; }, [delay]);

  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex(i => (i + 1) % length);
      }
    }, delayRef.current);
    return () => clearInterval(id);
  }, [length]);

  const next = useCallback(() => setIndex(i => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex(i => (i - 1 + length) % length), [length]);
  const goTo = useCallback((i: number) => setIndex(((i % length) + length) % length), [length]);
  const pause = useCallback(() => { pausedRef.current = true; }, []);
  const resume = useCallback(() => { pausedRef.current = false; }, []);
  const set = useCallback((i: number) => setIndex(i), []);

  return { index, setIndex: set, next, prev, goTo, pause, resume };
}
