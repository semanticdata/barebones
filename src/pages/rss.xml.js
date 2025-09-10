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
    items: blog.map((post) => {
      // Generate image HTML if image exists
      const imageHtml = post.data.image
        ? `<img src="${context.site}${post.data.image.src}" alt="${post.data.imageAlt}" />`
        : "";

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}`,
        content: sanitizeHtml(
          imageHtml + parser.render(post.body), // prepend image to content
          {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          },
        )
          // Replace href="/..." and src="/..." with absolute URLs
          .replace(/href="\/([^"]*)/g, `href="${context.site}$1`)
          .replace(/src="\/([^"]*)/g, `src="${context.site}$1`)
          // Replace src="relative-path.webp" with absolute URLs (for images in markdown)
          .replace(/src="([^"]+\.(?:webp|jpg|jpeg|png|gif))"/g, (match, p1) => {
            // If already absolute, leave as is
            if (/^https?:\/\//.test(p1)) return match;
            // If already starts with context.site, leave as is
            if (p1.startsWith(context.site)) return match;
            // Otherwise, prepend site and blog slug
            return `src="${context.site}/blog/${post.slug}/${p1}"`;
          }),
        ...(post.data.image && {
          enclosure: {
            url: `${context.site}${post.data.image.src}`,
            type: "image/webp",
            length: 0,
          },
        }),
      };
    }),
  });
}
