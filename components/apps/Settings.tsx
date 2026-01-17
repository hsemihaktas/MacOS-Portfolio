"use client";

import React, { useState } from "react";
import { Language } from "@/lib/types";
import { DATA } from "@/lib/data";
import {
  Globe,
  Sun,
  Moon,
  Check,
  Wifi,
  WifiOff,
  Monitor,
  Palette,
  Smartphone,
  ChevronRight,
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

type SettingsSection = "appearance" | "display" | "wifi" | "language";

const Settings: React.FC<SettingsProps> = ({
  lang,
  setLang,
  isDarkMode,
  setDarkMode,
  brightness,
  setBrightness,
  isWifiEnabled,
  setIsWifiEnabled,
}) => {
  const d = DATA[lang].settings;
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("appearance");
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [openSections, setOpenSections] = useState<SettingsSection[]>([]);

  const bgPrimary = isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f2f2f7]";
  const bgSidebar = isDarkMode ? "bg-white/5" : "bg-black/5";
  const bgContent = isDarkMode ? "bg-[#121212]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const borderStyle = isDarkMode ? "border-white/10" : "border-black/5";

  const toggleMobileSection = (section: SettingsSection) => {
    if (openSections.includes(section)) {
      setOpenSections(openSections.filter((s) => s !== section));
    } else {
      setOpenSections([...openSections, section]);
    }
  };

  const sidebarItems: {
    id: SettingsSection;
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: "appearance",
      label: lang === "tr" ? "Görünüm" : "Appearance",
      icon: <Palette size={18} />,
      color: "bg-pink-500",
    },
    {
      id: "display",
      label: lang === "tr" ? "Ekran" : "Display",
      icon: <Monitor size={18} />,
      color: "bg-blue-500",
    },
    {
      id: "wifi",
      label: "Wi-Fi",
      icon: <Wifi size={18} />,
      color: "bg-blue-600",
    },
    {
      id: "language",
      label: lang === "tr" ? "Dil" : "Language",
      icon: <Globe size={18} />,
      color: "bg-orange-500",
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "appearance":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
            <div>
              <h2 className={`text-[20px] font-black mb-6 ${textColor}`}>
                {lang === "tr" ? "Görünüm" : "Appearance"}
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div
                  onClick={() => setDarkMode(false)}
                  className="flex flex-col items-center gap-3 cursor-default group"
                >
                  <div
                    className={`w-full aspect-[4/3] rounded-xl border-4 transition-all duration-200 overflow-hidden ${!isDarkMode ? "border-blue-500 shadow-lg scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02] hover:shadow-md bg-white shadow-sm"}`}
                  >
                    <div className="w-full h-full bg-[#f2f2f7] p-2 flex flex-col gap-1">
                      <div className="w-full h-3 bg-white rounded-sm border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"></div>
                      <div className="w-2/3 h-2 bg-black/10 rounded-sm"></div>
                    </div>
                  </div>
                  <span className={`text-[13px] font-bold ${textColor}`}>
                    {lang === "tr" ? "Açık" : "Light"}
                  </span>
                </div>
                <div
                  onClick={() => setDarkMode(true)}
                  className="flex flex-col items-center gap-3 cursor-default group"
                >
                  <div
                    className={`w-full aspect-[4/3] rounded-xl border-4 transition-all duration-200 overflow-hidden ${isDarkMode ? "border-blue-500 shadow-lg scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02] hover:shadow-md bg-[#1e1e1e] shadow-sm"}`}
                  >
                    <div className="w-full h-full bg-[#121212] p-2 flex flex-col gap-1">
                      <div className="w-full h-3 bg-white/10 rounded-sm border border-white/5 shadow-[0_1px_2px_rgba(255,255,255,0.05)]"></div>
                      <div className="w-2/3 h-2 bg-white/10 rounded-sm"></div>
                    </div>
                  </div>
                  <span className={`text-[13px] font-bold ${textColor}`}>
                    {lang === "tr" ? "Koyu" : "Dark"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "display":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
            <div>
              <h2 className={`text-[20px] font-black mb-6 ${textColor}`}>
                {lang === "tr" ? "Ekran" : "Display"}
              </h2>
              <div
                className={`p-6 rounded-2xl ${isDarkMode ? "bg-white/5" : "bg-[#fcfcfc]"} border ${borderStyle} shadow-sm`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-[14px] font-bold ${textColor} opacity-60`}
                  >
                    {lang === "tr" ? "Parlaklık" : "Brightness"}
                  </span>
                  <span className={`text-[14px] font-black ${textColor}`}>
                    {brightness}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Sun size={18} className="opacity-40" />
                  <div
                    className={`flex-1 h-8 rounded-full relative overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-black/10"}`}
                  >
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    <div
                      className="absolute top-0 left-0 bottom-0 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.1)] transition-all"
                      style={{ width: `${brightness}%` }}
                    ></div>
                  </div>
                  <Sun size={24} className="opacity-80" />
                </div>
              </div>
            </div>
          </div>
        );

      case "wifi":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
            <div>
              <h2 className={`text-[20px] font-black mb-6 ${textColor}`}>
                Wi-Fi
              </h2>
              <div
                className={`p-4 rounded-2xl ${isDarkMode ? "bg-white/5" : "bg-[#fcfcfc]"} border ${borderStyle} shadow-sm flex items-center justify-between`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isWifiEnabled ? "bg-blue-500 text-white" : "bg-black/10 text-black/40"}`}
                  >
                    <Wifi size={20} />
                  </div>
                  <div>
                    <div className={`text-[14px] font-bold ${textColor}`}>
                      Wi-Fi
                    </div>
                    <div
                      className={`text-[12px] font-medium ${textColor} opacity-40`}
                    >
                      {isWifiEnabled ? "Home_Net (Bağlı)" : "Kapalı"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsWifiEnabled(!isWifiEnabled)}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${isWifiEnabled ? "bg-blue-500" : "bg-black/20"}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-all ${isWifiEnabled ? "ml-6" : "ml-0"} shadow-md`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        );

      case "language":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
            <div>
              <h2 className={`text-[20px] font-black mb-6 ${textColor}`}>
                {lang === "tr" ? "Dil ve Bölge" : "Language & Region"}
              </h2>
              <div
                className={`rounded-2xl ${isDarkMode ? "bg-white/5" : "bg-[#fcfcfc]"} border ${borderStyle} shadow-sm overflow-hidden`}
              >
                {["tr", "en"].map((l, idx) => (
                  <button
                    key={l}
                    onClick={() => setLang(l as Language)}
                    className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-200 ${idx !== 1 ? `border-b ${borderStyle}` : ""} ${lang === l ? "bg-blue-500/10" : isDarkMode ? "hover:bg-white/10" : "hover:bg-black/[0.08]"}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className={`text-[14px] font-bold ${textColor}`}>
                        {l === "tr" ? "Türkçe" : "English"}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${textColor} opacity-40 uppercase tracking-widest`}
                      >
                        {l}
                      </span>
                    </div>
                    {lang === l && (
                      <Check size={18} className="text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`h-full ${bgContent} flex font-sans transition-colors duration-500`}
    >
      {/* Settings Sidebar - Hidden on mobile */}
      <div
        className={`hidden sm:flex w-[240px] ${bgSidebar} border-r ${borderStyle} flex-col pt-6 shrink-0`}
      >
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white font-black text-lg">
            HS
          </div>
          <div className="flex flex-col">
            <span
              className={`text-[15px] font-black tracking-tight ${textColor}`}
            >
              Hasan Semih Aktaş
            </span>
            <span className={`text-[11px] font-bold ${textColor} opacity-40`}>
              Apple ID
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? isDarkMode
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-white shadow-md border border-black/5"
                  : isDarkMode
                    ? `hover:bg-white/10 hover:shadow-sm ${textColor} opacity-80 hover:opacity-100`
                    : `hover:bg-black/[0.08] hover:shadow-sm ${textColor} opacity-80 hover:opacity-100`
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform duration-200 ${activeSection === item.id && !isDarkMode ? item.color : activeSection === item.id && isDarkMode ? "bg-white/20" : item.color} ${activeSection !== item.id ? "group-hover:scale-110" : ""}`}
              >
                {item.icon}
              </div>
              <span className="text-[13px] font-bold">{item.label}</span>
              {activeSection !== item.id && (
                <ChevronRight
                  size={14}
                  className={`ml-auto transition-all duration-200 ${isDarkMode ? "opacity-20 group-hover:opacity-40" : "opacity-20 group-hover:opacity-40"}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - iOS Style Accordion */}
      <div className="sm:hidden flex-1 overflow-auto">
        <div
          className={`${isDarkMode ? "bg-[#1c1c1e]" : "bg-[#f2f2f7]"} min-h-full`}
        >
          {/* Profile Section */}
          <div
            className={`${isDarkMode ? "bg-[#2c2c2e]" : "bg-white"} px-4 py-4 mb-6`}
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white font-black text-xl">
                HS
              </div>
              <div className="flex flex-col">
                <span className={`text-[17px] font-semibold ${textColor}`}>
                  Hasan Semih Aktaş
                </span>
                <span
                  className={`text-[13px] ${isDarkMode ? "text-white/40" : "text-black/40"}`}
                >
                  Apple ID, iCloud
                </span>
              </div>
            </div>
          </div>

          {/* Settings Accordion List */}
          <div className="px-4 pb-8 space-y-2">
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                className={`${isDarkMode ? "bg-[#2c2c2e]" : "bg-white"} rounded-xl overflow-hidden`}
              >
                <button
                  onClick={() => toggleMobileSection(item.id)}
                  className="w-full p-4 flex items-center gap-3 active:opacity-70 transition-opacity"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[17px] font-medium ${textColor} flex-1 text-left`}
                  >
                    {item.label}
                  </span>
                  <ChevronRight
                    size={20}
                    className={`${isDarkMode ? "text-white/30" : "text-black/30"} transition-transform ${openSections.includes(item.id) ? "rotate-90" : ""}`}
                  />
                </button>

                {openSections.includes(item.id) &&
                  (() => {
                    if (activeSection !== item.id) {
                      setActiveSection(item.id);
                    }
                    return null;
                  })()}

                {openSections.includes(item.id) &&
                  activeSection === item.id && (
                    <div
                      className={`px-4 pb-4 border-t ${borderStyle} animate-in slide-in-from-top-2 duration-200`}
                    >
                      {renderSection()}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Content Area */}
      <div className="hidden sm:block flex-1 overflow-auto p-6 sm:p-12 max-w-4xl mx-auto w-full custom-scrollbar">
        {renderSection()}
      </div>
    </div>
  );
};

export default Settings;
