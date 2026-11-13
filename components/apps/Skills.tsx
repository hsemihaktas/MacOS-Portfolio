"use client";

import React from "react";
import { usePortfolioData } from "@/lib/context/DataContext";
import { Language } from "@/lib/types";
import { Layout, Database, Globe, CheckCircle2 } from "lucide-react";

interface SkillsProps {
  lang: Language;
  isDarkMode?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ lang, isDarkMode }) => {
  const DATA = usePortfolioData();
  const d = DATA[lang].skills;

  const getIcon = (category: string) => {
    if (category.includes("Frontend"))
      return <Layout size={20} className="text-blue-500" />;
    if (category.includes("Backend"))
      return <Database size={20} className="text-green-500" />;
    return <Globe size={20} className="text-orange-500" />;
  };

  const bgPrimary = isDarkMode ? "bg-[#1C1C1E]" : "bg-[#F2F2F7]";
  const bgCard = isDarkMode ? "bg-[#2C2C2E]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-[#1D1D1F]";
  const textMuted = isDarkMode ? "text-white/55" : "text-[#6C6C70]";
  const borderStyle = isDarkMode
    ? "border-white/[0.07]"
    : "border-black/[0.06]";

  return (
    <div
      className={`h-full ${bgPrimary} flex flex-col font-sans transition-colors duration-500`}
    >
      <div className={`${bgCard} border-b ${borderStyle} px-6 py-4 shrink-0`}>
        <h1 className={`text-[18px] font-bold ${textColor} tracking-tight`}>
          {d.title}
        </h1>
        <p className={`text-[12px] ${textMuted} mt-0.5`}>{d.subtitle}</p>
      </div>

      <div className="flex-1 overflow-auto p-6 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {d.categories.map((group) => (
            <div
              key={group.name}
              className={`${bgCard} rounded-2xl p-5 border ${borderStyle} flex flex-col gap-4`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 ${isDarkMode ? "bg-white/10" : "bg-[#f5f5f7]"} rounded-xl`}
                >
                  {getIcon(group.name)}
                </div>
                <h3 className={`text-[15px] font-bold ${textColor}`}>
                  {group.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {group.items.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 px-1">
                    <CheckCircle2
                      size={16}
                      className="text-blue-500 shrink-0"
                    />
                    <span
                      className={`text-[14px] font-medium ${isDarkMode ? "text-white/70" : "text-black/70"}`}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
