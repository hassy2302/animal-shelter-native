"use client";

import { useState, useEffect } from "react";

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ connected: boolean }>).detail;
      setIsOnline(detail.connected);
    };
    window.addEventListener("capacitor:network", handler);
    return () => window.removeEventListener("capacitor:network", handler);
  }, []);

  return { isOnline };
}
