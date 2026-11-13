"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Project, Language } from "@/lib/types";
import { transformImg } from "@/lib/supabase";
import { usePortfolioData } from "@/lib/context/DataContext";
import {
  LayoutGrid,
  ChevronLeft,
  Github,
  Globe,
  CheckCircle2,
  Code2,
  Smartphone,
  Monitor,
  Tag,
} from "lucide-react";

// ─── shimmer placeholder ──────────────────────────────────────────────────────
const shimmerSvg = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#888" stop-opacity="0.08"/>
      <stop offset="50%"  stop-color="#888" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#888" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmerSvg(700, 440))}`;
const blurPortrait = `data:image/svg+xml;base64,${toBase64(shimmerSvg(400, 800))}`;

// ─── Design tokens (same as About/Skills) ────────────────────────────────────
function tk(dark?: boolean) {
  return {
    sidebarBg: dark ? "#252527" : "#F0F0F2",
    contentBg: dark ? "#1C1C1E" : "#FFFFFF",
    cardBg: dark ? "#2C2C2E" : "#F5F5F7",
    sepColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    text1: dark ? "text-white" : "text-[#1C1C1E]",
    text2: dark ? "text-white/55" : "text-[#3C3C43]/75",
    text3: dark ? "text-white/35" : "text-[#3C3C43]/45",
    labelFg: dark ? "text-white/35" : "text-[#6C6C70]",
    navActive: dark
      ? "bg-[#0A84FF]/20 text-[#0A84FF]"
      : "bg-[#007AFF]/10 text-[#007AFF]",
    navHover: dark
      ? "text-white/60 hover:bg-white/5"
      : "text-[#3C3C43] hover:bg-black/[0.04]",
    tagActive: dark ? "bg-[#007AFF] text-white" : "bg-[#007AFF] text-white",
    tagIdle: dark
      ? "bg-white/[0.06] text-white/55 border border-white/[0.07] hover:bg-white/10"
      : "bg-black/[0.04] text-[#3C3C43] border border-black/[0.07] hover:bg-black/[0.07]",
  };
}

interface ProjectsProps {
  lang: Language;
  isDarkMode?: boolean;
  initialFilter?: string;
  initialProjectId?: number;
  onOpenSafari?: (url: string, title?: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({
  lang,
  isDarkMode,
  initialFilter,
  initialProjectId,
  onOpenSafari,
}) => {
  const DATA = usePortfolioData();
  const d = DATA[lang].projects;
  const t = tk(isDarkMode);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<"mobile" | "web" | null>(
    null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [selectedProject]);

  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter);
      setSelectedProject(null);
    } else if (initialProjectId) {
      const p = d.items.find((i) => i.id === initialProjectId);
      if (p) {
        setSelectedProject(p);
        setFilter(null);
      }
    } else {
      setFilter(null);
      setSelectedProject(null);
    }
  }, [initialFilter, initialProjectId, d.items]);

  const filteredItems = useMemo(() => {
    let items = d.items;
    if (platformFilter)
      items = items.filter((i) => i.platform === platformFilter);
    if (filter) items = items.filter((i) => i.tags.includes(filter));
    return items;
  }, [filter, platformFilter, d.items]);

  const allTags = useMemo(
    () => Array.from(new Set(d.items.flatMap((p) => p.tags))),
    [d.items],
  );

  const isTr = lang === "tr";

  // active view title
  const viewTitle = selectedProject
    ? selectedProject.title
    : (filter ??
      (platformFilter === "mobile"
        ? isTr
          ? "Mobil Uygulamalar"
          : "Mobile Apps"
        : platformFilter === "web"
          ? isTr
            ? "Web Siteleri"
            : "Websites"
          : d.title));

  // ─── Sidebar (JSX variable — not inner component) ───────────────────────
  const sidebar = (
    <div
      className="w-[220px] shrink-0 hidden lg:flex flex-col border-r overflow-hidden"
      style={{ background: t.sidebarBg, borderColor: t.sepColor }}
    >
      <div className="flex-1 overflow-auto custom-scrollbar px-2 py-3">
        {/* Library */}
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 pt-3 pb-1.5 ${t.labelFg}`}
        >
          {isTr ? "KÜTÜPHANE" : "LIBRARY"}
        </p>
        <ul className="space-y-0.5">
          {[
            {
              id: null as "mobile" | "web" | null,
              icon: <LayoutGrid size={14} className="shrink-0" />,
              label: isTr ? "Tüm Projeler" : "All Projects",
              cond: !filter && !platformFilter && !selectedProject,
            },
            {
              id: "mobile" as const,
              icon: <Smartphone size={14} className="shrink-0" />,
              label: isTr ? "Mobil Uygulamalar" : "Mobile Apps",
              cond: platformFilter === "mobile",
            },
            {
              id: "web" as const,
              icon: <Monitor size={14} className="shrink-0" />,
              label: isTr ? "Web Siteleri" : "Websites",
              cond: platformFilter === "web",
            },
          ].map((item) => (
            <li
              key={String(item.id)}
              onClick={() => {
                setPlatformFilter(item.id ?? null);
                setFilter(null);
                setSelectedProject(null);
              }}
              className={`flex items-center gap-2.5 px-2.5 py-[6px] rounded-lg cursor-default transition-all ${item.cond ? t.navActive : t.navHover}`}
            >
              {item.icon}
              <span className="text-[13px] font-medium">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 pt-5 pb-2 ${t.labelFg}`}
        >
          {isTr ? "YETENEKLER" : "SKILLS"}
        </p>
        <div className="px-1 flex flex-col gap-0.5">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setFilter(tag);
                setPlatformFilter(null);
                setSelectedProject(null);
              }}
              className={`flex items-center gap-2 px-2.5 py-[5px] rounded-lg text-left cursor-default transition-all ${
                filter === tag ? t.navActive : t.navHover
              }`}
            >
              <Tag size={12} className="shrink-0 opacity-70" />
              <span className="text-[12px] font-medium truncate">{tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer: project count */}
      <div
        className="px-4 py-3"
        style={{ borderTop: `1px solid ${t.sepColor}` }}
      >
        <p className={`text-[11px] ${t.labelFg}`}>
          {filteredItems.length} {isTr ? "proje" : "projects"}
        </p>
      </div>
    </div>
  );

  // ─── Project card renderer (regular function, not component) ────────────
  const renderCard = (project: Project, index: number) => (
    <div
      className="group cursor-default flex flex-col"
      onClick={() => setSelectedProject(project)}
    >
      <div
        className="aspect-[16/10] rounded-xl overflow-hidden border relative"
        style={{ background: t.cardBg, borderColor: t.sepColor }}
      >
        <Image
          src={transformImg(project.image, { width: 800, quality: 80 })}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={index < 6}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="mt-3 px-0.5">
        <h4
          className={`text-[14px] font-semibold ${t.text1} group-hover:text-[#007AFF] transition-colors leading-tight`}
        >
          {project.title}
        </h4>
        <p className={`text-[12px] ${t.text3} mt-0.5 line-clamp-1`}>
          {project.description}
        </p>
      </div>
    </div>
  );

  // ─── Detail renderer (regular function, not component) ──────────────────
  const renderDetail = (project: Project) => (
    <div className="animate-in fade-in duration-200 max-w-3xl pb-16">
      {/* Hero */}
      <div
        className="relative rounded-xl overflow-hidden border aspect-[16/9] mb-6"
        style={{ borderColor: t.sepColor }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>

      {/* Title + buttons */}
      <h2 className={`text-[26px] font-bold ${t.text1} tracking-tight mb-4`}>
        {project.title}
      </h2>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        {project.websiteLink && (
          <button
            onClick={() =>
              onOpenSafari
                ? onOpenSafari(project.websiteLink!, project.title)
                : window.open(project.websiteLink, "_blank")
            }
            className="inline-flex items-center gap-2 bg-[#007AFF] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:brightness-110 transition-all cursor-pointer"
          >
            <Globe size={14} /> {d.liveDemo}
          </button>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
              isDarkMode
                ? "bg-white/8 hover:bg-white/12 text-white border-white/10"
                : "bg-black/[0.04] hover:bg-black/[0.08] text-[#1C1C1E] border-black/10"
            }`}
          >
            <Github size={14} /> {d.repo}
          </a>
        )}
        {project.appStoreLink && (
          <a
            href={project.appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-black/80 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
        )}
        {project.androidStoreLink && (
          <a
            href={project.androidStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3DDC84] text-black px-4 py-2 rounded-lg text-[13px] font-semibold hover:brightness-95 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.303 2.303-8.633-8.635z" />
            </svg>
            Play Store
          </a>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
              isDarkMode
                ? "bg-white/[0.06] text-white/70 border-white/[0.08]"
                : "bg-black/[0.04] text-[#3C3C43] border-black/[0.07]"
            }`}
          >
            <Code2 size={10} />
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className={`text-[14px] leading-relaxed mb-8 ${t.text2}`}>
        {project.description}
      </p>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mb-8">
          <h3 className={`text-[15px] font-bold ${t.text1} mb-3`}>
            {d.screenshotsTitle}
          </h3>
          <div className="overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex gap-3">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border"
                  style={{ width: 160, height: 320, borderColor: t.sepColor }}
                >
                  <Image
                    src={src}
                    alt={`screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="160px"
                    placeholder="blur"
                    blurDataURL={blurPortrait}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <div>
          <h3 className={`text-[15px] font-bold ${t.text1} mb-3`}>
            {d.featuresTitle}
          </h3>
          <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: t.sepColor }}
          >
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3"
                style={
                  i < project.features!.length - 1
                    ? { borderBottom: `1px solid ${t.sepColor}` }
                    : undefined
                }
              >
                <CheckCircle2
                  size={15}
                  className="text-[#34C759] shrink-0 mt-0.5"
                />
                <p className={`text-[13px] leading-relaxed ${t.text2}`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ─── Main content ─────────────────────────────────────────────────────────
  return (
    <div
      className="flex h-full font-sans overflow-hidden"
      style={{ color: isDarkMode ? "white" : "#1C1C1E" }}
    >
      {sidebar}

      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ background: t.contentBg }}
      >
        {/* Toolbar */}
        <div
          className="h-[44px] shrink-0 flex items-center px-5 gap-3"
          style={{ borderBottom: `1px solid ${t.sepColor}` }}
        >
          {(selectedProject || filter || platformFilter) && (
            <button
              onClick={() => {
                setSelectedProject(null);
                setFilter(null);
                setPlatformFilter(null);
              }}
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                isDarkMode ? "hover:bg-white/8" : "hover:bg-black/[0.06]"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <h3 className={`text-[14px] font-semibold ${t.text1} truncate`}>
            {viewTitle}
          </h3>
          {!selectedProject && (
            <span className={`text-[12px] ml-auto ${t.text3}`}>
              {filteredItems.length} {isTr ? "öğe" : "items"}
            </span>
          )}
        </div>

        {/* Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto p-5 custom-scrollbar"
        >
          {!selectedProject ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-8">
              {filteredItems.map((project, i) => (
                <div key={project.id}>{renderCard(project, i)}</div>
              ))}
            </div>
          ) : (
            renderDetail(selectedProject)
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
