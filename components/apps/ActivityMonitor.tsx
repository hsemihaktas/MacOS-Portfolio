'use client';


import React from 'react';
import { Language } from '@/lib/types';
import { DATA } from '@/lib/data';
import { Activity, Cpu, HardDrive, Network, Zap } from 'lucide-react';

interface ActivityMonitorProps { lang: Language; isDarkMode?: boolean; }

const ActivityMonitor: React.FC<ActivityMonitorProps> = ({ lang, isDarkMode }) => {
  const projects = DATA[lang].projects.items;

  // Count how many times each technology is used across all projects
  const techCount = new Map<string, number>();
  projects.forEach(project => {
    project.tags.forEach(tag => {
      techCount.set(tag, (techCount.get(tag) || 0) + 1);
    });
  });

  // Sort technologies by usage count (most used first)
  const sortedTechnologies = Array.from(techCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tech, count]) => ({ tech, count }));

  // Calculate CPU percentage based on usage count
  const totalUsage = sortedTechnologies.reduce((acc, { count }) => acc + count, 0);
  const getCPUValue = (count: number) => {
    return (count / totalUsage) * 100;
  };

  const totalCPULoad = sortedTechnologies.reduce((acc, { count }) => acc + getCPUValue(count), 0);

  const bgPrimary = isDarkMode ? 'bg-[#121212]' : 'bg-white';
  const bgHeader = isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#EBEBEB]';
  const bgFooter = isDarkMode ? 'bg-[#1E1E1E]' : 'bg-[#EBEBEB]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-white/10' : 'border-black/20';
  const tableHeadBg = isDarkMode ? 'bg-[#3D3D3D]' : 'bg-[#333333]';

  return (
    <div className={`h-full ${bgPrimary} flex flex-col font-sans select-none overflow-hidden ${textColor} transition-colors duration-500`}>
      <div className={`h-14 ${bgHeader} border-b ${borderColor} flex items-center px-2 sm:px-4 gap-1 sm:gap-2 shrink-0 overflow-x-auto`}>
        <button className={`flex items-center gap-2 px-3 sm:px-4 py-2 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white shadow-sm text-[#007AFF]'} border ${borderColor} rounded-lg text-[12px] sm:text-[13px] font-black whitespace-nowrap`}>
          <Cpu size={15} /> CPU
        </button>
        {['Memory', 'Energy', 'Disk', 'Network'].map((label, idx) => (
          <button key={label} className={`hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-black/5 rounded-lg text-[13px] font-black ${isDarkMode ? 'text-white/40' : 'text-black/50'} transition-colors`}>
            {idx === 0 ? <Activity size={15} /> : idx === 1 ? <Zap size={15} /> : idx === 2 ? <HardDrive size={15} /> : <Network size={15} />} {label}
          </button>
        ))}
      </div>

      <div className={`flex-1 overflow-auto ${bgPrimary}`}>
        {/* Desktop Table View */}
        <table className="hidden sm:table w-full text-left text-[14px] border-collapse min-w-[600px] table-fixed">
          <thead className={`sticky top-0 ${tableHeadBg} z-10`}>
            <tr className="text-white font-black uppercase tracking-widest text-[11px]">
              <th className={`py-3 px-6 w-1/3 border-r ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>Process Name</th>
              <th className={`py-3 px-6 text-right border-r ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>% CPU</th>
              <th className={`py-3 px-6 text-right border-r ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>Threads</th>
              <th className="py-3 px-6 text-right">User</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-black/10'}`}>
            {sortedTechnologies.map(({ tech, count }, i) => (
              <tr
                key={i}
                className={`hover:bg-[#007AFF] hover:text-white group transition-colors duration-75 ${i % 2 === 0 ? bgPrimary : isDarkMode ? 'bg-white/[0.02]' : 'bg-[#F9F9F9]'}`}
              >
                <td className={`py-4 px-6 font-bold border-r ${isDarkMode ? 'border-white/5' : 'border-black/10'} group-hover:border-white/10`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black shadow-sm">
                      {tech.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="truncate">{tech}</span>
                  </div>
                </td>
                <td className={`py-4 px-6 text-right font-black border-r ${isDarkMode ? 'border-white/5' : 'border-black/10'} group-hover:border-white/10`}>
                  {((count / sortedTechnologies.reduce((sum, t) => sum + t.count, 0)) * 100).toFixed(1)}%
                </td>
                <td className={`py-4 px-6 text-right font-medium border-r ${isDarkMode ? 'border-white/5' : 'border-black/10'} group-hover:border-white/10`}>
                  {Math.floor(Math.random() * 8) + 2}
                </td>
                <td className="py-4 px-6 text-right font-medium opacity-60">
                  {['root', 'system', 'user'][i % 3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="sm:hidden p-4 space-y-2">
          {sortedTechnologies.map(({ tech, count }, i) => (
            <div
              key={i}
              className={`${isDarkMode ? 'bg-[#2c2c2e]' : 'bg-white'} rounded-xl p-4 active:opacity-70 transition-opacity`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                    {tech.substring(0, 2).toUpperCase()}
                  </div>
                  <span className={`text-[15px] font-bold ${textColor}`}>{tech}</span>
                </div>
                <span className={`text-[17px] font-black ${textColor}`}>
                  {((count / sortedTechnologies.reduce((sum, t) => sum + t.count, 0)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>
                  Threads: {Math.floor(Math.random() * 8) + 2}
                </span>
                <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>
                  User: {['root', 'system', 'user'][i % 3]}
                </span>
              </div>
            </div>
          ))}
        </div>
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
