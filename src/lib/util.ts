import type { MarkdownHeading } from "astro";
import { SITE } from "@/siteConfig";

export type HeadingWithSubheadings = MarkdownHeading & {
  subheadings: MarkdownHeading[];
};

export function groupHeadings(
  headings: MarkdownHeading[],
): HeadingWithSubheadings[] {
  return headings.reduce((array, heading) => {
    if (heading.depth === 2) {
      array.push({ ...heading, subheadings: [] });
    } else if (heading.depth === 3) {
      array.at(-1)?.subheadings.push(heading);
    }
    return array;
  }, [] as HeadingWithSubheadings[]);
}

export function formatDate(
  date: Date,
  options: {
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day?: "numeric" | "2-digit";
  } = {},
  locale: string = SITE.locale,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formatOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}
