'use client';

'use client';

import React from 'react';
import { Mail, MapPin, Globe, GraduationCap, Briefcase, Award } from 'lucide-react';
import { DATA } from '@/lib/data';
import { Language } from '@/lib/types';

interface AboutProps { lang: Language; isDarkMode?: boolean; }

const About: React.FC<AboutProps> = ({ lang, isDarkMode }) => {
    const d = DATA[lang].about;

    const bgPrimary = isDarkMode ? 'bg-[#121212]' : 'bg-white';
    const bgSecondary = isDarkMode ? 'bg-[#1E1E1E]' : 'bg-[#F8F8F8]';
    const bgTertiary = isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F7]';
    const textColor = isDarkMode ? 'text-white' : 'text-[#1D1D1F]';
    const textMuted = isDarkMode ? 'text-white/30' : 'text-black/20';
    const textSoft = isDarkMode ? 'text-white/60' : 'text-black/60';
    const borderStyle = isDarkMode ? 'border-white/10' : 'border-black/[0.05]';

    return (
        <div className={`h-full ${bgPrimary} flex flex-col font-sans select-text overflow-hidden transition-colors duration-500`}>
            <div className={`min-h-[160px] md:h-44 ${bgSecondary} border-b ${borderStyle} flex items-end px-6 md:px-10 pb-6 md:pb-8 relative shrink-0`}>
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 md:gap-8 w-full">
                    <div className={`w-24 h-24 md:w-32 md:h-32 ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'} rounded-3xl shadow-lg p-1 overflow-hidden border ${borderStyle} shrink-0 transform -mb-2 md:-mb-4`}>
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=512&auto=format&fit=crop"
                            alt="Profile"
                            className="w-full h-full object-cover rounded-[20px]"
                        />
                    </div>
                    <div className="text-center sm:text-left pb-1">
                        <h1 className={`text-2xl md:text-3xl font-black ${textColor} tracking-tighter leading-none`}>{d.name}</h1>
                        <p className="text-[#007AFF] font-bold text-[14px] md:text-[16px] mt-1">{d.role}</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6 md:p-10 custom-scrollbar">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
                    <div className="lg:col-span-2 space-y-10 md:space-y-12">
                        <section>
                            <h3 className={`text-[11px] font-black ${textMuted} uppercase tracking-[0.2em] mb-4`}>{lang === 'tr' ? 'ÖZET' : 'SUMMARY'}</h3>
                            <p className={`text-[15px] md:text-[17px] leading-relaxed ${textColor}/80 font-medium ${bgTertiary} p-6 md:p-8 rounded-[32px] border ${borderStyle}`}>
                                {d.summary}
                            </p>
                        </section>

                        <section>
                            <h3 className={`text-[11px] font-black ${textMuted} uppercase tracking-[0.2em] mb-6`}>{lang === 'tr' ? 'DENEYİM' : 'EXPERIENCE'}</h3>
                            <div className="space-y-8">
                                {d.experience.map((exp, i) => (
                                    <div key={i} className="flex gap-5 items-start group">
                                        <div className={`w-12 h-12 ${isDarkMode ? 'bg-blue-900/40' : 'bg-blue-50'} rounded-2xl flex items-center justify-center shrink-0 border ${isDarkMode ? 'border-blue-700/40' : 'border-blue-100'} group-hover:bg-blue-600 transition-all duration-300`}>
                                            <Briefcase size={20} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:text-white transition-colors`} />
                                        </div>
                                        <div>
                                            <h4 className={`text-[16px] font-black ${textColor} tracking-tight`}>{exp.role} @ {exp.company}</h4>
                                            <p className={`text-[12px] ${textMuted} font-black mb-2 uppercase tracking-tight`}>{exp.period}</p>
                                            <p className={`text-[14px] ${textSoft} leading-relaxed font-medium`}>{exp.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className={`${bgTertiary} p-8 rounded-[40px] border ${borderStyle} space-y-10 shadow-sm`}>
                            <section>
                                <h3 className={`text-[10px] font-black ${textMuted} uppercase tracking-[0.25em] mb-5`}>{lang === 'tr' ? 'BİLGİLER' : 'INFORMATION'}</h3>
                                <ul className="space-y-5">
                                    <li className={`flex items-center gap-4 text-[14px] font-bold ${textColor}/80`}>
                                        <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-white'} flex items-center justify-center border ${borderStyle} shadow-sm`}>
                                            <MapPin size={16} className={textMuted} />
                                        </div>
                                        {d.location}
                                    </li>
                                    <li className={`flex items-center gap-4 text-[14px] font-bold ${textColor}/80`}>
                                        <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-white'} flex items-center justify-center border ${borderStyle} shadow-sm`}>
                                            <GraduationCap size={16} className={textMuted} />
                                        </div>
                                        <span className="leading-tight">{d.education}</span>
                                    </li>
                                    <li className={`flex items-center gap-4 text-[14px] font-bold ${textColor}/80`}>
                                        <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-white'} flex items-center justify-center border ${borderStyle} shadow-sm`}>
                                            <Mail size={16} className={textMuted} />
                                        </div>
                                        {d.email}
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
