import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@siteConfig";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publicationDate,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      })
        .replace(/href="\/([^"]*)/g, `href="${context.site}$1`)
        .replace(/src="\/([^"]*)/g, `src="${context.site}$1`),
      ...(post.data.image && {
        enclosure: {
          url: `${context.site}${post.data.image.src}`,
          type: "image/webp",
          length: 0,
        },
      }),
    })),
  });
}
