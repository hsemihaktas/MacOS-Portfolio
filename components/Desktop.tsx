"use client";

import React from "react";
import Image from "next/image";
import { APPS } from "@/lib/constants";
import { AppID, Language } from "@/lib/types";

interface DesktopProps {
  onIconClick: (id: AppID) => void;
  isMobile?: boolean;
  isTablet?: boolean;
  lang: Language;
  getAppTitle: (id: AppID) => string;
}

const Desktop: React.FC<DesktopProps> = ({
  onIconClick,
  isMobile,
  isTablet,
  lang,
  getAppTitle,
}) => {
  const containerClass = isMobile
    ? "absolute inset-0 pt-20 pb-24 px-6 grid grid-cols-4 gap-y-8 content-start"
    : isTablet
    ? "absolute inset-0 pt-24 pb-32 px-12 grid grid-cols-5 gap-y-12 content-start"
    : "absolute inset-0 pt-12 pb-24 px-8 flex flex-col flex-wrap content-start gap-x-12 gap-y-10 [direction:rtl]";

  const iconSize = isMobile
    ? "w-[62px] h-[62px]"
    : isTablet
    ? "w-[72px] h-[72px]"
    : "w-[54px] h-[54px]";
  const iconRadius = isMobile || isTablet ? "rounded-[14px]" : "rounded-none";

  return (
    <div
      className={`${containerClass} select-none h-full w-full pointer-events-none`}
    >
      {APPS.map((app) => (
        <div
          key={app.id}
          className="group flex flex-col items-center gap-1.5 cursor-default transition-all duration-300 pointer-events-auto [direction:ltr]"
          onDoubleClick={() => !isMobile && !isTablet && onIconClick(app.id)}
          onClick={() => (isMobile || isTablet) && onIconClick(app.id)}
        >
          <div
            className={`relative ${iconSize} transition-all duration-200 group-active:scale-90 group-hover:scale-105 group-active:brightness-90`}
          >
            <Image
              src={app.iconUrl}
              alt={getAppTitle(app.id)}
              fill
              sizes="(max-width: 768px) 62px, (max-width: 1024px) 72px, 54px"
              className={`object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${iconRadius}`}
              draggable={false}
            />
          </div>
          <span
            className={`text-white text-center leading-tight truncate px-1.5 py-0.5 rounded-[5px] transition-all
            ${
              isMobile || isTablet
                ? "text-[11px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                : "text-[11px] font-semibold bg-black/20 group-hover:bg-[#007AFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shadow-sm"
            }`}
          >
            {getAppTitle(app.id)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Desktop;
