"use client";

import { useState, useEffect } from "react";

export default function SplashOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const cap = (window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
    if (!cap?.isNativePlatform?.()) {
      setVisible(false);
      return;
    }

    // 1.3초 후 페이드 시작, 1.8초 후 완전히 숨김
    const fadeTimer = setTimeout(() => setFading(true), 1300);
    const hideTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{ backgroundColor: "#38BDF8" }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center px-8">
        <div className="text-8xl mb-8">🐾</div>
        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
          유기 동물 공고
        </h1>
        <p className="text-white/80 text-base font-medium leading-relaxed">
          보호소 동물을 한눈에 만나보세요
        </p>
      </div>
    </div>
  );
}
