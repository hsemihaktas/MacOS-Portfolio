import React, { useState } from "react";
import Image from "next/image";
import { DATA } from "@/lib/data";
import { X } from "lucide-react";
import { AppStoreProps, Language } from "@/lib/types";
import Sidebar from "./app-store/Sidebar";
import AppList from "./app-store/AppList";
import FeaturedSection from "./app-store/FeaturedSection";
import AppDetail from "./app-store/AppDetail";

export default function AppStore({ lang, isDarkMode }: AppStoreProps) {
  const data = DATA[lang].appStore;
  const [activeCategory, setActiveCategory] = useState("discover");
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Derive the selected app object from the current language data
  const selectedApp = selectedAppId
    ? data.apps.find((a: any) => a.id === selectedAppId)
    : null;

  const filteredApps = data.apps.filter((app: any) => {
    if (activeCategory === "discover") return true;
    if (activeCategory === "create")
      return (
        app.category.includes("Fotoğraf") ||
        app.category.includes("Photo") ||
        app.category.includes("Art")
      );
    if (activeCategory === "work")
      return (
        app.category.includes("Üretkenlik") ||
        app.category.includes("Productivity")
      );
    if (activeCategory === "arcade")
      return (
        app.category.includes("Oyun") ||
        app.category.includes("Game") ||
        app.category.includes("Arcade")
      );
    if (activeCategory === "develop")
      return (
        app.category.includes("Geliştirici") ||
        app.category.includes("Developer") ||
        app.category.includes("Code")
      );
    return false;
  });

  return (
    <div
      className={`w-full h-full flex flex-col md:flex-row relative ${
        isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-[#f5f5f7] text-black"
      }`}
    >
      {/* Sidebar */}
      <div className={`${selectedAppId ? "hidden md:block" : "block"}`}>
        <Sidebar
          data={data}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setSelectedAppId={setSelectedAppId}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        {selectedApp ? (
          <AppDetail
            app={selectedApp}
            onBack={() => setSelectedAppId(null)}
            data={data}
            isDarkMode={isDarkMode}
            onScreenshotClick={setExpandedImage}
          />
        ) : (
          <>
            {/* Hero Section */}
            {activeCategory === "discover" && (
              <FeaturedSection data={data} onSelectApp={setSelectedAppId} />
            )}

            {/* App List */}
            <AppList
              apps={filteredApps}
              data={data}
              activeCategory={activeCategory}
              setSelectedAppId={setSelectedAppId}
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </div>

      {/* Expanded Image Overlay */}
      {expandedImage && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <X size={24} />
          </button>
          <div
            className="relative w-full h-full max-w-sm md:max-w-md lg:max-w-4xl max-h-[80vh] md:max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={expandedImage}
              alt="Expanded Screenshot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
