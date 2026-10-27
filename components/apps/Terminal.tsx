"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
} from "react";
import { Language, AppID } from "@/lib/types";
import { projectDefinitions } from "@/lib/data/projects";
import { aboutData } from "@/lib/data/about";

interface TerminalProps {
  lang: Language;
  isDarkMode?: boolean;
  onOpenApp?: (id: AppID, params?: Record<string, string>) => void;
}

interface Line {
  id: number;
  kind: "welcome" | "prompt" | "output" | "error" | "blank";
  text: string;
}

// ─── Renk sabitleri ────────────────────────────────────────────────────────────
const C = {
  green: "#30d158",
  yellow: "#ffd60a",
  blue: "#64d2ff",
  red: "#ff453a",
  muted: "#8e8e93",
  white: "#f5f5f7",
  dim: "#48484a",
};

let _id = 0;
const uid = () => ++_id;

const line = (kind: Line["kind"], text: string): Line => ({
  id: uid(),
  kind,
  text,
});

// ─── Sahte dosya sistemi ────────────────────────────────────────────────────────
const FS: Record<string, string[]> = {
  "~": ["about.md", "contact.md", "skills.md", "projects/"],
  "~/projects": ["mobile/", "web/", "discord/"],
  "~/projects/mobile": projectDefinitions
    .filter((p) => p.platform === "mobile")
    .map((p) => p.tr.title.split(" ")[0].toLowerCase() + ".md"),
  "~/projects/web": projectDefinitions
    .filter((p) => p.platform === "web")
    .map((p) => p.tr.title.split(" ")[0].toLowerCase() + ".md"),
  "~/projects/discord": projectDefinitions
    .filter((p) => p.platform === "discord-bot")
    .map((p) => p.tr.title.split(" ")[0].toLowerCase() + ".md"),
};

// ─── Komutlar ──────────────────────────────────────────────────────────────────
function buildCommands(
  lang: Language,
  onOpenApp?: (id: AppID, params?: Record<string, string>) => void,
) {
  const about = aboutData[lang];
  const projects = projectDefinitions;

  const isTr = lang === "tr";

  return {
    help: () => [
      line("output", ""),
      line(
        "output",
        isTr ? "  Kullanılabilir komutlar:" : "  Available commands:",
      ),
      line("output", ""),
      line(
        "output",
        `  ${"whoami".padEnd(18)} ${isTr ? "Geliştirici bilgileri" : "Developer info"}`,
      ),
      line(
        "output",
        `  ${"ls [dizin]".padEnd(18)} ${isTr ? "Dizin içeriğini listele" : "List directory contents"}`,
      ),
      line(
        "output",
        `  ${"cat <dosya>".padEnd(18)} ${isTr ? "Dosya içeriğini göster" : "Show file contents"}`,
      ),
      line(
        "output",
        `  ${"open <uygulama>".padEnd(18)} ${isTr ? "Uygulama aç (projects, skills, contact, appstore)" : "Open app (projects, skills, contact, appstore)"}`,
      ),
      line(
        "output",
        `  ${"cd <dizin>".padEnd(18)} ${isTr ? "Dizin değiştir" : "Change directory"}`,
      ),
      line(
        "output",
        `  ${"pwd".padEnd(18)} ${isTr ? "Mevcut dizini göster" : "Print working directory"}`,
      ),
      line(
        "output",
        `  ${"date".padEnd(18)} ${isTr ? "Tarih ve saat" : "Current date & time"}`,
      ),
      line(
        "output",
        `  ${"neofetch".padEnd(18)} ${isTr ? "Sistem bilgileri" : "System information"}`,
      ),
      line(
        "output",
        `  ${"history".padEnd(18)} ${isTr ? "Komut geçmişi" : "Command history"}`,
      ),
      line(
        "output",
        `  ${"github".padEnd(18)} ${isTr ? "GitHub profilini aç" : "Open GitHub profile"}`,
      ),
      line(
        "output",
        `  ${"linkedin".padEnd(18)} ${isTr ? "LinkedIn profilini aç" : "Open LinkedIn profile"}`,
      ),
      line(
        "output",
        `  ${"clear".padEnd(18)} ${isTr ? "Ekranı temizle" : "Clear screen"}`,
      ),
      line("output", ""),
    ],

    whoami: () => [
      line("output", ""),
      line("output", `  ${about.name}`),
      line("output", `  ${about.role}`),
      line("output", ""),
      line("output", `  ${isTr ? "Konum" : "Location"}:   ${about.location}`),
      line("output", `  ${isTr ? "Email" : "Email"}:     ${about.email}`),
      line("output", ""),
      line("output", `  ${isTr ? "Eğitim" : "Education"}: ${about.education}`),
      line("output", ""),
      ...(about.experience ?? []).map((e) =>
        line("output", `  ▸ ${e.company} — ${e.role} (${e.period})`),
      ),
      line("output", ""),
    ],

    pwd: (cwd: string) => [line("output", `  ${cwd}`)],

    ls: (cwd: string, args: string[]) => {
      const target = args[0]
        ? args[0].startsWith("~")
          ? args[0]
          : `${cwd}/${args[0]}`.replace("//", "/")
        : cwd;
      const entries = FS[target] ?? FS[cwd];
      if (!entries)
        return [
          line("error", `  ls: ${args[0] ?? cwd}: No such file or directory`),
        ];
      return [
        line("output", ""),
        line("output", "  " + entries.join("  ")),
        line("output", ""),
      ];
    },

    cat: (cwd: string, args: string[]) => {
      const filename = args[0];
      if (!filename) return [line("error", `  cat: missing operand`)];

      if (filename === "about.md" || filename === "about.me") {
        return [
          line("output", ""),
          line("output", `  # ${about.name}`),
          line("output", `  ${about.role}`),
          line("output", ""),
          line("output", `  ${about.summary}`),
          line("output", ""),
        ];
      }
      if (filename === "contact.md" || filename === "contact.txt") {
        return [
          line("output", ""),
          line("output", `  email:    ${about.email}`),
          line("output", `  github:   github.com/hsemihaktas`),
          line("output", `  linkedin: linkedin.com/in/hsemihaktas`),
          line("output", ""),
        ];
      }
      if (filename === "skills.md" || filename === "skills.txt") {
        return [
          line("output", ""),
          line(
            "output",
            "  Frontend:  Next.js · React · TypeScript · TailwindCSS",
          ),
          line("output", "  Mobile:    React Native · Expo · Firebase"),
          line(
            "output",
            "  Backend:   Node.js · Express · Supabase · PostgreSQL",
          ),
          line("output", "  Tools:     Git · Vercel · Discord.js · OpenCV"),
          line("output", ""),
        ];
      }

      // Proje dosyası mı?
      const slug = filename.replace(".md", "");
      const found = projects.find(
        (p) =>
          p.tr.title.split(" ")[0].toLowerCase() === slug ||
          p.en.title.split(" ")[0].toLowerCase() === slug,
      );
      if (found) {
        const t = found[lang];
        return [
          line("output", ""),
          line("output", `  # ${t.title}`),
          line("output", `  ${t.description}`),
          line("output", ""),
          ...(t.features ?? []).map((f) => line("output", `  ▸ ${f}`)),
          ...(found.websiteLink
            ? [line("output", ""), line("output", `  🔗 ${found.websiteLink}`)]
            : []),
          line("output", ""),
        ];
      }

      return [line("error", `  cat: ${filename}: No such file or directory`)];
    },

    open: (args: string[]) => {
      const target = args[0];
      const appMap: Record<string, AppID> = {
        projects: "projects",
        projeler: "projects",
        skills: "skills",
        yetenekler: "skills",
        contact: "contact",
        mail: "contact",
        appstore: "app-store",
        "app-store": "app-store",
        about: "about",
        hakkımda: "about",
        settings: "settings",
        ayarlar: "settings",
      };
      const appId = appMap[target?.toLowerCase()];
      if (!appId) {
        return [
          line(
            "error",
            `  open: "${target}": application not found. Try: projects, skills, contact, about`,
          ),
        ];
      }
      onOpenApp?.(appId);
      return [line("output", `  Opening ${target}...`)];
    },

    cd: (cwd: string, args: string[], setCwd: (v: string) => void) => {
      const target = args[0] ?? "~";
      const newPath =
        target === "~"
          ? "~"
          : target === ".."
            ? cwd.split("/").slice(0, -1).join("/") || "~"
            : target.startsWith("~")
              ? target
              : `${cwd}/${target}`;
      if (FS[newPath]) {
        setCwd(newPath);
        return [];
      }
      return [line("error", `  cd: ${target}: No such file or directory`)];
    },

    date: () => {
      const now = new Date();
      return [
        line(
          "output",
          `  ${now.toLocaleString(isTr ? "tr-TR" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}`,
        ),
      ];
    },

    neofetch: () => {
      const mobileCount = projects.filter(
        (p) => p.platform === "mobile",
      ).length;
      const webCount = projects.filter((p) => p.platform === "web").length;
      return [
        line("output", ""),
        line("output", "  visitor@semih-portfolio"),
        line("output", "  ─────────────────────────────────────"),
        line(
          "output",
          `  OS:        Portfolio OS 1.0 (Next.js ${isTr ? "üzerinde" : "on"} Vercel)`,
        ),
        line("output", `  Host:      Vercel Edge Network`),
        line("output", `  Kernel:    React 19 + TypeScript 5`),
        line("output", `  Shell:     portfolio-sh 1.0.0`),
        line("output", `  Terminal:  Portfolio Terminal`),
        line("output", `  Language:  TypeScript · JavaScript`),
        line(
          "output",
          `  Packages:  ${projects.length} ${isTr ? "proje" : "projects"} (${mobileCount} ${isTr ? "mobil" : "mobile"}, ${webCount} ${isTr ? "web" : "web"})`,
        ),
        line("output", `  Memory:    React Hooks + Zustand`),
        line("output", `  CPU:       Next.js App Router`),
        line("output", ""),
        line("output", "  ████ ████ ████ ████ ████ ████ ████"),
        line("output", ""),
      ];
    },

    github: () => {
      if (typeof window !== "undefined") {
        window.open(
          "https://github.com/hsemihaktas",
          "_blank",
          "noopener,noreferrer",
        );
      }
      return [line("output", "  → github.com/hsemihaktas")];
    },

    linkedin: () => {
      if (typeof window !== "undefined") {
        window.open(
          "https://linkedin.com/in/hsemihaktas",
          "_blank",
          "noopener,noreferrer",
        );
      }
      return [line("output", "  → linkedin.com/in/hsemihaktas")];
    },

    echo: (args: string[]) => [line("output", `  ${args.join(" ")}`)],

    history: (hist: string[]) => [
      line("output", ""),
      ...hist.map((cmd, i) =>
        line("output", `  ${String(i + 1).padStart(4)}  ${cmd}`),
      ),
      line("output", ""),
    ],
  };
}

// ─── Terminal component ────────────────────────────────────────────────────────
const WELCOME_LINES = [
  "",
  "  Portfolio Terminal 1.0.0",
  "  Type 'help' for available commands.",
  "",
];

export default function Terminal({ lang, onOpenApp }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(() =>
    WELCOME_LINES.map((t) => line("welcome", t)),
  );
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = `${cwd} % `;

  // Yeni satır eklendikçe en alta scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Input'a otomatik focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Önce prompt satırını ekle
      setLines((prev) => [...prev, line("prompt", `${prompt}${trimmed}`)]);

      // Geçmişe ekle
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistIdx(-1);

      const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
      const cmds = buildCommands(lang, onOpenApp);

      let out: Line[] = [];

      switch (cmd) {
        case "help":
          out = cmds.help();
          break;
        case "whoami":
          out = cmds.whoami();
          break;
        case "pwd":
          out = cmds.pwd(cwd);
          break;
        case "ls":
          out = cmds.ls(cwd, args);
          break;
        case "cat":
          out = cmds.cat(cwd, args);
          break;
        case "open":
          out = cmds.open(args);
          break;
        case "date":
          out = cmds.date();
          break;
        case "neofetch":
          out = cmds.neofetch();
          break;
        case "github":
          out = cmds.github();
          break;
        case "linkedin":
          out = cmds.linkedin();
          break;
        case "echo":
          out = cmds.echo(args);
          break;
        case "history":
          out = cmds.history(cmdHistory);
          break;
        case "cd":
          out = cmds.cd(cwd, args, setCwd);
          break;
        case "clear":
          setLines([]);
          return;
        default:
          out = [
            line(
              "error",
              `  command not found: ${cmd}. Type 'help' for commands.`,
            ),
          ];
      }

      setLines((prev) => [...prev, ...out]);
    },
    [prompt, cwd, lang, onOpenApp, cmdHistory],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[cmdHistory.length - 1 - newIdx] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(
        newIdx === -1 ? "" : (cmdHistory[cmdHistory.length - 1 - newIdx] ?? ""),
      );
      return;
    }
  };

  const lineColor = (k: Line["kind"]) => {
    if (k === "welcome") return C.muted;
    if (k === "error") return C.red;
    if (k === "prompt") return C.white;
    return C.white;
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden cursor-text"
      style={{
        background: "#1a1a1a",
        fontFamily: "'SF Mono','Menlo','Monaco','Courier New',monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Çıktı alanı */}
      <div className="flex-1 overflow-auto px-4 py-4 custom-scrollbar">
        {lines.map((l) => (
          <div
            key={l.id}
            className="text-[13px] leading-[1.6] whitespace-pre-wrap"
            style={{ color: lineColor(l.kind) }}
          >
            {l.kind === "prompt" ? (
              <>
                <span style={{ color: C.green }}>{prompt}</span>
                <span style={{ color: C.white }}>
                  {l.text.slice(prompt.length)}
                </span>
              </>
            ) : (
              l.text
            )}
          </div>
        ))}

        {/* Aktif input satırı */}
        <div className="flex items-center text-[13px] leading-[1.6]">
          <span style={{ color: C.green, whiteSpace: "pre" }}>{prompt}</span>
          <div className="relative flex-1">
            <span style={{ color: C.white, whiteSpace: "pre" }}>{input}</span>
            {/* Yanıp sönen cursor */}
            <span
              className="inline-block w-[7px] h-[14px] ml-[1px] align-middle animate-pulse"
              style={{ background: C.green, opacity: 0.9 }}
            />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="absolute inset-0 w-full opacity-0 cursor-text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
