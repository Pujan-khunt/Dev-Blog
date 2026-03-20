import { getCollection } from "astro:content";
import type { Blog } from "@/types.ts";

const posts = await getCollection("blog");

export const blogs: Blog[] = posts
  .filter((post) => !post.data.isDraft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 4);
