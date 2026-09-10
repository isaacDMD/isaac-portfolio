export type ProjectCategory =
  | "web-applications"
  | "interactive-experiences"
  | "backend-systems"
  | "experimental-interfaces";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  input?: string;
  processing?: string;
  output?: string;
  stack: string[];
  github?: string;
  demo?: string;
}

export interface Capability {
  id: ProjectCategory;
  label: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  type: "education" | "experience" | "certification";
}

export const projects: Project[] = [
  {
    id: "mouse-controller",
    title: "Mouse Controller",
    tagline: "Control your cursor with hand gestures",
    description:
      "Computer vision system that tracks hand landmarks and translates finger movements into cursor control — built with Python, OpenCV and Google MediaPipe HandLandmarker.",
    category: "interactive-experiences",
    featured: true,
    input: "Hand movement",
    processing: "OpenCV + MediaPipe HandLandmarker",
    output: "System cursor control",
    stack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/isaacDMD/hand-gesture-mouse-controller",
  },
  {
    id: "gesture-synth",
    title: "Gesture Synth",
    tagline: "Play music with your fingers",
    description:
      "Synthesizer that maps raised fingers to musical notes using hand landmark detection. Each finger triggers a different note in real time.",
    category: "interactive-experiences",
    featured: true,
    input: "Finger gesture",
    processing: "Hand landmark detection",
    output: "Real-time audio note",
    stack: ["Python", "MediaPipe"],
    github: "https://github.com/isaacDMD/gesture-synth",
  },
  {
    id: "emberc",
    title: "EMBERC",
    tagline: "Community management platform for a church",
    description:
      "Community management platform for a church, built with FastAPI and Vue.js.",
    category: "web-applications",
    featured: false,
    stack: ["FastAPI", "Vue.js", "Python"],
    github: "https://github.com/isaacDMD/EMBERC-COPIE",
  },
  {
    id: "pressing-pro",
    title: "Pressing Pro",
    tagline: "Laundry management application",
    description:
      "Laundry management application built with TypeScript and React.",
    category: "web-applications",
    featured: false,
    stack: ["TypeScript", "React"],
    github: "https://github.com/isaacDMD/pressing-pro",
  },
  {
    id: "mini-panneau-hub",
    title: "Mini Panneau Hub",
    tagline: "Web hub for panel management",
    description: "Web hub for panel management, built with PHP and Laravel.",
    category: "web-applications",
    featured: false,
    stack: ["PHP", "Laravel"],
    github: "https://github.com/isaacDMD/Mini-Pannau-Hub",
  },
  {
    id: "batch-background-remover",
    title: "Batch Background Remover",
    tagline: "Remove backgrounds from hundreds of images without quality loss",
    description:
      "Desktop application for batch background removal with progress tracking, pause/cancel, and processing history.",
    category: "experimental-interfaces",
    featured: false,
    stack: ["Python"],
    github: "https://github.com/isaacDMD/BATCH-BACKGROUND-REMOVER",
  },
  {
    id: "video-downloader",
    title: "Video Downloader",
    tagline: "Download videos from major platforms",
    description:
      "Desktop application to download videos from a URL, with quality selection, progress tracking, and local history.",
    category: "experimental-interfaces",
    featured: false,
    stack: ["Python"],
    github: "https://github.com/isaacDMD/VIDEO-DOWNLOADER",
  },
  {
    id: "restaurant-desktop",
    title: "Restaurant Manager",
    tagline: "Desktop application for restaurant management",
    description:
      "Desktop restaurant management application covering products, stock, orders, and statistics, built with Java and Swing.",
    category: "backend-systems",
    featured: false,
    stack: ["Java", "Java Swing"],
    github: "https://github.com/isaacDMD/Restaurant-management-system",
  },
  {
    id: "quiz-app",
    title: "Quiz App",
    tagline: "Interactive quiz application",
    description: "Interactive quiz application built with Vue.js.",
    category: "web-applications",
    featured: false,
    stack: ["Vue.js"],
    github: "https://github.com/isaacDMD/vue_quiz",
  },
];

export const capabilities: Capability[] = [
  {
    id: "web-applications",
    label: "Web Applications",
    description: "Full-stack web apps, from REST APIs to reactive frontends.",
  },
  {
    id: "interactive-experiences",
    label: "Interactive Experiences",
    description:
      "Physical interfaces, gesture control, real-time interaction.",
  },
  {
    id: "backend-systems",
    label: "Backend Systems",
    description: "APIs, business logic, data management.",
  },
  {
    id: "experimental-interfaces",
    label: "Experimental Interfaces",
    description:
      "Human-computer interaction, computer vision, automation.",
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "BAC D",
    organization: "Notre Dame de l'Église",
    type: "education",
  },
  {
    year: "2024–2027",
    title: "Diplôme d'Ingénieur des Travaux Informatiques",
    organization: "IAI",
    type: "education",
  },
  {
    year: "2026",
    title: "Development Internship",
    organization: "Kidolé",
    type: "experience",
  },
  {
    year: "cert",
    title: "CCNA 1",
    organization: "Cisco",
    type: "certification",
  },
  {
    year: "cert",
    title: "CCNA 2",
    organization: "Cisco",
    type: "certification",
  },
  {
    year: "cert",
    title: "Python Essentials 1 & 2",
    organization: "Cisco",
    type: "certification",
  },
];
