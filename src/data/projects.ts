import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Redis Lite",
    summary:
      "Custom Implementation of Redis in Go. Performance: p50 => ~0.13ms",
    type: "golang",
    href: "https://github.com/Pujan-khunt/redis-lite",
  },
  {
    title: "Clipboard Synchronizer",
    summary:
      "Cross Platform, P2P and Encrypted Clipboard Synchronization Tool.",
    type: "golang",
    href: "https://github.com/Pujan-khunt/clipboard-sync",
  },
  {
    title: "Authentication System",
    summary:
      "User Authentication System With Registration, Login and Security Management.",
    type: "javascript",
    href: "https://github.com/Pujan-khunt/Authentication-System",
  },
  {
    title: "Personal Website (current)",
    summary: "Know more about me here. I write blogs and share my learnings.",
    type: "astro",
    href: "https://github.com/Pujan-khunt/Dev-Blog",
  },
];
