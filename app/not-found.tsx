"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const S_POLYS = [
  "160,104 352,104 352,156 212,156",
  "160,114 212,166 212,222 160,274",
  "220,230 344,230 292,282 168,282",
  "352,238 352,400 300,348 300,290",
  "160,356 292,356 344,408 160,408",
];

export default function NotFound() {
  const [lang] = useState<"tr" | "en">(() => {
    if (typeof window === "undefined") return "tr";
    const saved = localStorage.getItem("portfolio-lang");
    return saved === "tr" || saved === "en" ? saved : "tr";
  });

  const isTr = lang === "tr";

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Wallpaper */}
      <Image
        src="https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/wallpaper.jpg"
        alt="Wallpaper"
        fill
        className="object-cover"
        priority
        quality={80}
      />

      {/* Koyu overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Dialog */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-10 py-10 rounded-3xl border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        style={{
          background: "rgba(30,30,32,0.72)",
          backdropFilter: "blur(40px) saturate(1.6)",
          WebkitBackdropFilter: "blur(40px) saturate(1.6)",
          minWidth: 340,
          maxWidth: 420,
        }}
      >
        {/* S Logosu */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg viewBox="0 0 512 512" width="36" height="36" aria-hidden="true">
            {S_POLYS.map((pts, i) => (
              <polygon key={i} points={pts} fill="white" />
            ))}
          </svg>
        </div>

        {/* 404 */}
        <p
          className="font-bold leading-none mb-3 tabular-nums"
          style={{
            fontSize: 80,
            color: "rgba(255,255,255,0.1)",
            letterSpacing: "-4px",
            fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
          }}
        >
          404
        </p>

        {/* Başlık */}
        <h1
          className="text-[20px] font-semibold text-white leading-tight mb-2"
          style={{ fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}
        >
          {isTr ? "Sayfa Bulunamadı" : "Page Not Found"}
        </h1>

        {/* Açıklama */}
        <p
          className="text-[13px] leading-relaxed mt-1 mb-8"
          style={{ color: "rgba(255,255,255,0.42)", maxWidth: 280 }}
        >
          {isTr
            ? "Aradığın sayfa mevcut değil veya taşınmış olabilir."
            : "The page you're looking for doesn't exist or may have moved."}
        </p>

        {/* Buton — macOS standart filled blue */}
        <Link
          href="/"
          className="px-5 py-2 rounded-lg text-[13px] font-medium text-white transition-all hover:brightness-110 active:scale-[0.97]"
          style={{
            background: "#007AFF",
            fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
          }}
        >
          {isTr ? "Ana Sayfaya Dön" : "Go to Home"}
        </Link>
      </div>
    </div>
  );
}
