"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Wifi,
  WifiOff,
  Search,
  SlidersHorizontal,
  Battery,
  Signal,
} from "lucide-react";
import { Language } from "@/lib/types";
import { usePortfolioData, useSiteConfig } from "@/lib/context/DataContext";

interface MenuBarProps {
  activeAppTitle: string;
  lang: Language;
  onSearchClick: () => void;
  onControlClick: () => void;
  isMobile?: boolean;
  isTablet?: boolean;
  isWifiEnabled?: boolean;
  isDarkMode?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({
  activeAppTitle,
  lang,
  onSearchClick,
  onControlClick,
  isMobile,
  isTablet,
  isWifiEnabled = true,
  isDarkMode = false,
}) => {
  const [time, setTime] = useState(new Date());
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const DATA = usePortfolioData();
  const config = useSiteConfig();
  const helpMenuRef = useRef<HTMLDivElement>(null);
  const t = DATA[lang].menu;
  const d = DATA[lang].about;

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Menu dışına tıklayınca kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helpMenuRef.current &&
        !helpMenuRef.current.contains(event.target as Node)
      ) {
        setShowHelpMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedTime = mounted
    ? time.toLocaleTimeString(lang === "tr" ? "tr-TR" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";
  const formattedDate = mounted
    ? time.toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "---";

  const WifiIcon = isWifiEnabled ? (
    <Wifi size={17} strokeWidth={2.5} className="text-white" />
  ) : (
    <WifiOff size={17} strokeWidth={2.5} className="text-white/40" />
  );

  // Apple Logo — siteConfig gelene kadar boş göster
  const appleSrc = config?.icons?.["apple-logo"] ?? null;
  const AppleLogo = appleSrc ? (
    <Image
      src={appleSrc}
      alt="Apple"
      width={16}
      height={16}
      className="object-contain"
    />
  ) : (
    <div className="w-4 h-4" /> // placeholder
  );

  // MOBILE VIEW (iPhone Style Status Bar)
  if (isMobile) {
    return (
      <div className="absolute top-0 left-0 right-0 h-[54px] flex items-center justify-between px-7 text-[15px] font-black text-white z-[9999] select-none pt-4 bg-transparent">
        <div className="tracking-tight text-[16px] cursor-default">
          {formattedTime}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onControlClick();
          }}
          className="flex items-center gap-2 cursor-pointer active:opacity-50 transition-opacity p-2 -mr-2"
        >
          <Signal size={16} strokeWidth={3} />
          {isWifiEnabled ? (
            <Wifi size={17} strokeWidth={3} />
          ) : (
            <WifiOff size={17} strokeWidth={3} className="text-white/40" />
          )}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-black">98</span>
            <div className="w-6 h-3 border border-white/40 rounded-[3.5px] relative flex items-center px-[1px]">
              <div className="h-[80%] bg-white rounded-[1.5px] w-[80%]"></div>
              <div className="absolute -right-1.5 w-1 h-1.5 bg-white/40 rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DESKTOP/TABLET VIEW
  return (
    <div
      className="absolute top-0 left-0 right-0 h-[28px] flex items-center justify-between px-3 text-[13px] text-white z-[9999] select-none"
      style={{
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(40px) saturate(180%) brightness(0.95)",
        WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.25)",
      }}
    >
      {/* Sol: Apple logo + uygulama adı + menü */}
      <div className="flex items-center gap-0.5 relative">
        <div className="w-8 h-full flex items-center justify-center hover:bg-white/10 rounded transition-colors cursor-default">
          {AppleLogo}
        </div>

        <span className="font-semibold tracking-tight px-2 cursor-default">
          {activeAppTitle}
        </span>

        <div className="relative" ref={helpMenuRef}>
          <button
            onClick={() => setShowHelpMenu(!showHelpMenu)}
            className={`cursor-default px-2 py-0.5 rounded transition-colors font-normal opacity-90 ${
              showHelpMenu ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            {t.help}
          </button>

          {showHelpMenu && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-[#1e1e1e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-150 z-[10000]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 relative">
                  <Image
                    src="https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/mail.png"
                    alt="Mail"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5">
                    {lang === "tr" ? "İLETİŞİM" : "CONTACT"}
                  </span>
                  <a
                    href={`mailto:${d.email}`}
                    className="text-[12px] font-medium text-white/90 hover:text-blue-400 transition-colors break-all leading-tight"
                  >
                    {d.email}
                  </a>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full my-3" />
              <p className="text-[11px] text-white/50 leading-relaxed font-normal">
                {lang === "tr"
                  ? "Herhangi bir soru veya proje fikriniz için yukarıdaki adrese e-posta gönderebilirsiniz."
                  : "Feel free to send an email for any questions or project ideas."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sağ: sistem ikonları + tarih saat */}
      <div className="flex items-center gap-1">
        <div className="px-1.5 opacity-90">{WifiIcon}</div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSearchClick();
          }}
          className="p-1.5 hover:bg-white/10 rounded transition-colors opacity-90"
        >
          <Search size={14} strokeWidth={2} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onControlClick();
          }}
          className="p-1.5 hover:bg-white/10 rounded transition-colors opacity-90"
        >
          <SlidersHorizontal size={14} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-1.5 pl-1.5 font-normal opacity-90 tabular-nums">
          <span className="hidden lg:inline">{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
