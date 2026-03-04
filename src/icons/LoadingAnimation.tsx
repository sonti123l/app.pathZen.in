import React, { useEffect, useRef, useState } from "react";

// ─── Icons ─────────────────────────────────────────────────────────────────
const CourseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const AssignmentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);
const VideoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="14" height="14" rx="2" />
    <path d="m16 9 5-3v10l-5-3V9z" />
  </svg>
);
const ExamIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
const InternshipIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

// ─── Config ─────────────────────────────────────────────────────────────────
interface IconConfig { id: string; label: string; color: string; Icon: React.FC; }

const ICON_LIST: IconConfig[] = [
  { id: "course",     label: "Course",        color: "#818cf8", Icon: CourseIcon     },
  { id: "assignment", label: "Assignment",    color: "#f472b6", Icon: AssignmentIcon },
  { id: "video",      label: "Video Lecture", color: "#fb923c", Icon: VideoIcon      },
  { id: "exam",       label: "Exam",          color: "#34d399", Icon: ExamIcon       },
  { id: "internship", label: "Internship",    color: "#facc15", Icon: InternshipIcon },
];

const N          = ICON_LIST.length;
const RADIUS     = 40;
const REVOLUTION = 12000; // ms per full revolution

// Highlight zone: top of circle (12 o'clock = 0°)
const HIGHLIGHT  = 0;

export default function LoadingAnimation() {
  const [masterDeg, setMasterDeg] = useState(0);
  // Track which icon label is currently shown — only switch when a new icon
  // is clearly the closest, to avoid rapid flickering
  const [activeIdx, setActiveIdx] = useState(0);
  const t0  = useRef<number | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const tick = (ts: number) => {
      if (!t0.current) t0.current = ts;
      const elapsed = ts - t0.current;
      const deg = (elapsed % REVOLUTION) / REVOLUTION * 360;
      setMasterDeg(deg);

      // Find which icon is closest to HIGHLIGHT (top = 0°)
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < N; i++) {
        const worldDeg = ((i / N) * 360 + deg) % 360;
        // Normalize to -180..180 relative to HIGHLIGHT
        let diff = worldDeg - HIGHLIGHT;
        if (diff > 180)  diff -= 360;
        if (diff < -180) diff += 360;
        const dist = Math.abs(diff);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      }
      setActiveIdx(bestIdx);

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const C = 2 * Math.PI * RADIUS;

  return (
    <div style={css.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
      `}</style>

      <svg width="120" height="120" viewBox="-60 -60 120 120" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#818cf8" stopOpacity="0" />
            <stop offset="70%"  stopColor="#818cf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Static dashed track */}
        <circle r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="3 6" />

        {/* Rotating arc + spark */}
        <g style={{ transformOrigin: "0 0", transform: `rotate(${masterDeg}deg)` }}>
          <circle
            r={RADIUS} fill="none" stroke="url(#arcGrad)"
            strokeWidth={2} strokeLinecap="round"
            strokeDasharray={`${C * 0.26} ${C * 0.74}`}
            strokeDashoffset={C * 0.26}
            style={{ transformOrigin: "0 0", transform: "rotate(-90deg)" }}
          />
          <circle cx={0} cy={-RADIUS} r={2.5} fill="#c4b5fd" filter="url(#glow)" />
          <circle cx={0} cy={-RADIUS} r={5}   fill="none" stroke="#c4b5fd" strokeWidth={0.7} opacity={0.3} />
        </g>

        {/* Orbiting icons */}
        {ICON_LIST.map(({ id, color, Icon }, i) => {
          const baseDeg  = (i / N) * 360;
          const worldDeg = (baseDeg + masterDeg) % 360;

          // Position on circle: 0° = top
          const rad = (worldDeg * Math.PI) / 180;
          const x = Math.sin(rad) * RADIUS;
          const y = -Math.cos(rad) * RADIUS;

          /*
           * PULSE: 1 scale-out and 1 scale-in per revolution.
           * sin²(worldAngle_rad / 1) — peaks once at 0° (top), troughs at 180° (bottom).
           * This means each icon grows as it approaches the top, shrinks as it leaves.
           */
          const sinSq    = Math.sin(rad / 1) ** 2; // 1 peak per revolution
          const scale    = 0.6 + sinSq * 0.7;       // 0.6 → 1.3
          const opacity  = 0.22 + sinSq * 0.78;     // 0.22 → 1.0
          const counterDeg = -worldDeg;

          return (
            <g key={id} transform={`translate(${x},${y})`}>
              <circle
                r={13}
                fill={`${color}14`}
                stroke={color}
                strokeWidth={0.7 + sinSq * 0.9}
                opacity={opacity}
                transform={`scale(${scale})`}
                style={sinSq > 0.65 ? { filter: `drop-shadow(0 0 5px ${color}aa)` } : undefined}
              />
              <g
                transform={`rotate(${counterDeg}) scale(${scale})`}
                opacity={opacity}
                style={{ color: sinSq > 0.5 ? color : "rgba(255,255,255,0.3)" }}
              >
                <g transform="translate(-7,-7)"><Icon /></g>
              </g>
            </g>
          );
        })}

        {/* Center */}
        <circle r={3.5} fill="#0d1117" stroke="rgba(196,181,253,0.25)" strokeWidth={1} />
        <circle r={1.8} fill="#a78bfa" filter="url(#glow)" />
      </svg>

      {/* Label — only 1 shown at a time, held steady, fades in/out with CSS transition */}
      <div style={css.labelArea}>
        {ICON_LIST.map(({ id, color, label }, i) => {
          const on = i === activeIdx;
          return (
            <span
              key={id}
              style={{
                ...css.label,
                color,
                opacity:   on ? 1 : 0,
                transform: on ? "translateY(0px)" : "translateY(5px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                position: "absolute",
                pointerEvents: "none",
              }}
            >
              <span style={{ ...css.dot, background: color, boxShadow: `0 0 5px ${color}` }} />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const css: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#0d1117",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    fontFamily: "'Outfit', system-ui, sans-serif",
  },
  labelArea: {
    height: 20,
    width: 160,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    flexShrink: 0,
    display: "inline-block",
  },
};