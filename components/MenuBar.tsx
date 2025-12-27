'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Wifi, WifiOff, Search, SlidersHorizontal, Battery, Signal, Mail } from 'lucide-react';
import { Language } from '@/lib/types';
import { DATA } from '@/lib/data';

interface MenuBarProps {
    activeAppTitle: string;
    lang: Language;
    onSearchClick: () => void;
    onControlClick: () => void;
    isMobile?: boolean;
    isTablet?: boolean;
    isWifiEnabled?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeAppTitle, lang, onSearchClick, onControlClick, isMobile, isTablet, isWifiEnabled = true }) => {
    const [time, setTime] = useState(new Date());
    const [showHelpMenu, setShowHelpMenu] = useState(false);
    const helpMenuRef = useRef<HTMLDivElement>(null);
    const t = DATA[lang].menu;
    const d = DATA[lang].about;

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Menu dışına tıklayınca kapatma
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
                setShowHelpMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formattedTime = time.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' });

    const WifiIcon = isWifiEnabled
        ? <Wifi size={17} strokeWidth={2.5} className="text-white" />
        : <WifiOff size={17} strokeWidth={2.5} className="text-white/40" />;

    // Apple Logo - High Fidelity SVG Path
    const AppleLogo = (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="mt-[-1px]">
            <path d="M17.057 12.896c-.024-2.126 1.737-3.146 1.815-3.194-.986-1.44-2.518-1.637-3.064-1.66-1.305-.133-2.548.77-3.21.77-.662 0-1.7-.754-2.8-.733-1.447.022-2.78.84-3.523 2.13-1.5 2.592-.383 6.427 1.077 8.53.714 1.03 1.564 2.186 2.678 2.145 1.073-.042 1.479-.691 2.775-.691 1.296 0 1.663.691 2.8.67 1.157-.021 1.9-.104 2.611-1.144.821-1.2 1.161-2.355 1.182-2.413-.025-.01-2.31-.885-2.336-3.41zm-2.032-8.312c.586-.71 1-1.697.892-2.684-.848.034-1.872.564-2.481 1.274-.545.633-1.023 1.645-.898 2.61.947.073 1.902-.489 2.487-1.2z" />
        </svg>
    );

    // MOBILE VIEW (iPhone Style Status Bar)
    if (isMobile) {
        return (
            <div
                className="absolute top-0 left-0 right-0 h-[54px] flex items-center justify-between px-7 text-[15px] font-black text-white z-[9999] select-none pt-4 bg-transparent"
            >
                <div className="tracking-tight text-[16px] cursor-default">{formattedTime}</div>
                <div
                    onClick={(e) => { e.stopPropagation(); onControlClick(); }}
                    className="flex items-center gap-2 cursor-pointer active:opacity-50 transition-opacity p-2 -mr-2"
                >
                    <Signal size={16} strokeWidth={3} />
                    {isWifiEnabled ? <Wifi size={17} strokeWidth={3} /> : <WifiOff size={17} strokeWidth={3} className="text-white/40" />}
                    <div className="flex items-center gap-1">
                        <span className="text-[11px] font-black">98</span>
                        <div className="w-6 h-3 border border-white/40 rounded-[3.5px] relative flex items-center px-[1px]">
                            <div className="h-[80%] bg-white rounded-[1.5px] w-[80%]"></div>
                            <div className="absolute -right-1.5 w-1 h-1.5 bg-white/40 rounded-r-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // DESKTOP/TABLET VIEW
    return (
        <div className="absolute top-0 left-0 right-0 h-[32px] bg-white/10 backdrop-blur-3xl flex items-center justify-between px-4 text-[13px] font-bold text-white shadow-sm z-[9999] border-b border-white/5 select-none">
            <div className="flex items-center gap-4 relative">
                <div className="px-2 py-1 hover:bg-white/10 rounded-md transition-colors cursor-default flex items-center justify-center">
                    {AppleLogo}
                </div>
                <span className="font-black tracking-tight">{activeAppTitle}</span>

                <div className="relative" ref={helpMenuRef}>
                    <button
                        onClick={() => setShowHelpMenu(!showHelpMenu)}
                        className={`cursor-default px-2 py-0.5 rounded-md transition-colors font-semibold opacity-90 ${showHelpMenu ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    >
                        {t.help}
                    </button>

                    {showHelpMenu && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-[#1e1e1e]/90 backdrop-blur-3xl border border-white/10 rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150 z-[10000]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Mail size={20} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black opacity-50 uppercase tracking-widest">{lang === 'tr' ? 'BANA ULAŞIN' : 'GET IN TOUCH'}</span>
                                    <span className="text-[13px] font-bold text-white/90">{d.email}</span>
                                </div>
                            </div>
                            <div className="h-[1px] bg-white/5 w-full my-2"></div>
                            <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                                {lang === 'tr'
                                    ? 'Herhangi bir soru veya proje fikriniz için yukarıdaki adrese e-posta gönderebilirsiniz.'
                                    : 'Feel free to send an email for any questions or project ideas.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 opacity-90">
                    <div className="flex items-center gap-1 opacity-70">
                        <span className="text-[10px] font-black mr-0.5">98%</span>
                        <Battery size={18} strokeWidth={2.5} />
                    </div>
                    {WifiIcon}
                    <button onClick={(e) => { e.stopPropagation(); onSearchClick(); }} className="p-1 hover:bg-white/10 rounded-md">
                        <Search size={15} strokeWidth={3} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onControlClick(); }} className="p-1 hover:bg-white/10 rounded-md">
                        <SlidersHorizontal size={15} strokeWidth={3} />
                    </button>
                </div>
                <div className="flex gap-3 font-bold tracking-tight opacity-95">
                    <span className="hidden lg:block">{formattedDate}</span>
                    <span>{formattedTime}</span>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;
