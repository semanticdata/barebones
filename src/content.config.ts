import { defineCollection, z } from "astro:content";
// import { rssSchema } from '@astrojs/rss';

const blog = defineCollection({
  type: "content",
  // schema: rssSchema,
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      url: z.string(),
      category: z.string(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, projects };
