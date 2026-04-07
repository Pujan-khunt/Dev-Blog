import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection('blog');

  const publishedBlogs = blog.filter((post) => !post.data.isDraft);

  return rss({
    title: "Pujan's Developer Blog",
    description: "Sharing my personal learnings and documenting my journey.",
    site: context.site,
    items: publishedBlogs.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blogs/${post.data.slug || post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  })
}
