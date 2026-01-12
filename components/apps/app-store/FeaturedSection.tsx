import React from "react";
import Image from "next/image";

interface FeaturedSectionProps {
  data: any;
  onSelectApp: (appId: number) => void;
}

export default function FeaturedSection({
  data,
  onSelectApp,
}: FeaturedSectionProps) {
  return (
    <div className="p-6 md:p-10">
      <div
        className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
        onClick={() => {
          const featuredApp = data.apps.find((a: any) =>
            a.title.includes(data.featured.title)
          );
          if (featuredApp) onSelectApp(featuredApp.id);
        }}
      >
        <Image
          src={data.featured.image}
          alt={data.featured.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end text-white">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            {data.featured.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {data.featured.title}
          </h2>
          <p className="text-white/80 max-w-lg text-sm md:text-base mb-4 line-clamp-2">
            {data.featured.description}
          </p>
        </div>
      </div>
    </div>
  );
}
