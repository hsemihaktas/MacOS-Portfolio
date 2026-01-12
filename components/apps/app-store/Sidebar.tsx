import React from "react";
import {
  Compass,
  Gamepad2,
  Palette,
  Briefcase,
  Code2,
  Search,
} from "lucide-react";

interface SidebarProps {
  data: any;
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
      className={`w-full md:w-64 flex-shrink-0 flex flex-col p-4 border-b md:border-b-0 md:border-r ${
        isDarkMode ? "border-white/10" : "border-black/5"
      }`}
    >
      <div className="flex items-center space-x-2 pl-2 mb-6">
        <Search
          className={`w-4 h-4 ${
            isDarkMode ? "text-white/50" : "text-black/50"
          }`}
        />
        <input
          type="text"
          placeholder={data.labels.search}
          className={`bg-transparent w-full text-sm outline-none ${
            isDarkMode
              ? "placeholder:text-white/30"
              : "placeholder:text-black/30"
          }`}
        />
      </div>

      <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible space-x-2 md:space-x-0 md:space-y-1 pb-2 md:pb-0 hide-scrollbar">
        {data.categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedAppId(null);
            }}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
              ${
                activeCategory === cat.id
                  ? "bg-blue-500 text-white"
                  : `hover:${isDarkMode ? "bg-white/10" : "bg-black/5"} ${
                      isDarkMode ? "text-white/70" : "text-black/70"
                    }`
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
