import Script from "next/script";
import "./globals.css";
import CapacitorInit from "@/components/CapacitorInit";
import SplashOverlay from "@/components/SplashOverlay";
import Providers from "./Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>유기동물 공고</title>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)]">
        <CapacitorInit />
        <SplashOverlay />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
