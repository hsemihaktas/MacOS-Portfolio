"use client";

import { useEffect, useRef, useState } from "react";

const S_POLYS = [
  "160,104 352,104 352,156 212,156",
  "160,114 212,166 212,222 160,274",
  "220,230 344,230 292,282 168,282",
  "352,238 352,400 300,348 300,290",
  "160,356 292,356 344,408 160,408",
];

interface BootScreenProps {
  onComplete: () => void;
  dataReady?: boolean;
}

export default function BootScreen({
  onComplete,
  dataReady = false,
}: BootScreenProps) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [waiting, setWaiting] = useState(false); // animasyon bitti, veri bekleniyor

  const rafRef = useRef<number | null>(null);
  const animDoneRef = useRef(false);
  const calledRef = useRef(false);
  const dataReadyRef = useRef(dataReady);

  // Prop değişince ref'i güncelle + tamamlanma dene
  useEffect(() => {
    dataReadyRef.current = dataReady;
    if (dataReady && animDoneRef.current) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataReady]);

  function finish() {
    if (calledRef.current) return;
    calledRef.current = true;
    setWaiting(false);
    setFading(true);
    setTimeout(onComplete, 650);
  }

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 350);
    const t2 = setTimeout(() => setBarVisible(true), 750);

    const t3 = setTimeout(() => {
      const duration = 2800;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        setProgress(Math.round(eased * 100));

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          animDoneRef.current = true;
          if (dataReadyRef.current) {
            finish(); // veri zaten geldiyse hemen bitir
          } else {
            setWaiting(true); // veriyi bekle
          }
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center
        transition-opacity duration-700 ease-in-out
        ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div
        className={`transition-opacity duration-700 ${logoVisible ? "opacity-100" : "opacity-0"}`}
      >
        <svg viewBox="0 0 512 512" width="72" height="72" aria-hidden="true">
          {S_POLYS.map((pts, i) => (
            <polygon key={i} points={pts} fill="white" />
          ))}
        </svg>
      </div>

      <div
        className={`mt-16 transition-opacity duration-500 ${barVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-[120px] h-[3px] rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Veri bekleniyor — 3 nokta */}
      {waiting && (
        <div className="mt-5 flex items-center gap-1.5">
          {[0, 200, 400].map((delay) => (
            <div
              key={delay}
              className="w-1 h-1 rounded-full bg-white/35 animate-pulse"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
