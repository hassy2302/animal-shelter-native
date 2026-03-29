"use client";

import useSWR from "swr";
import type { AnimalFilters, AnimalListResponse } from "@/types/animal";
import { buildApiUrl } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const fetcher = (url: string) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  return fetch(url, { signal: controller.signal, cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw new Error("데이터 로드 실패");
      return r.json() as Promise<AnimalListResponse>;
    })
    .catch((e: unknown) => {
      if (e instanceof Error && e.name === "AbortError") {
        throw new Error("서버 응답 시간이 초과됐어요");
      }
      throw e;
    })
    .finally(() => clearTimeout(timer));
};

export function useAnimals(filters: AnimalFilters) {
  const hourKey = Math.floor(Date.now() / 3_600_000);
  const key = buildApiUrl(`${API_BASE}/api/animals`, { ...filters as Record<string, unknown>, _t: hourKey });

  const { data, error, isLoading, mutate } = useSWR<AnimalListResponse>(key, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 0,
    refreshInterval: () => {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(nextHour.getHours() + 1, 0, 30, 0);
      return nextHour.getTime() - now.getTime();
    },
  });

  return {
    data,
    animals: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.total_pages ?? 1,
    fetchedAt: data?.fetched_at,
    isLoading,
    error,
    refresh: mutate,
  };
}
