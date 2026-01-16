"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Project, Language } from "@/lib/types";
import { DATA } from "@/lib/data";
import {
  LayoutGrid,
  ChevronLeft,
  Github,
  Globe,
  CheckCircle2,
  X,
  Code2,
  Smartphone,
  Monitor,
} from "lucide-react";

interface ProjectsProps {
  lang: Language;
  isDarkMode?: boolean;
  initialFilter?: string;
  initialProjectId?: number;
}

const Projects: React.FC<ProjectsProps> = ({
  lang,
  isDarkMode,
  initialFilter,
  initialProjectId,
}) => {
  const d = DATA[lang].projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<"mobile" | "web" | null>(
    null
  );

  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter);
      setSelectedProject(null);
    } else if (initialProjectId) {
      const p = d.items.find((item) => item.id === initialProjectId);
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

    if (platformFilter) {
      items = items.filter((item) => item.platform === platformFilter);
    }

    if (filter) {
      items = items.filter((item) => item.tags.includes(filter));
    }

    return items;
  }, [filter, platformFilter, d.items]);

  const allTags = useMemo(() => {
    return Array.from(new Set(d.items.flatMap((p) => p.tags)));
  }, [d.items]);

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setFilter(tag);
    setSelectedProject(null);
  };

  const bgPrimary = isDarkMode ? "bg-[#121212]" : "bg-white";
  const bgSidebar = isDarkMode ? "bg-[#1A1A1A]/70" : "bg-[#F5F5F7]/50";
  const bgCard = isDarkMode ? "bg-[#1E1E1E]" : "bg-[#F5F5F7]";
  const textColor = isDarkMode ? "text-white" : "text-[#1D1D1F]";
  const textMuted = isDarkMode ? "text-white/30" : "text-black/20";
  const borderStyle = isDarkMode ? "border-white/5" : "border-black/[0.05]";

  return (
    <div
      className={`flex h-full ${textColor} font-sans ${bgPrimary} transition-colors duration-500 overflow-hidden`}
    >
      <div
        className={`w-[200px] ${bgSidebar} backdrop-blur-xl border-r ${borderStyle} p-5 shrink-0 hidden lg:flex flex-col overflow-hidden`}
      >
        {/* Kütüphane - Sabit */}
        <div className="shrink-0">
          <h4
            className={`text-[10px] font-black ${textMuted} uppercase tracking-[0.2em] mb-4 px-2`}
          >
            {lang === "tr" ? "KÜTÜPHANE" : "LIBRARY"}
          </h4>
          <ul className="space-y-1">
            <li
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-default transition-all ${
                !filter && !selectedProject && !platformFilter
                  ? isDarkMode
                    ? "bg-white/10 text-[#007AFF]"
                    : "bg-white shadow-sm text-[#007AFF]"
                  : isDarkMode
                  ? "hover:bg-white/10 text-white/50 hover:text-white"
                  : "hover:bg-black/5 text-black/50 hover:text-black"
              }`}
              onClick={() => {
                setFilter(null);
                setPlatformFilter(null);
                setSelectedProject(null);
              }}
            >
              <LayoutGrid size={15} />
              <span className="text-[13px] font-bold">
                {lang === "tr" ? "Tüm Projeler" : "All Projects"}
              </span>
            </li>
            <li
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-default transition-all ${
                platformFilter === "mobile"
                  ? isDarkMode
                    ? "bg-white/10 text-[#007AFF]"
                    : "bg-white shadow-sm text-[#007AFF]"
                  : isDarkMode
                  ? "hover:bg-white/10 text-white/50 hover:text-white"
                  : "hover:bg-black/5 text-black/50 hover:text-black"
              }`}
              onClick={() => {
                setPlatformFilter("mobile");
                setFilter(null);
                setSelectedProject(null);
              }}
            >
              <Smartphone size={15} />
              <span className="text-[13px] font-bold">
                {lang === "tr" ? "Mobil Uygulamalar" : "Mobile Apps"}
              </span>
            </li>
            <li
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-default transition-all ${
                platformFilter === "web"
                  ? isDarkMode
                    ? "bg-white/10 text-[#007AFF]"
                    : "bg-white shadow-sm text-[#007AFF]"
                  : isDarkMode
                  ? "hover:bg-white/10 text-white/50 hover:text-white"
                  : "hover:bg-black/5 text-black/50 hover:text-black"
              }`}
              onClick={() => {
                setPlatformFilter("web");
                setFilter(null);
                setSelectedProject(null);
              }}
            >
              <Monitor size={15} />
              <span className="text-[13px] font-bold">
                {lang === "tr" ? "Web Siteleri" : "Websites"}
              </span>
            </li>
          </ul>
        </div>

        {/* Yetenekler - Scroll edilebilir */}
        <div className="flex-1 mt-6 flex flex-col overflow-hidden">
          <h4
            className={`text-[10px] font-black ${textMuted} uppercase tracking-[0.2em] mb-4 px-2 shrink-0`}
          >
            {lang === "tr" ? "YETENEKLER" : "SKILLS"}
          </h4>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="flex flex-wrap gap-2 px-1 pb-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setFilter(tag);
                    setPlatformFilter(null);
                    setSelectedProject(null);
                  }}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all border ${
                    filter === tag
                      ? "bg-[#007AFF] text-white border-[#007AFF]"
                      : `${
                          isDarkMode
                            ? "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                            : "bg-white text-black/50 border-black/5 hover:bg-black/5"
                        }`
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 flex flex-col overflow-hidden ${bgPrimary}`}>
        <div
          className={`h-16 border-b ${borderStyle} flex items-center justify-between px-4 md:px-8 bg-transparent backdrop-blur-xl sticky top-0 z-10 shrink-0`}
        >
          <div className="flex items-center gap-3">
            {(selectedProject || filter) && (
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setFilter(null);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  isDarkMode ? "hover:bg-white/5" : "hover:bg-black/5"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h3 className="text-[18px] font-black tracking-tight truncate">
              {selectedProject
                ? selectedProject.title
                : filter
                ? `${filter}`
                : d.title}
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
          {!selectedProject ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto pb-10">
              {filteredItems.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className={`aspect-[16/10] ${bgCard} rounded-[32px] overflow-hidden border ${borderStyle} shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-5 px-1">
                    <h4 className="text-[19px] font-black tracking-tight group-hover:text-[#007AFF] transition-colors">
                      {project.title}
                    </h4>
                    <p
                      className={`text-[14px] ${
                        isDarkMode ? "text-white/40" : "text-black/50"
                      } font-medium line-clamp-2 leading-relaxed mt-1`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-6xl mx-auto pb-24">
              {/* Hero Image */}
              <div
                className={`relative rounded-[40px] overflow-hidden shadow-2xl border ${borderStyle} mb-12 group`}
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-[600px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode
                      ? "from-black/60 via-transparent to-transparent"
                      : "from-black/40 via-transparent to-transparent"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>

              {/* Content Section */}
              <div className="space-y-8">
                {/* Title & Action Buttons */}
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                    {selectedProject.title}
                  </h2>

                  {/* Action Buttons - Moved to top */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 bg-[#007AFF] text-white px-8 py-4 rounded-2xl font-bold hover:brightness-110 transition-all hover:shadow-lg hover:shadow-[#007AFF]/30 hover:-translate-y-0.5"
                      >
                        <Globe size={20} />
                        {d.liveDemo}
                      </a>
                    )}
                    <a
                      href={selectedProject.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border ${borderStyle} transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                        isDarkMode
                          ? "bg-white/5 hover:bg-white/10 text-white"
                          : "bg-white hover:bg-black/5 text-black border-black/10"
                      }`}
                    >
                      <Github size={20} />
                      {d.repo}
                    </a>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 hover:scale-105 ${
                          isDarkMode
                            ? "bg-gradient-to-r from-[#007AFF]/20 to-[#5E5CE6]/20 text-[#64D2FF] border border-[#007AFF]/30 hover:border-[#007AFF]/50"
                            : "bg-gradient-to-r from-[#007AFF]/10 to-[#5E5CE6]/10 text-[#007AFF] border border-[#007AFF]/20 hover:border-[#007AFF]/40"
                        }`}
                      >
                        <Code2 size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-[18px] ${
                    isDarkMode ? "text-white/70" : "text-black/60"
                  } font-medium leading-relaxed`}
                >
                  {selectedProject.description}
                </p>

                {/* Features Section - Enhanced Design */}
                {selectedProject.features &&
                  selectedProject.features.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            isDarkMode
                              ? "bg-gradient-to-br from-[#007AFF]/20 to-[#5E5CE6]/20"
                              : "bg-gradient-to-br from-[#007AFF]/10 to-[#5E5CE6]/10"
                          }`}
                        >
                          <CheckCircle2 size={24} className="text-[#007AFF]" />
                        </div>
                        {d.featuresTitle}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className={`group relative rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] ${
                              isDarkMode
                                ? "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/5"
                                : "bg-gradient-to-br from-black/[0.02] to-black/[0.01] border border-black/10 hover:border-black/20 hover:shadow-xl hover:shadow-black/5"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  isDarkMode
                                    ? "bg-[#34C759]/20"
                                    : "bg-[#34C759]/10"
                                }`}
                              >
                                <CheckCircle2
                                  size={20}
                                  className="text-[#34C759] transition-transform group-hover:scale-110 group-hover:rotate-12"
                                />
                              </div>
                              <p
                                className={`text-[15px] ${
                                  isDarkMode ? "text-white/80" : "text-black/70"
                                } font-medium leading-relaxed`}
                              >
                                {feature}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
