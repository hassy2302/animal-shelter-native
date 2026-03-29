"use client";

import { useEffect } from "react";

export default function CapacitorInit() {
  useEffect(() => {
    const init = async () => {
      const cap = (window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
      if (!cap?.isNativePlatform?.()) return;

      const [{ SplashScreen }, { StatusBar, Style }, { App }, { Network }] = await Promise.all([
        import("@capacitor/splash-screen"),
        import("@capacitor/status-bar"),
        import("@capacitor/app"),
        import("@capacitor/network"),
      ]);

      // 1. 스플래시 스크린 숨기기 (웹 오버레이로 자연스럽게 이어지도록 빠르게)
      await SplashScreen.hide({ fadeOutDuration: 100 });

      // 2. 상태바 색상 설정 (브랜드 색상 #6366f1)
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: "#6366f1" });

      // 3. Android 뒤로가기 버튼 처리
      App.addListener("backButton", ({ canGoBack }) => {
        // 열려있는 모달이 있으면 커스텀 이벤트로 처리 요청
        const event = new CustomEvent("capacitor:back", { cancelable: true });
        const notHandled = window.dispatchEvent(event);
        if (notHandled) {
          // 모달이 없는 경우: 뒤로가기 or 앱 최소화
          if (canGoBack) window.history.back();
          else App.minimizeApp();
        }
      });

      // 4. 네트워크 상태 모니터링
      const status = await Network.getStatus();
      window.dispatchEvent(
        new CustomEvent("capacitor:network", { detail: { connected: status.connected } })
      );
      Network.addListener("networkStatusChange", (s) => {
        window.dispatchEvent(
          new CustomEvent("capacitor:network", { detail: { connected: s.connected } })
        );
      });
    };

    init();
  }, []);

  return null;
}
