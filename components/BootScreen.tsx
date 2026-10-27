"use client";

import { useEffect, useState, useRef } from "react";

// SVG'deki S logo polygon noktaları
const S_POLYS = [
  "160,104 352,104 352,156 212,156",
  "160,114 212,166 212,222 160,274",
  "220,230 344,230 292,282 168,282",
  "352,238 352,400 300,348 300,290",
  "160,356 292,356 344,408 160,408",
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [barVisible, setBarVisible]   = useState(false);
  const [progress, setProgress]       = useState(0);
  const [fading, setFading]           = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Logo fade in
    const t1 = setTimeout(() => setLogoVisible(true), 350);
    // Bar görünür
    const t2 = setTimeout(() => setBarVisible(true), 750);

    // Progress bar — ease-in-out eğrisi, ~2.8sn
    const t3 = setTimeout(() => {
      const duration   = 2800;
      const startTime  = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t       = Math.min(elapsed / duration, 1);
        // ease in-out cubic
        const eased   = t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

        setProgress(Math.round(eased * 100));

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Dolu → bekle → fade out
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 650);
          }, 320);
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
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center
        transition-opacity duration-700 ease-in-out
        ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* S Logosu */}
      <div
        className={`transition-opacity duration-700
          ${logoVisible ? "opacity-100" : "opacity-0"}`}
      >
        <svg
          viewBox="0 0 512 512"
          width="72"
          height="72"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {S_POLYS.map((pts, i) => (
            <polygon key={i} points={pts} fill="white" />
          ))}
        </svg>
      </div>

      {/* Progress bar — logonun altında, macOS tarzı */}
      <div
        className={`mt-16 transition-opacity duration-500
          ${barVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-[120px] h-[3px] rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
