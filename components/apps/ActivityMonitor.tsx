'use client';


import React from 'react';
import { Language } from '@/lib/types';
import { DATA } from '@/lib/data';
import { Activity, Cpu, HardDrive, Network, Zap } from 'lucide-react';

interface ActivityMonitorProps { lang: Language; isDarkMode?: boolean; }

const ActivityMonitor: React.FC<ActivityMonitorProps> = ({ lang, isDarkMode }) => {
  const skills = DATA[lang].skills.categories;
  const allSkills = skills.flatMap(cat => cat.items);

  const getCPUValue = (index: number) => {
    const baseValues = [12.4, 8.7, 5.2, 3.1, 1.8, 1.2, 0.8, 0.4, 0.2, 0.1];
    return baseValues[index] || 0.1;
  };

  const totalCPULoad = allSkills.reduce((acc, _, i) => acc + getCPUValue(i), 0) + 4.2;

  const bgPrimary = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const bgHeader = isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#EBEBEB]';
  const bgFooter = isDarkMode ? 'bg-[#1E1E1E]' : 'bg-[#EBEBEB]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-white/10' : 'border-black/20';
  const tableHeadBg = isDarkMode ? 'bg-[#3D3D3D]' : 'bg-[#333333]';

  return (
    <div className={`h-full ${bgPrimary} flex flex-col font-sans select-none overflow-hidden ${textColor} transition-colors duration-500`}>
      <div className={`h-14 ${bgHeader} border-b ${borderColor} flex items-center px-4 gap-2 shrink-0`}>
        <button className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-[#007AFF]'} border ${borderColor} rounded-lg text-[13px] font-black`}>
          <Cpu size={15} /> CPU
        </button>
        {['Memory', 'Energy', 'Disk', 'Network'].map((label, idx) => (
          <button key={label} className={`flex items-center gap-2 px-4 py-2 hover:bg-black/5 rounded-lg text-[13px] font-black ${isDarkMode ? 'text-white/40' : 'text-black/50'} transition-colors`}>
            {idx === 0 ? <Activity size={15} /> : idx === 1 ? <Zap size={15} /> : idx === 2 ? <HardDrive size={15} /> : <Network size={15} />} {label}
          </button>
        ))}
      </div>

      <div className={`flex-1 overflow-auto ${bgPrimary}`}>
        <table className="w-full text-left text-[14px] border-collapse min-w-[600px] table-fixed">
          <thead className={`sticky top-0 ${tableHeadBg} z-10`}>
            <tr className="text-white font-black uppercase tracking-widest text-[11px]">
              <th className={`py-3 px-6 w-1/3 border-r ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>Process Name</th>
              <th className={`py-3 px-6 text-right border-r ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>% CPU</th>
              <th className={`py-3 px-6 text-right border-r ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>Threads</th>
              <th className="py-3 px-6 text-right">User</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-black/10'}`}>
            {allSkills.map((skill, i) => (
              <tr 
                key={i} 
                className={`hover:bg-[#007AFF] hover:text-white group transition-colors duration-75 ${i % 2 === 0 ? bgPrimary : isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F9F9F9]'}`}
              >
                <td className="py-3 px-6 font-black flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full shadow-inner flex-shrink-0 ${i % 3 === 0 ? 'bg-blue-600' : 'bg-green-600'}`}></div>
                  <span className={`truncate ${textColor} group-hover:text-white`}>{skill}</span>
                </td>
                <td className={`py-3 px-6 text-right font-mono font-black tabular-nums ${textColor} group-hover:text-white`}>
                  {getCPUValue(i).toFixed(1)}%
                </td>
                <td className={`py-3 px-6 text-right font-mono ${textColor} group-hover:text-white font-black tabular-nums opacity-60 group-hover:opacity-100`}>
                  {Math.floor(Math.random() * 40) + 10}
                </td>
                <td className="py-3 px-6 text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${isDarkMode ? 'bg-white/10 text-white/60' : 'bg-black/5 text-black'} group-hover:bg-white/20 group-hover:text-white border ${borderColor}`}>
                    enessahin
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`h-32 ${bgFooter} border-t ${borderColor} grid grid-cols-3 p-6 gap-10 shrink-0`}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
             <span className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>CPU LOAD</span>
             <span className="text-[14px] font-black text-[#007AFF]">{totalCPULoad.toFixed(1)}%</span>
          </div>
          <div className={`flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-black/10'} rounded-lg border ${borderColor} relative overflow-hidden shadow-inner`}>
            <div className="absolute inset-y-0 left-0 bg-[#007AFF] transition-all duration-1000 shadow-[0_0_15px_rgba(0,122,255,0.4)]" style={{ width: `${totalCPULoad}%` }}></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
             <span className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Memory PRESSURE</span>
             <span className="text-[14px] font-black text-green-700 uppercase">HEALTHY</span>
          </div>
          <div className={`flex-1 ${isDarkMode ? 'bg-white/5' : 'bg-black/10'} rounded-lg border ${borderColor} relative overflow-hidden shadow-inner`}>
             <div className="absolute inset-y-0 left-0 bg-green-500 w-[38%]"></div>
          </div>
        </div>
        <div className={`flex flex-col justify-center border-l ${borderColor} pl-10`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${isDarkMode ? 'bg-white/10' : 'bg-white'} rounded-2xl shadow-md border ${borderColor} flex items-center justify-center text-[#007AFF]`}>
              <Activity size={24} strokeWidth={4} />
            </div>
            <div>
              <div className={`text-[16px] font-black leading-tight tracking-tight ${textColor}`}>SYSTEM STABLE</div>
              <p className={`text-[12px] ${isDarkMode ? 'text-white/40' : 'text-black/60'} font-black uppercase tracking-widest mt-1`}>Uptime: 247:12:04</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityMonitor;
