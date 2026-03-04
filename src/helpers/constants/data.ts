/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
export interface Module {
  title: string;
  duration: string;
  type: "video" | "quiz" | "lab" | "project";
  done: boolean;
}

export interface Step {
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  modules: Module[];
}

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  duration: string;
  students: string;
  rating: number;
  reviews: number;
  color: string;
  gradient: string;
  icon: string;
  instructor: Instructor;
  tags: string[];
  totalLessons: number;
  completedLessons: number;
  work: string[];
  steps: Step[];
}

export interface Theme {
  mode: "dark" | "light";
  bg: string; bg2: string; bgCard: string; bgCard2: string;
  sidebar: string; input: string;
  border: string; borderStrong: string;
  text: string; textSub: string; textMuted: string;
  accent: string; accentBg: string; accentBorder: string;
  success: string; successBg: string; warning: string;
  shadow: string; cardShadow: string; navHover: string;
}

/* ══════════════════════════════════════════════════════
   COURSES
══════════════════════════════════════════════════════ */
export const CYBER_COURSES: Course[] = [
  {
    id: "cyber-analyst",
    title: "Cyber Security Analyst",
    subtitle: "Protect systems, monitor risks & identify vulnerabilities",
    category: "Cyber Security",
    level: "Beginner → Intermediate",
    duration: "48h 30m", students: "12,840", rating: 4.8, reviews: 2341,
    color: "#0ea5e9", gradient: "linear-gradient(135deg,#0ea5e9,#6366f1)", icon: "🛡️",
    instructor: { name: "Sarah Mitchell", role: "Security Architect @ Google", avatar: "SM" },
    tags: ["Networking", "Linux", "Security Tools", "Risk Assessment"],
    totalLessons: 47, completedLessons: 16,
    work: ["Protect systems from attacks", "Monitor security risks", "Identify vulnerabilities", "Security assessments"],
    steps: [
      { step: 1, title: "Computer Fundamentals", subtitle: "Foundation", icon: "💻", modules: [
        { title: "How Computers Work",       duration: "18 min", type: "video", done: true  },
        { title: "CPU, RAM & Storage",       duration: "22 min", type: "video", done: true  },
        { title: "Operating Systems Basics", duration: "25 min", type: "video", done: true  },
        { title: "Files & Permissions",      duration: "20 min", type: "video", done: true  },
        { title: "Fundamentals Quiz",        duration: "15 min", type: "quiz",  done: true  },
      ]},
      { step: 2, title: "Networking", subtitle: "VERY IMPORTANT", icon: "🌐", modules: [
        { title: "IP Address & MAC Address",           duration: "30 min", type: "video", done: true  },
        { title: "DNS & DHCP Deep Dive",               duration: "28 min", type: "video", done: true  },
        { title: "TCP/IP Protocol Suite",              duration: "35 min", type: "video", done: true  },
        { title: "Routers & Switches",                 duration: "32 min", type: "video", done: false },
        { title: "Ports & Protocols (HTTP, HTTPS, FTP)", duration: "27 min", type: "video", done: false },
        { title: "Networking Lab Exercise",            duration: "45 min", type: "lab",   done: false },
      ]},
      { step: 3, title: "Operating Systems", subtitle: "Linux & Windows", icon: "🖥️", modules: [
        { title: "Linux Basic Commands",       duration: "40 min", type: "video", done: false },
        { title: "File Permissions in Linux",  duration: "30 min", type: "video", done: false },
        { title: "Processes & Users",          duration: "25 min", type: "video", done: false },
        { title: "Windows File System",        duration: "22 min", type: "video", done: false },
        { title: "Windows Security Settings",  duration: "28 min", type: "video", done: false },
      ]},
      { step: 4, title: "Security Fundamentals", subtitle: "Core Concepts", icon: "🔐", modules: [
        { title: "CIA Triad Explained",    duration: "20 min", type: "video", done: false },
        { title: "Encryption Basics",      duration: "35 min", type: "video", done: false },
        { title: "Hashing Algorithms",     duration: "25 min", type: "video", done: false },
        { title: "Firewalls & VPN",        duration: "30 min", type: "video", done: false },
        { title: "Authentication Methods", duration: "22 min", type: "video", done: false },
      ]},
      { step: 5, title: "Security Tools", subtitle: "Hands-on Tools", icon: "🔧", modules: [
        { title: "Wireshark: Packet Analysis", duration: "50 min", type: "video", done: false },
        { title: "Nmap: Network Scanning",     duration: "45 min", type: "video", done: false },
        { title: "Burp Suite Basics",          duration: "55 min", type: "video", done: false },
        { title: "Antivirus & EDR Tools",      duration: "30 min", type: "video", done: false },
        { title: "Tools Practical Lab",        duration: "90 min", type: "lab",   done: false },
      ]},
      { step: 6, title: "Risk & Vulnerability", subtitle: "Assessment Skills", icon: "⚠️", modules: [
        { title: "Vulnerability Scanning",     duration: "40 min", type: "video", done: false },
        { title: "CVE Concepts & NVD",         duration: "25 min", type: "video", done: false },
        { title: "Risk Assessment Framework",  duration: "35 min", type: "video", done: false },
      ]},
      { step: 7, title: "Projects & Practice", subtitle: "Real-world Application", icon: "🚀", modules: [
        { title: "Network Scanning Project",        duration: "120 min", type: "project", done: false },
        { title: "Basic Penetration Testing Lab",   duration: "180 min", type: "project", done: false },
        { title: "Final Assessment",                duration: "60 min",  type: "quiz",    done: false },
      ]},
    ],
  },
  {
    id: "ethical-hacker",
    title: "Ethical Hacker",
    subtitle: "Hack systems legally, find vulnerabilities & perform penetration testing",
    category: "Cyber Security",
    level: "Intermediate → Advanced",
    duration: "62h 15m", students: "9,230", rating: 4.9, reviews: 1876,
    color: "#f43f5e", gradient: "linear-gradient(135deg,#f43f5e,#f97316)", icon: "💀",
    instructor: { name: "Alex Reeves", role: "CEH, OSCP Certified", avatar: "AR" },
    tags: ["Kali Linux", "Python", "Metasploit", "Penetration Testing"],
    totalLessons: 52, completedLessons: 0,
    work: ["Hack systems legally", "Find vulnerabilities", "Penetration testing"],
    steps: [
      { step: 1, title: "Networking (Strong Level)", subtitle: "Must master", icon: "🌐", modules: [
        { title: "TCP/IP Deep Dive",   duration: "40 min", type: "video", done: false },
        { title: "Subnetting Mastery", duration: "50 min", type: "video", done: false },
        { title: "Ports & Services",   duration: "30 min", type: "video", done: false },
        { title: "Protocol Analysis",  duration: "35 min", type: "video", done: false },
      ]},
      { step: 2, title: "Linux (Important)", subtitle: "Kali Linux Focus", icon: "🐧", modules: [
        { title: "Kali Linux Setup & Tour", duration: "45 min", type: "video", done: false },
        { title: "Essential Commands",      duration: "40 min", type: "video", done: false },
        { title: "Users & Permissions",     duration: "30 min", type: "video", done: false },
      ]},
      { step: 3, title: "Programming", subtitle: "Scripting Skills", icon: "🐍", modules: [
        { title: "Python Basics for Hackers", duration: "60 min", type: "video", done: false },
        { title: "Bash Scripting",            duration: "55 min", type: "video", done: false },
        { title: "Automation Scripts",        duration: "45 min", type: "video", done: false },
      ]},
      { step: 4, title: "Web Security", subtitle: "HTTP & Beyond", icon: "🌍", modules: [
        { title: "HTTP Protocol Deep Dive", duration: "35 min", type: "video", done: false },
        { title: "Cookies & Sessions",      duration: "28 min", type: "video", done: false },
        { title: "Authentication Attacks",  duration: "40 min", type: "video", done: false },
      ]},
      { step: 5, title: "Ethical Hacking Techniques", subtitle: "Core Skills", icon: "⚔️", modules: [
        { title: "Reconnaissance & OSINT",  duration: "55 min", type: "video", done: false },
        { title: "Scanning & Enumeration",  duration: "50 min", type: "video", done: false },
        { title: "Exploitation Techniques", duration: "75 min", type: "video", done: false },
        { title: "Post Exploitation",       duration: "65 min", type: "video", done: false },
      ]},
      { step: 6, title: "Tools", subtitle: "Hacker's Arsenal", icon: "🔧", modules: [
        { title: "Nmap Advanced Usage",    duration: "45 min", type: "video", done: false },
        { title: "Metasploit Framework",   duration: "70 min", type: "video", done: false },
        { title: "Burp Suite Pro",         duration: "60 min", type: "video", done: false },
        { title: "Hydra Password Cracking",duration: "40 min", type: "video", done: false },
      ]},
      { step: 7, title: "Practice Platforms", subtitle: "Real Challenges", icon: "🎯", modules: [
        { title: "TryHackMe Walkthrough", duration: "120 min", type: "lab",     done: false },
        { title: "HackTheBox Challenge",  duration: "180 min", type: "lab",     done: false },
        { title: "Final CTF Challenge",   duration: "240 min", type: "project", done: false },
      ]},
    ],
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst",
    subtitle: "Monitor cyber attacks, analyse alerts & respond to incidents",
    category: "Cyber Security",
    level: "Beginner → Intermediate",
    duration: "38h 45m", students: "7,120", rating: 4.7, reviews: 1203,
    color: "#10b981", gradient: "linear-gradient(135deg,#10b981,#06b6d4)", icon: "👁️",
    instructor: { name: "Priya Sharma", role: "SOC Lead @ Microsoft", avatar: "PS" },
    tags: ["SIEM", "Splunk", "Log Analysis", "Incident Response"],
    totalLessons: 38, completedLessons: 38,
    work: ["Monitor cyber attacks", "Analyse alerts", "Respond to incidents"],
    steps: [
      { step: 1, title: "Networking",        subtitle: "Core Protocols",      icon: "🌐", modules: [
        { title: "TCP/IP Fundamentals", duration: "35 min", type: "video", done: true },
        { title: "Ports & Services",    duration: "25 min", type: "video", done: true },
        { title: "Protocol Analysis",   duration: "30 min", type: "video", done: true },
      ]},
      { step: 2, title: "Operating Systems", subtitle: "Linux & Windows",     icon: "🖥️", modules: [
        { title: "Linux Basics",         duration: "40 min", type: "video", done: true },
        { title: "Windows Event Logs",   duration: "35 min", type: "video", done: true },
      ]},
      { step: 3, title: "Security Basics",   subtitle: "Threat Landscape",    icon: "🔐", modules: [
        { title: "Malware Types",         duration: "30 min", type: "video", done: true },
        { title: "Phishing Attacks",      duration: "25 min", type: "video", done: true },
        { title: "Attack Types Overview", duration: "40 min", type: "video", done: true },
      ]},
      { step: 4, title: "Log Analysis",      subtitle: "Reading the Data",    icon: "📋", modules: [
        { title: "System Logs Deep Dive",  duration: "45 min", type: "video", done: true },
        { title: "Network Log Analysis",   duration: "40 min", type: "video", done: true },
        { title: "Windows Event Viewer",   duration: "35 min", type: "video", done: true },
      ]},
      { step: 5, title: "SIEM Tools",        subtitle: "Industry Tools",      icon: "📊", modules: [
        { title: "Splunk Basics",  duration: "60 min", type: "video", done: true },
        { title: "ELK Stack Setup",duration: "75 min", type: "video", done: true },
        { title: "SIEM Lab",       duration: "90 min", type: "lab",   done: true },
      ]},
      { step: 6, title: "Incident Response", subtitle: "When Attacks Happen", icon: "🚨", modules: [
        { title: "Detection & Triage",         duration: "40 min", type: "video", done: true },
        { title: "Investigation Process",      duration: "50 min", type: "video", done: true },
        { title: "Reporting & Documentation",  duration: "35 min", type: "video", done: true },
      ]},
      { step: 7, title: "Practice",          subtitle: "Real Exercises",      icon: "🎯", modules: [
        { title: "Log Analysis Exercises", duration: "120 min", type: "lab",  done: true },
        { title: "Final Assessment",       duration: "60 min",  type: "quiz", done: true },
      ]},
    ],
  },
];

export const DEVOPS_COURSES: Course[] = [
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    subtitle: "Manage cloud infrastructure, deploy applications & configure cloud services",
    category: "Cloud & DevOps",
    level: "Beginner → Intermediate",
    duration: "55h 20m", students: "15,640", rating: 4.9, reviews: 3102,
    color: "#f59e0b", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)", icon: "☁️",
    instructor: { name: "David Chen", role: "AWS Solutions Architect", avatar: "DC" },
    tags: ["AWS", "Linux", "Networking", "Cloud Security"],
    totalLessons: 55, completedLessons: 29,
    work: ["Manage cloud infrastructure", "Deploy applications", "Configure cloud services", "Manage servers"],
    steps: [
      { step: 1, title: "Computer Fundamentals", subtitle: "Foundation",      icon: "💻", modules: [
        { title: "What is Cloud Computing?",   duration: "20 min", type: "video", done: true },
        { title: "Servers & Virtual Machines", duration: "30 min", type: "video", done: true },
        { title: "Storage Types Explained",    duration: "25 min", type: "video", done: true },
        { title: "Networking Basics",          duration: "35 min", type: "video", done: true },
      ]},
      { step: 2, title: "Networking",           subtitle: "Very Important",   icon: "🌐", modules: [
        { title: "IP Address & DNS",        duration: "30 min", type: "video", done: true },
        { title: "Subnetting",              duration: "40 min", type: "video", done: true },
        { title: "TCP/IP Stack",            duration: "35 min", type: "video", done: true },
        { title: "Load Balancer & Firewall",duration: "40 min", type: "video", done: true },
      ]},
      { step: 3, title: "Linux",                subtitle: "Very Important",   icon: "🐧", modules: [
        { title: "Basic Commands",               duration: "45 min", type: "video", done: true },
        { title: "File System & Permissions",    duration: "35 min", type: "video", done: true },
        { title: "Processes & Package Install",  duration: "30 min", type: "video", done: true },
      ]},
      { step: 4, title: "Cloud Platform (AWS)", subtitle: "Most Popular",    icon: "☁️", modules: [
        { title: "EC2 – Virtual Servers", duration: "55 min", type: "video", done: true  },
        { title: "S3 – Storage Buckets",  duration: "45 min", type: "video", done: true  },
        { title: "RDS – Managed Database",duration: "50 min", type: "video", done: true  },
        { title: "VPC – Networking",      duration: "60 min", type: "video", done: true  },
        { title: "AWS Console Lab",       duration: "90 min", type: "lab",   done: false },
      ]},
      { step: 5, title: "Deployment",           subtitle: "Ship It!",         icon: "🚀", modules: [
        { title: "Application Deployment", duration: "50 min", type: "video", done: false },
        { title: "SSH & Server Config",    duration: "35 min", type: "video", done: false },
      ]},
      { step: 6, title: "Security",             subtitle: "Cloud Security",   icon: "🔐", modules: [
        { title: "IAM Roles & Policies", duration: "40 min", type: "video", done: false },
        { title: "Encryption Basics",    duration: "30 min", type: "video", done: false },
        { title: "Security Groups",      duration: "25 min", type: "video", done: false },
      ]},
      { step: 7, title: "Projects",             subtitle: "Build Real Things",icon: "🏗️", modules: [
        { title: "Deploy Website on AWS", duration: "150 min", type: "project", done: false },
        { title: "Setup Cloud Server",    duration: "120 min", type: "project", done: false },
        { title: "Final Exam",            duration: "60 min",  type: "quiz",    done: false },
      ]},
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    subtitle: "Automate deployments, manage CI/CD pipelines & improve development workflow",
    category: "Cloud & DevOps",
    level: "Intermediate → Advanced",
    duration: "72h 00m", students: "18,920", rating: 4.8, reviews: 4215,
    color: "#8b5cf6", gradient: "linear-gradient(135deg,#8b5cf6,#06b6d4)", icon: "⚙️",
    instructor: { name: "Marcus Johnson", role: "DevOps Lead @ Netflix", avatar: "MJ" },
    tags: ["Docker", "Kubernetes", "Jenkins", "CI/CD"],
    totalLessons: 72, completedLessons: 0,
    work: ["Automate deployments", "Manage CI/CD pipelines", "Improve development workflow"],
    steps: [
      { step: 1, title: "Programming Basics", subtitle: "Scripting Foundation",     icon: "🐍", modules: [
        { title: "Python Basics",   duration: "55 min", type: "video", done: false },
        { title: "Shell Scripting", duration: "50 min", type: "video", done: false },
      ]},
      { step: 2, title: "Linux",              subtitle: "Core OS Skills",           icon: "🐧", modules: [
        { title: "Commands & Navigation",  duration: "45 min", type: "video", done: false },
        { title: "Permissions & Processes",duration: "40 min", type: "video", done: false },
        { title: "Services & Systemd",     duration: "35 min", type: "video", done: false },
      ]},
      { step: 3, title: "Networking",         subtitle: "Essential Protocols",      icon: "🌐", modules: [
        { title: "Ports, DNS & HTTP/HTTPS", duration: "40 min", type: "video", done: false },
      ]},
      { step: 4, title: "Git",                subtitle: "Very Important",           icon: "📦", modules: [
        { title: "Git Init, Commit & Branches", duration: "50 min", type: "video", done: false },
        { title: "Merge & Pull Requests",       duration: "45 min", type: "video", done: false },
        { title: "Git Workflow Lab",            duration: "60 min", type: "lab",   done: false },
      ]},
      { step: 5, title: "CI/CD",              subtitle: "Automation Pipelines",     icon: "🔄", modules: [
        { title: "Jenkins Basics",       duration: "55 min", type: "video", done: false },
        { title: "Pipeline Configuration",duration: "60 min", type: "video", done: false },
        { title: "Build Automation",     duration: "45 min", type: "video", done: false },
      ]},
      { step: 6, title: "Containers (Docker)",subtitle: "Package Everything",       icon: "🐋", modules: [
        { title: "Docker Images & Containers", duration: "60 min", type: "video", done: false },
        { title: "Writing Dockerfiles",        duration: "50 min", type: "video", done: false },
        { title: "Docker Compose",             duration: "45 min", type: "video", done: false },
        { title: "Docker Lab",                 duration: "90 min", type: "lab",   done: false },
      ]},
      { step: 7, title: "Kubernetes",         subtitle: "Container Orchestration",  icon: "⚓", modules: [
        { title: "Pods & Services",        duration: "60 min",  type: "video", done: false },
        { title: "Deployments & Scaling",  duration: "55 min",  type: "video", done: false },
        { title: "K8s Lab",                duration: "120 min", type: "lab",   done: false },
      ]},
      { step: 8, title: "Cloud",              subtitle: "AWS Integration",          icon: "☁️", modules: [
        { title: "AWS Deployment",   duration: "65 min", type: "video", done: false },
        { title: "CI/CD with Cloud", duration: "70 min", type: "video", done: false },
      ]},
      { step: 9, title: "Projects",           subtitle: "Capstone Projects",        icon: "🏗️", modules: [
        { title: "CI/CD Pipeline Project",    duration: "180 min", type: "project", done: false },
        { title: "Docker Deployment Project", duration: "150 min", type: "project", done: false },
        { title: "Final Exam",                duration: "60 min",  type: "quiz",    done: false },
      ]},
    ],
  },
];

export const ALL_COURSES: Course[] = [...CYBER_COURSES, ...DEVOPS_COURSES];

export const USER = {
  name: "Arjun Mehta", initials: "AM", role: "Security Learner",
  email: "arjun@techpath.io", location: "Hyderabad, IN",
  level: 14, xp: 7430, xpNext: 10000, streak: 21,
};

/* ══════════════════════════════════════════════════════
   THEMES
══════════════════════════════════════════════════════ */
export const DARK: Theme = {
  mode: "dark",
  bg: "#09090f", bg2: "#0f1018", bgCard: "#13141d", bgCard2: "#1a1b28",
  sidebar: "#0c0d16", input: "#1a1b28",
  border: "rgba(255,255,255,0.07)", borderStrong: "rgba(255,255,255,0.12)",
  text: "#f8fafc", textSub: "#94a3b8", textMuted: "#475569",
  accent: "#6366f1", accentBg: "rgba(99,102,241,0.12)", accentBorder: "rgba(99,102,241,0.3)",
  success: "#22c55e", successBg: "rgba(34,197,94,0.1)", warning: "#f59e0b",
  shadow: "0 20px 60px rgba(0,0,0,0.7)", cardShadow: "0 2px 20px rgba(0,0,0,0.5)",
  navHover: "rgba(255,255,255,0.04)",
};

export const LIGHT: Theme = {
  mode: "light",
  bg: "#f5f7ff", bg2: "#eef0fa", bgCard: "#ffffff", bgCard2: "#f8f9ff",
  sidebar: "#ffffff", input: "#eef0fa",
  border: "rgba(0,0,0,0.07)", borderStrong: "rgba(0,0,0,0.14)",
  text: "#0f1020", textSub: "#4b5563", textMuted: "#9ca3af",
  accent: "#4f46e5", accentBg: "rgba(79,70,229,0.08)", accentBorder: "rgba(79,70,229,0.25)",
  success: "#16a34a", successBg: "rgba(22,163,74,0.08)", warning: "#d97706",
  shadow: "0 20px 60px rgba(79,70,229,0.1)", cardShadow: "0 2px 16px rgba(0,0,0,0.07)",
  navHover: "rgba(79,70,229,0.05)",
};

/* ══════════════════════════════════════════════════════
   SHARED LOOKUP MAPS
══════════════════════════════════════════════════════ */
export const TYPE_COLOR: Record<string, string> = {
  video: "#6366f1", quiz: "#f59e0b", lab: "#10b981", project: "#ec4899",
};
export const TYPE_LABEL: Record<string, string> = {
  video: "Video Lesson", quiz: "Knowledge Quiz", lab: "Hands-on Lab", project: "Project",
};
export const TYPE_LABEL_SHORT: Record<string, string> = {
  video: "Video", quiz: "Quiz", lab: "Lab", project: "Project",
};