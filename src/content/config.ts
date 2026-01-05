import type { CollectionConfig } from "astro/content/config";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  isDraft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  author: z
    .object({
      name: z.string(),
      bio: z.string().optional(),
      avatar: z.string().optional(),
      socials: z
        .object({
          twitter: z.string().url().optional(),
          github: z.string().url().optional(),
          website: z.string().url().optional(),
        })
        .optional(),
    })
    .optional(),
  readingTime: z.string().optional(),
});

const blogCollectionConfig: CollectionConfig<typeof blogSchema> = {
  type: "content",
  schema: blogSchema,
};

const blogCollection = defineCollection(blogCollectionConfig);

export const collections = { blog: blogCollection };
