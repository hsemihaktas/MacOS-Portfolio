import React from "react";
import {
  Compass,
  Gamepad2,
  Palette,
  Briefcase,
  Code2,
  Search,
} from "lucide-react";

import { AppStoreDataShape } from "@/lib/types";

interface SidebarProps {
  data: AppStoreDataShape;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  setSelectedAppId: (id: number | null) => void;
  isDarkMode: boolean;
}

export default function Sidebar({
  data,
  activeCategory,
  setActiveCategory,
  setSelectedAppId,
  isDarkMode,
}: SidebarProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass size={18} />;
      case "Gamepad2":
        return <Gamepad2 size={18} />;
      case "Palette":
        return <Palette size={18} />;
      case "Briefcase":
        return <Briefcase size={18} />;
      case "Code2":
        return <Code2 size={18} />;
      default:
        return <Compass size={18} />;
    }
  };

  return (
    <div
      className={`w-full md:w-[220px] flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r`}
      style={{
        background: isDarkMode ? "#252527" : "#F0F0F2",
        borderColor: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
      }}
    >
      {/* Search */}
      <div className="px-3 pt-4 pb-3">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-white/8" : "bg-black/[0.06]"}`}
        >
          <Search
            className={`w-3.5 h-3.5 ${isDarkMode ? "text-white/45" : "text-black/45"}`}
          />
          <input
            type="text"
            placeholder={data.labels.search}
            className={`bg-transparent w-full text-[12px] outline-none ${isDarkMode ? "text-white placeholder:text-white/30" : "text-[#1C1C1E] placeholder:text-black/30"}`}
          />
        </div>
      </div>

      <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible px-2 pb-3 md:pb-0 gap-0.5">
        {data.categories.map(( cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedAppId(null);
            }}
            className={`flex items-center gap-2.5 px-2.5 py-[6px] rounded-lg text-left text-[13px] font-medium transition-all whitespace-nowrap w-full cursor-default ${
              activeCategory === cat.id
                ? isDarkMode
                  ? "bg-[#0A84FF]/20 text-[#0A84FF]"
                  : "bg-[#007AFF]/10 text-[#007AFF]"
                : isDarkMode
                  ? "text-white/60 hover:bg-white/5"
                  : "text-[#3C3C43] hover:bg-black/[0.04]"
            }`}
          >
            {getIcon(cat.icon)}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
