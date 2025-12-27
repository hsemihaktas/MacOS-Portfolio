'use client';


import React, { useState } from 'react';
import { Send, Inbox, Archive, Trash2, User, Paperclip } from 'lucide-react';
import { Language } from '@/lib/types';
import { DATA } from '@/lib/data';

interface ContactProps { lang: Language; isDarkMode?: boolean; }

const Contact: React.FC<ContactProps> = ({ lang, isDarkMode }) => {
  const d = DATA[lang].contact;
  const personal = DATA[lang].about;
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ subject: '', message: '' });

  const bgPrimary = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const bgSidebar = isDarkMode ? 'bg-[#1E1E1E]' : 'bg-[#F9F9F9]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderStyle = isDarkMode ? 'border-white/5' : 'border-black/[0.04]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
    setSent(true);
    setTimeout(() => { setSent(false); setFormData({ subject: '', message: '' }); }, 3000);
  };

  return (
    <div className={`flex h-full ${bgPrimary} font-sans overflow-hidden select-text transition-colors duration-500`}>
      <div className={`w-[180px] ${bgSidebar} border-r ${borderStyle} flex flex-col pt-4 shrink-0 hidden sm:flex`}>
        <h4 className={`px-4 text-[11px] font-bold ${isDarkMode ? 'text-white/40' : 'text-[#8E8E93]'} uppercase tracking-tight mb-4`}>{lang === 'tr' ? 'Favoriler' : 'Favorites'}</h4>
        <ul className="px-2 space-y-0.5">
          <li className={`flex items-center gap-2.5 px-3 py-1.5 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-[#E7F1FB] text-[#007AFF]'} rounded-md cursor-default`}>
            <Inbox size={15} /> <span className="text-[13px] font-medium">{d.inbox}</span>
          </li>
          {[d.sent, d.drafts, d.trash].map((item, idx) => (
            <li key={item} className={`flex items-center gap-2.5 px-3 py-1.5 hover:bg-black/5 ${isDarkMode ? 'text-white/60' : 'text-[#424242]'} rounded-md cursor-default transition-colors`}>
              <Send size={15} className="opacity-50" /> <span className="text-[13px] font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex-1 flex flex-col relative ${bgPrimary} overflow-hidden`}>
        {sent ? (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center bg-transparent backdrop-blur-xl">
            <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center mb-6 shadow-xl"><Send size={28} className="text-white -mr-1" /></div>
            <h3 className={`text-xl font-bold ${textColor}`}>{d.sentTitle}</h3>
            <p className={`text-[13px] ${isDarkMode ? 'text-white/40' : 'text-[#86868b]'} font-medium`}>{d.sentDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className={`h-12 border-b ${borderStyle} flex items-center justify-between px-6 ${isDarkMode ? 'bg-white/5' : 'bg-[#fcfcfc]/80'} backdrop-blur-md`}>
              <div className="flex items-center gap-6 text-[#8E8E93]">
                <Trash2 size={16} className="hover:text-red-500 cursor-pointer" />
                <Paperclip size={16} className="hover:text-black/60 cursor-pointer" />
              </div>
              <button type="submit" disabled={!formData.message.trim()} className="bg-[#007AFF] hover:bg-[#0062cc] disabled:opacity-30 text-white px-5 py-1.5 rounded-lg text-[13px] font-semibold transition-all shadow-sm">
                <Send size={14} className="inline mr-2" /> {d.send}
              </button>
            </div>
            <div className={isDarkMode ? 'bg-white/[0.02]' : 'bg-[#FCFCFC]'}>
              <div className={`px-6 py-3 flex items-center gap-4 border-b ${borderStyle}`}>
                <span className={`text-[13px] ${isDarkMode ? 'text-white/40' : 'text-[#8E8E93]'} w-12 text-right`}>{d.to}:</span>
                <div className={`flex items-center gap-1.5 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white text-black'} border ${borderStyle} px-2.5 py-0.5 rounded-md text-[13px] font-medium shadow-sm`}>
                  <div className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center"><User size={10} className="text-blue-500" /></div>
                  {personal.email}
                </div>
              </div>
              <div className={`px-6 py-3 flex items-center gap-4 border-b ${borderStyle}`}>
                <span className={`text-[13px] ${isDarkMode ? 'text-white/40' : 'text-[#8E8E93]'} w-12 text-right`}>{d.subject}:</span>
                <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder={lang === 'tr' ? "Konu" : "Subject"} className={`text-[13px] font-semibold ${textColor} flex-1 outline-none bg-transparent`} />
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full h-full p-8 text-[15px] leading-relaxed ${textColor} outline-none resize-none bg-transparent placeholder:opacity-30`} placeholder={d.placeholder}></textarea>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
