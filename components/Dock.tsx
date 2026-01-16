"use client";

import React from "react";
import Image from "next/image";
import { APPS } from "@/lib/constants";
import { AppID, WindowState, Language } from "@/lib/types";
import { Github, Linkedin } from "lucide-react";
import {
  trackGithubOpen,
  trackLinkedinOpen,
  trackTwitterOpen,
} from "@/lib/analytics";

interface DockProps {
  onAppClick: (id: AppID) => void;
  activeApp: AppID | null;
  windows: WindowState[];
  isMobile?: boolean;
  isTablet?: boolean;
  isOnline?: boolean;
  lang: Language;
  getAppTitle: (id: AppID) => string;
}

const X_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";

// Reusable Social Links Component
const SocialLinks = ({
  size = 48,
  isMobile = false,
}: {
  size?: number;
  isMobile?: boolean;
}) => {
  const baseClass = isMobile
    ? "backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg"
    : "group relative backdrop-blur-xl rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.2] hover:-translate-y-4 origin-bottom";

  return (
    <>
      <a
        href="https://github.com/hsemihaktas"
        target="_blank"
        onClick={trackGithubOpen}
        style={{ width: size, height: size }}
        className={`${baseClass} bg-black/70 hover:bg-black/80 border border-white/30`}
      >
        <Github size={size * 0.5} className="text-white" />
      </a>
      <a
        href="https://linkedin.com/in/hsemihaktas"
        target="_blank"
        onClick={trackLinkedinOpen}
        style={{ width: size, height: size }}
        className={`${baseClass} bg-[#0077b5] hover:bg-[#0088cc] border border-[#0099dd]/50`}
      >
        <Linkedin size={size * 0.5} className="text-white fill-white" />
      </a>
      <a
        href="https://twitter.com/hsemihaktas"
        target="_blank"
        onClick={trackTwitterOpen}
        style={{ width: size, height: size }}
        className={`${baseClass} bg-black/70 hover:bg-black/80 border border-white/30`}
      >
        <svg
          viewBox="0 0 24 24"
          style={{ width: size * 0.42, height: size * 0.42 }}
          className="fill-white"
        >
          <path d={X_PATH} />
        </svg>
      </a>
    </>
  );
};

const Dock: React.FC<DockProps> = ({
  onAppClick,
  windows,
  isMobile,
  isTablet,
  isOnline = true,
  getAppTitle,
}) => {
  const isAnyWindowOpen = React.useMemo(
    () => windows.some((w) => w.isOpen && !w.isMinimized),
    [windows]
  );

  // Mobile View
  if (isMobile) {
    if (isAnyWindowOpen && isOnline) return null;
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] z-[9998]">
        <div className="bg-white/20 backdrop-blur-3xl rounded-[24px] p-3 shadow-2xl border border-white/10 ring-1 ring-white/5">
          <div className="flex items-center gap-6 justify-center">
            <SocialLinks size={52} isMobile />
          </div>
        </div>
      </div>
    );
  }

  // Tablet View
  if (isTablet) {
    if (!isOnline) {
      return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9998]">
          <div className="bg-white/15 backdrop-blur-3xl rounded-[28px] px-5 py-3 flex gap-4 items-center shadow-2xl border border-white/10 ring-1 ring-white/5">
            <SocialLinks size={64} isMobile />
          </div>
        </div>
      );
    }
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9998]">
        <div className="bg-white/15 backdrop-blur-3xl rounded-[28px] px-5 py-3 flex gap-4 items-center shadow-2xl border border-white/10 ring-1 ring-white/5">
          {APPS.map((app) => (
            <div
              key={app.id}
              className="w-[64px] h-[64px] active:scale-90 transition-transform relative"
              onClick={() => onAppClick(app.id)}
            >
              <Image
                src={app.iconUrl}
                alt={getAppTitle(app.id)}
                fill
                sizes="64px"
                className="object-contain rounded-[15px] shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop View - Offline
  if (!isOnline) {
    return (
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2 z-[9999]">
        <div className="flex items-end gap-2 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[22px] px-3 py-2 shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
          <SocialLinks size={48} />
        </div>
      </div>
    );
  }

  // Desktop View - Online
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2 z-[9999]">
      <div className="flex items-end gap-3 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[22px] px-3 py-2 shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
        {APPS.map((app) => {
          const isOpen = windows.find((w) => w.id === app.id)?.isOpen;
          return (
            <div
              key={app.id}
              className="relative group cursor-default flex flex-col items-center"
              onClick={() => onAppClick(app.id)}
            >
              <div className="absolute -top-[55px] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-[#1d1d1f] text-[12px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl pointer-events-none transform translate-y-2 group-hover:translate-y-0 border border-black/5">
                {getAppTitle(app.id)}
              </div>
              <div className="w-[50px] h-[50px] transition-all duration-300 transform group-hover:scale-[1.3] group-hover:-translate-y-4 group-active:scale-95 group-active:translate-y-0 origin-bottom ease-[cubic-bezier(0.25,1,0.5,1)] relative">
                <Image
                  src={app.iconUrl}
                  alt={getAppTitle(app.id)}
                  fill
                  sizes="50px"
                  className="object-contain drop-shadow-md"
                  draggable={false}
                />
              </div>
              {isOpen && (
                <div className="absolute -bottom-1 w-[4px] h-[4px] bg-white rounded-full shadow-sm" />
              )}
            </div>
          );
        })}
        <div className="w-[1px] h-10 bg-white/20 mx-1.5 self-center" />
        <div className="flex items-center gap-2">
          <SocialLinks size={48} />
        </div>
      </div>
    </div>
  );
};

export default Dock;
