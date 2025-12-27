'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, Sparkles, Code2, FolderKanban, User2, Mail } from 'lucide-react';
import { DATA } from '@/lib/data';
import { Language, AppID } from '@/lib/types';

interface SpotlightProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectApp: (id: AppID, params?: any) => void;
    lang: Language;
}

// Added interface for search result items to handle optional params
interface SearchResult {
    id: AppID;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    params?: any;
}

const Spotlight: React.FC<SpotlightProps> = ({ isOpen, onClose, onSelectApp, lang }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const d = DATA[lang];

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            // Delay focus to ensure animation is smooth
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Explicitly typing the results array using SearchResult interface
    const results: SearchResult[] = [
        // Projeleri ara
        ...d.projects.items.map(p => ({
            id: 'projects' as AppID,
            title: p.title,
            subtitle: lang === 'tr' ? 'Proje Detayları' : 'Project Details',
            icon: <FolderKanban size={18} className="text-blue-500" />,
            params: { projectId: p.id }
        })),
        // Yetenekleri ara -> Tıklanınca Projeler sayfasını o etiketle açacak
        ...d.skills.categories.flatMap(c => c.items.map(s => ({
            id: 'projects' as AppID,
            title: s,
            subtitle: lang === 'tr' ? `${s} kullanan projeleri göster` : `Show projects using ${s}`,
            icon: <Code2 size={18} className="text-purple-500" />,
            params: { filterTag: s }
        }))),
        { id: 'about' as AppID, title: d.about.name, subtitle: lang === 'tr' ? 'Özgeçmiş ve Profil' : 'Resume and Profile', icon: <User2 size={18} className="text-orange-500" /> },
        { id: 'ai-asistan' as AppID, title: 'Siri AI', subtitle: lang === 'tr' ? 'Yapay zeka ile konuş' : 'Talk to AI', icon: <Sparkles size={18} className="text-indigo-500" /> },
        { id: 'contact' as AppID, title: 'Mail', subtitle: lang === 'tr' ? 'İletişime geç' : 'Get in touch', icon: <Mail size={18} className="text-red-500" /> }
    ].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    return (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/15 backdrop-blur-[4px]" onClick={onClose}></div>

            <div className="relative w-full max-w-[640px] bg-white/70 backdrop-blur-3xl rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center px-6 py-5 gap-4 border-b border-black/[0.05]">
                    <Search size={22} className="text-black/30" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={lang === 'tr' ? "Yetenek veya proje ara..." : "Search skills or projects..."}
                        className="flex-1 bg-transparent border-none outline-none text-[20px] font-medium text-black/80 placeholder:text-black/20"
                    />
                    <div className="flex items-center gap-1.5 bg-black/5 px-2.5 py-1 rounded-lg text-[10px] font-black text-black/30">
                        <Command size={10} /> K
                    </div>
                </div>

                <div className="max-h-[440px] overflow-auto py-2 px-2 custom-scrollbar">
                    {results.length > 0 ? (
                        results.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => { onSelectApp(item.id, item.params); onClose(); }}
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#007AFF] group transition-all cursor-default"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/80 group-hover:bg-white/20 rounded-xl flex items-center justify-center shadow-sm border border-black/[0.03] transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-bold text-black/80 group-hover:text-white tracking-tight">{item.title}</div>
                                        <div className="text-[11px] text-black/40 group-hover:text-white/60 font-semibold">{item.subtitle}</div>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                    {lang === 'tr' ? 'Görüntüle' : 'View'} <ArrowRight size={14} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <Sparkles className="mx-auto mb-3 text-black/10" size={32} />
                            <p className="text-black/30 font-bold italic tracking-tight">
                                {lang === 'tr' ? 'Sonuç bulunamadı...' : 'No results found...'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Spotlight;
