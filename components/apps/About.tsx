"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Download,
} from "lucide-react";
import { DATA } from "@/lib/data";
import { Language } from "@/lib/types";
import GitHubCalendar from "@/components/GitHubCalendar";

interface AboutProps {
  lang: Language;
  isDarkMode?: boolean;
}

// macOS design tokens
const tokens = (dark?: boolean) => ({
  pageBg: dark ? "bg-[#1C1C1E]" : "bg-[#F2F2F7]",
  cardBg: dark ? "bg-[#2C2C2E]" : "bg-white",
  headerBg: dark ? "bg-[#1C1C1E]" : "bg-white",
  text1: dark ? "text-white" : "text-[#1C1C1E]",
  text2: dark ? "text-white/55" : "text-[#3C3C43]/75",
  text3: dark ? "text-white/35" : "text-[#3C3C43]/45",
  border: dark ? "divide-white/[0.07]" : "divide-black/[0.06]",
  cardBorder: dark ? "border-white/[0.07]" : "border-black/[0.06]",
  sep: dark ? "border-white/[0.07]" : "border-black/[0.06]",
  labelFg: dark ? "text-white/40" : "text-[#6C6C70]",
  iconBg: (color: string) =>
    dark
      ? `bg-${color}-500/20 text-${color}-400`
      : `bg-${color}-50 text-${color}-600`,
});

const SectionLabel = ({
  children,
  t,
}: {
  children: React.ReactNode;
  t: ReturnType<typeof tokens>;
}) => (
  <p
    className={`text-[11px] font-semibold uppercase tracking-[0.12em] px-4 pt-5 pb-2 ${t.labelFg}`}
  >
    {children}
  </p>
);

const Card = ({
  children,
  t,
  className = "",
}: {
  children: React.ReactNode;
  t: ReturnType<typeof tokens>;
  className?: string;
}) => (
  <div
    className={`${t.cardBg} rounded-2xl overflow-hidden border ${t.cardBorder} ${className}`}
  >
    {children}
  </div>
);

const InfoRow = ({
  icon,
  label,
  value,
  href,
  last = false,
  t,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  last?: boolean;
  t: ReturnType<typeof tokens>;
}) => {
  const inner = (
    <div
      className={`flex items-center gap-3.5 px-4 py-3 ${last ? "" : `border-b ${t.sep}`} ${href ? "cursor-pointer" : ""}`}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#007AFF]/10 text-[#007AFF]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[11px] font-medium ${t.labelFg} mb-0.5`}>{label}</p>
        <p className={`text-[13px] font-medium ${t.text1} truncate`}>{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block hover:bg-[#007AFF]/5 transition-colors`}
    >
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
};

export default function About({ lang, isDarkMode }: AboutProps) {
  const d = DATA[lang].about;
  const t = tokens(isDarkMode);
  const isTr = lang === "tr";

  return (
    <div
      className={`h-full ${t.pageBg} flex flex-col font-sans select-text overflow-hidden transition-colors duration-300`}
    >
      {/* ── Header: profil + isim + butonlar ─────────────────────── */}
      <div className={`${t.headerBg} border-b ${t.sep} shrink-0 px-6 py-5`}>
        <div className="flex items-center gap-5">
          {/* Profil fotoğrafı */}
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/images/profilePicture.jpeg"
              alt="Profile"
              fill
              className="object-cover rounded-full shadow-md"
              sizes="80px"
              priority
            />
            {/* Online badge */}
            <span
              className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-2"
              style={{ borderColor: isDarkMode ? "#1C1C1E" : "white" }}
            />
          </div>

          {/* İsim, rol, butonlar */}
          <div className="flex-1 min-w-0">
            <h1
              className={`text-[20px] font-bold ${t.text1} leading-tight tracking-tight`}
            >
              {d.name}
            </h1>
            <p className={`text-[13px] ${t.text2} mt-0.5 truncate`}>{d.role}</p>

            {/* Aksiyon butonları */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <a
                href={`mailto:${d.email}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors
                  ${isDarkMode ? "bg-white/10 hover:bg-white/15 text-white" : "bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF]"}`}
              >
                <Mail size={12} /> {isTr ? "E-posta" : "Email"}
              </a>
              <a
                href="https://github.com/hsemihaktas"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors
                  ${isDarkMode ? "bg-white/10 hover:bg-white/15 text-white" : "bg-black/[0.06] hover:bg-black/10 text-[#1C1C1E]"}`}
              >
                <Github size={12} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/hsemihaktas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]"
              >
                <Linkedin size={12} /> LinkedIn
              </a>
              <a
                href="/files/cv.pdf"
                download="Hasan_Semih_Aktas_CV.pdf"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors
                  ${
                    isDarkMode
                      ? "bg-white/10 hover:bg-white/15 text-white"
                      : "bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759]"
                  }`}
              >
                <Download size={12} /> {isTr ? "CV İndir" : "Download CV"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────── */}
      <div className="flex-1 overflow-auto custom-scrollbar pb-8">
        {/* ÖZET / SUMMARY */}
        <SectionLabel t={t}>{isTr ? "ÖZET" : "SUMMARY"}</SectionLabel>
        <div className="px-4">
          <Card t={t}>
            <p
              className={`px-4 py-4 text-[13.5px] leading-relaxed font-normal ${t.text2}`}
            >
              {d.summary}
            </p>
          </Card>
        </div>

        {/* DENEYİM / EXPERIENCE */}
        <SectionLabel t={t}>{isTr ? "DENEYİM" : "EXPERIENCE"}</SectionLabel>
        <div className="px-4">
          <Card t={t}>
            {d.experience.map((exp, i) => (
              <div
                key={i}
                className={`px-4 py-4 ${i < d.experience.length - 1 ? `border-b ${t.sep}` : ""}`}
              >
                <div className="flex items-start gap-3">
                  {/* Dot timeline */}
                  <div className="flex flex-col items-center pt-1 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#007AFF]" />
                    {i < d.experience.length - 1 && (
                      <div
                        className={`w-px flex-1 mt-1 ${isDarkMode ? "bg-white/10" : "bg-black/8"}`}
                        style={{ minHeight: 24 }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          className={`text-[14px] font-semibold ${t.text1} leading-tight`}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className={`text-[12px] font-medium text-[#007AFF] mt-0.5`}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className={`text-[11px] font-medium ${t.text3} whitespace-nowrap shrink-0 pt-0.5`}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <p
                      className={`text-[13px] ${t.text2} mt-2 leading-relaxed`}
                    >
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* GITHUB AKTİVİTESİ */}
        <SectionLabel t={t}>
          {isTr ? "GITHUB AKTİVİTESİ" : "GITHUB ACTIVITY"}
        </SectionLabel>
        <div className="px-4">
          <Card t={t}>
            <div className={`px-4 py-4 ${t.text1}`}>
              <GitHubCalendar isDarkMode={isDarkMode} lang={lang} />
            </div>
          </Card>
        </div>

        {/* BİLGİLER / INFORMATION */}
        <SectionLabel t={t}>{isTr ? "BİLGİLER" : "INFORMATION"}</SectionLabel>
        <div className="px-4">
          <Card t={t}>
            <InfoRow
              t={t}
              icon={<MapPin size={15} />}
              label={isTr ? "Konum" : "Location"}
              value={d.location}
            />
            <InfoRow
              t={t}
              icon={<GraduationCap size={15} />}
              label={isTr ? "Eğitim" : "Education"}
              value={d.education}
            />
            <InfoRow
              t={t}
              icon={<Mail size={15} />}
              label={isTr ? "E-posta" : "Email"}
              value={d.email}
              href={`mailto:${d.email}`}
              last
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
