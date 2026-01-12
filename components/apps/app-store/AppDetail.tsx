import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
  User,
  X,
} from "lucide-react";
import { handleStoreRedirect } from "./utils";

interface AppDetailProps {
  app: any;
  onBack: () => void;
  data: any;
  isDarkMode: boolean;
  onScreenshotClick: (url: string) => void;
}

export default function AppDetail({
  app,
  onBack,
  data,
  isDarkMode,
  onScreenshotClick,
}: AppDetailProps) {
  if (!app) return null;

  return (
    <div className="md:p-8 animate-in slide-in-from-right duration-300 relative pt-4 md:pt-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-1 text-blue-500 mb-6 hover:underline px-6 md:px-0"
      >
        <ChevronRight className="rotate-180 w-4 h-4" />
        <span>{data.labels.back}</span>
      </button>

      <div className="p-6 md:p-0 pt-0">
        {/* Header */}
        <div className="flex flex-row items-start space-x-4 md:space-x-6 mb-8">
          <Image
            src={app.icon}
            alt={app.title}
            width={118}
            height={118}
            className="w-24 h-24 md:w-[118px] md:h-[118px] rounded-[22px] md:rounded-[24px] shadow-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{app.title}</h2>
            <p className="text-gray-500 mb-4">{app.subtitle}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleStoreRedirect(app)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-1.5 rounded-full font-bold text-sm transition-colors uppercase"
              >
                {data.labels.get}
              </button>
              <button className="p-2 bg-blue-500/10 text-blue-600 rounded-full">
                <Download size={18} />
              </button>
              <button className="ml-auto md:ml-0 p-2 text-blue-600">
                {/* Share Icon Placeholder */}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-white/10 py-4 mb-8 overflow-x-auto">
          <div className="flex flex-col items-center flex-1 min-w-[80px] border-r border-gray-200 dark:border-white/10 px-2">
            <div className="flex items-center space-x-1 text-gray-500 text-xs font-semibold uppercase mb-1">
              <span>
                {app.rating} {data.labels.ratings}
              </span>
            </div>
            <div className="text-xl font-bold text-gray-400">{app.rating}</div>
            <div className="flex text-gray-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={10} className="fill-current" />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-[80px] border-r border-gray-200 dark:border-white/10 px-2">
            <div className="text-gray-500 text-xs font-semibold uppercase mb-1">
              {data.labels.age}
            </div>
            <div className="text-xl font-bold text-gray-400">{app.age}</div>
            <div className="text-xs text-gray-400">{data.labels.yearsOld}</div>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-[80px] border-r border-gray-200 dark:border-white/10 px-2">
            <div className="text-gray-500 text-xs font-semibold uppercase mb-1">
              {data.labels.chart}
            </div>
            <div className="text-xl font-bold text-gray-400">
              #{app.chart.split(" ")[0].replace("#", "")}
            </div>
            <div className="text-xs text-gray-400 truncate max-w-[80px]">
              {app.category}
            </div>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-[80px] px-2">
            <div className="text-gray-500 text-xs font-semibold uppercase mb-1">
              {data.labels.developer}
            </div>
            <div className="text-xl font-bold text-gray-400">
              <div
                className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                  isDarkMode
                    ? "border-white/20 bg-white/5"
                    : "border-black/10 bg-white"
                }`}
              >
                <User
                  size={14}
                  className={`${
                    isDarkMode ? "text-white/60" : "text-black/60"
                  }`}
                />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Semih</div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="mb-8 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-4">
            {app.screenshots?.map((shot: string, idx: number) => (
              <div
                key={idx}
                className="relative w-[200px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-zoom-in active:scale-95 transition-all"
                onClick={() => onScreenshotClick(shot)}
              >
                <Image
                  src={shot}
                  alt="Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {app.description}
          </p>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-bold mb-4">{data.labels.information}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-gray-500">{data.labels.provider}</span>
              <span>{app.developer}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-gray-500">{data.labels.size}</span>
              <span>{app.size}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-gray-500">{data.labels.category}</span>
              <span>{app.category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-gray-500">{data.labels.compatibility}</span>
              <span>{data.labels.compatibilityDevices}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-gray-500">{data.labels.languages}</span>
              <span>{data.labels.currentLanguage}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span className="text-gray-500">{data.labels.ageRating}</span>
              <span>{app.age}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
