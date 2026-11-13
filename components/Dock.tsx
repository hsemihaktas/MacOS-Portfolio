"use client";

import React from "react";
import Image from "next/image";
import { APPS } from "@/lib/constants";
import { AppID, WindowState, Language } from "@/lib/types";
import { Github, Linkedin } from "lucide-react";
import { useSiteConfig } from "@/lib/context/DataContext";
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

// ─── Reusable dark-glass tooltip ─────────────────────────────────────────────
const DockTooltip = ({ label }: { label: string }) => (
  <div
    className="absolute -top-[68px] left-1/2 -translate-x-1/2
      text-white text-[12px] font-medium px-3 py-1.5 rounded-[8px]
      opacity-0 group-hover:opacity-100 pointer-events-none select-none
      translate-y-1.5 group-hover:translate-y-0
      transition-all duration-150 whitespace-nowrap"
    style={{
      background: "rgba(28,28,30,0.88)",
      backdropFilter: "blur(16px) saturate(160%)",
      WebkitBackdropFilter: "blur(16px) saturate(160%)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
    }}
  >
    {label}
    {/* Arrow — outer layer (border color, 1px larger) */}
    <div
      style={{
        position: "absolute",
        bottom: -7,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: "7px solid rgba(255,255,255,0.10)",
      }}
    />
    {/* Arrow — inner layer (fill color, on top) */}
    <div
      style={{
        position: "absolute",
        bottom: -6,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: "6px solid rgba(28,28,30,0.88)",
      }}
    />
  </div>
);

// ─── Social link item ─────────────────────────────────────────────────────────
const SocialLinkItem = ({
  href,
  onClick,
  size,
  isMobile,
  label,
  bgClass,
  children,
}: {
  href: string;
  onClick: () => void;
  size: number;
  isMobile: boolean;
  label: string;
  bgClass: string;
  children: React.ReactNode;
}) => {
  if (isMobile) {
    return (
      <a
        href={href}
        target="_blank"
        onClick={onClick}
        style={{ width: size, height: size }}
        className={`backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg ${bgClass}`}
      >
        {children}
      </a>
    );
  }

  return (
    <div className="relative group cursor-default flex flex-col items-center">
      <DockTooltip label={label} />
      {/* Outer wrapper: full size for hover effects + alignment */}
      <a
        href={href}
        target="_blank"
        onClick={onClick}
        style={{ width: size, height: size }}
        className="flex items-center justify-center transition-all duration-300 transform origin-bottom
          group-hover:scale-[1.28] group-hover:-translate-y-3.5
          group-active:scale-95 group-active:translate-y-0
          ease-[cubic-bezier(0.25,1,0.5,1)]"
      >
        {/* Inner colored area: ~86% to match app icon visual weight */}
        <div
          style={{
            width: Math.round(size * 0.86),
            height: Math.round(size * 0.86),
          }}
          className={`rounded-xl flex items-center justify-center ${bgClass}`}
        >
          {children}
        </div>
      </a>
    </div>
  );
};

// ─── Social links group ───────────────────────────────────────────────────────
const SocialLinks = ({
  size = 52,
  isMobile = false,
  githubUrl,
  linkedinUrl,
  twitterUrl,
}: {
  size?: number;
  isMobile?: boolean;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
}) => (
  <>
    {githubUrl && (
      <SocialLinkItem
        href={githubUrl}
        onClick={trackGithubOpen}
        size={size}
        isMobile={isMobile}
        label="GitHub"
        bgClass="bg-black/70 hover:bg-black/80 border border-white/30"
      >
        <Github size={Math.round(size * 0.4)} className="text-white" />
      </SocialLinkItem>
    )}
    {linkedinUrl && (
      <SocialLinkItem
        href={linkedinUrl}
        onClick={trackLinkedinOpen}
        size={size}
        isMobile={isMobile}
        label="LinkedIn"
        bgClass="bg-[#0077b5] hover:bg-[#0088cc] border border-[#0099dd]/50"
      >
        <Linkedin
          size={Math.round(size * 0.4)}
          className="text-white fill-white"
        />
      </SocialLinkItem>
    )}
    {twitterUrl && (
      <SocialLinkItem
        href={twitterUrl}
        onClick={trackTwitterOpen}
        size={size}
        isMobile={isMobile}
        label="X (Twitter)"
        bgClass="bg-black/70 hover:bg-black/80 border border-white/30"
      >
        <svg
          viewBox="0 0 24 24"
          style={{ width: size * 0.41, height: size * 0.41 }}
          className="fill-white"
        >
          <path d={X_PATH} />
        </svg>
      </SocialLinkItem>
    )}
  </>
);

// ─── Dock ─────────────────────────────────────────────────────────────────────
const Dock: React.FC<DockProps> = ({
  onAppClick,
  windows,
  isMobile,
  isTablet,
  isOnline = true,
  getAppTitle,
}) => {
  const siteConfig = useSiteConfig();

  const apps = APPS.map((app) => ({
    ...app,
    iconUrl: siteConfig?.icons?.[app.id] ?? app.iconUrl,
  }));

  const isAnyWindowOpen = React.useMemo(
    () => windows.some((w) => w.isOpen && !w.isMinimized),
    [windows],
  );

  const glassStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.14)",
    backdropFilter: "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 22px 60px rgba(0,0,0,0.4)",
  };

  // ── Mobile ───────────────────────────────────────────────────────────────
  if (isMobile) {
    if (isAnyWindowOpen && isOnline) return null;
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] z-[9998]">
        <div className="rounded-[24px] p-3" style={glassStyle}>
          <div className="flex items-center gap-6 justify-center">
            <SocialLinks
              size={52}
              isMobile
              githubUrl={siteConfig?.github_url}
              linkedinUrl={siteConfig?.linkedin_url}
              twitterUrl={siteConfig?.twitter_url}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Tablet ───────────────────────────────────────────────────────────────
  if (isTablet) {
    return (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9998]">
        <div
          className="rounded-[28px] px-5 py-3 flex gap-4 items-center"
          style={glassStyle}
        >
          {isOnline &&
            apps.map((app) => (
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
          <SocialLinks
            size={52}
            isMobile
            githubUrl={siteConfig?.github_url}
            linkedinUrl={siteConfig?.linkedin_url}
            twitterUrl={siteConfig?.twitter_url}
          />
        </div>
      </div>
    );
  }

  // ── Desktop Offline ──────────────────────────────────────────────────────
  if (!isOnline) {
    return (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9999]">
        <div
          className="flex items-end gap-2 rounded-[24px] px-4 py-2.5"
          style={glassStyle}
        >
          <SocialLinks
            size={52}
            githubUrl={siteConfig?.github_url}
            linkedinUrl={siteConfig?.linkedin_url}
            twitterUrl={siteConfig?.twitter_url}
          />
        </div>
      </div>
    );
  }

  // ── Desktop Online ────────────────────────────────────────────────────────
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9999]">
      <div
        className="flex items-end gap-2 rounded-[24px] px-3 py-2.5"
        style={glassStyle}
      >
        {apps.map((app) => {
          const isOpen = windows.find((w) => w.id === app.id)?.isOpen;
          return (
            <div
              key={app.id}
              className="relative group cursor-default flex flex-col items-center"
              onClick={() => onAppClick(app.id)}
            >
              <DockTooltip label={getAppTitle(app.id)} />

              <div
                className="w-[52px] h-[52px] transition-all duration-300 transform
                  group-hover:scale-[1.28] group-hover:-translate-y-3.5
                  group-active:scale-95 group-active:translate-y-0
                  origin-bottom ease-[cubic-bezier(0.25,1,0.5,1)] relative"
              >
                <Image
                  src={app.iconUrl}
                  alt={getAppTitle(app.id)}
                  fill
                  sizes="52px"
                  className="object-contain drop-shadow-md"
                  draggable={false}
                />
              </div>

              {isOpen && (
                <div className="absolute -bottom-1 w-[4px] h-[4px] bg-white/90 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
              )}
            </div>
          );
        })}

        <div className="w-px h-9 bg-white/15 mx-1 self-center shrink-0" />

        <SocialLinks
          size={52}
          githubUrl={siteConfig?.github_url}
          linkedinUrl={siteConfig?.linkedin_url}
          twitterUrl={siteConfig?.twitter_url}
        />
      </div>
    </div>
  );
};

export default Dock;
