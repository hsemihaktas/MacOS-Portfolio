import React from "react";
import Image from "next/image";
import { handleStoreRedirect } from "./utils";

interface AppListProps {
  apps: any[];
  data: any;
  activeCategory: string;
  setSelectedAppId: (id: number) => void;
  isDarkMode: boolean;
}

export default function AppList({
  apps,
  data,
  activeCategory,
  setSelectedAppId,
  isDarkMode,
}: AppListProps) {
  return (
    <div className="p-6 md:p-10 pt-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">
          {activeCategory === "discover"
            ? data.labels.suggestedApps
            : data.categories.find((c: any) => c.id === activeCategory)?.name}
        </h3>
        <button className="text-blue-500 text-sm hover:underline">
          {data.labels.seeAll}
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        {apps.map((app: any) => (
          <div
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            className={`group flex items-center p-3 md:p-4 rounded-xl cursor-pointer transition-all active:scale-[0.99]
              ${
                isDarkMode
                  ? "hover:bg-white/5 active:bg-white/10"
                  : "hover:bg-black/5 active:bg-black/10"
              }`}
          >
            {/* Icon */}
            <Image
              src={app.icon}
              alt={app.title}
              width={64}
              height={64}
              className="rounded-[14px] shadow-sm object-cover flex-shrink-0"
            />

            {/* Info */}
            <div className="flex-1 ml-4 min-w-0 flex flex-col justify-center">
              <h4
                className={`font-semibold text-[17px] leading-tight mb-1 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {app.title}
              </h4>
              <span className="text-[13px] text-gray-500 dark:text-gray-400 truncate">
                {app.category}
              </span>
            </div>

            {/* Button */}
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStoreRedirect(app);
                }}
                className="px-6 py-1.5 rounded-full font-bold text-[13px] transition-all bg-[#007AFF] hover:bg-[#0071eb] text-white shadow-sm uppercase"
              >
                {data.labels.get}
              </button>
              <div className="text-[9px] text-gray-400 text-center mt-1 whitespace-pre-wrap">
                {data.labels.inAppPurchases}
              </div>
            </div>
          </div>
        ))}
        {apps.length > 0 && (
          <div
            className={`h-px w-full mx-auto max-w-[95%] ${
              isDarkMode ? "bg-white/10" : "bg-black/5"
            }`}
          ></div>
        )}
      </div>
    </div>
  );
}
