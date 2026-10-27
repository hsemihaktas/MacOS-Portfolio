// Next.js route loading fallback — aynı boot ekranı estetiği

const S_POLYS = [
  "160,104 352,104 352,156 212,156",
  "160,114 212,166 212,222 160,274",
  "220,230 344,230 292,282 168,282",
  "352,238 352,400 300,348 300,290",
  "160,356 292,356 344,408 160,408",
];

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center">
      {/* S Logosu */}
      <svg
        viewBox="0 0 512 512"
        width="72"
        height="72"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {S_POLYS.map((pts, i) => (
          <polygon key={i} points={pts} fill="white" />
        ))}
      </svg>

      {/* Animasyonlu progress bar */}
      <div className="mt-16 w-[120px] h-[3px] rounded-full bg-white/15 overflow-hidden">
        <div className="h-full bg-white rounded-full animate-loading-bar" />
      </div>
    </div>
  );
}
