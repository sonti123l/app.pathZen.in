import { useState, useEffect, useRef } from "react";

const ICONS = [
  {
    id: "assignment",
    label: "Assignment",
    color: "#f472b6",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    id: "course",
    label: "Course",
    color: "#a78bfa",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: "exam",
    label: "Exam",
    color: "#34d399",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: "video",
    label: "Video",
    color: "#fbbf24",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
];

const R = 90;
const TOTAL = 6000;

export default function LoadingAnimation() {
  const [angle, setAngle] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setAngle((elapsed % TOTAL) / TOTAL * 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const spotAngle = (angle + 270) % 360;
  const section = 360 / ICONS.length;
  const activeIdx = Math.floor(spotAngle / section) % ICONS.length;
  const phase = (spotAngle % section) / section;
  const bell = Math.sin(phase * Math.PI);

  const arcLen = 2 * Math.PI * R;

  return (
    <div style={root}>
      <svg width="320" height="320" viewBox="-160 -160 320 320" style={{ overflow: "visible" }}>
        {/* Dashed track */}
        <circle r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="4 7" />

        {/* Glowing trailing arc */}
        <circle
          r={R} fill="none"
          stroke="url(#arc)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={`${arcLen * 0.25} ${arcLen * 0.75}`}
          transform={`rotate(${angle - 90})`}
          style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }}
        />

        {/* Leading spark */}
        {(() => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const sx = Math.cos(rad) * R;
          const sy = Math.sin(rad) * R;
          return (
            <g>
              <circle cx={sx} cy={sy} r={5} fill="#a78bfa"
                style={{ filter: "drop-shadow(0 0 10px #a78bfa)" }} />
              <circle cx={sx} cy={sy} r={9} fill="none"
                stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
            </g>
          );
        })()}

        <defs>
          <linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Orbiting icons */}
        {ICONS.map((icon, i) => {
          const baseAngle = (i / ICONS.length) * 360;
          const rad = ((baseAngle + angle - 90) * Math.PI) / 180;
          const x = Math.cos(rad) * R;
          const y = Math.sin(rad) * R;

          const isActive = i === activeIdx;
          const distFromActive = Math.min(
            Math.abs(i - activeIdx),
            ICONS.length - Math.abs(i - activeIdx)
          );

          const scale = isActive ? 1 + bell * 0.7 : Math.max(0.65, 1 - distFromActive * 0.12);
          const opacity = isActive ? 1 : Math.max(0.3, 1 - distFromActive * 0.25);
          const glowOpacity = isActive ? bell * 0.6 : 0;
          const counterRot = -(baseAngle + angle - 90);

          return (
            <g key={icon.id} transform={`translate(${x},${y})`}>
              {/* Halo glow */}
              <circle r={30} fill="none" stroke={icon.color}
                strokeWidth={1} opacity={glowOpacity}
                style={{ filter: `drop-shadow(0 0 12px ${icon.color})` }} />

              {/* Disc */}
              <circle r={26}
                fill={`${icon.color}18`}
                stroke={icon.color}
                strokeWidth={isActive ? 1.5 : 0.8}
                opacity={opacity}
                transform={`scale(${scale})`}
                style={{ filter: isActive ? `drop-shadow(0 0 16px ${icon.color}99)` : "none" }}
              />

              {/* Icon — counter-rotated to stay upright */}
              <g transform={`rotate(${counterRot}) scale(${scale})`}
                opacity={opacity}
                style={{ color: isActive ? icon.color : "rgba(255,255,255,0.4)" }}>
                <g transform="translate(-12,-12)">{icon.svg}</g>
              </g>
            </g>
          );
        })}

        {/* Center dot */}
        <circle r={6} fill="#1e293b" stroke="rgba(167,139,250,0.4)" strokeWidth={1.5} />
        <circle r={3} fill="#a78bfa" style={{ filter: "drop-shadow(0 0 6px #a78bfa)" }} />
      </svg>

      {/* Active label */}
      <div style={labelWrap}>
        {ICONS.map((icon, i) => (
          <span key={icon.id} style={{
            ...labelStyle,
            color: icon.color,
            opacity: i === activeIdx ? 1 : 0,
            transform: i === activeIdx ? "translateY(0)" : "translateY(5px)",
            position: i === activeIdx ? "relative" : "absolute",
            transition: "opacity 0.25s, transform 0.25s",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: icon.color, boxShadow: `0 0 8px ${icon.color}`,
              display: "inline-block", marginRight: 8,
            }} />
            {icon.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const root = {
  minHeight: "100vh",
  background: "#080c14",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  fontFamily: "'DM Sans', system-ui, sans-serif",
};

const labelWrap = {
  height: 26,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: 160,
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
};