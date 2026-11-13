"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/lib/context/DataContext";
import { Language } from "@/lib/types";
import { Layout, Database, Globe, CheckCircle2, Layers } from "lucide-react";

interface SkillsProps {
  lang: Language;
  isDarkMode?: boolean;
}

function tk(dark?: boolean) {
  return {
    sidebarBg: dark ? "#252527" : "#F0F0F2",
    contentBg: dark ? "#1C1C1E" : "#FFFFFF",
    cardBg: dark ? "#2C2C2E" : "#FFFFFF",
    sepColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    text1: dark ? "text-white" : "text-[#1C1C1E]",
    text2: dark ? "text-white/55" : "text-[#3C3C43]/75",
    labelFg: dark ? "text-white/35" : "text-[#6C6C70]",
    iconArea: dark ? "bg-white/10" : "bg-[#F0F0F5]",
    skill: dark ? "text-white/70" : "text-black/70",
    navActive: dark
      ? "bg-[#0A84FF]/20 text-[#0A84FF]"
      : "bg-[#007AFF]/10 text-[#007AFF]",
    navHover: dark
      ? "hover:bg-white/5 text-white/60"
      : "hover:bg-black/[0.04] text-[#3C3C43]",
  };
}

function categoryIcon(name: string, size = 16) {
  if (name.toLowerCase().includes("frontend"))
    return <Layout size={size} className="text-blue-500" />;
  if (name.toLowerCase().includes("backend"))
    return <Database size={size} className="text-green-500" />;
  return <Globe size={size} className="text-orange-500" />;
}

const Skills: React.FC<SkillsProps> = ({ lang, isDarkMode }) => {
  const DATA = usePortfolioData();
  const d = DATA[lang].skills;
  const t = tk(isDarkMode);
  const isTr = lang === "tr";

  const [activeCat, setActiveCat] = useState<string>("all");

  const displayed =
    activeCat === "all"
      ? d.categories
      : d.categories.filter((c) => c.name === activeCat);

  // ─── Sidebar ──────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div
      className="w-[200px] shrink-0 flex flex-col border-r"
      style={{ background: t.sidebarBg, borderColor: t.sepColor }}
    >
      <div className="px-2 py-3 flex-1 overflow-auto">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 pt-3 pb-1.5 ${t.labelFg}`}
        >
          {isTr ? "KATEGORİLER" : "CATEGORIES"}
        </p>

        {/* All skills */}
        <button
          onClick={() => setActiveCat("all")}
          className={`w-full flex items-center gap-2.5 px-2.5 py-[6px] rounded-lg text-left mb-0.5 transition-all cursor-default ${
            activeCat === "all" ? t.navActive : t.navHover
          }`}
        >
          <Layers size={14} className="shrink-0" />
          <span className="text-[13px] font-medium">
            {isTr ? "Tümü" : "All Skills"}
          </span>
        </button>

        {/* Category nav items */}
        {d.categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCat(cat.name)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-[6px] rounded-lg text-left mb-0.5 transition-all cursor-default ${
              activeCat === cat.name ? t.navActive : t.navHover
            }`}
          >
            <span className="shrink-0">{categoryIcon(cat.name, 14)}</span>
            <span className="text-[13px] font-medium truncate">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Skill count footer */}
      <div
        className="px-4 py-3"
        style={{ borderTop: `1px solid ${t.sepColor}` }}
      >
        <p className={`text-[11px] ${t.labelFg}`}>
          {activeCat === "all"
            ? `${d.categories.reduce((n, c) => n + c.items.length, 0)} ${isTr ? "yetenek" : "skills"}`
            : `${d.categories.find((c) => c.name === activeCat)?.items.length ?? 0} ${isTr ? "yetenek" : "skills"}`}
        </p>
      </div>
    </div>
  );

  // ─── Skill card ────────────────────────────────────────────────────────────
  const SkillCard = ({
    group,
  }: {
    group: { name: string; items: string[] };
  }) => (
    <div
      className="rounded-2xl p-5 border flex flex-col gap-4"
      style={{ background: t.cardBg, borderColor: t.sepColor }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${t.iconArea}`}>
          {categoryIcon(group.name, 18)}
        </div>
        <h3 className={`text-[15px] font-bold ${t.text1}`}>{group.name}</h3>
      </div>
      <div className="flex flex-col gap-2.5">
        {group.items.map((skill) => (
          <div key={skill} className="flex items-center gap-3 px-1">
            <CheckCircle2 size={14} className="text-[#007AFF] shrink-0" />
            <span className={`text-[13px] font-medium ${t.skill}`}>
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Content ───────────────────────────────────────────────────────────────
  const Content = () => (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: t.contentBg }}
    >
      {/* Toolbar - Finder style */}
      <div
        className="h-[44px] shrink-0 flex items-center px-5 gap-3"
        style={{ borderBottom: `1px solid ${t.sepColor}` }}
      >
        <h3 className={`text-[14px] font-semibold ${t.text1}`}>
          {activeCat === "all"
            ? isTr
              ? "Tüm Yetenekler"
              : "All Skills"
            : activeCat}
        </h3>
        <span className={`text-[12px] ml-auto ${t.labelFg}`}>
          {activeCat === "all"
            ? d.categories.reduce((n, c) => n + c.items.length, 0)
            : (d.categories.find((c) => c.name === activeCat)?.items.length ??
              0)}{" "}
          {isTr ? "yetenek" : "skills"}
        </span>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
          {displayed.map((group) => (
            <SkillCard key={group.name} group={group} />
          ))}
          {displayed.length === 0 && (
            <p className={`text-[14px] ${t.text2}`}>
              {isTr ? "Yetenek bulunamadı." : "No skills found."}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // ─── Mobile: header + grid ────────────────────────────────────────────────
  const MobileLayout = () => (
    <div className="h-full flex flex-col" style={{ background: t.contentBg }}>
      {/* Category scrollbar header */}
      <div
        className="shrink-0 px-4 py-3 overflow-x-auto"
        style={{
          borderBottom: `1px solid ${t.sepColor}`,
          background: t.sidebarBg,
        }}
      >
        <div className="flex gap-2 min-w-max">
          {[
            { id: "all", label: isTr ? "Tümü" : "All" },
            ...d.categories.map((c) => ({ id: c.name, label: c.name })),
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCat(item.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                activeCat === item.id
                  ? "bg-[#007AFF] text-white"
                  : `${t.navHover} border border-transparent`
              }`}
              style={
                activeCat !== item.id ? { borderColor: t.sepColor } : undefined
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-1 gap-4">
          {displayed.map((group) => (
            <SkillCard key={group.name} group={group} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-hidden font-sans transition-colors duration-300">
      {/* Desktop: Finder sidebar + content */}
      <div className="hidden md:flex h-full">
        <Sidebar />
        <Content />
      </div>{" "}
      {/* Mobile: category pills + grid */}
      <div className="md:hidden h-full">
        <MobileLayout />
      </div>
    </div>
  );
};

export default Skills;
