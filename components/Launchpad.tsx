'use client';

import React, { useState } from 'react';
import { APPS } from '@/lib/constants';
import { AppID, Language } from '@/lib/types';
import { Search, X } from 'lucide-react';

interface LaunchpadProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectApp: (id: AppID) => void;
    lang: Language;
}

const Launchpad: React.FC<LaunchpadProps> = ({ isOpen, onClose, onSelectApp, lang }) => {
    const [search, setSearch] = useState('');

    if (!isOpen) return null;

    const filteredApps = APPS.filter(app =>
        app.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[10001] bg-black/10 backdrop-blur-[60px] animate-in fade-in duration-500 flex flex-col items-center pt-[8vh] px-10">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-[320px] mb-16">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={lang === 'tr' ? "Uygulama Ara" : "Search Apps"}
                    className="w-full bg-white/10 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-[14px] text-white outline-none focus:bg-white/20 transition-all placeholder:text-white/30 shadow-lg"
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                        <X size={14} />
                    </button>
                )}
            </div>

            <div className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-x-12 gap-y-16 w-full max-w-6xl animate-in zoom-in-110 duration-500">
                {filteredApps.map((app) => (
                    <div
                        key={app.id}
                        onClick={() => onSelectApp(app.id)}
                        className="group flex flex-col items-center gap-3 cursor-default"
                    >
                        <div className="w-[88px] h-[88px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 group-active:scale-95 group-active:brightness-90">
                            <img
                                src={app.iconUrl}
                                alt={app.title}
                                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                        <span className="text-white text-[13px] font-bold tracking-tight drop-shadow-md group-hover:scale-110 transition-transform">{app.title}</span>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-lg"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"></div>
            </div>
        </div>
    );
};

export default Launchpad;
