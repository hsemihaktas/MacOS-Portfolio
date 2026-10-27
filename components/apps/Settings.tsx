"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Language } from "@/lib/types";
import { DATA } from "@/lib/data";
import {
  Globe,
  Sun,
  Check,
  Wifi,
  Monitor,
  Palette,
  ChevronRight,
  Search,
} from "lucide-react";

interface SettingsProps {
  lang: Language;
  setLang: (l: Language) => void;
  isDarkMode: boolean;
  setDarkMode: (d: boolean) => void;
  brightness: number;
  setBrightness: (b: number) => void;
  isWifiEnabled: boolean;
  setIsWifiEnabled: (w: boolean) => void;
}

type Section = "appearance" | "display" | "wifi" | "language";

const SECTIONS = (
  lang: Language,
): {
  id: Section;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  gradient: string;
}[] => [
  {
    id: "appearance",
    gradient: "from-pink-500 to-rose-500",
    label: lang === "tr" ? "Görünüm" : "Appearance",
    sublabel: lang === "tr" ? "Tema ve renkler" : "Theme & colors",
    icon: <Palette size={16} />,
  },
  {
    id: "display",
    gradient: "from-blue-500 to-blue-600",
    label: lang === "tr" ? "Ekran" : "Display",
    sublabel: lang === "tr" ? "Parlaklık" : "Brightness",
    icon: <Monitor size={16} />,
  },
  {
    id: "wifi",
    gradient: "from-sky-500 to-cyan-500",
    label: "Wi-Fi",
    sublabel: lang === "tr" ? "Ağ bağlantısı" : "Network connection",
    icon: <Wifi size={16} />,
  },
  {
    id: "language",
    gradient: "from-orange-500 to-amber-500",
    label: lang === "tr" ? "Dil ve Bölge" : "Language & Region",
    sublabel: lang === "tr" ? "Türkçe / İngilizce" : "Turkish / English",
    icon: <Globe size={16} />,
  },
];

// Toggle switch component
const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${on ? "bg-[#34C759]" : "bg-black/20"}`}
    style={on ? {} : {}}
  >
    <span
      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200"
      style={{ transform: on ? "translateX(20px)" : "translateX(0)" }}
    />
  </button>
);

// Section row in content area
const Row = ({
  label,
  sublabel,
  right,
  border = true,
  dark,
}: {
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  border?: boolean;
  dark?: boolean;
}) => (
  <div
    className={`flex items-center justify-between px-4 py-3.5 ${border ? `border-b ${dark ? "border-white/[0.07]" : "border-black/[0.06]"}` : ""}`}
  >
    <div>
      <p
        className={`text-[14px] font-medium ${dark ? "text-white" : "text-[#1C1C1E]"}`}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className={`text-[12px] mt-0.5 ${dark ? "text-white/45" : "text-[#3C3C43]/60"}`}
        >
          {sublabel}
        </p>
      )}
    </div>
    {right}
  </div>
);

const SectionTitle = ({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <p
    className={`text-[11px] font-semibold uppercase tracking-[0.12em] px-1 mb-2 ${dark ? "text-white/40" : "text-[#6C6C70]"}`}
  >
    {children}
  </p>
);

const Card = ({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`rounded-2xl overflow-hidden border ${dark ? "border-white/[0.07] bg-[#2C2C2E]" : "border-black/[0.06] bg-white"}`}
  >
    {children}
  </div>
);

export default function Settings({
  lang,
  setLang,
  isDarkMode,
  setDarkMode,
  brightness,
  setBrightness,
  isWifiEnabled,
  setIsWifiEnabled,
}: SettingsProps) {
  const isTr = lang === "tr";
  const [active, setActive] = useState<Section>("appearance");
  const [search, setSearch] = useState("");
  const sections = SECTIONS(lang);
  const filtered = sections.filter(
    (s) => !search || s.label.toLowerCase().includes(search.toLowerCase()),
  );

  const dark = isDarkMode;
  const pageBg = dark ? "bg-[#1C1C1E]" : "bg-[#F2F2F7]";
  const sidebarBg = dark ? "bg-[#2C2C2E]" : "bg-[#FFFFFF]";
  const text1 = dark ? "text-white" : "text-[#1C1C1E]";
  const text2 = dark ? "text-white/45" : "text-[#3C3C43]/60";
  const sep = dark ? "border-white/[0.07]" : "border-black/[0.06]";

  // ─── Content panel for each section ────────────────────────────────────────
  const renderContent = () => {
    const section = sections.find((s) => s.id === active)!;
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Section title row */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white shadow-md`}
          >
            {section.icon}
          </div>
          <div>
            <h2 className={`text-[18px] font-bold ${text1} leading-tight`}>
              {section.label}
            </h2>
            <p className={`text-[12px] ${text2}`}>{section.sublabel}</p>
          </div>
        </div>

        {/* ── Görünüm ─────────────────────────────────────────────── */}
        {active === "appearance" && (
          <div className="space-y-5">
            <div>
              <SectionTitle dark={dark}>
                {isTr ? "Tema" : "Appearance"}
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    mode: false,
                    label: isTr ? "Açık" : "Light",
                    preview: (
                      <div className="w-full h-full bg-[#F2F2F7] p-2.5 flex flex-col gap-1.5">
                        <div className="w-full h-4 bg-[#EBEBEB] rounded-md" />
                        <div className="flex gap-1.5">
                          <div className="w-1/3 h-14 bg-white rounded-lg border border-black/5" />
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="h-4 bg-white rounded-md border border-black/5" />
                            <div className="h-4 bg-white rounded-md border border-black/5" />
                            <div className="w-2/3 h-4 bg-white rounded-md border border-black/5" />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    mode: true,
                    label: isTr ? "Koyu" : "Dark",
                    preview: (
                      <div className="w-full h-full bg-[#1C1C1E] p-2.5 flex flex-col gap-1.5">
                        <div className="w-full h-4 bg-[#2C2C2E] rounded-md" />
                        <div className="flex gap-1.5">
                          <div className="w-1/3 h-14 bg-[#2C2C2E] rounded-lg border border-white/[0.07]" />
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="h-4 bg-[#2C2C2E] rounded-md border border-white/[0.07]" />
                            <div className="h-4 bg-[#2C2C2E] rounded-md border border-white/[0.07]" />
                            <div className="w-2/3 h-4 bg-[#2C2C2E] rounded-md border border-white/[0.07]" />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                ].map(({ mode, label, preview }) => (
                  <button
                    key={label}
                    onClick={() => setDarkMode(mode)}
                    className={`flex flex-col items-center gap-2.5 cursor-default group transition-all`}
                  >
                    <div
                      className={`w-full aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200
                      ${isDarkMode === mode ? "border-[#007AFF] shadow-[0_0_0_2px_rgba(0,122,255,0.2)]" : "border-transparent opacity-55 hover:opacity-85"}`}
                    >
                      {preview}
                    </div>
                    <span
                      className={`text-[13px] font-medium ${text1} flex items-center gap-1.5`}
                    >
                      {isDarkMode === mode && (
                        <span className="w-2 h-2 rounded-full bg-[#007AFF]" />
                      )}
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Ekran ───────────────────────────────────────────────── */}
        {active === "display" && (
          <div className="space-y-5">
            <div>
              <SectionTitle dark={dark}>
                {isTr ? "Parlaklık" : "Brightness"}
              </SectionTitle>
              <Card dark={dark}>
                <div className="px-4 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[14px] font-medium ${text1}`}>
                      {isTr ? "Parlaklık" : "Brightness"}
                    </span>
                    <span className={`text-[14px] font-semibold ${text1}`}>
                      {brightness}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun size={14} className={text2} />
                    <div
                      className={`flex-1 h-1.5 rounded-full relative ${dark ? "bg-white/15" : "bg-black/15"}`}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-[#007AFF] transition-all"
                        style={{ width: `${brightness}%` }}
                      />
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={brightness}
                        onChange={(e) =>
                          setBrightness(parseInt(e.target.value))
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md pointer-events-none transition-all"
                        style={{ left: `calc(${brightness}% - 8px)` }}
                      />
                    </div>
                    <Sun size={18} className={text1} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ── Wi-Fi ───────────────────────────────────────────────── */}
        {active === "wifi" && (
          <div className="space-y-5">
            <div>
              <SectionTitle dark={dark}>Wi-Fi</SectionTitle>
              <Card dark={dark}>
                <Row
                  label="Wi-Fi"
                  sublabel={
                    isWifiEnabled
                      ? isTr
                        ? "Bağlı — Home_Network"
                        : "Connected — Home_Network"
                      : isTr
                        ? "Kapalı"
                        : "Off"
                  }
                  right={
                    <Toggle
                      on={isWifiEnabled}
                      onToggle={() => setIsWifiEnabled(!isWifiEnabled)}
                    />
                  }
                  border={false}
                  dark={dark}
                />
              </Card>
            </div>
            {isWifiEnabled && (
              <div>
                <SectionTitle dark={dark}>
                  {isTr ? "Mevcut Ağlar" : "Available Networks"}
                </SectionTitle>
                <Card dark={dark}>
                  {["Home_Network", "Portfolio_5G", "MacOS_Network"].map(
                    (net, i, arr) => (
                      <Row
                        key={net}
                        label={net}
                        sublabel={
                          i === 0
                            ? isTr
                              ? "✓ Bağlı"
                              : "✓ Connected"
                            : undefined
                        }
                        right={
                          i === 0 ? (
                            <span className="text-[12px] text-[#007AFF] font-medium">
                              {isTr ? "Bağlı" : "Connected"}
                            </span>
                          ) : (
                            <ChevronRight size={14} className={text2} />
                          )
                        }
                        border={i < arr.length - 1}
                        dark={dark}
                      />
                    ),
                  )}
                </Card>
              </div>
            )}
          </div>
        )}

        {/* ── Dil ─────────────────────────────────────────────────── */}
        {active === "language" && (
          <div className="space-y-5">
            <div>
              <SectionTitle dark={dark}>
                {isTr ? "Dil" : "Preferred Language"}
              </SectionTitle>
              <Card dark={dark}>
                {(["tr", "en"] as Language[]).map((l, i, arr) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors
                      ${i < arr.length - 1 ? `border-b ${sep}` : ""}
                      ${lang === l ? "bg-[#007AFF]/8" : dark ? "hover:bg-white/5" : "hover:bg-black/[0.04]"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {l === "tr" ? "🇹🇷" : "🇺🇸"}
                      </span>
                      <div className="text-left">
                        <p className={`text-[14px] font-medium ${text1}`}>
                          {l === "tr" ? "Türkçe" : "English"}
                        </p>
                        <p className={`text-[12px] ${text2}`}>
                          {l === "tr" ? "Turkish" : "İngilizce"}
                        </p>
                      </div>
                    </div>
                    {lang === l && (
                      <Check size={16} className="text-[#007AFF]" />
                    )}
                  </button>
                ))}
              </Card>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Mobile layout ───────────────────────────────────────────────────────
  const MobileLayout = () => (
    <div className={`${pageBg} h-full overflow-auto custom-scrollbar`}>
      {/* Profile header */}
      <div
        className={`${dark ? "bg-[#2C2C2E]" : "bg-white"} border-b ${sep} px-5 py-5 flex items-center gap-4`}
      >
        <div className="relative w-14 h-14 shrink-0">
          <Image
            src="/images/profilePicture.jpeg"
            alt="Profile"
            fill
            className="object-cover rounded-full"
            sizes="56px"
          />
        </div>
        <div>
          <p className={`text-[16px] font-semibold ${text1}`}>
            Hasan Semih Aktaş
          </p>
          <p className={`text-[12px] ${text2}`}>Apple ID · iCloud</p>
        </div>
      </div>

      {/* Section list */}
      <div className="px-4 py-4 space-y-3">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id === active ? s.id : s.id)}
            className={`w-full ${dark ? "bg-[#2C2C2E]" : "bg-white"} rounded-2xl overflow-hidden border ${sep}`}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3.5 ${dark ? "hover:bg-white/5" : "hover:bg-black/[0.03]"}`}
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-sm`}
              >
                {s.icon}
              </div>
              <div className="flex-1 text-left">
                <p className={`text-[15px] font-medium ${text1}`}>{s.label}</p>
                <p className={`text-[12px] ${text2}`}>{s.sublabel}</p>
              </div>
              <ChevronRight size={16} className={text2} />
            </div>
            {active === s.id && (
              <div className={`border-t ${sep} px-4 py-4`}>
                {renderContent()}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ─── Desktop layout ──────────────────────────────────────────────────────
  const DesktopLayout = () => (
    <div className="h-full flex">
      {/* Sidebar */}
      <div
        className={`w-[240px] ${sidebarBg} border-r ${sep} flex flex-col shrink-0`}
      >
        {/* Profile */}
        <div className="px-4 pt-5 pb-4 flex items-center gap-3">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/images/profilePicture.jpeg"
              alt="Profile"
              fill
              className="object-cover rounded-full shadow-sm"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className={`text-[13px] font-semibold ${text1} truncate`}>
              Hasan Semih Aktaş
            </p>
            <p className={`text-[11px] ${text2}`}>Apple ID</p>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pb-3">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${dark ? "bg-white/8" : "bg-black/[0.06]"}`}
          >
            <Search size={13} className={text2} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isTr ? "Ayarları Ara" : "Search Settings"}
              className={`bg-transparent border-none outline-none text-[12px] w-full ${text1} placeholder:${text2}`}
              style={{ color: dark ? "white" : "#1C1C1E" }}
            />
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-auto px-2 space-y-0.5 pb-4">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150
                ${
                  active === s.id
                    ? dark
                      ? "bg-white/10"
                      : "bg-[#007AFF]/10"
                    : dark
                      ? "hover:bg-white/5"
                      : "hover:bg-black/[0.04]"
                }`}
            >
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-sm shrink-0`}
              >
                {s.icon}
              </div>
              <span
                className={`text-[13px] font-medium ${active === s.id ? (dark ? "text-white" : "text-[#007AFF]") : text1} flex-1 text-left truncate`}
              >
                {s.label}
              </span>
              {active === s.id && (
                <div
                  className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-white/60" : "bg-[#007AFF]"} shrink-0`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 ${pageBg} overflow-auto custom-scrollbar`}>
        <div className="max-w-xl mx-auto px-6 py-8">{renderContent()}</div>
      </div>
    </div>
  );

  return (
    <div className={`h-full overflow-hidden transition-colors duration-300`}>
      <div className="hidden sm:block h-full">
        <DesktopLayout />
      </div>
      <div className="sm:hidden h-full">
        <MobileLayout />
      </div>
    </div>
  );
}
