"use client";

import { useEffect, useState, useRef } from "react";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  isDarkMode?: boolean;
  lang: "tr" | "en";
}

const COLORS = {
  dark: ["#1e2128", "#0e4429", "#006d32", "#26a641", "#39d353"],
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

const MONTHS = {
  tr: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

const CELL = 11;
const GAP = 2;
const STEP = CELL + GAP; // px per week column

function buildGrid(allDays: Day[], weeksToShow: number): (Day | null)[][] {
  const days = allDays.slice(-(weeksToShow * 7));
  if (!days.length) return [];

  const first = new Date(days[0].date);
  const leadPad = (first.getDay() + 6) % 7;
  const last = new Date(days[days.length - 1].date);
  const trailPad = 6 - ((last.getDay() + 6) % 7);

  const padded: (Day | null)[] = [
    ...Array(leadPad).fill(null),
    ...days,
    ...Array(trailPad).fill(null),
  ];

  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(
      padded
        .slice(i, i + 7)
        .concat(Array(7).fill(null))
        .slice(0, 7),
    );
  }
  return weeks;
}

export default function GitHubCalendar({ isDarkMode, lang = "en" }: Props) {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"hidden" | "wave" | "done">("hidden");
  const [containerW, setContainerW] = useState(0);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Container genişliğini ölç
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new ResizeObserver((entries) => {
      setContainerW(entries[0].contentRect.width);
    });
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => r.json())
      .then((data) => {
        setDays(data.contributions ?? []);
        const t = data.total ?? {};
        setTotal(
          Object.values(t).reduce((a: number, b) => a + (b as number), 0),
        );
        setLoading(false);
        setTimeout(() => setPhase("wave"), 80);
        setTimeout(() => setPhase("done"), 2200);
      })
      .catch(() => setLoading(false));
  }, []);

  const palette = isDarkMode ? COLORS.dark : COLORS.light;
  const months = MONTHS[lang];
  const isTr = lang === "tr";

  // Kaç hafta sığıyor? (legend + month row için biraz padding bırak)
  const weeksToShow = containerW > 0 ? Math.floor((containerW - 4) / STEP) : 53;
  const weeks = buildGrid(days, Math.min(weeksToShow, 53));

  // Ay etiketleri
  const monthLabels: { col: number; label: string }[] = [];
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d !== null);
    if (first) {
      const d = new Date(first.date);
      const prev = wi > 0 ? weeks[wi - 1].find((d) => d !== null) : null;
      if (!prev || new Date(prev.date).getMonth() !== d.getMonth()) {
        monthLabels.push({ col: wi, label: months[d.getMonth()] });
      }
    }
  });

  if (loading) {
    return (
      <div ref={wrapRef} className="flex items-center gap-2 py-3">
        <div
          className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
          style={{ opacity: 0.4 }}
        />
        <span className="text-[12px]" style={{ opacity: 0.4 }}>
          {isTr ? "Yükleniyor..." : "Loading..."}
        </span>
      </div>
    );
  }

  if (!days.length) return <div ref={wrapRef} />;

  return (
    <div ref={wrapRef}>
      {/* Başlık */}
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[13px] font-semibold opacity-70">
          {isTr ? "GitHub Katkıları" : "GitHub Contributions"}
        </span>
        <span className="text-[12px] opacity-45">
          {total.toLocaleString()}{" "}
          {isTr ? "katkı — son yıl" : "contributions — last year"}
        </span>
      </div>

      {/* Takvim — overflow yok, tam sığar */}
      <div ref={containerRef} className="relative">
        {/* Ay etiketleri */}
        <div
          className="relative h-4 mb-1"
          style={{ width: weeks.length * STEP }}
        >
          {monthLabels.map(({ col, label }) => (
            <span
              key={col}
              className="absolute text-[10px] font-medium"
              style={{ left: col * STEP, opacity: 0.42 }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid — tam sığan genişlik */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, ${CELL}px)`,
            gridTemplateRows: `repeat(7, ${CELL}px)`,
            gap: GAP,
            gridAutoFlow: "column",
            width: weeks.length * STEP - GAP,
          }}
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (!day)
                return (
                  <div
                    key={`p-${wi}-${di}`}
                    style={{ width: CELL, height: CELL }}
                  />
                );
              const delayMs = phase === "wave" ? wi * 15 + di * 2 : 0;
              const isVisible = phase !== "hidden";
              return (
                <div
                  key={day.date}
                  className="rounded-[2px] cursor-default"
                  style={{
                    width: CELL,
                    height: CELL,
                    background: palette[day.level],
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.2)",
                    transition:
                      phase === "wave"
                        ? `opacity 280ms ${delayMs}ms cubic-bezier(0.34,1.56,0.64,1), transform 280ms ${delayMs}ms cubic-bezier(0.34,1.56,0.64,1)`
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    const rect = (
                      e.target as HTMLElement
                    ).getBoundingClientRect();
                    const cnt = containerRef.current?.getBoundingClientRect();
                    if (!cnt) return;
                    const d = new Date(day.date);
                    const dateStr = d.toLocaleDateString(
                      isTr ? "tr-TR" : "en-US",
                      { day: "numeric", month: "short", year: "numeric" },
                    );
                    const cStr =
                      day.count === 0
                        ? isTr
                          ? "Katkı yok"
                          : "No contributions"
                        : isTr
                          ? `${day.count} katkı`
                          : `${day.count} contribution${day.count > 1 ? "s" : ""}`;
                    setTooltip({
                      text: `${cStr} · ${dateStr}`,
                      x: rect.left - cnt.left + CELL / 2,
                      y: rect.top - cnt.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            }),
          )}
        </div>

        {/* Lejant */}
        <div className="flex items-center justify-end gap-1 mt-2">
          <span className="text-[10px] mr-1" style={{ opacity: 0.4 }}>
            {isTr ? "Az" : "Less"}
          </span>
          {palette.map((c, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{ width: CELL, height: CELL, background: c }}
            />
          ))}
          <span className="text-[10px] ml-1" style={{ opacity: 0.4 }}>
            {isTr ? "Çok" : "More"}
          </span>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute z-50 pointer-events-none px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap shadow-xl"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%,-100%)",
              background: isDarkMode
                ? "rgba(255,255,255,0.15)"
                : "rgba(0,0,0,0.78)",
              color: "#fff",
              backdropFilter: "blur(8px)",
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
}
