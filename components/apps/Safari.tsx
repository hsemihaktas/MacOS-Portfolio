"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { DATA } from "@/lib/data";
import { Language } from "@/lib/types";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Compass,
  Globe,
  Share2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Github,
  Linkedin,
} from "lucide-react";

interface SafariProps {
  lang: Language;
  isDarkMode?: boolean;
  isMobile?: boolean;
  initialUrl?: string;
  initialTitle?: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";

const START_PAGE_URL = "safari://start";

export default function Safari({
  lang,
  isDarkMode = false,
  isMobile = false,
  initialUrl,
  initialTitle,
}: SafariProps) {
  const d = DATA[lang].projects;

  // Extract all projects that have a websiteLink
  const webProjects = useMemo(() => {
    return d.items.filter((item) => Boolean(item.websiteLink));
  }, [d.items]);

  // History tracking with Start Page support
  const [history, setHistory] = useState<string[]>(() => {
    if (initialUrl) {
      return [START_PAGE_URL, initialUrl];
    }
    return [START_PAGE_URL];
  });
  const [historyIndex, setHistoryIndex] = useState<number>(() => {
    return initialUrl ? 1 : 0;
  });

  const [currentUrl, setCurrentUrl] = useState<string>(
    initialUrl || (webProjects[0]?.websiteLink ?? "https://rewound.vercel.app/")
  );
  const [inputUrl, setInputUrl] = useState<string>(
    initialUrl || START_PAGE_URL
  );
  const [isStartPage, setIsStartPage] = useState<boolean>(!initialUrl);

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(initialUrl));
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);

  const urlInputRef = useRef<HTMLInputElement>(null);
  const lastInitialUrlRef = useRef<string | undefined>(initialUrl);

  // Update when initialUrl prop changes from outside (e.g. clicking Live Demo in Projects)
  useEffect(() => {
    if (initialUrl && initialUrl !== lastInitialUrlRef.current) {
      lastInitialUrlRef.current = initialUrl;
      setIsStartPage(false);
      setCurrentUrl(initialUrl);
      setInputUrl(initialUrl);
      setIsLoading(true);

      setHistory((prev) => {
        // If current top is already this url, avoid duplicating
        if (prev[historyIndex] === initialUrl) {
          return prev;
        }
        const next = [...prev.slice(0, historyIndex + 1), initialUrl];
        setHistoryIndex(next.length - 1);
        return next;
      });
      setIframeKey((k) => k + 1);
    }
  }, [initialUrl, historyIndex]);

  const navigateTo = (url: string) => {
    let target = url.trim();
    if (!target) return;

    if (target === START_PAGE_URL) {
      setIsStartPage(true);
      setIsLoading(false);
      setInputUrl(START_PAGE_URL);
      setHistory((prev) => {
        if (prev[historyIndex] === START_PAGE_URL) return prev;
        const next = [...prev.slice(0, historyIndex + 1), START_PAGE_URL];
        setHistoryIndex(next.length - 1);
        return next;
      });
      return;
    }

    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = `https://${target}`;
    }

    setIsStartPage(false);
    setCurrentUrl(target);
    setInputUrl(target);
    setIsLoading(true);

    setHistory((prev) => {
      // Don't add duplicate if target is identical to current point
      if (prev[historyIndex] === target) {
        return prev;
      }
      const next = [...prev.slice(0, historyIndex + 1), target];
      setHistoryIndex(next.length - 1);
      return next;
    });
    setIframeKey((k) => k + 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      const targetUrl = history[nextIndex];
      setHistoryIndex(nextIndex);

      if (targetUrl === START_PAGE_URL) {
        setIsStartPage(true);
        setIsLoading(false);
        setInputUrl(START_PAGE_URL);
      } else {
        setIsStartPage(false);
        setCurrentUrl(targetUrl);
        setInputUrl(targetUrl);
        setIsLoading(true);
        setIframeKey((k) => k + 1);
      }
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const targetUrl = history[nextIndex];
      setHistoryIndex(nextIndex);

      if (targetUrl === START_PAGE_URL) {
        setIsStartPage(true);
        setIsLoading(false);
        setInputUrl(START_PAGE_URL);
      } else {
        setIsStartPage(false);
        setCurrentUrl(targetUrl);
        setInputUrl(targetUrl);
        setIsLoading(true);
        setIframeKey((k) => k + 1);
      }
    }
  };

  const handleGoToStartPage = () => {
    if (isStartPage) return;
    setIsStartPage(true);
    setIsLoading(false);
    setInputUrl(START_PAGE_URL);
    setHistory((prev) => {
      if (prev[historyIndex] === START_PAGE_URL) return prev;
      const next = [...prev.slice(0, historyIndex + 1), START_PAGE_URL];
      setHistoryIndex(next.length - 1);
      return next;
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleOpenExternal = () => {
    if (currentUrl && !isStartPage) {
      window.open(currentUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Extract display domain for address bar
  const displayDomain = useMemo(() => {
    if (isStartPage) return lang === "tr" ? "Başlangıç Sayfası" : "Start Page";
    try {
      const urlObj = new URL(currentUrl);
      return urlObj.hostname.replace(/^www\./, "");
    } catch {
      return currentUrl.replace(/^https?:\/\//, "");
    }
  }, [currentUrl, isStartPage, lang]);

  // Current active project matching the URL if any
  const matchedProject = useMemo(() => {
    return webProjects.find(
      (p) =>
        p.websiteLink &&
        currentUrl.toLowerCase().includes(p.websiteLink.replace(/\/$/, "").toLowerCase())
    );
  }, [webProjects, currentUrl]);

  // Explicit theme variables (avoids Tailwind dark: override bugs in light mode)
  const bgPrimary = isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f5f5f7]";
  const bgToolbar = isDarkMode ? "bg-[#252526]/95" : "bg-[#f0f0f2]/95";
  const bgAddress = isDarkMode ? "bg-[#181818]" : "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]";
  const textColor = isDarkMode ? "text-white" : "text-[#1d1d1f]";
  const headingColor = isDarkMode ? "text-white/80" : "text-[#1d1d1f]/80";
  const textMuted = isDarkMode ? "text-white/50" : "text-black/55";
  const borderStyle = isDarkMode ? "border-white/10" : "border-black/[0.08]";
  const bgCard = isDarkMode
    ? "bg-white/[0.04] hover:bg-white/[0.08]"
    : "bg-white hover:bg-black/[0.03] shadow-[0_1px_4px_rgba(0,0,0,0.05)]";

  return (
    <div className={`h-full w-full flex flex-col ${bgPrimary} ${textColor} font-sans overflow-hidden relative`}>
      {/* Safari Unified Toolbar - Fully Responsive */}
      <div className={`h-11 sm:h-12 ${bgToolbar} select-none backdrop-blur-xl border-b ${borderStyle} flex items-center justify-between px-2 sm:px-3 md:px-4 gap-1.5 sm:gap-2 md:gap-3 shrink-0 z-20`}>
        {/* Navigation Buttons */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <button
            onClick={handleBack}
            disabled={historyIndex <= 0}
            title={lang === "tr" ? "Geri" : "Back"}
            className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${
              historyIndex > 0
                ? isDarkMode
                  ? "hover:bg-white/10 text-white cursor-pointer active:scale-95"
                  : "hover:bg-black/5 text-[#1d1d1f] cursor-pointer active:scale-95"
                : "opacity-30 cursor-default text-black/30"
            }`}
          >
            <ChevronLeft size={17} />
          </button>

          {/* Forward button */}
          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            title={lang === "tr" ? "İleri" : "Forward"}
            className={`w-7 h-7 ${historyIndex >= history.length - 1 ? "hidden sm:flex opacity-30 cursor-default text-black/30" : "flex cursor-pointer"} items-center justify-center rounded-md transition-all ${
              historyIndex < history.length - 1
                ? isDarkMode
                  ? "hover:bg-white/10 text-white active:scale-95"
                  : "hover:bg-black/5 text-[#1d1d1f] active:scale-95"
                : ""
            }`}
          >
            <ChevronRight size={17} />
          </button>

          <button
            onClick={handleGoToStartPage}
            title={lang === "tr" ? "Başlangıç Sayfası" : "Start Page"}
            className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${
              isStartPage
                ? "text-[#007AFF]"
                : isDarkMode
                ? "hover:bg-white/10 text-white active:scale-95"
                : "hover:bg-black/5 text-[#1d1d1f] active:scale-95"
            }`}
          >
            <Compass size={15} />
          </button>
        </div>

        {/* Unified Address & Search Bar */}
        <div className="flex-1 min-w-0 max-w-xl mx-1 sm:mx-2 relative group">
          <div
            onClick={() => {
              setIsEditingUrl(true);
              setTimeout(() => urlInputRef.current?.select(), 50);
            }}
            className={`h-7 sm:h-8 w-full ${bgAddress} border ${borderStyle} rounded-lg flex items-center px-2 sm:px-3 gap-1.5 sm:gap-2 cursor-text transition-all ${
              isEditingUrl ? "ring-2 ring-[#007AFF]/50 border-[#007AFF]" : ""
            }`}
          >
            <Lock size={11} className="text-emerald-500 shrink-0" />

            {isEditingUrl ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsEditingUrl(false);
                  navigateTo(inputUrl);
                }}
                className="flex-1 min-w-0 flex items-center"
              >
                <input
                  ref={urlInputRef}
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onBlur={() => setIsEditingUrl(false)}
                  className={`w-full bg-transparent border-none outline-none text-[12px] sm:text-[13px] font-normal ${textColor}`}
                  autoFocus
                />
              </form>
            ) : (
              <div className="flex-1 min-w-0 flex items-center justify-center gap-1.5 overflow-hidden">
                <span className={`text-[11px] sm:text-[13px] font-medium tracking-tight truncate ${textColor}`}>
                  {displayDomain}
                </span>
                {matchedProject && (
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#007AFF]/10 text-[#007AFF] shrink-0 hidden md:inline-block">
                    {matchedProject.title}
                  </span>
                )}
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRefresh();
              }}
              className={`${textMuted} hover:${textColor} transition-colors shrink-0`}
            >
              <RotateCw size={11} className={isLoading ? "animate-spin text-[#007AFF]" : ""} />
            </button>
          </div>

          {/* Animated Safari Loading Progress Bar */}
          {isLoading && !isStartPage && (
            <div className="absolute -bottom-1 left-1.5 right-1.5 h-[2px] bg-black/5 overflow-hidden rounded-full">
              <div className="h-full bg-gradient-to-r from-[#007AFF] via-[#34C759] to-[#007AFF] animate-pulse w-full transition-all duration-300" />
            </div>
          )}
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Responsive Viewport Switcher - Desktop only */}
          {!isStartPage && !isMobile && (
            <div className={`hidden md:flex items-center ${isDarkMode ? "bg-white/5" : "bg-black/5"} p-0.5 rounded-lg border ${borderStyle}`}>
              <button
                onClick={() => setViewMode("desktop")}
                title={lang === "tr" ? "Masaüstü Görünümü" : "Desktop View"}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "desktop"
                    ? isDarkMode ? "bg-black/40 text-[#007AFF]" : "bg-white text-[#007AFF] shadow-xs"
                    : `${textMuted} hover:${textColor}`
                }`}
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setViewMode("tablet")}
                title={lang === "tr" ? "Tablet Görünümü (768px)" : "Tablet View (768px)"}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "tablet"
                    ? isDarkMode ? "bg-black/40 text-[#007AFF]" : "bg-white text-[#007AFF] shadow-xs"
                    : `${textMuted} hover:${textColor}`
                }`}
              >
                <Tablet size={14} />
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                title={lang === "tr" ? "Mobil Görünümü (390px)" : "Mobile View (390px)"}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "mobile"
                    ? isDarkMode ? "bg-black/40 text-[#007AFF]" : "bg-white text-[#007AFF] shadow-xs"
                    : `${textMuted} hover:${textColor}`
                }`}
              >
                <Smartphone size={14} />
              </button>
            </div>
          )}

          {/* Copy Link Button - Tablet/Desktop */}
          {!isStartPage && (
            <button
              onClick={handleCopyLink}
              title={lang === "tr" ? "Bağlantıyı Kopyala" : "Copy Link"}
              className={`hidden sm:flex w-7 h-7 items-center justify-center rounded-md transition-all ${
                isDarkMode
                  ? "hover:bg-white/10 text-white active:scale-95"
                  : "hover:bg-black/5 text-[#1d1d1f] active:scale-95"
              }`}
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Share2 size={14} className={textMuted} />
              )}
            </button>
          )}

          {/* "Gerçek siteyi ziyaret et" Button */}
          {!isStartPage && (
            <button
              onClick={handleOpenExternal}
              title={
                lang === "tr"
                  ? "Gerçek siteyi yeni sekmede aç"
                  : "Open real live website in new tab"
              }
              className="flex items-center justify-center gap-1.5 h-7 sm:h-8 px-2.5 sm:px-3 bg-[#007AFF] hover:bg-[#0071E3] text-white text-[11px] sm:text-[12px] font-bold rounded-lg shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <span className="hidden md:inline">
                {lang === "tr" ? "Gerçek Siteyi Ziyaret Et" : "Visit Live Site"}
              </span>
              <span className="hidden sm:inline md:hidden">
                {lang === "tr" ? "Siteyi Aç" : "Open"}
              </span>
              <ExternalLink size={13} className="shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full h-[calc(100%-44px)] sm:h-[calc(100%-48px)] overflow-hidden relative flex flex-col">
        {isStartPage ? (
          /* Safari Start Page / Favorites */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 animate-in fade-in duration-300 pb-12">
              {/* Header */}
              <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 pt-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 relative drop-shadow-xl mb-1">
                  <Image
                    src="/images/icons/safari.png"
                    alt="Safari"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${textColor}`}>
                  {lang === "tr" ? "Safari Favorileri" : "Safari Favorites"}
                </h1>
                <p className={`${textMuted} text-xs sm:text-sm max-w-md font-medium px-4`}>
                  {lang === "tr"
                    ? "Görüntülemek istediğiniz canlı projeyi seçin veya üst adres çubuğuna bir bağlantı girin."
                    : "Select a live project to preview or enter a URL in the address bar above."}
                </p>
              </div>

              {/* Projects Favorites Grid */}
              <div className="space-y-3 sm:space-y-4">
                <div className={`flex items-center justify-between border-b ${borderStyle} pb-2 px-1`}>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={15} className="text-[#007AFF]" />
                    <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider ${headingColor}`}>
                      {lang === "tr" ? "Canlı Web Siteleri" : "Live Websites"}
                    </h2>
                  </div>
                  <span className={`text-[11px] font-semibold ${textMuted}`}>
                    {webProjects.length} {lang === "tr" ? "proje" : "projects"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
                  {webProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => navigateTo(project.websiteLink!)}
                      className={`group p-2.5 sm:p-3 rounded-2xl border ${borderStyle} ${bgCard} transition-all duration-200 cursor-pointer flex flex-col items-center text-center`}
                    >
                      <div className="w-full aspect-[16/10] relative rounded-xl overflow-hidden mb-2 sm:mb-3 bg-black/5 border border-black/5">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className={`text-[12px] sm:text-[13px] font-bold line-clamp-1 group-hover:text-[#007AFF] transition-colors ${textColor}`}>
                        {project.title}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] ${textMuted} truncate w-full mt-0.5`}>
                        {project.websiteLink?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Developer Links */}
              <div className="space-y-3 sm:space-y-4 pt-2">
                <div className={`flex items-center gap-1.5 border-b ${borderStyle} pb-2 px-1`}>
                  <Globe size={15} className="text-emerald-500" />
                  <h2 className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-wider ${headingColor}`}>
                    {lang === "tr" ? "Geliştirici Bağlantıları" : "Developer Links"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {/* GitHub Card with Official GitHub Logo */}
                  <a
                    href="https://github.com/hsemihaktas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border ${borderStyle} ${bgCard} transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                        <Github size={20} className="text-white" />
                      </div>
                      <div>
                        <div className={`text-[12px] sm:text-[13px] font-bold ${textColor}`}>GitHub</div>
                        <div className={`text-[10px] sm:text-[11px] ${textMuted}`}>github.com/hsemihaktas</div>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className={textMuted} />
                  </a>

                  {/* LinkedIn Card with Official Logo */}
                  <a
                    href="https://linkedin.com/in/hsemihaktas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border ${borderStyle} ${bgCard} transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0077b5] text-white flex items-center justify-center shrink-0 shadow-sm border border-[#0099dd]/30">
                        <Linkedin size={20} className="text-white fill-white" />
                      </div>
                      <div>
                        <div className={`text-[12px] sm:text-[13px] font-bold ${textColor}`}>LinkedIn</div>
                        <div className={`text-[10px] sm:text-[11px] ${textMuted}`}>linkedin.com/in/hsemihaktas</div>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className={textMuted} />
                  </a>

                  {/* X / Twitter Card with Official Logo */}
                  <a
                    href="https://twitter.com/hsemihaktas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border ${borderStyle} ${bgCard} transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-[12px] sm:text-[13px] font-bold ${textColor}`}>X (Twitter)</div>
                        <div className={`text-[10px] sm:text-[11px] ${textMuted}`}>x.com/hsemihaktas</div>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className={textMuted} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Live Website Iframe Viewer */
          <div className={`flex-1 w-full h-full flex flex-col items-center justify-center relative ${isDarkMode ? "bg-[#121212]" : "bg-white"} overflow-hidden`}>
            {/* Loading Indicator */}
            {isLoading && (
              <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${isDarkMode ? "bg-[#181818]/80" : "bg-white/80"} backdrop-blur-md animate-in fade-in duration-200`}>
                <div className={`w-11 h-11 rounded-2xl ${isDarkMode ? "bg-[#252526] border-white/10" : "bg-white border-black/5"} shadow-xl border flex items-center justify-center mb-3`}>
                  <RotateCw size={20} className="animate-spin text-[#007AFF]" />
                </div>
                <p className={`text-[13px] font-bold ${textColor}`}>
                  {matchedProject?.title || displayDomain}
                </p>
                <p className={`text-[11px] ${textMuted} mt-0.5`}>
                  {lang === "tr" ? "Sayfa yükleniyor..." : "Loading page..."}
                </p>
              </div>
            )}

            {/* Viewport Container: On mobile device, always edge-to-edge 100% full screen */}
            <div
              className={`w-full h-full flex items-center justify-center transition-all duration-300 p-0 ${
                !isMobile && viewMode === "tablet" ? "py-4" : !isMobile && viewMode === "mobile" ? "py-4" : ""
              }`}
            >
              <div
                className={`transition-all duration-300 h-full relative ${
                  isMobile || viewMode === "desktop"
                    ? "w-full rounded-none border-none overflow-y-auto"
                    : viewMode === "tablet"
                    ? "w-[768px] max-w-[95%] rounded-3xl shadow-2xl border-[8px] border-black/80 ring-1 ring-white/10 bg-black overflow-hidden"
                    : "w-[390px] max-w-[90%] rounded-[48px] shadow-2xl border-[10px] border-black/90 ring-1 ring-white/20 bg-black overflow-hidden"
                }`}
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "auto",
                }}
              >
                {/* Mobile Dynamic Island simulation on desktop only */}
                {!isMobile && viewMode === "mobile" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-3 h-3 rounded-full bg-[#111] mr-2" />
                  </div>
                )}

                <iframe
                  key={iframeKey}
                  src={currentUrl}
                  title={matchedProject?.title || "Safari Browser"}
                  className="w-full h-full border-none bg-white block"
                  scrolling="yes"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "100%",
                    border: "none",
                    touchAction: "auto",
                  }}
                  onLoad={() => setIsLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>

            {/* Bottom Floating Info Pill - Hidden on mobile */}
            <div className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full shadow-lg border border-white/15 flex items-center gap-2 text-[11px] font-medium pointer-events-auto">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>
                  {lang === "tr"
                    ? "Tam ekran veya harici görüntülemek için:"
                    : "To view full screen in external tab:"}
                </span>
                <button
                  onClick={handleOpenExternal}
                  className="font-bold underline hover:text-[#007AFF] transition-colors cursor-pointer"
                >
                  {lang === "tr" ? "Gerçek Siteyi Aç" : "Open Live Site"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
