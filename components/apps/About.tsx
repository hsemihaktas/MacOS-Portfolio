"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Download,
  FileText,
  Briefcase,
  Activity,
  Info,
} from "lucide-react";
import { usePortfolioData, useSiteConfig } from "@/lib/context/DataContext";
import { Language } from "@/lib/types";
import GitHubCalendar from "@/components/GitHubCalendar";

interface AboutProps {
  lang: Language;
  isDarkMode?: boolean;
}

type Section = "summary" | "experience" | "github" | "info";

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
    navActive: dark
      ? "bg-[#0A84FF]/20 text-[#0A84FF]"
      : "bg-[#007AFF]/10 text-[#007AFF]",
    navNormal: dark
      ? "text-white/60 hover:bg-white/5"
      : "text-[#3C3C43] hover:bg-black/[0.04]",
    btnBase: dark
      ? "bg-white/8 hover:bg-white/12 text-white"
      : "bg-black/[0.05] hover:bg-black/[0.09] text-[#1C1C1E]",
  };
}

const Card = ({
  children,
  t,
}: {
  children: React.ReactNode;
  t: ReturnType<typeof tk>;
}) => (
  <div
    className="rounded-2xl overflow-hidden border"
    style={{ background: t.cardBg, borderColor: t.sepColor }}
  >
    {children}
  </div>
);

const InfoRow = ({
  icon,
  label,
  value,
  href,
  last,
  t,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  last?: boolean;
  t: ReturnType<typeof tk>;
}) => {
  const row = (
    <div
      className={`flex items-center gap-3.5 px-4 py-3 ${href ? "cursor-pointer hover:bg-[#007AFF]/5 transition-colors" : ""}`}
      style={!last ? { borderBottom: `1px solid ${t.sepColor}` } : undefined}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#007AFF]/10 text-[#007AFF]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.08em] mb-0.5 ${t.labelFg}`}
        >
          {label}
        </p>
        <p className={`text-[13px] font-medium ${t.text1} truncate`}>{value}</p>
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

export default function About({ lang, isDarkMode }: AboutProps) {
  const DATA = usePortfolioData();
  const config = useSiteConfig();
  const d = DATA[lang].about;
  const t = tk(isDarkMode);
  const isTr = lang === "tr";

  // Sidebar active highlight based on scroll position
  const [activeSection, setActiveSection] = useState<Section>("summary");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs: Record<Section, React.RefObject<HTMLDivElement | null>> = {
    summary: useRef(null),
    experience: useRef(null),
    github: useRef(null),
    info: useRef(null),
  };

  // Scroll-to-section on nav click
  const scrollTo = (id: Section) => {
    sectionRefs[id].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Track which section is in view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let current: Section = "summary";
      (["summary", "experience", "github", "info"] as Section[]).forEach(
        (id) => {
          const el = sectionRefs[id].current;
          if (el) {
            const top = el.getBoundingClientRect().top - containerTop;
            if (top <= 60) current = id;
          }
        },
      );
      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navItems: { id: Section; icon: React.ElementType; label: string }[] = [
    { id: "summary", icon: FileText, label: isTr ? "Özet" : "Summary" },
    {
      id: "experience",
      icon: Briefcase,
      label: isTr ? "Deneyim" : "Experience",
    },
    { id: "github", icon: Activity, label: "GitHub" },
    { id: "info", icon: Info, label: isTr ? "Bilgiler" : "Information" },
  ];

  // ─── Sidebar ────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div
      className="w-[220px] shrink-0 flex flex-col border-r"
      style={{ background: t.sidebarBg, borderColor: t.sepColor }}
    >
      {/* Profile */}
      <div
        className="px-4 pt-5 pb-4 flex flex-col items-center text-center gap-3"
        style={{ borderBottom: `1px solid ${t.sepColor}` }}
      >
        <div className="relative w-[68px] h-[68px]">
          <Image
            src={config?.profile_picture_url ?? ""}
            alt="Profile"
            fill
            className="object-cover rounded-full shadow-md"
            sizes="68px"
            priority
          />
          <span
            className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2"
            style={{ borderColor: t.sidebarBg }}
          />
        </div>
        <div>
          <p className={`text-[13px] font-semibold ${t.text1} leading-tight`}>
            {d.name}
          </p>
          <p className={`text-[11px] mt-0.5 ${t.text3}`}>{d.role}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 py-2 overflow-auto">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 pt-3 pb-1.5 ${t.labelFg}`}
        >
          {isTr ? "BÖLÜMLER" : "SECTIONS"}
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-[6px] rounded-lg text-left mb-0.5 transition-all cursor-default ${
              activeSection === item.id ? t.navActive : t.navNormal
            }`}
          >
            <item.icon size={14} className="shrink-0" />
            <span className="text-[13px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="p-3" style={{ borderTop: `1px solid ${t.sepColor}` }}>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            {
              href: `mailto:${d.email}`,
              icon: <Mail size={11} />,
              label: isTr ? "E-posta" : "Email",
            },
            {
              href: config?.github_url ?? "#",
              icon: <Github size={11} />,
              label: "GitHub",
              target: "_blank",
            },
            {
              href: config?.linkedin_url ?? "#",
              icon: <Linkedin size={11} />,
              label: "LinkedIn",
              target: "_blank",
            },
            {
              href: config?.cv_url ?? "#",
              icon: <Download size={11} />,
              label: "CV",
              download: true,
            },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.target}
              download={btn.download ? "Hasan_Semih_Aktas_CV.pdf" : undefined}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${t.btnBase}`}
            >
              {btn.icon} {btn.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Single scrollable content column ──────────────────────────────────────
  const ScrollContent = () => (
    <div
      ref={scrollRef}
      className="flex-1 overflow-auto custom-scrollbar"
      style={{ background: t.contentBg }}
    >
      <div className="max-w-2xl px-6 pb-12">
        {/* SUMMARY */}
        <div ref={sectionRefs.summary} className="pt-6">
          <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
            {isTr ? "Özet" : "Summary"}
          </h2>
          <Card t={t}>
            <p className={`px-4 py-4 text-[13.5px] leading-relaxed ${t.text2}`}>
              {d.summary}
            </p>
          </Card>
        </div>

        {/* EXPERIENCE */}
        <div ref={sectionRefs.experience} className="pt-8">
          <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
            {isTr ? "Deneyim" : "Experience"}
          </h2>
          <Card t={t}>
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
                      <span
                        className={`text-[11px] ${t.text3} whitespace-nowrap`}
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

        {/* GITHUB */}
        <div ref={sectionRefs.github} className="pt-8">
          <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
            {isTr ? "GitHub Aktivitesi" : "GitHub Activity"}
          </h2>
          <Card t={t}>
            <div className={`px-4 py-4 ${t.text1}`}>
              <GitHubCalendar isDarkMode={isDarkMode} lang={lang} />
            </div>
          </Card>
        </div>

        {/* INFO */}
        <div ref={sectionRefs.info} className="pt-8">
          <h2 className={`text-[17px] font-bold ${t.text1} mb-3`}>
            {isTr ? "Bilgiler" : "Information"}
          </h2>
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

  // ─── Mobile: full-width stacked ─────────────────────────────────────────────
  const MobileLayout = () => (
    <div
      ref={scrollRef}
      className="h-full overflow-auto custom-scrollbar"
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
          {[
            {
              href: `mailto:${d.email}`,
              icon: <Mail size={12} />,
              label: isTr ? "E-posta" : "Email",
            },
            {
              href: config?.github_url ?? "#",
              icon: <Github size={12} />,
              label: "GitHub",
            },
            {
              href: config?.linkedin_url ?? "#",
              icon: <Linkedin size={12} />,
              label: "LinkedIn",
            },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium ${t.btnBase}`}
            >
              {btn.icon} {btn.label}
            </a>
          ))}
          <a
            href={config?.cv_url ?? "#"}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-[#34C759]/10 text-[#34C759]"
          >
            <Download size={12} /> CV
          </a>
        </div>
      </div>

      <div className="max-w-2xl px-4 pb-10 mx-auto">
        <div ref={sectionRefs.summary} className="pt-6">
          <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>
            {isTr ? "Özet" : "Summary"}
          </h2>
          <Card t={t}>
            <p className={`px-4 py-4 text-[13.5px] leading-relaxed ${t.text2}`}>
              {d.summary}
            </p>
          </Card>
        </div>

        <div ref={sectionRefs.experience} className="pt-7">
          <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>
            {isTr ? "Deneyim" : "Experience"}
          </h2>
          <Card t={t}>
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
                  <span className={`text-[11px] ${t.text3}`}>{exp.period}</span>
                </div>
                <p className={`text-[13px] ${t.text2} mt-2 leading-relaxed`}>
                  {exp.desc}
                </p>
              </div>
            ))}
          </Card>
        </div>

        <div ref={sectionRefs.github} className="pt-7">
          <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>GitHub</h2>
          <Card t={t}>
            <div className={`px-4 py-4 ${t.text1}`}>
              <GitHubCalendar isDarkMode={isDarkMode} lang={lang} />
            </div>
          </Card>
        </div>

        <div ref={sectionRefs.info} className="pt-7">
          <h2 className={`text-[16px] font-bold ${t.text1} mb-3`}>
            {isTr ? "Bilgiler" : "Information"}
          </h2>
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
              label="Email"
              value={d.email}
              href={`mailto:${d.email}`}
              last
            />
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-hidden font-sans select-text transition-colors duration-300">
      {/* Desktop: sidebar + scrollable content */}
      <div className="hidden md:flex h-full">
        <Sidebar />
        <ScrollContent />
      </div>
      {/* Mobile: full-width */}
      <div className="md:hidden h-full">
        <MobileLayout />
      </div>
    </div>
  );
}
