import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const CYBER_COURSES = [
  {
    id: "cyber-analyst",
    title: "Cyber Security Analyst",
    subtitle: "Protect systems, monitor risks & identify vulnerabilities",
    category: "Cyber Security",
    level: "Beginner → Intermediate",
    duration: "48h 30m",
    students: "12,840",
    rating: 4.8,
    reviews: 2341,
    color: "#0ea5e9",
    gradient: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    icon: "🛡️",
    instructor: { name: "Sarah Mitchell", role: "Security Architect @ Google", avatar: "SM" },
    tags: ["Networking","Linux","Security Tools","Risk Assessment"],
    totalLessons: 47,
    completedLessons: 16,
    work: ["Protect systems from attacks","Monitor security risks","Identify vulnerabilities","Security assessments"],
    steps: [
      { step: 1, title: "Computer Fundamentals", subtitle: "Foundation", icon: "💻", modules: [
        { title: "How Computers Work", duration: "18 min", type: "video", done: true },
        { title: "CPU, RAM & Storage", duration: "22 min", type: "video", done: true },
        { title: "Operating Systems Basics", duration: "25 min", type: "video", done: true },
        { title: "Files & Permissions", duration: "20 min", type: "video", done: true },
        { title: "Fundamentals Quiz", duration: "15 min", type: "quiz", done: true },
      ]},
      { step: 2, title: "Networking", subtitle: "VERY IMPORTANT", icon: "🌐", modules: [
        { title: "IP Address & MAC Address", duration: "30 min", type: "video", done: true },
        { title: "DNS & DHCP Deep Dive", duration: "28 min", type: "video", done: true },
        { title: "TCP/IP Protocol Suite", duration: "35 min", type: "video", done: true },
        { title: "Routers & Switches", duration: "32 min", type: "video", done: false },
        { title: "Ports & Protocols (HTTP, HTTPS, FTP)", duration: "27 min", type: "video", done: false },
        { title: "Networking Lab Exercise", duration: "45 min", type: "lab", done: false },
      ]},
      { step: 3, title: "Operating Systems", subtitle: "Linux & Windows", icon: "🖥️", modules: [
        { title: "Linux Basic Commands", duration: "40 min", type: "video", done: false },
        { title: "File Permissions in Linux", duration: "30 min", type: "video", done: false },
        { title: "Processes & Users", duration: "25 min", type: "video", done: false },
        { title: "Windows File System", duration: "22 min", type: "video", done: false },
        { title: "Windows Security Settings", duration: "28 min", type: "video", done: false },
      ]},
      { step: 4, title: "Security Fundamentals", subtitle: "Core Concepts", icon: "🔐", modules: [
        { title: "CIA Triad Explained", duration: "20 min", type: "video", done: false },
        { title: "Encryption Basics", duration: "35 min", type: "video", done: false },
        { title: "Hashing Algorithms", duration: "25 min", type: "video", done: false },
        { title: "Firewalls & VPN", duration: "30 min", type: "video", done: false },
        { title: "Authentication Methods", duration: "22 min", type: "video", done: false },
      ]},
      { step: 5, title: "Security Tools", subtitle: "Hands-on Tools", icon: "🔧", modules: [
        { title: "Wireshark: Packet Analysis", duration: "50 min", type: "video", done: false },
        { title: "Nmap: Network Scanning", duration: "45 min", type: "video", done: false },
        { title: "Burp Suite Basics", duration: "55 min", type: "video", done: false },
        { title: "Antivirus & EDR Tools", duration: "30 min", type: "video", done: false },
        { title: "Tools Practical Lab", duration: "90 min", type: "lab", done: false },
      ]},
      { step: 6, title: "Risk & Vulnerability", subtitle: "Assessment Skills", icon: "⚠️", modules: [
        { title: "Vulnerability Scanning", duration: "40 min", type: "video", done: false },
        { title: "CVE Concepts & NVD", duration: "25 min", type: "video", done: false },
        { title: "Risk Assessment Framework", duration: "35 min", type: "video", done: false },
      ]},
      { step: 7, title: "Projects & Practice", subtitle: "Real-world Application", icon: "🚀", modules: [
        { title: "Network Scanning Project", duration: "120 min", type: "project", done: false },
        { title: "Basic Penetration Testing Lab", duration: "180 min", type: "project", done: false },
        { title: "Final Assessment", duration: "60 min", type: "quiz", done: false },
      ]},
    ],
  },
  {
    id: "ethical-hacker",
    title: "Ethical Hacker",
    subtitle: "Hack systems legally, find vulnerabilities & perform penetration testing",
    category: "Cyber Security",
    level: "Intermediate → Advanced",
    duration: "62h 15m",
    students: "9,230",
    rating: 4.9,
    reviews: 1876,
    color: "#f43f5e",
    gradient: "linear-gradient(135deg,#f43f5e,#f97316)",
    icon: "💀",
    instructor: { name: "Alex Reeves", role: "CEH, OSCP Certified", avatar: "AR" },
    tags: ["Kali Linux","Python","Metasploit","Penetration Testing"],
    totalLessons: 52,
    completedLessons: 0,
    work: ["Hack systems legally","Find vulnerabilities","Penetration testing"],
    steps: [
      { step: 1, title: "Networking (Strong Level)", subtitle: "Must master", icon: "🌐", modules: [
        { title: "TCP/IP Deep Dive", duration: "40 min", type: "video", done: false },
        { title: "Subnetting Mastery", duration: "50 min", type: "video", done: false },
        { title: "Ports & Services", duration: "30 min", type: "video", done: false },
        { title: "Protocol Analysis", duration: "35 min", type: "video", done: false },
      ]},
      { step: 2, title: "Linux (Important)", subtitle: "Kali Linux Focus", icon: "🐧", modules: [
        { title: "Kali Linux Setup & Tour", duration: "45 min", type: "video", done: false },
        { title: "Essential Commands", duration: "40 min", type: "video", done: false },
        { title: "Users & Permissions", duration: "30 min", type: "video", done: false },
      ]},
      { step: 3, title: "Programming", subtitle: "Scripting Skills", icon: "🐍", modules: [
        { title: "Python Basics for Hackers", duration: "60 min", type: "video", done: false },
        { title: "Bash Scripting", duration: "55 min", type: "video", done: false },
        { title: "Automation Scripts", duration: "45 min", type: "video", done: false },
      ]},
      { step: 4, title: "Web Security", subtitle: "HTTP & Beyond", icon: "🌍", modules: [
        { title: "HTTP Protocol Deep Dive", duration: "35 min", type: "video", done: false },
        { title: "Cookies & Sessions", duration: "28 min", type: "video", done: false },
        { title: "Authentication Attacks", duration: "40 min", type: "video", done: false },
      ]},
      { step: 5, title: "Ethical Hacking Techniques", subtitle: "Core Skills", icon: "⚔️", modules: [
        { title: "Reconnaissance & OSINT", duration: "55 min", type: "video", done: false },
        { title: "Scanning & Enumeration", duration: "50 min", type: "video", done: false },
        { title: "Exploitation Techniques", duration: "75 min", type: "video", done: false },
        { title: "Post Exploitation", duration: "65 min", type: "video", done: false },
      ]},
      { step: 6, title: "Tools", subtitle: "Hacker's Arsenal", icon: "🔧", modules: [
        { title: "Nmap Advanced Usage", duration: "45 min", type: "video", done: false },
        { title: "Metasploit Framework", duration: "70 min", type: "video", done: false },
        { title: "Burp Suite Pro", duration: "60 min", type: "video", done: false },
        { title: "Hydra Password Cracking", duration: "40 min", type: "video", done: false },
      ]},
      { step: 7, title: "Practice Platforms", subtitle: "Real Challenges", icon: "🎯", modules: [
        { title: "TryHackMe Walkthrough", duration: "120 min", type: "lab", done: false },
        { title: "HackTheBox Challenge", duration: "180 min", type: "lab", done: false },
        { title: "Final CTF Challenge", duration: "240 min", type: "project", done: false },
      ]},
    ],
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst",
    subtitle: "Monitor cyber attacks, analyse alerts & respond to incidents",
    category: "Cyber Security",
    level: "Beginner → Intermediate",
    duration: "38h 45m",
    students: "7,120",
    rating: 4.7,
    reviews: 1203,
    color: "#10b981",
    gradient: "linear-gradient(135deg,#10b981,#06b6d4)",
    icon: "👁️",
    instructor: { name: "Priya Sharma", role: "SOC Lead @ Microsoft", avatar: "PS" },
    tags: ["SIEM","Splunk","Log Analysis","Incident Response"],
    totalLessons: 38,
    completedLessons: 38,
    work: ["Monitor cyber attacks","Analyse alerts","Respond to incidents"],
    steps: [
      { step: 1, title: "Networking", subtitle: "Core Protocols", icon: "🌐", modules: [
        { title: "TCP/IP Fundamentals", duration: "35 min", type: "video", done: true },
        { title: "Ports & Services", duration: "25 min", type: "video", done: true },
        { title: "Protocol Analysis", duration: "30 min", type: "video", done: true },
      ]},
      { step: 2, title: "Operating Systems", subtitle: "Linux & Windows", icon: "🖥️", modules: [
        { title: "Linux Basics", duration: "40 min", type: "video", done: true },
        { title: "Windows Event Logs", duration: "35 min", type: "video", done: true },
      ]},
      { step: 3, title: "Security Basics", subtitle: "Threat Landscape", icon: "🔐", modules: [
        { title: "Malware Types", duration: "30 min", type: "video", done: true },
        { title: "Phishing Attacks", duration: "25 min", type: "video", done: true },
        { title: "Attack Types Overview", duration: "40 min", type: "video", done: true },
      ]},
      { step: 4, title: "Log Analysis", subtitle: "Reading the Data", icon: "📋", modules: [
        { title: "System Logs Deep Dive", duration: "45 min", type: "video", done: true },
        { title: "Network Log Analysis", duration: "40 min", type: "video", done: true },
        { title: "Windows Event Viewer", duration: "35 min", type: "video", done: true },
      ]},
      { step: 5, title: "SIEM Tools", subtitle: "Industry Tools", icon: "📊", modules: [
        { title: "Splunk Basics", duration: "60 min", type: "video", done: true },
        { title: "ELK Stack Setup", duration: "75 min", type: "video", done: true },
        { title: "SIEM Lab", duration: "90 min", type: "lab", done: true },
      ]},
      { step: 6, title: "Incident Response", subtitle: "When Attacks Happen", icon: "🚨", modules: [
        { title: "Detection & Triage", duration: "40 min", type: "video", done: true },
        { title: "Investigation Process", duration: "50 min", type: "video", done: true },
        { title: "Reporting & Documentation", duration: "35 min", type: "video", done: true },
      ]},
      { step: 7, title: "Practice", subtitle: "Real Exercises", icon: "🎯", modules: [
        { title: "Log Analysis Exercises", duration: "120 min", type: "lab", done: true },
        { title: "Final Assessment", duration: "60 min", type: "quiz", done: true },
      ]},
    ],
  },
];

const DEVOPS_COURSES = [
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    subtitle: "Manage cloud infrastructure, deploy applications & configure cloud services",
    category: "Cloud & DevOps",
    level: "Beginner → Intermediate",
    duration: "55h 20m",
    students: "15,640",
    rating: 4.9,
    reviews: 3102,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    icon: "☁️",
    instructor: { name: "David Chen", role: "AWS Solutions Architect", avatar: "DC" },
    tags: ["AWS","Linux","Networking","Cloud Security"],
    totalLessons: 55,
    completedLessons: 29,
    work: ["Manage cloud infrastructure","Deploy applications","Configure cloud services","Manage servers"],
    steps: [
      { step: 1, title: "Computer Fundamentals", subtitle: "Foundation", icon: "💻", modules: [
        { title: "What is Cloud Computing?", duration: "20 min", type: "video", done: true },
        { title: "Servers & Virtual Machines", duration: "30 min", type: "video", done: true },
        { title: "Storage Types Explained", duration: "25 min", type: "video", done: true },
        { title: "Networking Basics", duration: "35 min", type: "video", done: true },
      ]},
      { step: 2, title: "Networking", subtitle: "Very Important", icon: "🌐", modules: [
        { title: "IP Address & DNS", duration: "30 min", type: "video", done: true },
        { title: "Subnetting", duration: "40 min", type: "video", done: true },
        { title: "TCP/IP Stack", duration: "35 min", type: "video", done: true },
        { title: "Load Balancer & Firewall", duration: "40 min", type: "video", done: true },
      ]},
      { step: 3, title: "Linux", subtitle: "Very Important", icon: "🐧", modules: [
        { title: "Basic Commands", duration: "45 min", type: "video", done: true },
        { title: "File System & Permissions", duration: "35 min", type: "video", done: true },
        { title: "Processes & Package Install", duration: "30 min", type: "video", done: true },
      ]},
      { step: 4, title: "Cloud Platform (AWS)", subtitle: "Most Popular", icon: "☁️", modules: [
        { title: "EC2 – Virtual Servers", duration: "55 min", type: "video", done: true },
        { title: "S3 – Storage Buckets", duration: "45 min", type: "video", done: true },
        { title: "RDS – Managed Database", duration: "50 min", type: "video", done: true },
        { title: "VPC – Networking", duration: "60 min", type: "video", done: true },
        { title: "AWS Console Lab", duration: "90 min", type: "lab", done: false },
      ]},
      { step: 5, title: "Deployment", subtitle: "Ship It!", icon: "🚀", modules: [
        { title: "Application Deployment", duration: "50 min", type: "video", done: false },
        { title: "SSH & Server Config", duration: "35 min", type: "video", done: false },
      ]},
      { step: 6, title: "Security", subtitle: "Cloud Security", icon: "🔐", modules: [
        { title: "IAM Roles & Policies", duration: "40 min", type: "video", done: false },
        { title: "Encryption Basics", duration: "30 min", type: "video", done: false },
        { title: "Security Groups", duration: "25 min", type: "video", done: false },
      ]},
      { step: 7, title: "Projects", subtitle: "Build Real Things", icon: "🏗️", modules: [
        { title: "Deploy Website on AWS", duration: "150 min", type: "project", done: false },
        { title: "Setup Cloud Server", duration: "120 min", type: "project", done: false },
        { title: "Final Exam", duration: "60 min", type: "quiz", done: false },
      ]},
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    subtitle: "Automate deployments, manage CI/CD pipelines & improve development workflow",
    category: "Cloud & DevOps",
    level: "Intermediate → Advanced",
    duration: "72h 00m",
    students: "18,920",
    rating: 4.8,
    reviews: 4215,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
    icon: "⚙️",
    instructor: { name: "Marcus Johnson", role: "DevOps Lead @ Netflix", avatar: "MJ" },
    tags: ["Docker","Kubernetes","Jenkins","CI/CD"],
    totalLessons: 72,
    completedLessons: 0,
    work: ["Automate deployments","Manage CI/CD pipelines","Improve development workflow"],
    steps: [
      { step: 1, title: "Programming Basics", subtitle: "Scripting Foundation", icon: "🐍", modules: [
        { title: "Python Basics", duration: "55 min", type: "video", done: false },
        { title: "Shell Scripting", duration: "50 min", type: "video", done: false },
      ]},
      { step: 2, title: "Linux", subtitle: "Core OS Skills", icon: "🐧", modules: [
        { title: "Commands & Navigation", duration: "45 min", type: "video", done: false },
        { title: "Permissions & Processes", duration: "40 min", type: "video", done: false },
        { title: "Services & Systemd", duration: "35 min", type: "video", done: false },
      ]},
      { step: 3, title: "Networking", subtitle: "Essential Protocols", icon: "🌐", modules: [
        { title: "Ports, DNS & HTTP/HTTPS", duration: "40 min", type: "video", done: false },
      ]},
      { step: 4, title: "Git", subtitle: "Very Important", icon: "📦", modules: [
        { title: "Git Init, Commit & Branches", duration: "50 min", type: "video", done: false },
        { title: "Merge & Pull Requests", duration: "45 min", type: "video", done: false },
        { title: "Git Workflow Lab", duration: "60 min", type: "lab", done: false },
      ]},
      { step: 5, title: "CI/CD", subtitle: "Automation Pipelines", icon: "🔄", modules: [
        { title: "Jenkins Basics", duration: "55 min", type: "video", done: false },
        { title: "Pipeline Configuration", duration: "60 min", type: "video", done: false },
        { title: "Build Automation", duration: "45 min", type: "video", done: false },
      ]},
      { step: 6, title: "Containers (Docker)", subtitle: "Package Everything", icon: "🐋", modules: [
        { title: "Docker Images & Containers", duration: "60 min", type: "video", done: false },
        { title: "Writing Dockerfiles", duration: "50 min", type: "video", done: false },
        { title: "Docker Compose", duration: "45 min", type: "video", done: false },
        { title: "Docker Lab", duration: "90 min", type: "lab", done: false },
      ]},
      { step: 7, title: "Kubernetes", subtitle: "Container Orchestration", icon: "⚓", modules: [
        { title: "Pods & Services", duration: "60 min", type: "video", done: false },
        { title: "Deployments & Scaling", duration: "55 min", type: "video", done: false },
        { title: "K8s Lab", duration: "120 min", type: "lab", done: false },
      ]},
      { step: 8, title: "Cloud", subtitle: "AWS Integration", icon: "☁️", modules: [
        { title: "AWS Deployment", duration: "65 min", type: "video", done: false },
        { title: "CI/CD with Cloud", duration: "70 min", type: "video", done: false },
      ]},
      { step: 9, title: "Projects", subtitle: "Capstone Projects", icon: "🏗️", modules: [
        { title: "CI/CD Pipeline Project", duration: "180 min", type: "project", done: false },
        { title: "Docker Deployment Project", duration: "150 min", type: "project", done: false },
        { title: "Final Exam", duration: "60 min", type: "quiz", done: false },
      ]},
    ],
  },
];

const ALL_COURSES = [...CYBER_COURSES, ...DEVOPS_COURSES];

const USER = {
  name: "Arjun Mehta", initials: "AM", role: "Security Learner",
  email: "arjun@techpath.io", location: "Hyderabad, IN",
  level: 14, xp: 7430, xpNext: 10000, streak: 21,
};

/* ══════════════════════════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════════════════════════ */
const DARK = {
  mode: "dark",
  bg: "#09090f",
  bg2: "#0f1018",
  bgCard: "#13141d",
  bgCard2: "#1a1b28",
  sidebar: "#0c0d16",
  input: "#1a1b28",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.12)",
  text: "#f8fafc",
  textSub: "#94a3b8",
  textMuted: "#475569",
  accent: "#6366f1",
  accentBg: "rgba(99,102,241,0.12)",
  accentBorder: "rgba(99,102,241,0.3)",
  success: "#22c55e",
  successBg: "rgba(34,197,94,0.1)",
  warning: "#f59e0b",
  shadow: "0 20px 60px rgba(0,0,0,0.7)",
  cardShadow: "0 2px 20px rgba(0,0,0,0.5)",
  navHover: "rgba(255,255,255,0.04)",
};
const LIGHT = {
  mode: "light",
  bg: "#f5f7ff",
  bg2: "#eef0fa",
  bgCard: "#ffffff",
  bgCard2: "#f8f9ff",
  sidebar: "#ffffff",
  input: "#eef0fa",
  border: "rgba(0,0,0,0.07)",
  borderStrong: "rgba(0,0,0,0.14)",
  text: "#0f1020",
  textSub: "#4b5563",
  textMuted: "#9ca3af",
  accent: "#4f46e5",
  accentBg: "rgba(79,70,229,0.08)",
  accentBorder: "rgba(79,70,229,0.25)",
  success: "#16a34a",
  successBg: "rgba(22,163,74,0.08)",
  warning: "#d97706",
  shadow: "0 20px 60px rgba(79,70,229,0.1)",
  cardShadow: "0 2px 16px rgba(0,0,0,0.07)",
  navHover: "rgba(79,70,229,0.05)",
};

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
const I = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  courses: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  cloud: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 110-14 7 7 0 0110 6.5A3.5 3.5 0 0117.5 19z"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
  sun: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  bell: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  search: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  play: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  lock: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  video: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  quiz: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  lab: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>,
  project: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  back: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  star: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  chevronDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevronRight: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
};

/* ══════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════ */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("dashboard"); // "dashboard" | "course:id"
  const T = theme === "dark" ? DARK : LIGHT;

  const navigate = (to) => setPage(to);

  const activeCourse = page.startsWith("course:") ? ALL_COURSES.find(c => c.id === page.split("course:")[1]) : null;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, minHeight: "100vh", color: T.text, transition: "background 0.3s, color 0.3s" }}>
      <GlobalCSS T={T} />
      {page === "dashboard"
        ? <Dashboard T={T} theme={theme} setTheme={setTheme} navigate={navigate} />
        : <CoursePage T={T} theme={theme} setTheme={setTheme} course={activeCourse} navigate={navigate} />
      }
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════════════ */
function GlobalCSS({ T }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
      ::-webkit-scrollbar { width:5px; height:5px; }
      ::-webkit-scrollbar-track { background:transparent; }
      ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:10px; }
      button { font-family:inherit; cursor:pointer; border:none; outline:none; }
      input { font-family:inherit; outline:none; border:none; }
      @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes scaleIn { from{opacity:0;transform:scale(0.96) translateY(-8px)} to{opacity:1;transform:scale(1) translateY(0)} }
      @keyframes slideLeft { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
      @keyframes progressBar { from{width:0} to{width:var(--w)} }
      .fade-up { animation: fadeUp 0.45s ease both; }
      .fade-in { animation: fadeIn 0.3s ease both; }
      .scale-in { animation: scaleIn 0.2s ease both; }
      .slide-left { animation: slideLeft 0.4s ease both; }
      .btn-hover { transition: all 0.18s ease; }
      .btn-hover:hover { filter: brightness(1.1); transform: translateY(-1px); }
      .card-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor:pointer; }
      .card-lift:hover { transform: translateY(-4px); }
      .nav-item { transition: all 0.15s ease; }
    `}</style>
  );
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════════ */
function Dashboard({ T, theme, setTheme, navigate }) {
  const [navTab, setNavTab] = useState("home");
  const [sideOpen, setSideOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const W = sideOpen ? 240 : 68;

  const NAV_ITEMS = [
    { id:"home", label:"Home", icon: I.home },
    { id:"cyber", label:"Cyber Security", icon: I.shield },
    { id:"cloud", label:"Cloud & DevOps", icon: I.cloud },
    { id:"progress", label:"My Progress", icon: I.chart },
    { id:"certificates", label:"Certificates", icon: I.trophy },
    { id:"settings", label:"Settings", icon: I.settings },
  ];

  const displayCourses = filterCat === "All" ? ALL_COURSES
    : filterCat === "Cyber Security" ? CYBER_COURSES
    : DEVOPS_COURSES;

  const inProgress = ALL_COURSES.filter(c => c.completedLessons > 0 && c.completedLessons < c.totalLessons);
  const completed = ALL_COURSES.filter(c => c.completedLessons === c.totalLessons);

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* SIDEBAR */}
      <aside style={{
        position:"fixed", top:0, left:0, bottom:0, width:W, zIndex:50,
        background: T.sidebar,
        borderRight: `1px solid ${T.border}`,
        display:"flex", flexDirection:"column",
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow:"hidden",
        boxShadow: theme === "light" ? "4px 0 24px rgba(79,70,229,0.06)" : "none",
      }}>
        {/* Logo */}
        <div style={{ height:68, display:"flex", alignItems:"center", padding: sideOpen ? "0 20px" : "0", justifyContent: sideOpen ? "flex-start" : "center", borderBottom:`1px solid ${T.border}`, gap:12, flexShrink:0 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 16px rgba(99,102,241,0.45)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2"/></svg>
          </div>
          {sideOpen && (
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:T.text, letterSpacing:"-0.04em" }}>TechPath</div>
              <div style={{ fontSize:9.5, color:T.textMuted, letterSpacing:"0.1em", textTransform:"uppercase" }}>Learn · Build · Grow</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 8px", display:"flex", flexDirection:"column", gap:2, overflowY:"auto" }}>
          {NAV_ITEMS.map(item => {
            const active = navTab === item.id;
            return (
              <button key={item.id} className="nav-item" onClick={() => setNavTab(item.id)}
                title={!sideOpen ? item.label : ""}
                style={{
                  display:"flex", alignItems:"center", gap:11,
                  padding: sideOpen ? "10px 13px" : "10px",
                  borderRadius:10,
                  background: active ? T.accentBg : "transparent",
                  color: active ? T.accent : T.textSub,
                  fontWeight: active ? 600 : 500,
                  fontSize:13.5, width:"100%", textAlign:"left",
                  position:"relative",
                  justifyContent: sideOpen ? "flex-start" : "center",
                  border: `1px solid ${active ? T.accentBorder : "transparent"}`,
                }}>
                {active && sideOpen && <div style={{ position:"absolute", left:0, top:"18%", bottom:"18%", width:3, background:T.accent, borderRadius:"0 3px 3px 0" }} />}
                <span style={{ flexShrink:0, display:"flex" }}>{item.icon}</span>
                {sideOpen && <span style={{ whiteSpace:"nowrap" }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* XP Widget */}
        {sideOpen && (
          <div style={{ margin:"8px 12px", padding:"14px", background:T.accentBg, border:`1px solid ${T.accentBorder}`, borderRadius:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:10.5, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.08em" }}>Level {USER.level}</span>
              <span style={{ fontSize:10.5, fontWeight:700, color:T.accent }}>{(USER.xp/1000).toFixed(1)}k XP</span>
            </div>
            <div style={{ height:4, background: T.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", borderRadius:4, overflow:"hidden", marginBottom:7 }}>
              <div style={{ height:"100%", width:`${(USER.xp/USER.xpNext)*100}%`, background:"linear-gradient(90deg,#6366f1,#a855f7)", borderRadius:4 }} />
            </div>
            <div style={{ fontSize:10, color:T.textMuted }}>🔥 {USER.streak} day streak · {USER.xpNext - USER.xp} XP to next</div>
          </div>
        )}

        {/* User */}
        <div style={{ padding: sideOpen ? "12px 14px 16px" : "12px 8px 16px", borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:10, justifyContent: sideOpen ? "flex-start" : "center" }}>
          <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#6366f1,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", flexShrink:0 }}>{USER.initials}</div>
          {sideOpen && <div style={{ overflow:"hidden" }}>
            <div style={{ fontSize:12.5, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{USER.name}</div>
            <div style={{ fontSize:10.5, color:T.textMuted }}>{USER.role}</div>
          </div>}
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ marginLeft:W, flex:1, transition:"margin-left 0.25s cubic-bezier(0.4,0,0.2,1)", minWidth:0 }}>
        {/* TOPBAR */}
        <header style={{
          position:"sticky", top:0, zIndex:40, height:68,
          background: T.mode === "dark" ? "rgba(9,9,15,0.9)" : "rgba(245,247,255,0.92)",
          backdropFilter:"blur(20px)",
          borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 24px",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={() => setSideOpen(p=>!p)} style={{ width:34, height:34, borderRadius:8, background:T.input, color:T.textSub, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${T.border}` }}>
              {I.menu}
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:T.input, border:`1px solid ${T.border}`, borderRadius:10, padding:"8px 13px", width:260 }}>
              <span style={{ color:T.textMuted, display:"flex" }}>{I.search}</span>
              <input placeholder="Search courses..." style={{ background:"transparent", color:T.text, fontSize:13.5, flex:1 }} />
              <kbd style={{ fontSize:10, color:T.textMuted, background:T.border, padding:"2px 6px", borderRadius:5 }}>⌘K</kbd>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, position:"relative" }}>
            <button onClick={() => setTheme(t => t==="dark"?"light":"dark")} style={{ width:34, height:34, borderRadius:8, background:T.input, color:T.textSub, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${T.border}`, transition:"all 0.2s" }}>
              {theme === "dark" ? I.sun : I.moon}
            </button>
            <button style={{ position:"relative", width:34, height:34, borderRadius:8, background:T.input, color:T.textSub, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${T.border}` }}>
              {I.bell}
              <span style={{ position:"absolute", top:8, right:8, width:6, height:6, borderRadius:"50%", background:"#ef4444", border:`2px solid ${T.input}` }} />
            </button>
            <button onClick={() => setProfileOpen(p=>!p)} style={{ display:"flex", alignItems:"center", gap:9, padding:"5px 12px 5px 6px", borderRadius:10, background:T.input, border:`1px solid ${profileOpen ? T.accentBorder : T.border}`, transition:"border 0.15s" }}>
              <div style={{ width:30, height:30, borderRadius:8, background:"linear-gradient(135deg,#6366f1,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10.5, fontWeight:800, color:"#fff" }}>{USER.initials}</div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:600, color:T.text, lineHeight:1.2 }}>{USER.name.split(" ")[0]}</div>
                <div style={{ fontSize:10, color:T.textMuted }}>Lv.{USER.level}</div>
              </div>
              <span style={{ color:T.textMuted, display:"flex" }}>{I.chevronDown}</span>
            </button>
            {/* Profile Dropdown */}
            {profileOpen && <>
              <div onClick={() => setProfileOpen(false)} style={{ position:"fixed", inset:0, zIndex:45 }} />
              <div className="scale-in" style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:280, background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:16, boxShadow:T.shadow, zIndex:50, overflow:"hidden" }}>
                <div style={{ height:70, background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)" }}>
                  <div style={{ position:"absolute", inset:0, height:70, backgroundImage:"radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
                </div>
                <div style={{ padding:"0 18px 18px", position:"relative" }}>
                  <div style={{ marginTop:-22, marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#6366f1,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#fff", border:`3px solid ${T.bgCard}` }}>{USER.initials}</div>
                    <span style={{ fontSize:10, color:T.accent, background:T.accentBg, padding:"3px 9px", borderRadius:20, fontWeight:600, border:`1px solid ${T.accentBorder}` }}>🔥 {USER.streak}d Streak</span>
                  </div>
                  <div style={{ fontSize:15, fontWeight:700, color:T.text, letterSpacing:"-0.02em" }}>{USER.name}</div>
                  <div style={{ fontSize:11.5, color:T.textMuted, marginBottom:14 }}>{USER.role} · {USER.location}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
                    {[{l:"Level",v:USER.level},{l:"XP",v:`${(USER.xp/1000).toFixed(1)}k`},{l:"Courses",v:ALL_COURSES.length}].map(s=>(
                      <div key={s.l} style={{ textAlign:"center", padding:"8px 6px", background:T.input, borderRadius:9, border:`1px solid ${T.border}` }}>
                        <div style={{ fontSize:14, fontWeight:700, color:T.accent }}>{s.v}</div>
                        <div style={{ fontSize:10, color:T.textMuted, marginTop:1 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button style={{ flex:1, padding:"8px", borderRadius:8, background:T.accentBg, border:`1px solid ${T.accentBorder}`, color:T.accent, fontSize:12, fontWeight:600 }}>Edit Profile</button>
                    <button style={{ flex:1, padding:"8px", borderRadius:8, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"#ef4444", fontSize:12, fontWeight:600 }}>Sign Out</button>
                  </div>
                </div>
              </div>
            </>}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ padding:"28px 28px 48px" }}>
          {/* HERO */}
          <div className="fade-up" style={{ marginBottom:28, borderRadius:20, overflow:"hidden", background:"linear-gradient(135deg,#1a1040 0%,#0f1a3e 40%,#0d2040 100%)", padding:"32px 36px", position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:"radial-gradient(circle at 80% 50%, rgba(99,102,241,0.2) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(168,85,247,0.15) 0%, transparent 50%)" }} />
            <div style={{ position:"relative" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.12em" }}>Welcome back 👋</span>
              </div>
              <h1 style={{ fontSize:30, fontWeight:800, color:"#fff", letterSpacing:"-0.04em", lineHeight:1.15, marginBottom:8 }}>Good morning, {USER.name.split(" ")[0]}!</h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:22 }}>You're on a {USER.streak}-day streak — keep building your skills.</p>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn-hover" onClick={() => navigate(`course:${inProgress[0]?.id || ALL_COURSES[0].id}`)} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 20px", borderRadius:10, background:"#6366f1", color:"#fff", fontSize:13.5, fontWeight:600, boxShadow:"0 4px 16px rgba(99,102,241,0.5)" }}>
                  {I.play} Continue Learning
                </button>
                <button className="btn-hover" style={{ padding:"10px 20px", borderRadius:10, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", fontSize:13.5, fontWeight:600, backdropFilter:"blur(10px)" }}>
                  Browse Courses
                </button>
              </div>
            </div>
            <div style={{ position:"relative", display:"flex", gap:12 }}>
              {[{v:ALL_COURSES.length,l:"Total Courses",i:"📚"},{v:inProgress.length,l:"In Progress",i:"⚡"},{v:completed.length,l:"Completed",i:"✅"}].map(s=>(
                <div key={s.l} style={{ textAlign:"center", padding:"16px 18px", borderRadius:14, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", backdropFilter:"blur(10px)", minWidth:80 }}>
                  <div style={{ fontSize:24 }}>{s.i}</div>
                  <div style={{ fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-0.04em", marginTop:4 }}>{s.v}</div>
                  <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.5)", marginTop:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS */}
          {inProgress.length > 0 && (
            <section style={{ marginBottom:32 }}>
              <SectionHeader T={T} title="Continue Learning" sub={`${inProgress.length} courses in progress`} />
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:16 }}>
                {inProgress.map((c, i) => <CourseCard key={c.id} c={c} T={T} navigate={navigate} i={i} highlight />)}
              </div>
            </section>
          )}

          {/* ALL COURSES */}
          <section>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:12 }}>
              <div>
                <h2 style={{ fontSize:19, fontWeight:700, color:T.text, letterSpacing:"-0.03em" }}>All Courses</h2>
                <p style={{ fontSize:12.5, color:T.textMuted, marginTop:2 }}>{ALL_COURSES.length} courses available</p>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <div style={{ display:"flex", gap:4, padding:"4px", background:T.input, borderRadius:10, border:`1px solid ${T.border}` }}>
                  {["All","Cyber Security","Cloud & DevOps"].map(f=>(
                    <button key={f} onClick={() => setFilterCat(f)} style={{ padding:"6px 14px", borderRadius:7, fontSize:12.5, fontWeight:500, background: filterCat===f ? T.accent : "transparent", color: filterCat===f ? "#fff" : T.textSub, transition:"all 0.15s" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category sections */}
            {(filterCat === "All" || filterCat === "Cyber Security") && (
              <div style={{ marginBottom:28 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <span style={{ fontSize:18 }}>🛡️</span>
                  <span style={{ fontSize:14, fontWeight:700, color:T.text }}>Cyber Security</span>
                  <span style={{ fontSize:11, color:T.textMuted, background:T.input, padding:"2px 9px", borderRadius:20, border:`1px solid ${T.border}` }}>{CYBER_COURSES.length} courses</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
                  {CYBER_COURSES.map((c,i) => <CourseCard key={c.id} c={c} T={T} navigate={navigate} i={i} />)}
                </div>
              </div>
            )}
            {(filterCat === "All" || filterCat === "Cloud & DevOps") && (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <span style={{ fontSize:18 }}>☁️</span>
                  <span style={{ fontSize:14, fontWeight:700, color:T.text }}>Cloud & DevOps</span>
                  <span style={{ fontSize:11, color:T.textMuted, background:T.input, padding:"2px 9px", borderRadius:20, border:`1px solid ${T.border}` }}>{DEVOPS_COURSES.length} courses</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
                  {DEVOPS_COURSES.map((c,i) => <CourseCard key={c.id} c={c} T={T} navigate={navigate} i={i} />)}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COURSE CARD (Dashboard)
══════════════════════════════════════════════════════════════ */
function CourseCard({ c, T, navigate, i, highlight }) {
  const pct = Math.round((c.completedLessons / c.totalLessons) * 100);
  const status = c.completedLessons === c.totalLessons ? "completed" : c.completedLessons > 0 ? "progress" : "new";
  const statusMap = {
    completed: { label:"Completed", color:"#22c55e", bg:"rgba(34,197,94,0.1)", border:"rgba(34,197,94,0.25)" },
    progress:  { label:"In Progress", color:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.25)" },
    new:       { label:"Not Started", color:T.textMuted, bg:T.input, border:T.border },
  };
  const s = statusMap[status];

  return (
    <div className="card-lift fade-up" onClick={() => navigate(`course:${c.id}`)}
      style={{ borderRadius:16, background:T.bgCard, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:T.cardShadow, animationDelay:`${i*0.07}s`,
        ...(highlight ? { border:`1px solid ${c.color}30` } : {}),
      }}>
      {/* Color bar */}
      <div style={{ height:4, background:c.gradient }} />

      <div style={{ padding:"18px 20px 20px" }}>
        {/* Top row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <span style={{ fontSize:20 }}>{c.icon}</span>
            <span style={{ fontSize:10.5, fontWeight:700, color:c.color, background:`${c.color}14`, padding:"3px 9px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.07em" }}>{c.category}</span>
          </div>
          <span style={{ fontSize:12, color:"#fbbf24", display:"flex", alignItems:"center", gap:3, fontWeight:600 }}>
            {I.star} {c.rating}
          </span>
        </div>

        <h3 style={{ fontSize:15.5, fontWeight:700, color:T.text, letterSpacing:"-0.025em", lineHeight:1.3, marginBottom:3 }}>{c.title}</h3>
        <p style={{ fontSize:12, color:T.textMuted, marginBottom:14, lineHeight:1.5 }}>{c.subtitle}</p>

        <div style={{ display:"flex", gap:14, marginBottom:14 }}>
          <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11.5, color:T.textMuted }}>{I.clock} {c.duration}</span>
          <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11.5, color:T.textMuted }}>{I.users} {c.students}</span>
          <span style={{ fontSize:11.5, color:T.textMuted }}>📶 {c.level}</span>
        </div>

        {/* Progress */}
        {status !== "new" && (
          <div style={{ marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:11, color:T.textMuted }}>Progress</span>
              <span style={{ fontSize:11, fontWeight:700, color:c.color }}>{pct}%</span>
            </div>
            <div style={{ height:5, borderRadius:5, background:`${c.color}18`, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:c.gradient, borderRadius:5 }} />
            </div>
          </div>
        )}

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>{s.label}</span>
          <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:9, background: status==="completed" ? T.successBg : `${c.color}18`, color: status==="completed" ? T.success : c.color, fontSize:12.5, fontWeight:600, border:`1px solid ${status==="completed"?"rgba(34,197,94,0.25)":c.color+"30"}` }}>
            {status==="completed" ? "Review" : status==="progress" ? "Continue →" : "Start →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COURSE PAGE — Udemy-style
══════════════════════════════════════════════════════════════ */
function CoursePage({ T, theme, setTheme, course, navigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState({ 0: true, 1: true });

  if (!course) return <div style={{ padding:40, color:T.text }}>Course not found.</div>;

  const totalLessons = course.steps.reduce((a, s) => a + s.modules.length, 0);
  const completedLessons = course.steps.reduce((a, s) => a + s.modules.filter(m => m.done).length, 0);
  const pct = Math.round((completedLessons / totalLessons) * 100);
  const isCompleted = completedLessons === totalLessons;

  const typeIcon = { video: I.video, quiz: I.quiz, lab: I.lab, project: I.project };
  const typeColor = { video: "#6366f1", quiz: "#f59e0b", lab: "#10b981", project: "#ec4899" };
  const typeLabel = { video:"Video", quiz:"Quiz", lab:"Lab", project:"Project" };

  const toggleStep = (idx) => setExpandedSteps(p => ({ ...p, [idx]: !p[idx] }));

  return (
    <div style={{ minHeight:"100vh" }}>
      {/* TOP NAV */}
      <header style={{
        position:"sticky", top:0, zIndex:50, height:60,
        background: T.mode === "dark" ? "rgba(9,9,15,0.95)" : "rgba(245,247,255,0.96)",
        backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${T.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 24px",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <button onClick={() => navigate("dashboard")} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 13px", borderRadius:9, background:T.input, border:`1px solid ${T.border}`, color:T.textSub, fontSize:13, fontWeight:500 }}>
            {I.back} Dashboard
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:14 }}>{course.icon}</span>
            <span style={{ fontSize:14, fontWeight:600, color:T.text }}>{course.title}</span>
            <span style={{ width:6, height:6, borderRadius:"50%", background: isCompleted ? "#22c55e" : "#f59e0b" }} />
            <span style={{ fontSize:11, color:T.textMuted }}>{pct}% complete</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:160, height:5, background:T.mode==="dark"?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)", borderRadius:5, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:course.gradient, borderRadius:5 }} />
          </div>
          <span style={{ fontSize:12, fontWeight:600, color:T.textSub, minWidth:32 }}>{pct}%</span>
          <button onClick={() => setTheme(t => t==="dark"?"light":"dark")} style={{ width:32, height:32, borderRadius:8, background:T.input, border:`1px solid ${T.border}`, color:T.textSub, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {theme === "dark" ? I.sun : I.moon}
          </button>
        </div>
      </header>

      <div style={{ display:"flex", minHeight:"calc(100vh - 60px)" }}>
        {/* COURSE SIDEBAR */}
        <aside style={{ width:340, borderRight:`1px solid ${T.border}`, background:T.sidebar, overflowY:"auto", position:"sticky", top:60, height:"calc(100vh - 60px)", flexShrink:0 }}>
          {/* Course info panel */}
          <div style={{ padding:"20px 20px 16px", borderBottom:`1px solid ${T.border}` }}>
            <div style={{ display:"flex", gap:10, marginBottom:14 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:course.gradient, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{course.icon}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:T.text, lineHeight:1.3, letterSpacing:"-0.02em" }}>{course.title}</div>
                <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{course.level}</div>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:11.5, color:T.textMuted }}>Overall Progress</span>
              <span style={{ fontSize:11.5, fontWeight:700, color: isCompleted ? "#22c55e" : course.color }}>{pct}%</span>
            </div>
            <div style={{ height:6, background:T.mode==="dark"?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)", borderRadius:6, overflow:"hidden", marginBottom:10 }}>
              <div style={{ height:"100%", width:`${pct}%`, background:course.gradient, borderRadius:6, transition:"width 0.5s ease" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10.5, color:T.textMuted }}>
              <span>{completedLessons} / {totalLessons} lessons done</span>
              <span>{course.steps.length} sections</span>
            </div>
          </div>

          {/* Steps accordion */}
          <div style={{ padding:"10px 0" }}>
            {course.steps.map((step, si) => {
              const stepDone = step.modules.filter(m=>m.done).length;
              const expanded = expandedSteps[si];
              return (
                <div key={si} style={{ borderBottom:`1px solid ${T.border}` }}>
                  <button onClick={() => toggleStep(si)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"12px 18px", background:"transparent", textAlign:"left" }}>
                    <div style={{ width:28, height:28, borderRadius:8, background: stepDone===step.modules.length ? "#22c55e18" : T.accentBg, border:`1px solid ${stepDone===step.modules.length ? "rgba(34,197,94,0.3)" : T.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{step.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12.5, fontWeight:600, color:T.text }}>Step {step.step}: {step.title}</div>
                      <div style={{ fontSize:10.5, color:T.textMuted }}>{stepDone}/{step.modules.length} · {step.subtitle}</div>
                    </div>
                    <span style={{ color:T.textMuted, display:"flex", transform: expanded?"rotate(180deg)":"none", transition:"transform 0.2s" }}>{I.chevronDown}</span>
                  </button>
                  {expanded && (
                    <div style={{ paddingBottom:6 }}>
                      {step.modules.map((mod, mi) => {
                        const globalIdx = `${si}-${mi}`;
                        const isActive = activeLesson === globalIdx;
                        return (
                          <button key={mi} onClick={() => setActiveLesson(globalIdx)} style={{
                            width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 18px 9px 24px",
                            background: isActive ? T.accentBg : "transparent",
                            borderLeft: `3px solid ${isActive ? T.accent : "transparent"}`,
                            textAlign:"left",
                          }}>
                            <div style={{ width:22, height:22, borderRadius:6, background: mod.done ? "rgba(34,197,94,0.12)" : T.input, border:`1px solid ${mod.done?"rgba(34,197,94,0.3)":T.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color: mod.done ? "#22c55e" : T.textMuted }}>
                              {mod.done ? I.check : <span style={{ display:"flex", color:typeColor[mod.type] }}>{typeIcon[mod.type]}</span>}
                            </div>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontSize:12, color: mod.done ? T.textMuted : T.text, fontWeight: isActive ? 600 : 400, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", textDecoration: mod.done ? "line-through" : "none", opacity: mod.done ? 0.6 : 1 }}>{mod.title}</div>
                              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:2 }}>
                                <span style={{ fontSize:9.5, color:typeColor[mod.type], fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{typeLabel[mod.type]}</span>
                                <span style={{ fontSize:10, color:T.textMuted }}>{mod.duration}</span>
                              </div>
                            </div>
                            {!mod.done && !isActive && <span style={{ color:T.textMuted, flexShrink:0, display:"flex", opacity:0.5 }}>{I.lock}</span>}
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

        {/* MAIN CONTENT AREA */}
        <div style={{ flex:1, overflowY:"auto" }}>
          {activeLesson === null ? (
            // Course overview
            <div className="fade-in" style={{ maxWidth:860, margin:"0 auto", padding:"32px 36px 60px" }}>
              {/* Hero banner */}
              <div style={{ borderRadius:20, overflow:"hidden", background:course.gradient, padding:"36px 36px 32px", marginBottom:32, position:"relative" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
                <div style={{ position:"relative" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                    <span style={{ fontSize:32 }}>{course.icon}</span>
                    <div>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{course.category}</span>
                      <h1 style={{ fontSize:28, fontWeight:800, color:"#fff", letterSpacing:"-0.04em", lineHeight:1.2 }}>{course.title}</h1>
                    </div>
                  </div>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.75)", marginBottom:22, maxWidth:560 }}>{course.subtitle}</p>
                  <div style={{ display:"flex", gap:20, flexWrap:"wrap", marginBottom:22 }}>
                    {[{i:I.star,v:`${course.rating} (${course.reviews.toLocaleString()} reviews)`},{i:I.users,v:`${course.students} students`},{i:I.clock,v:course.duration},{i:"📶",v:course.level}].map((m,idx)=>(
                      <span key={idx} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12.5, color:"rgba(255,255,255,0.75)" }}>
                        <span style={{ display:"flex" }}>{m.i}</span>{m.v}
                      </span>
                    ))}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff" }}>{course.instructor.avatar}</div>
                    <div>
                      <span style={{ fontSize:12.5, color:"rgba(255,255,255,0.9)", fontWeight:600 }}>{course.instructor.name}</span>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,0.55)", display:"block" }}>{course.instructor.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What you'll do */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
                <div style={{ padding:"22px", borderRadius:16, background:T.bgCard, border:`1px solid ${T.border}` }}>
                  <h3 style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:14 }}>What you'll do</h3>
                  {course.work.map((w,i) => (
                    <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", marginBottom:9 }}>
                      <div style={{ width:18, height:18, borderRadius:5, background:T.accentBg, border:`1px solid ${T.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, color:T.accent }}>{I.check}</div>
                      <span style={{ fontSize:13, color:T.textSub, lineHeight:1.4 }}>{w}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"22px", borderRadius:16, background:T.bgCard, border:`1px solid ${T.border}` }}>
                  <h3 style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:14 }}>Course Stats</h3>
                  {[{l:"Total Sections",v:course.steps.length},{l:"Total Lessons",v:totalLessons},{l:"Duration",v:course.duration},{l:"Level",v:course.level},{l:"Lessons Done",v:`${completedLessons} / ${totalLessons}`}].map(s=>(
                    <div key={s.l} style={{ display:"flex", justifyContent:"space-between", paddingBottom:9, marginBottom:9, borderBottom:`1px solid ${T.border}` }}>
                      <span style={{ fontSize:12.5, color:T.textMuted }}>{s.l}</span>
                      <span style={{ fontSize:12.5, fontWeight:600, color:T.text }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
                {course.tags.map(tag => (
                  <span key={tag} style={{ padding:"5px 14px", borderRadius:20, background:T.accentBg, color:T.accent, border:`1px solid ${T.accentBorder}`, fontSize:12, fontWeight:500 }}>{tag}</span>
                ))}
              </div>

              {/* Course Roadmap */}
              <h2 style={{ fontSize:18, fontWeight:700, color:T.text, letterSpacing:"-0.03em", marginBottom:20 }}>Course Roadmap</h2>
              <div style={{ position:"relative" }}>
                {/* Vertical line */}
                <div style={{ position:"absolute", left:19, top:0, bottom:0, width:2, background:`linear-gradient(180deg, ${course.color}60, transparent)`, borderRadius:2 }} />
                {course.steps.map((step, si) => {
                  const stepDone = step.modules.filter(m=>m.done).length;
                  const pctDone = Math.round((stepDone/step.modules.length)*100);
                  const isDone = stepDone === step.modules.length;
                  return (
                    <div key={si} className="fade-up" style={{ display:"flex", gap:16, marginBottom:20, animationDelay:`${si*0.06}s` }}>
                      <div style={{ width:38, height:38, borderRadius:11, background: isDone ? "#22c55e18" : T.bgCard2, border:`2px solid ${isDone?"#22c55e":course.color+"40"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, zIndex:1, boxShadow:`0 0 0 4px ${T.bg}` }}>{isDone?"✅":step.icon}</div>
                      <div style={{ flex:1, padding:"14px 18px", borderRadius:14, background:T.bgCard, border:`1px solid ${T.border}`, boxShadow:T.cardShadow }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                          <div>
                            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:2 }}>
                              <span style={{ fontSize:10, color:course.color, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", background:`${course.color}14`, padding:"2px 8px", borderRadius:20 }}>Step {step.step}</span>
                              {step.subtitle && <span style={{ fontSize:10, color:T.textMuted }}>{step.subtitle}</span>}
                            </div>
                            <h3 style={{ fontSize:14.5, fontWeight:700, color:T.text, letterSpacing:"-0.02em" }}>{step.title}</h3>
                          </div>
                          <span style={{ fontSize:12, fontWeight:700, color: isDone?"#22c55e":course.color, marginLeft:10, flexShrink:0 }}>{pctDone}%</span>
                        </div>
                        <div style={{ height:3, background:T.mode==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)", borderRadius:3, overflow:"hidden", marginBottom:12 }}>
                          <div style={{ height:"100%", width:`${pctDone}%`, background: isDone?"#22c55e":course.gradient, borderRadius:3 }} />
                        </div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {step.modules.map((mod, mi) => (
                            <button key={mi} onClick={() => { setExpandedSteps(p=>({...p,[si]:true})); setActiveLesson(`${si}-${mi}`); }}
                              style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:8, background: mod.done ? "rgba(34,197,94,0.08)" : T.input, border:`1px solid ${mod.done?"rgba(34,197,94,0.2)":T.border}`, cursor:"pointer", fontSize:11, color: mod.done ? "#22c55e" : T.textSub, fontWeight: mod.done ? 500 : 400 }}>
                              <span style={{ display:"flex", color: mod.done?"#22c55e":typeColor[mod.type] }}>{mod.done ? I.check : typeIcon[mod.type]}</span>
                              <span style={{ maxWidth:120, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{mod.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div style={{ marginTop:32, padding:"24px", borderRadius:16, background:T.bgCard, border:`1px solid ${T.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                <div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:4 }}>{pct===0?"Ready to start?":pct===100?"You've completed this course! 🎉":"Keep going — you're doing great!"}</h3>
                  <p style={{ fontSize:13, color:T.textMuted }}>{pct===0?`${totalLessons} lessons · ${course.duration}`:`${completedLessons} of ${totalLessons} lessons completed`}</p>
                </div>
                <button className="btn-hover" onClick={() => setActiveLesson("0-0")} style={{ padding:"11px 26px", borderRadius:11, background:course.gradient, color:"#fff", fontSize:14, fontWeight:700, border:"none", boxShadow:`0 4px 16px ${course.color}40` }}>
                  {pct===0?"Start Course →":pct===100?"Review Course →":"Continue Learning →"}
                </button>
              </div>
            </div>
          ) : (
            // Lesson viewer
            <LessonView T={T} course={course} lessonKey={activeLesson} setActiveLesson={setActiveLesson} totalLessons={totalLessons} completedLessons={completedLessons} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LESSON VIEW
══════════════════════════════════════════════════════════════ */
function LessonView({ T, course, lessonKey, setActiveLesson, totalLessons, completedLessons }) {
  const [si, mi] = lessonKey.split("-").map(Number);
  const step = course.steps[si];
  const mod = step?.modules[mi];
  const typeColor = { video:"#6366f1", quiz:"#f59e0b", lab:"#10b981", project:"#ec4899" };
  const typeLabel = { video:"Video Lesson", quiz:"Knowledge Quiz", lab:"Hands-on Lab", project:"Project" };
  const typeIcon = { video:I.video, quiz:I.quiz, lab:I.lab, project:I.project };

  // next / prev
  const allMods = course.steps.flatMap((s,si) => s.modules.map((m,mi) => ({si,mi,m})));
  const currentIdx = allMods.findIndex(x => x.si===si && x.mi===mi);
  const prev = currentIdx > 0 ? allMods[currentIdx-1] : null;
  const next = currentIdx < allMods.length-1 ? allMods[currentIdx+1] : null;

  if (!mod) return null;

  return (
    <div className="slide-left" style={{ maxWidth:860, margin:"0 auto", padding:"32px 36px 60px" }}>
      {/* Breadcrumb */}
      <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:T.textMuted, marginBottom:20 }}>
        <button onClick={() => setActiveLesson(null)} style={{ background:"transparent", color:T.accent, fontSize:12, fontWeight:500 }}>Course Overview</button>
        <span>{I.chevronRight}</span>
        <span>{step.title}</span>
        <span>{I.chevronRight}</span>
        <span style={{ color:T.text, fontWeight:600 }}>{mod.title}</span>
      </div>

      {/* Video/Lab area */}
      <div style={{ borderRadius:18, overflow:"hidden", background:T.bgCard2, border:`1px solid ${T.border}`, marginBottom:24, position:"relative" }}>
        <div style={{ aspectRatio:"16/9", background:`linear-gradient(135deg, ${course.color}08, ${T.bgCard2})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 50% 50%, ${course.color}12 0%, transparent 70%)` }} />
          {/* Fake video frame */}
          <div style={{ textAlign:"center", position:"relative" }}>
            <div style={{ width:80, height:80, borderRadius:"50%", background:course.gradient, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:`0 8px 32px ${course.color}55`, fontSize:32 }}>
              {mod.type === "video" ? "▶" : mod.type === "quiz" ? "📝" : mod.type === "lab" ? "🔬" : "🏗️"}
            </div>
            <div style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:6 }}>{mod.title}</div>
            <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"center" }}>
              <span style={{ fontSize:11, color:typeColor[mod.type], background:`${typeColor[mod.type]}18`, padding:"3px 10px", borderRadius:20, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em" }}>{typeLabel[mod.type]}</span>
              <span style={{ fontSize:11, color:T.textMuted }}>{mod.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson meta */}
      <div style={{ display:"flex", gap:14, marginBottom:24, flexWrap:"wrap" }}>
        <div style={{ flex:1, padding:"16px 20px", borderRadius:14, background:T.bgCard, border:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ display:"flex", color:typeColor[mod.type] }}>{typeIcon[mod.type]}</span>
            <div>
              <div style={{ fontSize:12, color:T.textMuted }}>Type</div>
              <div style={{ fontSize:13.5, fontWeight:600, color:T.text }}>{typeLabel[mod.type]}</div>
            </div>
          </div>
        </div>
        <div style={{ flex:1, padding:"16px 20px", borderRadius:14, background:T.bgCard, border:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ display:"flex", color:T.textMuted }}>{I.clock}</span>
            <div>
              <div style={{ fontSize:12, color:T.textMuted }}>Duration</div>
              <div style={{ fontSize:13.5, fontWeight:600, color:T.text }}>{mod.duration}</div>
            </div>
          </div>
        </div>
        <div style={{ flex:1, padding:"16px 20px", borderRadius:14, background:T.bgCard, border:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:14 }}>{step.icon}</span>
            <div>
              <div style={{ fontSize:12, color:T.textMuted }}>Section</div>
              <div style={{ fontSize:13.5, fontWeight:600, color:T.text }}>{step.title}</div>
            </div>
          </div>
        </div>
        <div style={{ flex:1, padding:"16px 20px", borderRadius:14, background: mod.done ? "#22c55e10" : T.bgCard, border:`1px solid ${mod.done?"rgba(34,197,94,0.25)":T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ display:"flex", color:mod.done?"#22c55e":T.textMuted }}>{mod.done ? I.check : I.lock}</span>
            <div>
              <div style={{ fontSize:12, color:T.textMuted }}>Status</div>
              <div style={{ fontSize:13.5, fontWeight:600, color:mod.done?"#22c55e":T.text }}>{mod.done?"Completed":"Not done"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description box */}
      <div style={{ padding:"20px 24px", borderRadius:14, background:T.bgCard, border:`1px solid ${T.border}`, marginBottom:24 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:12 }}>About this lesson</h3>
        <p style={{ fontSize:13.5, color:T.textSub, lineHeight:1.7 }}>
          This {typeLabel[mod.type].toLowerCase()} is part of <strong style={{ color:T.text }}>Step {step.step}: {step.title}</strong> in the {course.title} course.
          {mod.type === "video" && " Watch carefully and take notes on the key concepts covered."}
          {mod.type === "quiz" && " Test your understanding with multiple-choice questions. You need 80% to pass."}
          {mod.type === "lab" && " Follow the step-by-step instructions in your virtual lab environment."}
          {mod.type === "project" && " Apply everything you've learned to build a real-world project."}
        </p>
      </div>

      {/* Course progress summary */}
      <div style={{ padding:"16px 20px", borderRadius:14, background:T.accentBg, border:`1px solid ${T.accentBorder}`, marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ fontSize:12.5, fontWeight:600, color:T.text }}>Course Progress</span>
          <span style={{ fontSize:12.5, fontWeight:700, color:T.accent }}>{completedLessons}/{totalLessons}</span>
        </div>
        <div style={{ height:5, background:T.mode==="dark"?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)", borderRadius:5, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${(completedLessons/totalLessons)*100}%`, background:course.gradient, borderRadius:5 }} />
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display:"flex", justifyContent:"space-between", gap:12 }}>
        {prev ? (
          <button className="btn-hover" onClick={() => setActiveLesson(`${prev.si}-${prev.mi}`)} style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 20px", borderRadius:11, background:T.bgCard, border:`1px solid ${T.border}`, color:T.textSub, fontSize:13.5, fontWeight:600 }}>
            {I.back} {prev.m.title}
          </button>
        ) : <div />}
        {next ? (
          <button className="btn-hover" onClick={() => setActiveLesson(`${next.si}-${next.mi}`)} style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 24px", borderRadius:11, background:course.gradient, color:"#fff", fontSize:13.5, fontWeight:700, boxShadow:`0 4px 14px ${course.color}40` }}>
            Next: {next.m.title} {I.chevronRight}
          </button>
        ) : (
          <button className="btn-hover" onClick={() => setActiveLesson(null)} style={{ padding:"11px 24px", borderRadius:11, background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", fontSize:13.5, fontWeight:700, boxShadow:"0 4px 14px rgba(34,197,94,0.4)" }}>
            🎉 Back to Overview
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Helper ── */
function SectionHeader({ T, title, sub }) {
  return (
    <div style={{ marginBottom:16 }}>
      <h2 style={{ fontSize:19, fontWeight:700, color:T.text, letterSpacing:"-0.03em" }}>{title}</h2>
      <p style={{ fontSize:12.5, color:T.textMuted, marginTop:2 }}>{sub}</p>
    </div>
  );
}