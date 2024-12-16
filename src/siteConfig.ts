import type {
  SiteConfiguration,
  NavigationLinks,
  SocialLinks,
} from "@/types.ts";

export const SITE: SiteConfiguration = {
  title: "MiguelPimentel.do",
  description:
    "Personal website and blog. Contains a short list of my projects, and blog posts.",
  url: "https://barebones-phi.vercel.app/",
  author: "Miguel Pimentel",
  locale: "en-US",
};

export const NAV_LINKS: NavigationLinks = {
  about: {
    path: "/about",
    label: "About",
  },
  blog: {
    path: "/blog",
    label: "Blog",
  },
  projects: {
    path: "/projects",
    label: "Projects",
  },
  contact: {
    path: "/contact",
    label: "Contact",
  },
  rss: {
    path: "/rss.xml",
    label: "RSS",
  },
};

export const SOCIAL_LINKS: SocialLinks = {
  email: {
    label: "Email",
    url: "mailto:contact@miguelpimentel.do",
  },
  github: {
    label: "GitHub",
    url: "https://github.com/semanticdata",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/miguelpimentel29/",
  },
  mastodon: {
    label: "Mastodon",
    url: "https://mastodon.social/@semanticdata",
  },
};
