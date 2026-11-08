"use client";

import { useEffect, useRef, useState } from "react";

export const LIST_PAGE_SIZE = 20;

export function useInfiniteList<T>(items: T[], pageSize = LIST_PAGE_SIZE) {
  const [count, setCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCount(pageSize);
  }, [items, pageSize]);

  const visibleCount = Math.min(count, items.length);
  const hasMore = visibleCount < items.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const root = sentinel.closest("main");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setCount((current) => Math.min(current + pageSize, items.length));
      },
      { root, rootMargin: "240px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, items.length, pageSize, visibleCount]);

  return {
    visible: items.slice(0, visibleCount),
    visibleCount,
    hasMore,
    sentinelRef,
  };
}
