import { DARK, LIGHT, ALL_COURSES } from "@/helpers/constants/data";
import { useState } from "react";
import CoursePage from "../CoursePage";
import Dashboard, { GlobalCSS } from "../Dashboard";

export default function App() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [page, setPage] = useState("dashboard");

    const T = theme === "dark" ? DARK : LIGHT;
    const navigate = (to: string) => setPage(to);

    const activeCourse = page.startsWith("course:")
        ? ALL_COURSES.find(c => c.id === page.split("course:")[1]) ?? null
        : null;

    return (
        <div style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            background: T.bg,
            minHeight: "100vh",
            color: T.text,
            transition: "background 0.3s, color 0.3s",
        }}>
            <GlobalCSS T={T} />

            {page === "dashboard" ? (
                <Dashboard
                    T={T}
                    theme={theme}
                    setTheme={setTheme}
                    navigate={navigate}
                />
            ) : (
                <CoursePage
                    T={T}
                    theme={theme}
                    setTheme={setTheme}
                    course={activeCourse}
                    navigate={navigate}
                />
            )}
        </div>
    );
}