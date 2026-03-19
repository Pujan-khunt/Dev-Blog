import type { CollectionConfig } from "astro/content/config";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  heroImage: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  isDraft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  readingTime: z.string()
});

const blogCollectionConfig: CollectionConfig<typeof blogSchema> = {
  type: "content",
  schema: blogSchema,
};

const blogCollection = defineCollection(blogCollectionConfig);

export const collections = { blog: blogCollection };
