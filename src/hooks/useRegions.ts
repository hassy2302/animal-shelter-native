"use client";

import useSWR from "swr";
import type { Sido, Sigungu } from "@/types/region";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error("로드 실패");
  return r.json();
});

export function useSido() {
  const { data, isLoading } = useSWR<Sido[]>(`${API_BASE}/api/regions/sido`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 3_600_000,
  });
  return { sido: data ?? [], isLoading };
}

export function useSigungu(sido_code: string) {
  const { data, isLoading } = useSWR<Sigungu[]>(
    sido_code ? `${API_BASE}/api/regions/sigungu?sido_code=${sido_code}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 3_600_000 },
  );
  return { sigungu: data ?? [], isLoading };
}
