import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blogSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  slug: z.string(),
  heroImage: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  isDraft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  readingTime: z.string(),
});


const blogCollection = defineCollection({
  schema: blogSchema,
  // glob() loader generates an `id` field for each file based on the filename (in an URL friendly format)
  // This `id` field can be overriden by adding a `slug` field in the frontmatter.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" })
});

export const collections = { blog: blogCollection };
