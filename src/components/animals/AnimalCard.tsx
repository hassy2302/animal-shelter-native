"use client";

import { useState } from "react";
import Image from "next/image";
import type { Animal } from "@/types/animal";
import { getAnimalEmoji, formatDate, isNewAnimal } from "@/lib/utils";
import { useFavorites } from "@/contexts/FavoritesContext";
import { BASE_URL } from "@/lib/constants";
import AnimalDetailModal from "./AnimalDetailModal";
import ShareSheet from "./ShareSheet";
import StateBadge from "./StateBadge";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

const SEX_LABEL: Record<string, string> = { M: "수컷", F: "암컷", Q: "미상" };

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex gap-1.5 text-xs">
      <span className="shrink-0 w-14 text-[#B8B4AF] dark:text-[#78716C]">{label}</span>
      <span className={`flex-1 truncate ${accent ? "text-brand-500 font-semibold" : "text-[var(--text)]"}`}>{value}</span>
    </div>
  );
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  const {
    noticeNo, kindNm, kindFullNm, upkind, sexCd, age, colorCd, weight,
    careNm, careTel, orgNm, happenPlace, happenDt, noticeEdt,
    specialMark, popfile1, processState, source,
  } = animal;

  const imgSrc = popfile1 || animal.popfile2;
  const emoji = getAnimalEmoji(kindNm, upkind);
  const kindLabel = kindFullNm || kindNm;
  const [imgError, setImgError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { isFavorite, toggle } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const isNew = isNewAnimal(happenDt);

  const shareUrl = noticeNo
    ? `${BASE_URL}/animal/${encodeURIComponent(noticeNo)}`
    : "";

  return (
    <>
      {/* 가로형 카드 */}
      <div className="relative bg-white dark:bg-[#292524] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm card-hover flex flex-row">

        {/* 이미지 */}
        <div className="relative shrink-0 w-28 aspect-[3/4] bg-gradient-to-br from-brand-100 to-[#FFE8D6] dark:from-[#3D1A08] dark:to-[#431407]">
          {imgSrc && !imgError ? (
            <Image
              src={imgSrc}
              alt={`${kindNm} - ${careNm} 보호 중`}
              fill
              className="object-cover"
              sizes="112px"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">{emoji}</span>
            </div>
          )}
          {/* NEW 배지 */}
          {isNew && (
            <span className="absolute top-2 left-2 z-10 text-xs font-bold px-2 py-0.5 rounded-full bg-green-500 text-white shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* 중간 정보 */}
        <div className="flex-1 min-w-0 flex flex-col gap-1 p-2.5 justify-center">
          {/* 종류 + 배지 */}
          <div className="flex items-center gap-1 flex-wrap mb-0.5">
            <span className="text-sm font-extrabold text-[var(--text)] truncate">{kindLabel}</span>
            <StateBadge state={processState} />
          </div>
          {/* 라벨형 정보 rows */}
          <div className="flex flex-col gap-0.5">
            <InfoRow label="공고 번호" value={noticeNo} />
            <InfoRow label="보호 기관" value={careNm} />
            {happenPlace && <InfoRow label="발견 장소" value={happenPlace} />}
            {happenDt && <InfoRow label="구조일" value={formatDate(happenDt)} />}
            {noticeEdt && <InfoRow label="공고 마감" value={formatDate(noticeEdt)} accent />}
          </div>
        </div>

        {/* 우측 컬럼: 찜 + 버튼 */}
        <div className="shrink-0 flex flex-col items-center gap-1.5 p-2 w-[60px]">
          {/* 찜 버튼 (우상단) */}
          <button
            onClick={() => toggle(noticeNo)}
            aria-label={isFavorite(noticeNo) ? "찜 해제" : "찜하기"}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F4F2] dark:bg-[#3D3935] shadow-sm hover:bg-white dark:hover:bg-black/40 transition-colors"
          >
            {isFavorite(noticeNo) ? "❤️" : "🤍"}
          </button>
          <div className="flex-1" />
          {/* 상세보기 버튼 */}
          <button
            onClick={() => { setShowModal(true); addRecentlyViewed(noticeNo); }}
            aria-label={`${kindNm} 상세보기`}
            className="w-full text-[10px] font-bold px-1 py-1.5 rounded-lg bg-brand-bg text-brand-500 border border-brand-300 hover:bg-brand-200 transition-colors text-center leading-tight"
          >
            🔍 상세
          </button>
          {/* 공유 버튼 */}
          {shareUrl && (
            <button
              onClick={() => setShowShare(true)}
              aria-label={`${kindNm} 공유`}
              className="w-full text-[10px] font-bold px-1 py-1.5 rounded-lg bg-[#F5F4F2] text-[#57534E] border border-[#E7E5E4] hover:bg-[#ECEAE8] dark:bg-[#3D3935] dark:text-[#A8A29E] dark:border-[#44403C] dark:hover:bg-[#57534E] transition-colors text-center leading-tight"
            >
              🔗 공유
            </button>
          )}
        </div>

      </div>

      {showModal && (
        <AnimalDetailModal animal={animal} onClose={() => setShowModal(false)} />
      )}
      {showShare && shareUrl && (
        <ShareSheet url={shareUrl} title={kindNm} imageUrl={imgSrc ?? undefined} onClose={() => setShowShare(false)} />
      )}
    </>
  );
}
