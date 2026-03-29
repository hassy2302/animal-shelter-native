import type { Animal, AnimalFilters, AnimalListResponse } from "@/types/animal";
import type { Sido, Sigungu } from "@/types/region";
import { buildApiUrl } from "./utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function fetchAnimals(filters: AnimalFilters): Promise<AnimalListResponse> {
  const url = buildApiUrl(`${API_BASE}/api/animals`, filters as Record<string, unknown>);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`동물 데이터 로드 실패: ${res.status}`);
  return res.json();
}

export async function fetchAnimal(noticeNo: string): Promise<Animal> {
  const res = await fetch(
    `${API_BASE}/api/animals/by-notice/${encodeURIComponent(noticeNo)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`동물 데이터 로드 실패: ${res.status}`);
  return res.json();
}

export async function fetchAnimalsBatch(noticeNos: string[]): Promise<Animal[]> {
  const res = await fetch(`${API_BASE}/api/animals/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notice_nos: noticeNos }),
  });
  if (!res.ok) throw new Error("찜 목록 로드 실패");
  return res.json();
}

export async function fetchSido(): Promise<Sido[]> {
  const res = await fetch(`${API_BASE}/api/regions/sido`);
  if (!res.ok) throw new Error("시도 로드 실패");
  return res.json();
}

export async function fetchSigungu(sido_code: string): Promise<Sigungu[]> {
  const res = await fetch(`${API_BASE}/api/regions/sigungu?sido_code=${sido_code}`);
  if (!res.ok) throw new Error("시군구 로드 실패");
  return res.json();
}
