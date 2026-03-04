import { useState } from "react";
import { Course, Theme, TYPE_COLOR, TYPE_LABEL } from "@/helpers/constants/data";
import I from "@/icons/Icons";

/* ══════════════════════════════════════════════════════
   LESSON VIEW
══════════════════════════════════════════════════════ */
interface LessonViewProps {
  T: Theme;
  course: Course;
  lessonKey: string;
  setActiveLesson: (key: string | null) => void;
  totalLessons: number;
  completedLessons: number;
}

function LessonView({ T, course, lessonKey, setActiveLesson, totalLessons, completedLessons }: LessonViewProps) {
  const [si, mi] = lessonKey.split("-").map(Number);
  const step = course.steps[si];
  const mod  = step?.modules[mi];

  // flat list for prev/next navigation
  const allMods = course.steps.flatMap((s, sIdx) =>
    s.modules.map((m, mIdx) => ({ si: sIdx, mi: mIdx, m }))
  );
  const currentIdx = allMods.findIndex(x => x.si === si && x.mi === mi);
  const prev = currentIdx > 0                   ? allMods[currentIdx - 1] : null;
  const next = currentIdx < allMods.length - 1  ? allMods[currentIdx + 1] : null;

  if (!mod) return null;

  const typeEmoji: Record<string, string> = { video: "▶", quiz: "📝", lab: "🔬", project: "🏗️" };

  return (
    <div className="slide-left" style={{ maxWidth: 860, margin: "0 auto", padding: "32px 36px 60px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.textMuted, marginBottom: 20 }}>
        <button onClick={() => setActiveLesson(null)} style={{ background: "transparent", color: T.accent, fontSize: 12, fontWeight: 500 }}>
          Course Overview
        </button>
        <span>{I.chevronRight}</span>
        <span>{step.title}</span>
        <span>{I.chevronRight}</span>
        <span style={{ color: T.text, fontWeight: 600 }}>{mod.title}</span>
      </div>

      {/* Media area */}
      <div style={{ borderRadius: 18, overflow: "hidden", background: T.bgCard2, border: `1px solid ${T.border}`, marginBottom: 24 }}>
        <div style={{ aspectRatio: "16/9", background: `linear-gradient(135deg,${course.color}08,${T.bgCard2})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 50% 50%, ${course.color}12 0%, transparent 70%)` }} />
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: course.gradient, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 8px 32px ${course.color}55`, fontSize: 32 }}>
              {typeEmoji[mod.type]}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 6 }}>{mod.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
              <span style={{ fontSize: 11, color: TYPE_COLOR[mod.type], background: `${TYPE_COLOR[mod.type]}18`, padding: "3px 10px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{TYPE_LABEL[mod.type]}</span>
              <span style={{ fontSize: 11, color: T.textMuted }}>{mod.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meta cards row */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { icon: <span style={{ display: "flex", color: TYPE_COLOR[mod.type] }}>{I[mod.type as keyof typeof I]}</span>, label: "Type",     value: TYPE_LABEL[mod.type] },
          { icon: <span style={{ display: "flex", color: T.textMuted }}>{I.clock}</span>,                                  label: "Duration", value: mod.duration         },
          { icon: <span style={{ fontSize: 14 }}>{step.icon}</span>,                                                      label: "Section",  value: step.title           },
        ].map(m => (
          <div key={m.label} style={{ flex: 1, padding: "16px 20px", borderRadius: 14, background: T.bgCard, border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {m.icon}
              <div>
                <div style={{ fontSize: 12, color: T.textMuted }}>{m.label}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text }}>{m.value}</div>
              </div>
            </div>
          </div>
        ))}
        {/* Status card */}
        <div style={{ flex: 1, padding: "16px 20px", borderRadius: 14, background: mod.done ? "#22c55e10" : T.bgCard, border: `1px solid ${mod.done ? "rgba(34,197,94,0.25)" : T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex", color: mod.done ? "#22c55e" : T.textMuted }}>{mod.done ? I.check : I.lock}</span>
            <div>
              <div style={{ fontSize: 12, color: T.textMuted }}>Status</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: mod.done ? "#22c55e" : T.text }}>{mod.done ? "Completed" : "Not done"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* About this lesson */}
      <div style={{ padding: "20px 24px", borderRadius: 14, background: T.bgCard, border: `1px solid ${T.border}`, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>About this lesson</h3>
        <p style={{ fontSize: 13.5, color: T.textSub, lineHeight: 1.7 }}>
          This {TYPE_LABEL[mod.type].toLowerCase()} is part of{" "}
          <strong style={{ color: T.text }}>Step {step.step}: {step.title}</strong> in the {course.title} course.
          {mod.type === "video"   && " Watch carefully and take notes on the key concepts covered."}
          {mod.type === "quiz"    && " Test your understanding. You need 80% to pass."}
          {mod.type === "lab"     && " Follow the step-by-step instructions in your virtual lab environment."}
          {mod.type === "project" && " Apply everything you've learned to build a real-world project."}
        </p>
      </div>

      {/* Progress summary */}
      <div style={{ padding: "16px 20px", borderRadius: 14, background: T.accentBg, border: `1px solid ${T.accentBorder}`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Course Progress</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: T.accent }}>{completedLessons}/{totalLessons}</span>
        </div>
        <div style={{ height: 5, background: T.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(completedLessons / totalLessons) * 100}%`, background: course.gradient, borderRadius: 5 }} />
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        {prev ? (
          <button className="btn-hover" onClick={() => setActiveLesson(`${prev.si}-${prev.mi}`)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 11, background: T.bgCard, border: `1px solid ${T.border}`, color: T.textSub, fontSize: 13.5, fontWeight: 600 }}>
            {I.back} {prev.m.title}
          </button>
        ) : <div />}

        {next ? (
          <button className="btn-hover" onClick={() => setActiveLesson(`${next.si}-${next.mi}`)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 11, background: course.gradient, color: "#fff", fontSize: 13.5, fontWeight: 700, boxShadow: `0 4px 14px ${course.color}40` }}>
            Next: {next.m.title} {I.chevronRight}
          </button>
        ) : (
          <button className="btn-hover" onClick={() => setActiveLesson(null)} style={{ padding: "11px 24px", borderRadius: 11, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 13.5, fontWeight: 700, boxShadow: "0 4px 14px rgba(34,197,94,0.4)" }}>
            🎉 Back to Overview
          </button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COURSE PAGE
══════════════════════════════════════════════════════ */
interface CoursePageProps {
  T: Theme;
  theme: string;
  setTheme: (t: string) => void;
  course: Course | null;
  navigate: (to: string) => void;
}

export default function CoursePage({ T, theme, setTheme, course, navigate }: CoursePageProps) {
  const [activeLesson,   setActiveLesson]   = useState<string | null>(null);
  const [expandedSteps,  setExpandedSteps]  = useState<Record<number, boolean>>({ 0: true, 1: true });

  if (!course) return <div style={{ padding: 40, color: T.text }}>Course not found.</div>;

  const totalLessons     = course.steps.reduce((a, s) => a + s.modules.length, 0);
  const completedLessons = course.steps.reduce((a, s) => a + s.modules.filter(m => m.done).length, 0);
  const pct              = Math.round((completedLessons / totalLessons) * 100);
  const isCompleted      = completedLessons === totalLessons;

  const toggleStep = (idx: number) =>
    setExpandedSteps(p => ({ ...p, [idx]: !p[idx] }));

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ─── TOP NAV ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, height: 60,
        background: T.mode === "dark" ? "rgba(9,9,15,0.95)" : "rgba(245,247,255,0.96)",
        backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => navigate("dashboard")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 13px", borderRadius: 9, background: T.input, border: `1px solid ${T.border}`, color: T.textSub, fontSize: 13, fontWeight: 500 }}>
            {I.back} Dashboard
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>{course.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{course.title}</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: isCompleted ? "#22c55e" : "#f59e0b" }} />
            <span style={{ fontSize: 11, color: T.textMuted }}>{pct}% complete</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 160, height: 5, background: T.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: course.gradient, borderRadius: 5 }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.textSub, minWidth: 32 }}>{pct}%</span>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 32, height: 32, borderRadius: 8, background: T.input, border: `1px solid ${T.border}`, color: T.textSub, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {theme === "dark" ? I.sun : I.moon}
          </button>
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

        {/* ─── COURSE SIDEBAR ─── */}
        <aside style={{ width: 340, borderRight: `1px solid ${T.border}`, background: T.sidebar, overflowY: "auto", position: "sticky", top: 60, height: "calc(100vh - 60px)", flexShrink: 0 }}>

          {/* Course info panel */}
          <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: course.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{course.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.3, letterSpacing: "-0.02em" }}>{course.title}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{course.level}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11.5, color: T.textMuted }}>Overall Progress</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: isCompleted ? "#22c55e" : course.color }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: T.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: course.gradient, borderRadius: 6, transition: "width 0.5s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: T.textMuted }}>
              <span>{completedLessons} / {totalLessons} lessons done</span>
              <span>{course.steps.length} sections</span>
            </div>
          </div>

          {/* Steps accordion */}
          <div style={{ padding: "10px 0" }}>
            {course.steps.map((step, si) => {
              const stepDone = step.modules.filter(m => m.done).length;
              const expanded = expandedSteps[si];
              return (
                <div key={si} style={{ borderBottom: `1px solid ${T.border}` }}>
                  {/* Step header */}
                  <button onClick={() => toggleStep(si)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "transparent", textAlign: "left" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: stepDone === step.modules.length ? "#22c55e18" : T.accentBg, border: `1px solid ${stepDone === step.modules.length ? "rgba(34,197,94,0.3)" : T.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>Step {step.step}: {step.title}</div>
                      <div style={{ fontSize: 10.5, color: T.textMuted }}>{stepDone}/{step.modules.length} · {step.subtitle}</div>
                    </div>
                    <span style={{ color: T.textMuted, display: "flex", transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      {I.chevronDown}
                    </span>
                  </button>

                  {/* Modules list */}
                  {expanded && (
                    <div style={{ paddingBottom: 6 }}>
                      {step.modules.map((mod, mi) => {
                        const globalIdx = `${si}-${mi}`;
                        const isActive  = activeLesson === globalIdx;
                        return (
                          <button key={mi} onClick={() => setActiveLesson(globalIdx)} style={{
                            width: "100%", display: "flex", alignItems: "center", gap: 10,
                            padding: "9px 18px 9px 24px",
                            background: isActive ? T.accentBg : "transparent",
                            borderLeft: `3px solid ${isActive ? T.accent : "transparent"}`,
                            textAlign: "left",
                          }}>
                            <div style={{ width: 22, height: 22, borderRadius: 6, background: mod.done ? "rgba(34,197,94,0.12)" : T.input, border: `1px solid ${mod.done ? "rgba(34,197,94,0.3)" : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: mod.done ? "#22c55e" : T.textMuted }}>
                              {mod.done
                                ? I.check
                                : <span style={{ display: "flex", color: TYPE_COLOR[mod.type] }}>{I[mod.type as keyof typeof I]}</span>
                              }
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 12, color: mod.done ? T.textMuted : T.text, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: mod.done ? "line-through" : "none", opacity: mod.done ? 0.6 : 1 }}>
                                {mod.title}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                                <span style={{ fontSize: 9.5, color: TYPE_COLOR[mod.type], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{mod.type}</span>
                                <span style={{ fontSize: 10, color: T.textMuted }}>{mod.duration}</span>
                              </div>
                            </div>
                            {!mod.done && !isActive && (
                              <span style={{ color: T.textMuted, flexShrink: 0, display: "flex", opacity: 0.5 }}>{I.lock}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {activeLesson === null ? (
            /* ── COURSE OVERVIEW ── */
            <div className="fade-in" style={{ maxWidth: 860, margin: "0 auto", padding: "32px 36px 60px" }}>

              {/* Hero banner */}
              <div style={{ borderRadius: 20, overflow: "hidden", background: course.gradient, padding: "36px 36px 32px", marginBottom: 32, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 32 }}>{course.icon}</span>
                    <div>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{course.category}</span>
                      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.2 }}>{course.title}</h1>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 22, maxWidth: 560 }}>{course.subtitle}</p>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 22 }}>
                    {[
                      { i: I.star,  v: `${course.rating} (${course.reviews.toLocaleString()} reviews)` },
                      { i: I.users, v: `${course.students} students` },
                      { i: I.clock, v: course.duration },
                      { i: "📶",   v: course.level },
                    ].map((m, idx) => (
                      <span key={idx} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}>
                        <span style={{ display: "flex" }}>{m.i}</span>{m.v}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{course.instructor.avatar}</div>
                    <div>
                      <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{course.instructor.name}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", display: "block" }}>{course.instructor.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What you'll do + stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
                <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}` }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>What you'll do</h3>
                  {course.work.map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 9 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: T.accentBg, border: `1px solid ${T.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, color: T.accent }}>{I.check}</div>
                      <span style={{ fontSize: 13, color: T.textSub, lineHeight: 1.4 }}>{w}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "22px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.border}` }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>Course Stats</h3>
                  {[
                    { l: "Total Sections", v: course.steps.length },
                    { l: "Total Lessons",  v: totalLessons },
                    { l: "Duration",       v: course.duration },
                    { l: "Level",          v: course.level },
                    { l: "Lessons Done",   v: `${completedLessons} / ${totalLessons}` },
                  ].map(s => (
                    <div key={s.l} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 9, marginBottom: 9, borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ fontSize: 12.5, color: T.textMuted }}>{s.l}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {course.tags.map(tag => (
                  <span key={tag} style={{ padding: "5px 14px", borderRadius: 20, background: T.accentBg, color: T.accent, border: `1px solid ${T.accentBorder}`, fontSize: 12, fontWeight: 500 }}>{tag}</span>
                ))}
              </div>

              {/* Roadmap */}
              <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: "-0.03em", marginBottom: 20 }}>Course Roadmap</h2>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg,${course.color}60,transparent)`, borderRadius: 2 }} />
                {course.steps.map((step, si) => {
                  const stepDone = step.modules.filter(m => m.done).length;
                  const pctDone  = Math.round((stepDone / step.modules.length) * 100);
                  const isDone   = stepDone === step.modules.length;
                  return (
                    <div key={si} className="fade-up" style={{ display: "flex", gap: 16, marginBottom: 20, animationDelay: `${si * 0.06}s` }}>
                      <div style={{ width: 38, height: 38, borderRadius: 11, background: isDone ? "#22c55e18" : T.bgCard2, border: `2px solid ${isDone ? "#22c55e" : course.color + "40"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, zIndex: 1, boxShadow: `0 0 0 4px ${T.bg}` }}>
                        {isDone ? "✅" : step.icon}
                      </div>
                      <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: T.bgCard, border: `1px solid ${T.border}`, boxShadow: T.cardShadow }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                              <span style={{ fontSize: 10, color: course.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: `${course.color}14`, padding: "2px 8px", borderRadius: 20 }}>Step {step.step}</span>
                              {step.subtitle && <span style={{ fontSize: 10, color: T.textMuted }}>{step.subtitle}</span>}
                            </div>
                            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: T.text, letterSpacing: "-0.02em" }}>{step.title}</h3>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: isDone ? "#22c55e" : course.color, marginLeft: 10, flexShrink: 0 }}>{pctDone}%</span>
                        </div>
                        <div style={{ height: 3, background: T.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
                          <div style={{ height: "100%", width: `${pctDone}%`, background: isDone ? "#22c55e" : course.gradient, borderRadius: 3 }} />
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {step.modules.map((mod, mi) => (
                            <button key={mi}
                              onClick={() => { setExpandedSteps(p => ({ ...p, [si]: true })); setActiveLesson(`${si}-${mi}`); }}
                              style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, background: mod.done ? "rgba(34,197,94,0.08)" : T.input, border: `1px solid ${mod.done ? "rgba(34,197,94,0.2)" : T.border}`, cursor: "pointer", fontSize: 11, color: mod.done ? "#22c55e" : T.textSub, fontWeight: mod.done ? 500 : 400 }}>
                              <span style={{ display: "flex", color: mod.done ? "#22c55e" : TYPE_COLOR[mod.type] }}>
                                {mod.done ? I.check : I[mod.type as keyof typeof I]}
                              </span>
                              <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mod.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div style={{ marginTop: 32, padding: "24px", borderRadius: 16, background: T.bgCard, border: `1px solid ${T.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>
                    {pct === 0 ? "Ready to start?" : pct === 100 ? "You've completed this course! 🎉" : "Keep going — you're doing great!"}
                  </h3>
                  <p style={{ fontSize: 13, color: T.textMuted }}>
                    {pct === 0 ? `${totalLessons} lessons · ${course.duration}` : `${completedLessons} of ${totalLessons} lessons completed`}
                  </p>
                </div>
                <button className="btn-hover" onClick={() => setActiveLesson("0-0")} style={{ padding: "11px 26px", borderRadius: 11, background: course.gradient, color: "#fff", fontSize: 14, fontWeight: 700, border: "none", boxShadow: `0 4px 16px ${course.color}40` }}>
                  {pct === 0 ? "Start Course →" : pct === 100 ? "Review Course →" : "Continue Learning →"}
                </button>
              </div>
            </div>
          ) : (
            /* ── LESSON VIEW ── */
            <LessonView
              T={T}
              course={course}
              lessonKey={activeLesson}
              setActiveLesson={setActiveLesson}
              totalLessons={totalLessons}
              completedLessons={completedLessons}
            />
          )}
        </div>
      </div>
    </div>
  );
}