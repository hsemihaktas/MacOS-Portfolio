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
import { DATA } from "@/lib/data";

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

  // Apple Logo
  const AppleLogo = (
    <Image
      src="/images/icons/apple-logo-white.png"
      alt="Apple"
      width={16}
      height={16}
      className="object-contain"
    />
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
    <div className="absolute top-0 left-0 right-0 h-[32px] bg-transparent backdrop-blur-none flex items-center justify-between px-4 text-[13px] font-bold text-white shadow-sm z-[9999] border-b border-white/5 select-none">
      <div className="flex items-center gap-4 relative">
        <div className="px-2 py-1 hover:bg-white/10 rounded-md transition-colors cursor-default flex items-center justify-center">
          {AppleLogo}
        </div>
        <span className="font-black tracking-tight">{activeAppTitle}</span>

        <div className="relative" ref={helpMenuRef}>
          <button
            onClick={() => setShowHelpMenu(!showHelpMenu)}
            className={`cursor-default px-2 py-0.5 rounded-md transition-colors font-semibold opacity-90 ${
              showHelpMenu ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            {t.help}
          </button>

          {showHelpMenu && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-[#1e1e1e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-150 z-[10000]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 relative">
                  <Image
                    src="/images/icons/mail.png"
                    alt="Mail"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">
                    {lang === "tr" ? "İLETİŞİM" : "CONTACT"}
                  </span>
                  <a
                    href={`mailto:${d.email}`}
                    className="text-[12px] font-bold text-white/90 hover:text-blue-400 transition-colors break-all leading-tight"
                  >
                    {d.email}
                  </a>
                </div>
              </div>
              <div className="h-[1px] bg-white/10 w-full my-3"></div>
              <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                {lang === "tr"
                  ? "Herhangi bir soru veya proje fikriniz için yukarıdaki adrese e-posta gönderebilirsiniz."
                  : "Feel free to send an email for any questions or project ideas."}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 opacity-90">
          <div className="flex items-center gap-1 opacity-70">
            <span className="text-[10px] font-black mr-0.5">98%</span>
            <Battery size={18} strokeWidth={2.5} />
          </div>
          {WifiIcon}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSearchClick();
            }}
            className="p-1 hover:bg-white/10 rounded-md"
          >
            <Search size={15} strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onControlClick();
            }}
            className="p-1 hover:bg-white/10 rounded-md"
          >
            <SlidersHorizontal size={15} strokeWidth={3} />
          </button>
        </div>
        <div className="flex gap-3 font-bold tracking-tight opacity-95">
          <span className="hidden lg:block">{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
