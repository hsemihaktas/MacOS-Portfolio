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
import { usePortfolioData, useSiteConfig } from "@/lib/context/DataContext";
import { Language } from "@/lib/types";
import GitHubCalendar from "@/components/GitHubCalendar";

interface AboutProps {
  lang: Language;
  isDarkMode?: boolean;
}

// ─── Design tokens (module-level, safe) ──────────────────────────────────────
function tk(dark?: boolean) {
  return {
    sidebarBg: dark ? "#252527" : "#F0F0F2",
    contentBg: dark ? "#1C1C1E" : "#FFFFFF",
    cardBg: dark ? "#2C2C2E" : "#FFFFFF",
    sepColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    text1: dark ? "text-white" : "text-[#1C1C1E]",
    text2: dark ? "text-white/55" : "text-[#3C3C43]/75",
    text3: dark ? "text-white/35" : "text-[#3C3C43]/45",
    labelFg: dark ? "text-white/35" : "text-[#6C6C70]",
    btnBase: dark
      ? "bg-white/8 hover:bg-white/12 text-white"
      : "bg-black/[0.05] hover:bg-black/[0.09] text-[#1C1C1E]",
  };
}

// ─── Module-level helper components (safe — not created during render) ────────
const AboutCard = ({
  children,
  cardBg,
  sepColor,
}: {
  children: React.ReactNode;
  cardBg: string;
  sepColor: string;
}) => (
  <div
    className="rounded-2xl overflow-hidden border"
    style={{ background: cardBg, borderColor: sepColor }}
  >
    {children}
  </div>
);

const AboutInfoRow = ({
  icon,
  label,
  value,
  href,
  last,
  text1,
  labelFg,
  sepColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  last?: boolean;
  text1: string;
  labelFg: string;
  sepColor: string;
}) => {
  const row = (
    <div
      className={`flex items-center gap-3.5 px-4 py-3 ${href ? "cursor-pointer hover:bg-[#007AFF]/5 transition-colors" : ""}`}
      style={!last ? { borderBottom: `1px solid ${sepColor}` } : undefined}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#007AFF]/10 text-[#007AFF]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.08em] mb-0.5 ${labelFg}`}
        >
          {label}
        </p>
        <p className={`text-[13px] font-medium ${text1} truncate`}>{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {row}
    </a>
  ) : (
    <div>{row}</div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function About({ lang, isDarkMode }: AboutProps) {
  const DATA = usePortfolioData();
  const config = useSiteConfig();
  const d = DATA[lang].about;
  const t = tk(isDarkMode);
  const isTr = lang === "tr";

  const actionBtns = [
    {
      href: `mailto:${d.email}`,
      icon: <Mail size={11} />,
      label: isTr ? "E-posta" : "Email",
    },
    {
      href: config?.github_url ?? "#",
      icon: <Github size={11} />,
      label: "GitHub",
      target: "_blank" as const,
    },
    {
      href: config?.linkedin_url ?? "#",
      icon: <Linkedin size={11} />,
      label: "LinkedIn",
      target: "_blank" as const,
    },
    {
      href: config?.cv_url ?? "#",
      icon: <Download size={11} />,
      label: "CV",
      download: "Hasan_Semih_Aktas_CV.pdf",
    },
  ];

  // Shared experience list JSX
  const expList = (
    <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
      {d.experience.map((exp, i) => (
        <div
          key={i}
          className="px-4 py-4"
          style={
            i < d.experience.length - 1
              ? { borderBottom: `1px solid ${t.sepColor}` }
              : undefined
          }
        >
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1.5 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#007AFF]" />
              {i < d.experience.length - 1 && (
                <div
                  className="w-px flex-1 mt-1"
                  style={{ minHeight: 24, background: t.sepColor }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h3 className={`text-[14px] font-semibold ${t.text1}`}>
                    {exp.role}
                  </h3>
                  <p className="text-[12px] font-medium text-[#007AFF] mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <span className={`text-[11px] ${t.text3} whitespace-nowrap`}>
                  {exp.period}
                </span>
              </div>
              <p className={`text-[13px] ${t.text2} mt-2 leading-relaxed`}>
                {exp.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </AboutCard>
  );

  return (
    <div className="h-full overflow-hidden font-sans select-text transition-colors duration-300">
      {/* ── Desktop ── */}
      <div className="hidden md:flex h-full">
        {/* Sidebar */}
        <div
          className="w-[220px] shrink-0 flex flex-col border-r"
          style={{ background: t.sidebarBg, borderColor: t.sepColor }}
        >
          <div
            className="px-4 pt-5 pb-5 flex flex-col items-center text-center gap-3"
            style={{ borderBottom: `1px solid ${t.sepColor}` }}
          >
            <div className="relative w-[72px] h-[72px]">
              <Image
                src={config?.profile_picture_url ?? ""}
                alt="Profile"
                fill
                className="object-cover rounded-full shadow-md"
                sizes="72px"
                priority
              />
              <span
                className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2"
                style={{ borderColor: t.sidebarBg }}
              />
            </div>
            <div>
              <p
                className={`text-[13px] font-semibold ${t.text1} leading-tight`}
              >
                {d.name}
              </p>
              <p className={`text-[11px] mt-1 ${t.text3}`}>{d.role}</p>
            </div>
          </div>
          <div className="flex-1" />
          <div className="p-3" style={{ borderTop: `1px solid ${t.sepColor}` }}>
            <div className="grid grid-cols-2 gap-1.5">
              {actionBtns.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={"target" in btn ? btn.target : undefined}
                  download={"download" in btn ? btn.download : undefined}
                  className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${t.btnBase}`}
                >
                  {btn.icon} {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-auto custom-scrollbar"
          style={{ background: t.contentBg }}
        >
          <div className="max-w-2xl px-6 pb-12">
            <div className="pt-6">
              <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
                {isTr ? "Özet" : "Summary"}
              </h2>
              <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
                <p
                  className={`px-4 py-4 text-[13.5px] leading-relaxed ${t.text2}`}
                >
                  {d.summary}
                </p>
              </AboutCard>
            </div>
            <div className="pt-7">
              <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
                {isTr ? "Deneyim" : "Experience"}
              </h2>
              {expList}
            </div>
            <div className="pt-7">
              <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
                {isTr ? "GitHub Aktivitesi" : "GitHub Activity"}
              </h2>
              <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
                <div className={`px-4 py-4 ${t.text1}`}>
                  <GitHubCalendar isDarkMode={isDarkMode} lang={lang} />
                </div>
              </AboutCard>
            </div>
            <div className="pt-7">
              <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
                {isTr ? "Bilgiler" : "Information"}
              </h2>
              <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
                <AboutInfoRow
                  icon={<MapPin size={15} />}
                  label={isTr ? "Konum" : "Location"}
                  value={d.location}
                  text1={t.text1}
                  labelFg={t.labelFg}
                  sepColor={t.sepColor}
                />
                <AboutInfoRow
                  icon={<GraduationCap size={15} />}
                  label={isTr ? "Eğitim" : "Education"}
                  value={d.education}
                  text1={t.text1}
                  labelFg={t.labelFg}
                  sepColor={t.sepColor}
                />
                <AboutInfoRow
                  icon={<Mail size={15} />}
                  label={isTr ? "E-posta" : "Email"}
                  value={d.email}
                  href={`mailto:${d.email}`}
                  last
                  text1={t.text1}
                  labelFg={t.labelFg}
                  sepColor={t.sepColor}
                />
              </AboutCard>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div
        className="md:hidden h-full overflow-auto custom-scrollbar"
        style={{ background: t.contentBg }}
      >
        {/* Profile header */}
        <div
          className="px-4 pt-6 pb-5 flex flex-col items-center text-center gap-3"
          style={{ borderBottom: `1px solid ${t.sepColor}` }}
        >
          <div className="relative w-20 h-20">
            <Image
              src={config?.profile_picture_url ?? ""}
              alt="Profile"
              fill
              className="object-cover rounded-full shadow-md"
              sizes="80px"
            />
            <span
              className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-2"
              style={{ borderColor: t.contentBg }}
            />
          </div>
          <div>
            <h1 className={`text-[20px] font-bold ${t.text1}`}>{d.name}</h1>
            <p className={`text-[13px] ${t.text2} mt-0.5`}>{d.role}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {actionBtns.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target={"target" in btn ? btn.target : undefined}
                download={"download" in btn ? btn.download : undefined}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium ${t.btnBase}`}
              >
                {btn.icon} {btn.label}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-2xl px-4 pb-10 mx-auto">
          <div className="pt-5">
            <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>
              {isTr ? "Özet" : "Summary"}
            </h2>
            <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
              <p
                className={`px-4 py-4 text-[13.5px] leading-relaxed ${t.text2}`}
              >
                {d.summary}
              </p>
            </AboutCard>
          </div>
          <div className="pt-6">
            <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>
              {isTr ? "Deneyim" : "Experience"}
            </h2>
            <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
              {d.experience.map((exp, i) => (
                <div
                  key={i}
                  className="px-4 py-4"
                  style={
                    i < d.experience.length - 1
                      ? { borderBottom: `1px solid ${t.sepColor}` }
                      : undefined
                  }
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className={`text-[14px] font-semibold ${t.text1}`}>
                        {exp.role}
                      </h3>
                      <p className="text-[12px] text-[#007AFF] mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className={`text-[11px] ${t.text3}`}>
                      {exp.period}
                    </span>
                  </div>
                  <p className={`text-[13px] ${t.text2} mt-2 leading-relaxed`}>
                    {exp.desc}
                  </p>
                </div>
              ))}
            </AboutCard>
          </div>
          <div className="pt-6">
            <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>GitHub</h2>
            <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
              <div className={`px-4 py-4 ${t.text1}`}>
                <GitHubCalendar isDarkMode={isDarkMode} lang={lang} />
              </div>
            </AboutCard>
          </div>
          <div className="pt-6">
            <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>
              {isTr ? "Bilgiler" : "Information"}
            </h2>
            <AboutCard cardBg={t.cardBg} sepColor={t.sepColor}>
              <AboutInfoRow
                icon={<MapPin size={15} />}
                label={isTr ? "Konum" : "Location"}
                value={d.location}
                text1={t.text1}
                labelFg={t.labelFg}
                sepColor={t.sepColor}
              />
              <AboutInfoRow
                icon={<GraduationCap size={15} />}
                label={isTr ? "Eğitim" : "Education"}
                value={d.education}
                text1={t.text1}
                labelFg={t.labelFg}
                sepColor={t.sepColor}
              />
              <AboutInfoRow
                icon={<Mail size={15} />}
                label="Email"
                value={d.email}
                href={`mailto:${d.email}`}
                last
                text1={t.text1}
                labelFg={t.labelFg}
                sepColor={t.sepColor}
              />
            </AboutCard>
          </div>
        </div>
      </div>
    </div>
  );
}
