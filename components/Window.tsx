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
  const [pos, setPos] = useState({
    x: 150 + Math.random() * 50,
    y: 80 + Math.random() * 30,
  });
  const [size, setSize] = useState(() => {
    if (win.id === "safari") {
      return { width: 1040, height: 680 };
    }
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
    dragStartPos.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
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
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;
        const minWidth = 400;
        const minHeight = 300;

        let newWidth = resizeStartPos.current.width;
        let newHeight = resizeStartPos.current.height;
        let newX = resizeStartPos.current.posX;
        let newY = resizeStartPos.current.posY;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(minWidth, resizeStartPos.current.width + deltaX);
        }
        if (resizeDirection.includes("w")) {
          const potentialWidth = resizeStartPos.current.width - deltaX;
          if (potentialWidth >= minWidth) {
            newWidth = potentialWidth;
            newX = resizeStartPos.current.posX + deltaX;
          }
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(
            minHeight,
            resizeStartPos.current.height + deltaY,
          );
        }
        if (resizeDirection.includes("n")) {
          const potentialHeight = resizeStartPos.current.height - deltaY;
          if (potentialHeight >= minHeight) {
            newHeight = potentialHeight;
            newY = resizeStartPos.current.posY + deltaY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPos({ x: newX, y: newY });
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

  // macOS Tahoe accurate color tokens
  const contentBg = isDarkMode ? "#1C1C1E" : "#FFFFFF";
  const titleBarBg = isDarkMode
    ? "rgba(38,38,40,0.96)"
    : "rgba(236,236,238,0.97)";
  const titleBarBorder = isDarkMode
    ? "1px solid rgba(255,255,255,0.07)"
    : "1px solid rgba(0,0,0,0.09)";
  const titleTextClass = isDarkMode ? "text-white/55" : "text-black/55";
  const mobileTitleClass = isDarkMode ? "text-white" : "text-black";

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
              boxShadow: "0 50px 100px -20px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.08)" /* fallback */,
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
          ${isMobile ? "h-[94px] pt-12" : "h-[40px]"}`}
        style={{
          background: titleBarBg,
          borderBottom: titleBarBorder,
        }}
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
              className={`text-[17px] font-black tracking-tight absolute left-1/2 -translate-x-1/2 ${mobileTitleClass}`}
            >
              {win.title}
            </span>
            <div className="w-16"></div>
          </div>
        ) : (
          <>
            {/* Traffic lights */}
            <div className="flex gap-2 w-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-3 h-3 bg-[#FF5F57] rounded-full border border-black/[0.12] group relative flex items-center justify-center hover:brightness-90 transition-all"
              >
                <X
                  size={7}
                  className="text-[#4C0000] opacity-0 group-hover:opacity-100"
                  strokeWidth={3.5}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                className="w-3 h-3 bg-[#FEBC2E] rounded-full border border-black/[0.12] group relative flex items-center justify-center hover:brightness-90 transition-all"
              >
                <Minus
                  size={7}
                  className="text-[#5C3C00] opacity-0 group-hover:opacity-100"
                  strokeWidth={3.5}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize();
                }}
                className="w-3 h-3 bg-[#28C840] rounded-full border border-black/[0.12] group relative flex items-center justify-center hover:brightness-90 transition-all"
              >
                <div className="w-[7px] h-[7px] border-[1.5px] border-[#003B00] opacity-0 group-hover:opacity-100 rounded-[1px]" />
              </button>
            </div>
            {/* Centered title */}
            <div className="flex-1 flex justify-center mr-20">
              <span
                className={`text-[13px] font-semibold tracking-tight ${titleTextClass}`}
              >
                {win.title}
              </span>
            </div>
          </>
        )}
      </div>

      <div
        className={`flex-1 relative ${
          isMobile ? "overflow-y-auto" : "overflow-hidden"
        } ${isDragging || isResizing ? "pointer-events-none select-none" : ""}`}
        style={isMobile ? { WebkitOverflowScrolling: "touch" } : undefined}
      >
        {children}
      </div>

      {/* Resize Handles */}
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

      {/* Mobile Home Indicator */}
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
