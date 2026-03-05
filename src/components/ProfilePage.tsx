import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import I from "@/icons/Icons";
import { ALL_COURSES, DARK, LIGHT, Theme, USER } from "@/helpers/constants/data";

/* ══════════════════════════════════════════════════════
   STAR RATING
══════════════════════════════════════════════════════ */
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half   = !filled && i < rating;
        return (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={filled ? "#f59e0b" : half ? `url(#half-${i})` : "rgba(245,158,11,0.2)"}
              stroke="#f59e0b"
              strokeWidth="1"
            />
          </svg>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LEVEL BADGE
══════════════════════════════════════════════════════ */
function LevelBadge({ level, T }: { level: number; T: Theme }) {
  const xpCurrent = 7430;
  const xpNext    = 10000;
  const pct       = Math.round((xpCurrent / xpNext) * 100);
  return (
    <div style={{ padding: "18px 22px", borderRadius: 16, background: T.bgCard2, border: `1px solid ${T.accentBorder}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(99,102,241,0.12)", filter: "blur(30px)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, position: "relative" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(99,102,241,0.5)", flexShrink: 0 }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>LVL</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{level}</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Level {level} Learner</div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{xpCurrent.toLocaleString()} / {xpNext.toLocaleString()} XP</div>
          <div style={{ fontSize: 11, color: T.accent, marginTop: 1, fontWeight: 600 }}>{xpNext - xpCurrent} XP to Level {level + 1}</div>
        </div>
      </div>
      <div style={{ height: 7, background: T.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", borderRadius: 7, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#6366f1,#a855f7)", borderRadius: 7, boxShadow: "0 0 8px rgba(99,102,241,0.6)", transition: "width 1s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontSize: 10, color: T.textMuted }}>0 XP</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.accent }}>{pct}%</span>
        <span style={{ fontSize: 10, color: T.textMuted }}>{xpNext.toLocaleString()} XP</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PREMIUM BADGE
══════════════════════════════════════════════════════ */
function PremiumBadge({ T }: { T: Theme }) {
  return (
    <div style={{ padding: "18px 22px", borderRadius: 16, background: "linear-gradient(135deg,rgba(245,158,11,0.12),rgba(251,191,36,0.06))", border: "1px solid rgba(245,158,11,0.35)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -15, right: -15, width: 80, height: 80, borderRadius: "50%", background: "rgba(245,158,11,0.1)", filter: "blur(20px)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#f59e0b,#fbbf24)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 4px 20px rgba(245,158,11,0.5)", flexShrink: 0 }}>👑</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b" }}>Premium Certified</span>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div style={{ fontSize: 11, color: "rgba(245,158,11,0.8)", marginTop: 3 }}>Student · Verified since Jan 2025</div>
          <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
            {["All Courses Access", "Priority Support", "Certificates"].map(b => (
              <span key={b} style={{ fontSize: 9.5, color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FEATURED COURSE CARD  (5-star)
══════════════════════════════════════════════════════ */
function FeaturedCourseCard({ T }: { T: Theme }) {
  const featured = ALL_COURSES.reduce((best, c) => c.rating > best.rating ? c : best, ALL_COURSES[0]);
  return (
    <div style={{ padding: "18px 22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: featured.gradient }} />
      <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 12 }}>⭐ Top Rated Achievement</div>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: featured.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{featured.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{featured.title}</div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2, marginBottom: 8 }}>{featured.category} · {featured.level}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarRating rating={5} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b" }}>5.0</span>
            <span style={{ fontSize: 11, color: T.textMuted }}>· {featured.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: featured.color, background: `${featured.color}14`, padding: "4px 9px", borderRadius: 20, border: `1px solid ${featured.color}30`, whiteSpace: "nowrap" }}>
          Completed ✓
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════ */
function StatCard({ icon, label, value, sub, color, T }: { icon: string; label: string; value: string | number; sub?: string; color: string; T: Theme }) {
  return (
    <div style={{ padding: "20px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -10, right: -10, width: 60, height: 60, borderRadius: "50%", background: `${color}12`, filter: "blur(16px)" }} />
      <span style={{ fontSize: 22 }}>{icon}</span>
      <div style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: T.textMuted }}>{sub}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ACTIVITY HEATMAP
══════════════════════════════════════════════════════ */
function ActivityHeatmap({ T }: { T: Theme }) {
  const days  = Array.from({ length: 112 }, () => { const r = Math.random(); return r > 0.7 ? 3 : r > 0.5 ? 2 : r > 0.35 ? 1 : 0; });
  const weeks = Array.from({ length: 16 }, (_, w) => days.slice(w * 7, w * 7 + 7));
  const colors: Record<number, string> = {
    0: T.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    1: "rgba(99,102,241,0.25)", 2: "rgba(99,102,241,0.55)", 3: "#6366f1",
  };
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
        <span>Activity (last 16 weeks)</span>
        <span style={{ color: T.accent, fontWeight: 600 }}>🔥 {USER.streak} day streak</span>
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {week.map((level, di) => <div key={di} style={{ width: 11, height: 11, borderRadius: 3, background: colors[level] }} />)}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 5, alignItems: "center", marginTop: 8, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 10, color: T.textMuted }}>Less</span>
        {[0, 1, 2, 3].map(l => <div key={l} style={{ width: 9, height: 9, borderRadius: 2, background: colors[l] }} />)}
        <span style={{ fontSize: 10, color: T.textMuted }}>More</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COURSE PROGRESS LIST
══════════════════════════════════════════════════════ */
function CourseProgressList({ T }: { T: Theme }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {ALL_COURSES.map(c => {
        const pct = Math.round((c.completedLessons / c.totalLessons) * 100);
        return (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: T.bgCard2, border: `1px solid ${T.border}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: c.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
              <div style={{ height: 4, borderRadius: 4, background: `${c.color}18`, overflow: "hidden", marginTop: 6 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: c.gradient, borderRadius: 4 }} />
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? "#22c55e" : c.color, flexShrink: 0, minWidth: 34, textAlign: "right" }}>
              {pct === 100 ? "✓" : `${pct}%`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROFILE PAGE  — zero props, self-contained
══════════════════════════════════════════════════════ */
export default function ProfilePage() {
  // Theme: read localStorage so it stays in sync with Dashboard
  const savedTheme = (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
  const [theme, setTheme] = useState<"dark" | "light">(savedTheme);
  const T: Theme = theme === "dark" ? DARK : LIGHT;

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "activity">("overview");

  // User from localStorage
  const raw        = localStorage.getItem("userDetails");
  const userProfile = raw ? JSON.parse(raw) : {};
  const userName   = (userProfile?.user_name as string) ?? "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const completedCount        = ALL_COURSES.filter(c => c.completedLessons === c.totalLessons).length;
  const inProgressCount       = ALL_COURSES.filter(c => c.completedLessons > 0 && c.completedLessons < c.totalLessons).length;
  const totalLessonsCompleted = ALL_COURSES.reduce((a, c) => a + c.completedLessons, 0);

  // TanStack Router navigation
  const navigate = useNavigate();

  const TABS = [
    { id: "overview" as const, label: "Overview"   },
    { id: "courses"  as const, label: "My Courses" },
    { id: "activity" as const, label: "Activity"   },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: T.text }}>

      {/* ─── TOP NAV ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40, height: 64,
        background: T.mode === "dark" ? "rgba(9,9,15,0.92)" : "rgba(245,247,255,0.94)",
        backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px",
      }}>
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 10, background: T.input, border: `1px solid ${T.border}`, color: T.textSub, fontSize: 13, fontWeight: 500 }}
        >
          {I.back} Dashboard
        </button>
        <button
          onClick={handleThemeToggle}
          style={{ width: 34, height: 34, borderRadius: 8, background: T.input, border: `1px solid ${T.border}`, color: T.textSub, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {theme === "dark" ? I.sun : I.moon}
        </button>
      </header>

      {/* ─── COVER + AVATAR ─── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ height: 180, background: "linear-gradient(135deg,#1a1040 0%,#0f1a3e 45%,#1a0a40 100%)", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(99,102,241,0.35) 0%, transparent 55%), radial-gradient(circle at 20% 60%, rgba(168,85,247,0.2) 0%, transparent 45%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>
        <div style={{ position: "relative", padding: "0 36px", marginTop: -52 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
              <div style={{ width: 90, height: 90, borderRadius: 22, background: "linear-gradient(135deg,#6366f1,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: "#fff", border: `4px solid ${T.bg}`, boxShadow: "0 8px 32px rgba(99,102,241,0.5)", flexShrink: 0 }}>
                {userInitial}
              </div>
              <div style={{ paddingBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.04em", margin: 0 }}>{userName}</h1>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="9 12 11 14 15 10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: T.textMuted }}>{USER.role}</span>
                  <span style={{ fontSize: 12, color: T.textMuted }}>·</span>
                  <span style={{ fontSize: 12, color: T.textMuted }}>📍 {USER.location}</span>
                  <span style={{ fontSize: 12, color: T.textMuted }}>·</span>
                  <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>🔥 {USER.streak} day streak</span>
                </div>
              </div>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div style={{ padding: "20px 36px 0", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 20px", fontSize: 13.5, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.accent : T.textMuted, background: "transparent", borderBottom: `2px solid ${activeTab === tab.id ? T.accent : "transparent"}`, marginBottom: -1, transition: "all 0.15s" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div style={{ padding: "28px 36px 60px" }}>

        {/* ══ OVERVIEW ══ */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                <StatCard icon="🎓" label="Completed"   value={completedCount}        sub="courses"    color="#22c55e" T={T} />
                <StatCard icon="⚡" label="In Progress" value={inProgressCount}        sub="courses"    color="#f59e0b" T={T} />
                <StatCard icon="📚" label="Lessons"     value={totalLessonsCompleted}  sub="done total" color="#6366f1" T={T} />
              </div>
              <LevelBadge level={USER.level} T={T} />
              <PremiumBadge T={T} />
              <FeaturedCourseCard T={T} />
            </div>
            {/* RIGHT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* About */}
              <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>About</div>
                <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.7, marginBottom: 14 }}>
                  Passionate about cybersecurity and cloud infrastructure. Currently upskilling through structured learning paths to transition into a full-time security role.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {[
                    { icon: "📧", label: USER.email },
                    { icon: "📍", label: USER.location },
                    { icon: "🎯", label: "Goal: SOC Analyst → Cloud Security Engineer" },
                    { icon: "📅", label: "Member since Jan 2025" },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>{r.icon}</span>
                      <span style={{ fontSize: 12.5, color: T.textMuted }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Badges */}
              <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>Badges Earned</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[
                    { emoji: "🛡️", name: "Cyber Defender", color: "#0ea5e9" },
                    { emoji: "🔥", name: `${USER.streak}d Streak`, color: "#f97316" },
                    { emoji: "👑", name: "Premium Member",  color: "#f59e0b" },
                    { emoji: "⭐", name: "5-Star Learner",  color: "#eab308" },
                    { emoji: "🚀", name: "Fast Finisher",   color: "#8b5cf6" },
                    { emoji: "🎯", name: "Goal Setter",     color: "#10b981" },
                  ].map(b => (
                    <div key={b.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "12px 14px", borderRadius: 12, background: `${b.color}10`, border: `1px solid ${b.color}25`, minWidth: 72, textAlign: "center" }}>
                      <span style={{ fontSize: 22 }}>{b.emoji}</span>
                      <span style={{ fontSize: 9.5, color: b.color, fontWeight: 700, letterSpacing: "0.03em" }}>{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Skills */}
              <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>Skills</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { name: "Networking",        pct: 80, color: "#0ea5e9" },
                    { name: "Linux",             pct: 65, color: "#10b981" },
                    { name: "Security Analysis", pct: 55, color: "#6366f1" },
                    { name: "Cloud (AWS)",        pct: 70, color: "#f59e0b" },
                    { name: "Log Analysis",       pct: 90, color: "#22c55e" },
                  ].map(s => (
                    <div key={s.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: T.textSub, fontWeight: 500 }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                      </div>
                      <div style={{ height: 5, background: `${s.color}18`, borderRadius: 5, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MY COURSES ══ */}
        {activeTab === "courses" && (
          <div style={{ maxWidth: 680 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>All Enrolled Courses</div>
            <CourseProgressList T={T} />
          </div>
        )}

        {/* ══ ACTIVITY ══ */}
        {activeTab === "activity" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}`, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Learning Streak</div>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#f97316" }}>🔥 {USER.streak} days</span>
              </div>
              <ActivityHeatmap T={T} />
            </div>
            <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 16 }}>Recent Activity</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { icon: "✅", text: "Completed TCP/IP Protocol Suite", course: "Cyber Security Analyst", time: "2h ago",  color: "#22c55e" },
                  { icon: "▶️", text: "Started DNS & DHCP Deep Dive",   course: "Cyber Security Analyst", time: "3h ago",  color: "#6366f1" },
                  { icon: "🏆", text: "Earned 5-Star on SOC Analyst",   course: "SOC Analyst",            time: "1d ago",  color: "#f59e0b" },
                  { icon: "✅", text: "Completed VPC – Networking",      course: "Cloud Engineer",         time: "2d ago",  color: "#22c55e" },
                  { icon: "🔥", text: "Hit a 21-day streak!",            course: "Milestone",              time: "3d ago",  color: "#f97316" },
                  { icon: "✅", text: "Completed SIEM Lab",              course: "SOC Analyst",            time: "4d ago",  color: "#22c55e" },
                ].map((item, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "13px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: `${item.color}14`, border: `1px solid ${item.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{item.text}</div>
                      <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{item.course} · {item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}