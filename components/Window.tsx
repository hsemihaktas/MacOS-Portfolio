'use client';

import React, { useState, useRef, useEffect } from 'react';
import { WindowState, Language } from '@/lib/types';
import { X, Minus, ChevronLeft } from 'lucide-react';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
    onClose: () => void;
    onMinimize: () => void;
    onFocus: () => void;
    onMaximize: () => void;
    isMobile?: boolean;
    lang: Language;
    isDarkMode?: boolean;
}

const Window: React.FC<WindowProps> = ({ window: win, children, onClose, onMinimize, onFocus, onMaximize, isMobile, lang, isDarkMode }) => {
    const [pos, setPos] = useState({
        x: 150 + (Math.random() * 50),
        y: 80 + (Math.random() * 30)
    });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (win.isMaximized || isMobile) return;
        setIsDragging(true);
        onFocus();
        dragStartPos.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            setPos({
                x: e.clientX - dragStartPos.current.x,
                y: e.clientY - dragStartPos.current.y
            });
        };

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const windowStyle: React.CSSProperties = isMobile
        ? { top: 0, left: 0, width: '100%', height: '100%', zIndex: win.zIndex, borderRadius: 0 }
        : win.isMaximized
            ? { top: '32px', left: 0, right: 0, bottom: '85px', zIndex: win.zIndex, borderRadius: '0' }
            : { top: pos.y, left: pos.x, width: '900px', height: '600px', zIndex: win.zIndex };

    // Content background reflects full dark mode
    const bgColor = isDarkMode ? 'bg-[#121212]' : 'bg-[#FFFFFF]';
    const titleBarColor = isDarkMode ? 'bg-[#2D2D2D] border-white/10' : 'bg-[#EBEBEB] border-black/[0.08]';
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const titleOpacity = isDarkMode ? 'text-white/60' : 'text-black/60';

    return (
        <div
            className={`absolute flex flex-col overflow-hidden transition-all duration-300 ${bgColor}
        ${isMobile ? '' : 'rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5'} 
        ${isDragging ? 'opacity-90 scale-[1.002] cursor-grabbing select-none transition-none' : 'opacity-100'}`}
            style={windowStyle}
            onClick={onFocus}
        >
            {/* Title Bar */}
            <div
                className={`flex items-center px-4 cursor-default select-none border-b shrink-0 ${titleBarColor}
          ${isMobile ? 'h-[94px] pt-12' : 'h-[48px]'}`}
                onMouseDown={handleMouseDown}
            >
                {isMobile ? (
                    <div className="flex items-center justify-between w-full">
                        <button onClick={onClose} className="flex items-center gap-1 text-[#007AFF] font-bold text-[17px]">
                            <ChevronLeft size={26} /> {lang === 'tr' ? 'Geri' : 'Back'}
                        </button>
                        <span className={`text-[17px] font-black tracking-tight absolute left-1/2 -translate-x-1/2 ${textColor}`}>{win.title}</span>
                        <div className="w-16"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-2.5 w-24">
                            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3.5 h-3.5 bg-[#FF5F57] rounded-full border border-black/[0.1] group relative flex items-center justify-center">
                                <X size={10} className="text-[#4C0000] opacity-0 group-hover:opacity-100" strokeWidth={4} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3.5 h-3.5 bg-[#FEBC2E] rounded-full border border-black/[0.1] group relative flex items-center justify-center">
                                <Minus size={10} className="text-[#5C3C00] opacity-0 group-hover:opacity-100" strokeWidth={4} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-3.5 h-3.5 bg-[#28C840] rounded-full border border-black/[0.1] group relative flex items-center justify-center">
                                <div className={`w-2 h-2 border-[2px] opacity-0 group-hover:opacity-100 rounded-[1px] ${isDarkMode ? 'border-[#003B00]' : 'border-[#003B00]'}`}></div>
                            </button>
                        </div>
                        <div className="flex-1 flex justify-center mr-24">
                            <span className={`text-[14px] font-bold ${titleOpacity}`}>{win.title}</span>
                        </div>
                    </>
                )}
            </div>

            <div className={`flex-1 overflow-hidden ${isMobile ? 'pb-10' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Window;
