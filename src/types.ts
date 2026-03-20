import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

export type Project = {
  title: string;
  summary: string;
  type: "golang" | "javascript" | "astro"; // can be expanded later
  href: string;
};

export type Contact = {
  label: string;
  href: string;
};

export type Author = {
  resumeHref: string;
  profileImage: ImageMetadata;
  greeting: string;
  bio: string;
  quote: string;
};

export type Blog = CollectionEntry<"blog">;
