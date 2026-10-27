"use client";

import React, { useState, useMemo } from "react";
import { Language } from "@/lib/types";
import { DATA } from "@/lib/data";
import { X, Info, MoreHorizontal, Search, ChevronDown } from "lucide-react";

interface ActivityMonitorProps {
  lang: Language;
  isDarkMode?: boolean;
}

type Tab = "cpu" | "memory" | "energy" | "disk" | "network";

const BLUE = "#0a84ff";
const GREEN = "#30d158";
const YELLOW = "#ffd60a";

function seededValue(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
}

export default function ActivityMonitor({
  lang,
  isDarkMode,
}: ActivityMonitorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("cpu");
  const [search, setSearch] = useState("");
  const isTr = lang === "tr";

  // ─── Tema ──────────────────────────────────────────────────────────────────
  const BG = isDarkMode ? "#1c1c1c" : "#f2f2f7";
  const ROW_EVEN = isDarkMode ? "#2c2c2e" : "#ffffff";
  const ROW_ODD = isDarkMode ? "#232325" : "#f8f8fa";
  const BORDER = isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const TEXT = isDarkMode ? "#ffffff" : "#1c1c1e";
  const MUTED = isDarkMode ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)";
  const TOOLBAR_BG = isDarkMode
    ? "rgba(30,30,30,0.95)"
    : "rgba(242,242,247,0.98)";
  const SEG_BG = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const ACTIVE_TAB_BG = "#ffffff";
  const ACTIVE_TAB_FG = "#1c1c1e";
  const BTN_BG = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  const projects = DATA[lang].projects.items;

  const techMap = useMemo(() => {
    const map = new Map<string, number>();
    projects.forEach((p) =>
      p.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1)),
    );
    return map;
  }, [projects]);

  const total = useMemo(
    () => Array.from(techMap.values()).reduce((a, b) => a + b, 0),
    [techMap],
  );

  const processes = useMemo(
    () =>
      Array.from(techMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, count], i) => ({
          name,
          pid: 1000 + i * 37,
          cpu: ((count / total) * 100).toFixed(1),
          memory: seededValue(i * 3 + 1, 48, 512),
          threads: seededValue(i * 7 + 2, 2, 16),
          user: ["root", "system", isTr ? "kullanıcı" : "user"][i % 3],
          energy: seededValue(i * 5 + 3, 1, 9),
          readMB: seededValue(i * 11 + 4, 2, 280),
          writeMB: seededValue(i * 13 + 5, 0, 120),
        })),
    [techMap, total, isTr],
  );

  const filtered = processes.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const tabs: { id: Tab; label: string }[] = [
    { id: "cpu", label: "CPU" },
    { id: "memory", label: isTr ? "Bellek" : "Memory" },
    { id: "energy", label: isTr ? "Enerji" : "Energy" },
    { id: "disk", label: "Disk" },
    { id: "network", label: isTr ? "Ağ" : "Network" },
  ];

  const columns: Record<Tab, { k: string; label: string; align: "right" }[]> = {
    cpu: [
      { k: "cpu", label: isTr ? "CPU %" : "% CPU", align: "right" },
      { k: "threads", label: isTr ? "Thread" : "Threads", align: "right" },
      { k: "pid", label: "PID", align: "right" },
      { k: "user", label: isTr ? "Kullanıcı" : "User", align: "right" },
    ],
    memory: [
      {
        k: "memory",
        label: isTr ? "Bellek (MB)" : "Memory (MB)",
        align: "right",
      },
      { k: "threads", label: isTr ? "Thread" : "Threads", align: "right" },
      { k: "pid", label: "PID", align: "right" },
      { k: "user", label: isTr ? "Kullanıcı" : "User", align: "right" },
    ],
    energy: [
      {
        k: "energy",
        label: isTr ? "Enerji Etkisi" : "Energy Impact",
        align: "right",
      },
      { k: "threads", label: isTr ? "Thread" : "Threads", align: "right" },
      { k: "pid", label: "PID", align: "right" },
      { k: "user", label: isTr ? "Kullanıcı" : "User", align: "right" },
    ],
    disk: [
      {
        k: "readMB",
        label: isTr ? "Okunan (MB/s)" : "Read (MB/s)",
        align: "right",
      },
      {
        k: "writeMB",
        label: isTr ? "Yazılan (MB/s)" : "Write (MB/s)",
        align: "right",
      },
      { k: "pid", label: "PID", align: "right" },
      { k: "user", label: isTr ? "Kullanıcı" : "User", align: "right" },
    ],
    network: [
      {
        k: "readMB",
        label: isTr ? "Alınan (KB/s)" : "Recv (KB/s)",
        align: "right",
      },
      {
        k: "writeMB",
        label: isTr ? "Gönderilen (KB/s)" : "Sent (KB/s)",
        align: "right",
      },
      { k: "pid", label: "PID", align: "right" },
      { k: "user", label: isTr ? "Kullanıcı" : "User", align: "right" },
    ],
  };

  const cols = columns[activeTab];
  const totalCPU = filtered
    .slice(0, 5)
    .reduce((s, p) => s + parseFloat(p.cpu), 0);
  const totalMem = filtered.reduce((s, p) => s + p.memory, 0);

  return (
    <div
      className="h-full flex flex-col overflow-hidden select-none"
      style={{
        background: BG,
        color: TEXT,
        fontFamily: "-apple-system,'SF Pro Text',sans-serif",
      }}
    >
      {/* ── Toolbar ───────────────────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center gap-2 px-3 py-2 overflow-x-auto"
        style={{ borderBottom: `1px solid ${BORDER}`, background: TOOLBAR_BG }}
      >
        <div className="flex flex-col shrink-0">
          <span className="text-[12px] font-bold leading-tight whitespace-nowrap">
            {isTr ? "Etkinlik Monitörü" : "Activity Monitor"}
          </span>
          <span
            className="text-[10px] whitespace-nowrap"
            style={{ color: MUTED }}
          >
            {isTr ? "Tüm İşlemler" : "All Processes"}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {[
            <X size={11} />,
            <Info size={11} />,
            <MoreHorizontal size={11} />,
          ].map((icon, i) => (
            <button
              key={i}
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: BTN_BG, color: MUTED }}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Segmented control */}
        <div
          className="flex items-center rounded-lg p-[2px] gap-[2px] shrink-0"
          style={{ background: SEG_BG }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-2 py-0.5 rounded-[5px] text-[11px] font-semibold transition-all whitespace-nowrap"
              style={
                activeTab === tab.id
                  ? { background: ACTIVE_TAB_BG, color: ACTIVE_TAB_FG }
                  : { color: MUTED }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Arama — sadece geniş ekranda */}
        <div
          className="hidden md:flex ml-auto items-center gap-1.5 px-2 py-1.5 rounded-lg shrink-0"
          style={{ background: BTN_BG, minWidth: 120 }}
        >
          <Search size={11} style={{ color: MUTED }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isTr ? "Ara" : "Search"}
            className="bg-transparent border-none outline-none text-[12px] w-full"
            style={{ color: TEXT }}
          />
        </div>
      </div>

      {/* ── Sütun başlıkları ──────────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center px-4 py-2 text-[11px] font-semibold uppercase tracking-wide"
        style={{ borderBottom: `1px solid ${BORDER}`, color: MUTED }}
      >
        <div className="flex-1 flex items-center gap-1 cursor-default min-w-0">
          {isTr ? "İşlem Adı" : "Process Name"} <ChevronDown size={10} />
        </div>
        {cols.map((col) => (
          <div
            key={col.k}
            className={`text-right cursor-default shrink-0 ${
              col.k === "pid" || col.k === "user"
                ? "hidden md:block w-24"
                : "w-20 sm:w-28"
            }`}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* ── Satırlar ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto px-2 py-1 custom-scrollbar">
        {filtered.map((p, i) => {
          const isHigh = activeTab === "cpu" && parseFloat(p.cpu) > 8;
          return (
            <div
              key={p.name}
              className="flex items-center px-3 py-[7px] rounded-lg mb-[2px] cursor-default transition-colors"
              style={{ background: i % 2 === 0 ? ROW_EVEN : ROW_ODD }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,122,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  i % 2 === 0 ? ROW_EVEN : ROW_ODD)
              }
            >
              <div className="flex-1 flex items-center gap-2.5 min-w-0">
                <div
                  className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: isHigh
                      ? "rgba(255,69,58,0.2)"
                      : "rgba(10,132,255,0.2)",
                    color: isHigh ? "#ff453a" : BLUE,
                  }}
                >
                  {p.name.substring(0, 2).toUpperCase()}
                </div>
                <span
                  className="text-[13px] font-medium truncate"
                  style={{ color: TEXT }}
                >
                  {p.name}
                </span>
              </div>

              {cols.map((col, ci) => {
                const raw = p[col.k as keyof typeof p];
                const isFirst = ci === 0;
                const color =
                  isFirst && isHigh
                    ? "#ff453a"
                    : isFirst &&
                        activeTab === "cpu" &&
                        parseFloat(String(raw)) > 4
                      ? YELLOW
                      : TEXT;
                return (
                  <div
                    key={col.k}
                    className={`text-right text-[12px] tabular-nums shrink-0 ${
                      col.k === "pid" || col.k === "user"
                        ? "hidden md:block w-24"
                        : "w-20 sm:w-28"
                    }`}
                    style={{ color, fontWeight: isFirst ? 600 : 400 }}
                  >
                    {col.k === "cpu"
                      ? `${raw}%`
                      : col.k === "memory"
                        ? `${raw} MB`
                        : String(raw)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Alt bilgi ────────────────────────────────────────────── */}
      <div
        className="shrink-0 grid grid-cols-2 gap-px"
        style={{ borderTop: `1px solid ${BORDER}`, background: BORDER }}
      >
        <div
          className="flex flex-col gap-1 px-5 py-3"
          style={{ background: BG }}
        >
          {activeTab === "cpu" && (
            <>
              <StatRow
                label={isTr ? "İşlemler:" : "Processes:"}
                value={String(filtered.length)}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Threads:" : "Threads:"}
                value={String(filtered.reduce((s, p) => s + p.threads, 0))}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "CPU Yükü:" : "CPU Load:"}
                value={`${totalCPU.toFixed(1)}%`}
                muted={MUTED}
                color={BLUE}
              />
            </>
          )}
          {activeTab === "memory" && (
            <>
              <StatRow
                label={isTr ? "Toplam:" : "Total:"}
                value={`${(totalMem / 1024).toFixed(1)} GB`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Kullanılan:" : "Used:"}
                value={`${((totalMem * 0.62) / 1024).toFixed(1)} GB`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Serbest:" : "Free:"}
                value={`${((totalMem * 0.38) / 1024).toFixed(1)} GB`}
                muted={MUTED}
                color={GREEN}
              />
            </>
          )}
          {activeTab === "energy" && (
            <>
              <StatRow
                label={isTr ? "Enerji:" : "Impact:"}
                value={String(filtered.reduce((s, p) => s + p.energy, 0))}
                muted={MUTED}
              />
            </>
          )}
          {activeTab === "disk" && (
            <>
              <StatRow
                label={isTr ? "Okunan:" : "Data Read:"}
                value={`${filtered.reduce((s, p) => s + p.readMB, 0)} MB/s`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Yazılan:" : "Written:"}
                value={`${filtered.reduce((s, p) => s + p.writeMB, 0)} MB/s`}
                muted={MUTED}
              />
            </>
          )}
          {activeTab === "network" && (
            <>
              <StatRow
                label={isTr ? "Alınan:" : "Received:"}
                value={`${filtered.reduce((s, p) => s + p.readMB, 0)} KB/s`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Gönderilen:" : "Sent:"}
                value={`${filtered.reduce((s, p) => s + p.writeMB, 0)} KB/s`}
                muted={MUTED}
              />
            </>
          )}
        </div>
        <div
          className="flex flex-col gap-1 px-5 py-3"
          style={{ background: BG }}
        >
          {activeTab === "cpu" && (
            <>
              <StatRow
                label={isTr ? "Kullanıcı:" : "User:"}
                value={`${(totalCPU * 0.6).toFixed(1)}%`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Sistem:" : "System:"}
                value={`${(totalCPU * 0.3).toFixed(1)}%`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Boşta:" : "Idle:"}
                value={`${(100 - totalCPU).toFixed(1)}%`}
                muted={MUTED}
                color={GREEN}
              />
            </>
          )}
          {activeTab === "memory" && (
            <>
              <StatRow
                label={isTr ? "Kablo bağlı:" : "Wired:"}
                value={`${((totalMem * 0.15) / 1024).toFixed(1)} GB`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Sıkıştırılmış:" : "Compressed:"}
                value={`${((totalMem * 0.08) / 1024).toFixed(1)} GB`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Önbellek:" : "Cached:"}
                value={`${((totalMem * 0.19) / 1024).toFixed(1)} GB`}
                muted={MUTED}
              />
            </>
          )}
          {activeTab === "energy" && (
            <>
              <StatRow
                label={isTr ? "Geçmiş Etki:" : "Avg Impact:"}
                value={isTr ? "Düşük" : "Low"}
                muted={MUTED}
                color={GREEN}
              />
              <StatRow
                label={isTr ? "Çalışma:" : "Uptime:"}
                value="247:12:04"
                muted={MUTED}
              />
            </>
          )}
          {activeTab === "disk" && (
            <>
              <StatRow
                label={isTr ? "Okuma I/O:" : "Read I/O:"}
                value={`${filtered.length * 12} ops/s`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Yazma I/O:" : "Write I/O:"}
                value={`${filtered.length * 5} ops/s`}
                muted={MUTED}
              />
            </>
          )}
          {activeTab === "network" && (
            <>
              <StatRow
                label={isTr ? "Alınan Veri:" : "Total Received:"}
                value={`${(filtered.reduce((s, p) => s + p.readMB, 0) * 0.87).toFixed(0)} MB`}
                muted={MUTED}
              />
              <StatRow
                label={isTr ? "Gönderilen Veri:" : "Total Sent:"}
                value={`${(filtered.reduce((s, p) => s + p.writeMB, 0) * 0.87).toFixed(0)} MB`}
                muted={MUTED}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  muted,
  color,
}: {
  label: string;
  value: string;
  muted: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between items-baseline text-[12px]">
      <span style={{ color: muted }}>{label}</span>
      <span
        className="font-semibold tabular-nums"
        style={color ? { color } : undefined}
      >
        {value}
      </span>
    </div>
  );
}
