'use client';

import React from 'react';
import { Wifi, WifiOff, Bluetooth, Sun, Moon, Languages } from 'lucide-react';
import { Language } from '@/lib/types';

interface ControlCenterProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
    setLang: (l: Language) => void;
    isDarkMode: boolean;
    setDarkMode: (d: boolean) => void;
    isWifiEnabled: boolean;
    setIsWifiEnabled: (w: boolean) => void;
    brightness: number;
    setBrightness: (b: number) => void;
    isMobile?: boolean;
}

const ControlCenter: React.FC<ControlCenterProps> = ({
    isOpen,
    onClose,
    lang,
    setLang,
    isDarkMode,
    setDarkMode,
    isWifiEnabled,
    setIsWifiEnabled,
    brightness,
    setBrightness,
    isMobile
}) => {
    if (!isOpen) return null;

    const bgStyle = isDarkMode
        ? "bg-[#1A1A1A]/90 text-white"
        : "bg-[#F2F2F7]/95 text-black";

    const moduleStyle = isDarkMode
        ? "bg-white/10 border-white/5"
        : "bg-white/70 border-black/[0.05]";

    const inactiveIconStyle = isDarkMode ? "bg-white/10 text-white/40" : "bg-black/10 text-black/40";

    // MOBILE VIEW (iPhone iOS 18 Authentic Control Center)
    if (isMobile) {
        return (
            <div className={`fixed inset-0 z-[10010] backdrop-blur-[50px] animate-in slide-in-from-bottom duration-500 p-8 flex flex-col gap-6 ${bgStyle}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[32px] font-black tracking-tight">{lang === 'tr' ? 'Denetim Merkezi' : 'Control Center'}</h2>
                    <button
                        onClick={onClose}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-[20px] ${moduleStyle} shadow-2xl active:scale-90 transition-transform`}
                    >
                        ✕
                    </button>
                </div>

                {/* Top Grid: Connectivity & Sliders */}
                {/* Top Grid: Connectivity & Sliders */}
                <div className="grid grid-cols-2 gap-3 h-[180px]">
                    {/* Connectivity Group */}
                    <div className={`p-3 rounded-[32px] ${moduleStyle} border shadow-xl flex flex-wrap gap-2 items-center justify-center content-center`}>
                        <div
                            onClick={() => setIsWifiEnabled(!isWifiEnabled)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isWifiEnabled ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : inactiveIconStyle}`}
                        >
                            {isWifiEnabled ? <Wifi size={22} strokeWidth={2.5} /> : <WifiOff size={22} strokeWidth={2.5} />}
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-40 ${inactiveIconStyle}`}>
                            <Bluetooth size={22} strokeWidth={2.5} />
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-40 ${inactiveIconStyle}`}>
                            <div className="rotate-45 font-black text-[18px]">✈</div>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-40 ${inactiveIconStyle}`}>
                            <div className="font-black text-[10px] tracking-tighter">LTE</div>
                        </div>
                    </div>

                    {/* Vertical Brightness Slider */}
                    <div className={`relative rounded-[32px] ${moduleStyle} border shadow-xl overflow-hidden group active:scale-[0.96] transition-transform`}>
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-white shadow-[0_-2px_15px_rgba(255,255,255,0.4)] transition-all duration-150 ease-out origin-bottom"
                            style={{ height: `${brightness}%` }}
                        ></div>

                        {/* Invisible Vertical Range Input */}
                        <input
                            type="range" min="0" max="100" value={brightness}
                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer touch-none"
                            style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                transform: 'rotate(-90deg)',
                                width: '180px', /* Height of container */
                                height: '100%', /* Width of container */
                                transformOrigin: 'center',
                                margin: '-40px' /* Adjust for rotation shift */
                            }}
                        />

                        {/* Icon Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-4">
                            <Sun
                                size={28}
                                strokeWidth={2.5}
                                className={`transition-colors duration-300 ${brightness > 50 ? 'text-black/60' : 'text-white/30'}`}
                            />
                            <span className={`text-[12px] font-black mt-2 transition-colors duration-300 ${brightness > 50 ? 'text-black/40' : 'text-white/40'}`}>
                                {brightness}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Toggles Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setDarkMode(!isDarkMode)}
                        className={`p-6 h-[110px] rounded-[42px] flex flex-col items-center justify-center gap-2 border shadow-xl transition-all active:scale-95 ${isDarkMode ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-white text-black'}`}
                    >
                        <Moon size={32} fill={isDarkMode ? 'white' : 'none'} strokeWidth={2.5} />
                        <span className="text-[13px] font-black tracking-tight">{isDarkMode ? (lang === 'tr' ? 'Koyu' : 'Dark') : (lang === 'tr' ? 'Açık' : 'Light')}</span>
                    </button>

                    <button
                        onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                        className={`p-6 h-[110px] rounded-[42px] flex flex-col items-center justify-center gap-2 border shadow-xl active:scale-95 ${moduleStyle}`}
                    >
                        <Languages size={32} className="text-blue-500" strokeWidth={2.5} />
                        <span className="text-[13px] font-black uppercase tracking-widest">{lang}</span>
                    </button>
                </div>

                {/* Home Indicator / Dynamic Spacer */}
                <div className="mt-auto mb-10 flex justify-center">
                    <div className="w-32 h-1.5 bg-white/20 rounded-full"></div>
                </div>
            </div>
        );
    }

    // DESKTOP VIEW (macOS Sequoia Style)
    return (
        <div className={`fixed top-11 right-4 z-[10010] w-[320px] backdrop-blur-3xl rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] border p-4 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'bg-black/60 text-white border-white/10' : 'bg-white/75 text-black border-white/50'}`}>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`p-3 rounded-2xl flex flex-col gap-2 shadow-sm border ${moduleStyle}`}>
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsWifiEnabled(!isWifiEnabled)}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isWifiEnabled ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : inactiveIconStyle}`}>
                            {isWifiEnabled ? <Wifi size={16} strokeWidth={2.5} /> : <WifiOff size={16} strokeWidth={2.5} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold leading-none">Wi-Fi</span>
                            <span className={`text-[9px] font-bold ${isWifiEnabled ? 'text-blue-500' : 'opacity-40'}`}>{isWifiEnabled ? 'Home_Net' : 'Off'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${inactiveIconStyle}`}><Bluetooth size={16} strokeWidth={2.5} /></div>
                        <span className="text-[11px] font-bold">Bluetooth</span>
                    </div>
                </div>

                <div className="grid grid-rows-2 gap-3">
                    <div onClick={() => setDarkMode(!isDarkMode)} className={`p-3 rounded-2xl flex items-center gap-3 border cursor-pointer transition-all active:scale-95 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-white/60'}`}>
                        <Moon size={16} fill={isDarkMode ? 'white' : 'none'} />
                        <span className="text-[11px] font-bold">{isDarkMode ? 'Dark' : 'Light'}</span>
                    </div>
                    <div onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} className={`p-3 rounded-2xl flex items-center gap-3 border cursor-pointer active:scale-95 ${moduleStyle}`}>
                        <Languages size={16} className="text-blue-500" />
                        <span className="text-[11px] font-bold uppercase">{lang}</span>
                    </div>
                </div>
            </div>

            <div className={`p-4 rounded-2xl shadow-sm border ${moduleStyle}`}>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold opacity-60">{lang === 'tr' ? 'Parlaklık' : 'Brightness'}</span>
                    <span className="text-[10px] font-black opacity-60">{brightness}%</span>
                </div>
                <div className="flex items-center gap-3">
                    <Sun size={14} className="opacity-60" />
                    <div className="flex-1 h-6 bg-black/10 rounded-full relative overflow-hidden">
                        <input type="range" min="10" max="100" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                        <div className="absolute top-0 left-0 bottom-0 bg-white transition-all shadow-sm" style={{ width: `${brightness}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlCenter;
