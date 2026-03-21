import { getCollection } from "astro:content";
import type { BlogEntry } from "@/types";

const posts = await getCollection("blog");

export const recentBlogs: BlogEntry[] = posts
  .filter((post) => !post.data.isDraft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 4);

const allBlogs: BlogEntry[] = posts
  .filter((post) => !post.data.isDraft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

type BlogsByYear = Record<string, BlogEntry[]>

export const blogsByYear: BlogsByYear = allBlogs.reduce(
  (acc: BlogsByYear, blog: BlogEntry) => {
    const year: string = blog.data.date.getFullYear().toString()
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(blog);
    return acc;
  },
  {} as BlogsByYear
)

export const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));


