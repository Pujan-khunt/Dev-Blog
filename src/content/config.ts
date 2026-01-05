import type { CollectionConfig } from "astro/content/config";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  // Removed so Astro uses slug from frontmatter to populate CollectionEntry<"blog">
  // slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  heroImage: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  isDraft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

const blogCollectionConfig: CollectionConfig<typeof blogSchema> = {
  type: "content",
  schema: blogSchema,
};

const blogCollection = defineCollection(blogCollectionConfig);

export const collections = { blog: blogCollection };
