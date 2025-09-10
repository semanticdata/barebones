import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@siteConfig";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

function markdownTableToText(md) {
  // More robust regex to match tables with attributes/whitespace
  return md.replace(/<table[^>]*>[\s\S]*?<\/table>/gi, (match) => {
    // Remove thead/tbody tags
    let tableContent = match.replace(/<\/?(table|thead|tbody)[^>]*>/gi, "");
    // Extract rows
    const rows = [...tableContent.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    return rows
      .map(([, row]) => {
        // Extract cells
        const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)];
        return cells.map(([, cell]) => cell.trim()).join(" | ");
      })
      .join("\n");
  });
}

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

      let content = imageHtml + markdownTableToText(parser.render(post.body));
      content = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      })
        // Replace href="/..." and src="/..." with absolute URLs
        .replace(/href="\/([^"]*)/g, `href="${context.site}$1`)
        .replace(/src="\/([^"]*)/g, `src="${context.site}$1`)
        // Replace all relative image references with absolute URLs
        .replace(/src=(\["']?)([^"'\s>]+\.(?:webp|jpg|jpeg|png|gif|svg))\1/gi, (match, quote, imagePath) => {
          // If already absolute, leave as is
          if (/^https?:\/+/.test(imagePath)) return match;
          if (imagePath.startsWith(context.site)) return match;
          if (imagePath.startsWith('/')) return `src=${quote}${context.site}${imagePath}${quote}`;
          return `src=${quote}${context.site}/blog/${post.slug}/${imagePath}${quote}`;
        });
      // Post-process: replace any escaped tables with plaintext
      content = content.replace(/&lt;table[^&]*&gt;[\s\S]*?&lt;\/table&gt;/gi, (match) => {
        // Unescape HTML entities for tags
        const htmlTable = match.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        return markdownTableToText(htmlTable);
      });
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}`,
        content,
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
