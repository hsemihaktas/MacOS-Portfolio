"use client";

import React, { useState, useRef, useEffect } from "react";
import { WindowState, Language } from "@/lib/types";
import { X, Minus, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

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

const Window: React.FC<WindowProps> = ({
  window: win,
  children,
  onClose,
  onMinimize,
  onFocus,
  onMaximize,
  isMobile,
  lang,
  isDarkMode,
}) => {
  const [pos, setPos] = useState(() => ({
    x: 150 + Math.random() * 50,
    y: 80 + Math.random() * 30,
  }));
  const [size, setSize] = useState(() => {
    if (win.id === "safari") return { width: 1040, height: 680 };
    return { width: 900, height: 600 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized || isMobile) return;
    setIsDragging(true);
    onFocus();
    dragStartPos.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (win.isMaximized || isMobile) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    onFocus();
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: pos.x,
      posY: pos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPos({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        });
      } else if (isResizing) {
        const dx = e.clientX - resizeStartPos.current.x;
        const dy = e.clientY - resizeStartPos.current.y;
        const minW = 400,
          minH = 300;
        let w = resizeStartPos.current.width;
        let h = resizeStartPos.current.height;
        let x = resizeStartPos.current.posX;
        let y = resizeStartPos.current.posY;
        if (resizeDirection.includes("e")) w = Math.max(minW, w + dx);
        if (resizeDirection.includes("w")) {
          const pw = resizeStartPos.current.width - dx;
          if (pw >= minW) {
            w = pw;
            x = resizeStartPos.current.posX + dx;
          } else {
            w = minW;
            x = resizeStartPos.current.posX + (resizeStartPos.current.width - minW);
          }
        }
        if (resizeDirection.includes("s")) h = Math.max(minH, h + dy);
        if (resizeDirection.includes("n")) {
          const ph = resizeStartPos.current.height - dy;
          if (ph >= minH) {
            h = ph;
            y = resizeStartPos.current.posY + dy;
          } else {
            h = minH;
            y = resizeStartPos.current.posY + (resizeStartPos.current.height - minH);
          }
        }
        setSize({ width: w, height: h });
        setPos({ x, y });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDirection]);

  const windowStyle: React.CSSProperties = isMobile
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: win.zIndex,
        borderRadius: 0,
      }
    : win.isMaximized
      ? {
          top: "32px",
          left: 0,
          right: 0,
          bottom: "85px",
          zIndex: win.zIndex,
          borderRadius: "0",
        }
      : {
          top: pos.y,
          left: pos.x,
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: win.zIndex,
        };

  // macOS Tahoe color tokens
  const contentBg = isDarkMode ? "#1C1C1E" : "#FFFFFF";
  const titleBarBg = isDarkMode
    ? "rgba(38,38,40,0.97)"
    : "rgba(236,236,238,0.98)";
  const titleBarBorder = isDarkMode
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid rgba(0,0,0,0.08)";
  const titleTextCls = isDarkMode ? "text-white/50" : "text-black/50";
  const mobileTitleCls = isDarkMode ? "text-white" : "text-black";

  return (
    <motion.div
      className={`absolute flex flex-col overflow-hidden pointer-events-auto
        ${
          isDragging || isResizing
            ? "select-none transition-none"
            : win.isMaximized
              ? "transition-[width,height,top,left,border-radius] duration-200 ease-out"
              : "transition-none"
        }`}
      style={{
        ...windowStyle,
        backgroundColor: contentBg,
        ...(isMobile
          ? {}
          : {
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 50px 100px -20px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.08)",
            }),
      }}
      onClick={onFocus}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center px-4 cursor-default select-none shrink-0
          ${isMobile ? "h-[94px] pt-12" : "h-[44px]"}`}
        style={{ background: titleBarBg, borderBottom: titleBarBorder }}
        onMouseDown={handleMouseDown}
      >
        {isMobile ? (
          <div className="flex items-center justify-between w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex items-center gap-0.5 text-[#007AFF] font-bold text-[16px] active:opacity-60 cursor-pointer -ml-1 z-10"
            >
              <ChevronLeft size={22} /> {lang === "tr" ? "Geri" : "Back"}
            </button>
            <span
              className={`text-[17px] font-black tracking-tight absolute left-1/2 -translate-x-1/2 ${mobileTitleCls}`}
            >
              {win.title}
            </span>
            <div className="w-16" />
          </div>
        ) : (
          <>
            {/* Traffic lights — hover any to reveal all symbols (macOS behavior) */}
            <div className="flex gap-2 w-20 group/traffic">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label={lang === "tr" ? "Pencereyi kapat" : "Close window"}
                className="w-3 h-3 bg-[#FF5F57] rounded-full border border-black/[0.12] relative flex items-center justify-center transition-all cursor-pointer"
              >
                <X
                  size={7}
                  className="text-[#4C0000] opacity-0 group-hover/traffic:opacity-100 transition-opacity duration-100"
                  strokeWidth={3.5}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                aria-label={
                  lang === "tr"
                    ? "Pencereyi simge durumuna küçült"
                    : "Minimize window"
                }
                className="w-3 h-3 bg-[#FEBC2E] rounded-full border border-black/[0.12] relative flex items-center justify-center transition-all cursor-pointer"
              >
                <Minus
                  size={7}
                  className="text-[#5C3C00] opacity-0 group-hover/traffic:opacity-100 transition-opacity duration-100"
                  strokeWidth={3.5}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize();
                }}
                aria-label={
                  lang === "tr" ? "Pencereyi tam ekran yap" : "Maximize window"
                }
                className="w-3 h-3 bg-[#28C840] rounded-full border border-black/[0.12] relative flex items-center justify-center transition-all cursor-pointer"
              >
                <div className="w-[7px] h-[7px] border-[1.5px] border-[#003B00] opacity-0 group-hover/traffic:opacity-100 transition-opacity duration-100 rounded-[1px]" />
              </button>
            </div>

            {/* Centered title */}
            <div className="flex-1 flex justify-center mr-20">
              <span
                className={`text-[13px] font-bold tracking-tight ${titleTextCls}`}
              >
                {win.title}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex-1 relative ${isMobile ? "overflow-y-auto" : "overflow-hidden"} ${isDragging || isResizing ? "pointer-events-none select-none" : ""}`}
        style={isMobile ? { WebkitOverflowScrolling: "touch" } : undefined}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!isMobile && !win.isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}

      {/* Mobile home indicator */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-7 flex items-end justify-center pb-1.5 z-[40] pointer-events-none">
          <div
            className="w-32 h-1.5 bg-gray-400/60 rounded-full pointer-events-auto cursor-pointer active:bg-gray-500/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Window;
