'use client';


import React from 'react';
import { DATA } from '@/lib/data';
import { Language } from '@/lib/types';
import { Layout, Database, Globe, CheckCircle2 } from 'lucide-react';

interface SkillsProps { lang: Language; isDarkMode?: boolean; }

const Skills: React.FC<SkillsProps> = ({ lang, isDarkMode }) => {
  const d = DATA[lang].skills;

  const getIcon = (category: string) => {
    if (category.includes('Frontend')) return <Layout size={20} className="text-blue-500" />;
    if (category.includes('Backend')) return <Database size={20} className="text-green-500" />;
    return <Globe size={20} className="text-orange-500" />;
  };

  const bgPrimary = isDarkMode ? 'bg-[#121212]' : 'bg-[#F8F8F9]';
  const bgCard = isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-[#1D1D1F]';
  const textMuted = isDarkMode ? 'text-white/40' : 'text-[#86868B]';
  const borderStyle = isDarkMode ? 'border-white/10' : 'border-black/[0.04]';

  return (
    <div className={`h-full ${bgPrimary} flex flex-col font-sans transition-colors duration-500`}>
      <div className={`${bgCard} border-b ${borderStyle} px-8 py-6 shrink-0`}>
        <h1 className={`text-xl font-extrabold ${textColor} tracking-tight`}>{d.title}</h1>
        <p className={`text-[12px] ${textMuted} font-medium mt-1`}>{d.subtitle}</p>
      </div>

      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {d.categories.map((group) => (
            <div 
              key={group.name} 
              className={`${bgCard} rounded-2xl p-6 shadow-sm border ${borderStyle} flex flex-col gap-5 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 ${isDarkMode ? 'bg-white/10' : 'bg-[#f5f5f7]'} rounded-xl`}>
                  {getIcon(group.name)}
                </div>
                <h3 className={`text-[15px] font-bold ${textColor}`}>{group.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {group.items.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 px-1">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                    <span className={`text-[14px] font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
