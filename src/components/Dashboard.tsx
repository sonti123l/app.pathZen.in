import { useState } from "react";
import{ ALL_COURSES, Course, CYBER_COURSES, DEVOPS_COURSES, Theme, USER } from "@/helpers/constants/data";
import I from "@/icons/Icons";
import { useNavigate } from "@tanstack/react-router";



/* ══════════════════════════════════════════════════════
   GLOBAL CSS  (injected once by App)
══════════════════════════════════════════════════════ */
export function GlobalCSS({ T }: { T: Theme }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
      ::-webkit-scrollbar { width:5px; height:5px; }
      ::-webkit-scrollbar-track { background:transparent; }
      ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:10px; }
      button { font-family:inherit; cursor:pointer; border:none; outline:none; }
      input  { font-family:inherit; outline:none; border:none; }
      @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
      @keyframes scaleIn   { from{opacity:0;transform:scale(0.96) translateY(-8px)} to{opacity:1;transform:scale(1) translateY(0)} }
      @keyframes slideLeft { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
      .fade-up    { animation: fadeUp    0.45s ease both; }
      .fade-in    { animation: fadeIn    0.3s  ease both; }
      .scale-in   { animation: scaleIn   0.2s  ease both; }
      .slide-left { animation: slideLeft 0.4s  ease both; }
      .btn-hover  { transition: all 0.18s ease; }
      .btn-hover:hover { filter:brightness(1.1); transform:translateY(-1px); }
      .card-lift  { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor:pointer; }
      .card-lift:hover { transform:translateY(-4px); }
      .nav-item   { transition: all 0.15s ease; }
    `}</style>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION HEADER  (tiny helper)
══════════════════════════════════════════════════════ */
export function SectionHeader({ T, title, sub }: { T: Theme; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 19, fontWeight: 700, color: T.text, letterSpacing: "-0.03em" }}>{title}</h2>
      <p style={{ fontSize: 12.5, color: T.textMuted, marginTop: 2 }}>{sub}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COURSE CARD
══════════════════════════════════════════════════════ */
export function CourseCard({
  c, T, navigate, i, highlight,
}: {
  c: Course; T: Theme; navigate: (to: string) => void; i: number; highlight?: boolean;
}) {
  const pct = Math.round((c.completedLessons / c.totalLessons) * 100);
  const status =
    c.completedLessons === c.totalLessons ? "completed"
    : c.completedLessons > 0 ? "progress"
    : "new";

  const statusMap = {
    completed: { label: "Completed",   color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)"  },
    progress:  { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)" },
    new:       { label: "Not Started", color: T.textMuted, bg: T.input,               border: T.border                },
  };
  const s = statusMap[status];

  return (
    <div
      className="card-lift fade-up"
      onClick={() => navigate(`course:${c.id}`)}
      style={{
        borderRadius: 16, background: T.bgCard,
        border: `1px solid ${highlight ? c.color + "30" : T.border}`,
        overflow: "hidden", boxShadow: T.cardShadow,
        animationDelay: `${i * 0.07}s`,
      }}
    >
      {/* colour accent bar */}
      <div style={{ height: 4, background: c.gradient }} />

      <div style={{ padding: "18px 20px 20px" }}>
        {/* top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 20 }}>{c.icon}</span>
            <span style={{
              fontSize: 10.5, fontWeight: 700, color: c.color,
              background: `${c.color}14`, padding: "3px 9px", borderRadius: 20,
              textTransform: "uppercase", letterSpacing: "0.07em",
            }}>{c.category}</span>
          </div>
          <span style={{ fontSize: 12, color: "#fbbf24", display: "flex", alignItems: "center", gap: 3, fontWeight: 600 }}>
            {I.star} {c.rating}
          </span>
        </div>

        <h3 style={{ fontSize: 15.5, fontWeight: 700, color: T.text, letterSpacing: "-0.025em", lineHeight: 1.3, marginBottom: 3 }}>{c.title}</h3>
        <p  style={{ fontSize: 12, color: T.textMuted, marginBottom: 14, lineHeight: 1.5 }}>{c.subtitle}</p>

        <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: T.textMuted }}>{I.clock} {c.duration}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: T.textMuted }}>{I.users} {c.students}</span>
          <span style={{ fontSize: 11.5, color: T.textMuted }}>📶 {c.level}</span>
        </div>

        {/* progress bar */}
        {status !== "new" && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: T.textMuted }}>Progress</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{pct}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 5, background: `${c.color}18`, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: c.gradient, borderRadius: 5 }} />
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
          }}>{s.label}</span>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 9,
            background: status === "completed" ? T.successBg : `${c.color}18`,
            color: status === "completed" ? T.success : c.color,
            fontSize: 12.5, fontWeight: 600,
            border: `1px solid ${status === "completed" ? "rgba(34,197,94,0.25)" : c.color + "30"}`,
          }}>
            {status === "completed" ? "Review" : status === "progress" ? "Continue →" : "Start →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════ */
interface DashboardProps {
  T: Theme;
  theme: string;
  setTheme: (t: string) => void;
  navigate: (to: string) => void;
}

export default function Dashboard({ T, theme, setTheme, navigate }: DashboardProps) {
  const [navTab,      setNavTab]      = useState("home");
  const [sideOpen,    setSideOpen]    = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterCat,   setFilterCat]   = useState("All");
  const W = sideOpen ? 240 : 68;
  const userNavigate = useNavigate(); 

  const NAV_ITEMS = [
    { id: "home",         label: "Home",           icon: I.home     },
    { id: "cyber",        label: "Cyber Security", icon: I.shield   },
    { id: "cloud",        label: "Cloud & DevOps", icon: I.cloud    },
    { id: "progress",     label: "My Progress",    icon: I.chart    },
    { id: "certificates", label: "Certificates",   icon: I.trophy   },
    { id: "settings",     label: "Settings",       icon: I.settings },
  ];

  const inProgress = ALL_COURSES.filter(c => c.completedLessons > 0 && c.completedLessons < c.totalLessons);
  const completed  = ALL_COURSES.filter(c => c.completedLessons === c.totalLessons);
  const userDetails = localStorage.getItem("userDetails");

 const userProfileUpdate = JSON.parse(userDetails);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ─── SIDEBAR ─── */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: W, zIndex: 50,
        background: T.sidebar, borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column",
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
        boxShadow: theme === "light" ? "4px 0 24px rgba(79,70,229,0.06)" : "none",
      }}>
        {/* Logo */}
        <div style={{
          height: 68, display: "flex", alignItems: "center",
          padding: sideOpen ? "0 20px" : "0",
          justifyContent: sideOpen ? "flex-start" : "center",
          borderBottom: `1px solid ${T.border}`, gap: 12, flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 16px rgba(99,102,241,0.45)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          {sideOpen && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.text, letterSpacing: "-0.04em" }}>Path Zen</div>
              <div style={{ fontSize: 9.5, color: T.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Learn · Build · Grow</div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV_ITEMS.map(item => {
            const active = navTab === item.id;
            return (
              <button key={item.id} className="nav-item" onClick={() => setNavTab(item.id)}
                title={!sideOpen ? item.label : ""}
                style={{
                  display: "flex", alignItems: "center", gap: 11,
                  padding: sideOpen ? "10px 13px" : "10px",
                  borderRadius: 10, position: "relative",
                  background: active ? T.accentBg : "transparent",
                  color: active ? T.accent : T.textSub,
                  fontWeight: active ? 600 : 500, fontSize: 13.5,
                  width: "100%", textAlign: "left",
                  justifyContent: sideOpen ? "flex-start" : "center",
                  border: `1px solid ${active ? T.accentBorder : "transparent"}`,
                }}>
                {active && sideOpen && (
                  <div style={{ position: "absolute", left: 0, top: "18%", bottom: "18%", width: 3, background: T.accent, borderRadius: "0 3px 3px 0" }} />
                )}
                <span style={{ flexShrink: 0, display: "flex" }}>{item.icon}</span>
                {sideOpen && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

       

        {/* User row */}
        <div style={{ padding: sideOpen ? "12px 14px 16px" : "12px 8px 16px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, justifyContent: sideOpen ? "flex-start" : "center" }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{userProfileUpdate.user_name.charAt(0).toUpperCase()}</div>
          {sideOpen && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userProfileUpdate.user_name}</div>
              <div style={{ fontSize: 10.5, color: T.textMuted }}>{USER.role}</div>
            </div>
          )}
        </div>
      </aside>

      {/* ─── MAIN AREA ─── */}
      <div style={{ marginLeft: W, flex: 1, transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)", minWidth: 0 }}>

        {/* TOP BAR */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40, height: 68,
          background: T.mode === "dark" ? "rgba(9,9,15,0.9)" : "rgba(245,247,255,0.92)",
          backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSideOpen(p => !p)} style={{ width: 34, height: 34, borderRadius: 8, background: T.input, color: T.textSub, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}` }}>
              {I.menu}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.input, border: `1px solid ${T.border}`, borderRadius: 10, padding: "8px 13px", width: 260 }}>
              <span style={{ color: T.textMuted, display: "flex" }}>{I.search}</span>
              <input placeholder="Search courses..." style={{ background: "transparent", color: T.text, fontSize: 13.5, flex: 1 }} />
              <kbd style={{ fontSize: 10, color: T.textMuted, background: T.border, padding: "2px 6px", borderRadius: 5 }}>⌘K</kbd>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 34, height: 34, borderRadius: 8, background: T.input, color: T.textSub, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}`, transition: "all 0.2s" }}>
              {theme === "dark" ? I.sun : I.moon}
            </button>
            <button style={{ position: "relative", width: 34, height: 34, borderRadius: 8, background: T.input, color: T.textSub, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${T.border}` }}>
              {I.bell}
              <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", background: "#ef4444", border: `2px solid ${T.input}` }} />
            </button>

            {/* Profile button */}
            <button onClick={() => setProfileOpen(p => !p)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 12px 5px 6px", borderRadius: 10, background: T.input, border: `1px solid ${profileOpen ? T.accentBorder : T.border}`, transition: "border 0.15s" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff" }}>{userProfileUpdate.user_name.charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, lineHeight: 1.2 }}>{userProfileUpdate.user_name.split(" ")[0]}</div>
              </div>
              <span style={{ color: T.textMuted, display: "flex" }}>{I.chevronDown}</span>
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <>
                <div onClick={() => setProfileOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 45 }} />
                <div className="scale-in" style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 280, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, boxShadow: T.shadow, zIndex: 50, overflow: "hidden" }}>
                  <div style={{ height: 70, background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
                  </div>
                  <div style={{ padding: "0 18px 18px", position: "relative" }}>
                    <div style={{ marginTop: -22, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", border: `3px solid ${T.bgCard}` }}>{userProfileUpdate.user_name.charAt(0).toUpperCase()}</div>
                      <span style={{ fontSize: 10, color: T.accent, background: T.accentBg, padding: "3px 9px", borderRadius: 20, fontWeight: 600, border: `1px solid ${T.accentBorder}` }}>🔥 {USER.streak}d Streak</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text, letterSpacing: "-0.02em" }}>{userProfileUpdate.user_name}</div>
           
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button style={{ flex: 1, padding: "8px", borderRadius: 8, background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent, fontSize: 12, fontWeight: 600 }} onClick={() => userNavigate({to:"/profile"})}>Edit Profile</button>
                      <button style={{ flex: 1, padding: "8px", borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: 12, fontWeight: 600 }}>Sign Out</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        {/* ─── PAGE CONTENT ─── */}
        <main style={{ padding: "28px 28px 48px" }}>

          {/* HERO BANNER */}
          <div className="fade-up" style={{ marginBottom: 28, borderRadius: 20, overflow: "hidden", background: "linear-gradient(135deg,#1a1040 0%,#0f1a3e 40%,#0d2040 100%)", padding: "32px 36px", position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(99,102,241,0.2) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(168,85,247,0.15) 0%, transparent 50%)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Welcome back 👋</span>
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: 8 }}>Good morning, {userProfileUpdate.user_name.split(" ")[0]}!</h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>You're on a {USER.streak}-day streak — keep building your skills.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-hover" onClick={() => navigate(`course:${inProgress[0]?.id || ALL_COURSES[0].id}`)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 10, background: "#6366f1", color: "#fff", fontSize: 13.5, fontWeight: 600, boxShadow: "0 4px 16px rgba(99,102,241,0.5)" }}>
                  {I.play} Continue Learning
                </button>
                <button className="btn-hover" style={{ padding: "10px 20px", borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 13.5, fontWeight: 600, backdropFilter: "blur(10px)" }}>
                  Browse Courses
                </button>
              </div>
            </div>
            <div style={{ position: "relative", display: "flex", gap: 12 }}>
              {[{ v: ALL_COURSES.length, l: "Total Courses", i: "📚" }, { v: inProgress.length, l: "In Progress", i: "⚡" }, { v: completed.length, l: "Completed", i: "✅" }].map(s => (
                <div key={s.l} style={{ textAlign: "center", padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", minWidth: 80 }}>
                  <div style={{ fontSize: 24 }}>{s.i}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginTop: 4 }}>{s.v}</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS */}
          {inProgress.length > 0 && (
            <section style={{ marginBottom: 32 }}>
              <SectionHeader T={T} title="Continue Learning" sub={`${inProgress.length} courses in progress`} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
                {inProgress.map((c, i) => <CourseCard key={c.id} c={c} T={T} navigate={navigate} i={i} highlight />)}
              </div>
            </section>
          )}

          {/* ALL COURSES */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: T.text, letterSpacing: "-0.03em" }}>All Courses</h2>
                <p style={{ fontSize: 12.5, color: T.textMuted, marginTop: 2 }}>{ALL_COURSES.length} courses available</p>
              </div>
              <div style={{ display: "flex", gap: 4, padding: "4px", background: T.input, borderRadius: 10, border: `1px solid ${T.border}` }}>
                {(["All", "Cyber Security", "Cloud & DevOps"] as const).map(f => (
                  <button key={f} onClick={() => setFilterCat(f)} style={{ padding: "6px 14px", borderRadius: 7, fontSize: 12.5, fontWeight: 500, background: filterCat === f ? T.accent : "transparent", color: filterCat === f ? "#fff" : T.textSub, transition: "all 0.15s" }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {(filterCat === "All" || filterCat === "Cyber Security") && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>🛡️</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Cyber Security</span>
                  <span style={{ fontSize: 11, color: T.textMuted, background: T.input, padding: "2px 9px", borderRadius: 20, border: `1px solid ${T.border}` }}>{CYBER_COURSES.length} courses</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
                  {CYBER_COURSES.map((c, i) => <CourseCard key={c.id} c={c} T={T} navigate={navigate} i={i} />)}
                </div>
              </div>
            )}

            {(filterCat === "All" || filterCat === "Cloud & DevOps") && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>☁️</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Cloud & DevOps</span>
                  <span style={{ fontSize: 11, color: T.textMuted, background: T.input, padding: "2px 9px", borderRadius: 20, border: `1px solid ${T.border}` }}>{DEVOPS_COURSES.length} courses</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
                  {DEVOPS_COURSES.map((c, i) => <CourseCard key={c.id} c={c} T={T} navigate={navigate} i={i} />)}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}