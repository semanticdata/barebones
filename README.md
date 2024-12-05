# Barebones - Blog

This project is based on Barebones (Astro) and currently holds a copy of my blog.

[View demo](https://barebones-phi.vercel.app/)

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Further reading

Read the [documentation for Barebones](https://docs.superwebthemes.com), join their [Discord server](https://discord.gg/V5MCBCsAjJ).

## Changes from Upstream

- [Back to Top button](./src/components/BackToTop.astro)
- [Animate (sections)](https://github.com/semanticdata/barebones/blob/9909528645b8d53df36e62be1ff38ff53ba8fed7/src/components/BaseHead.astro#L44C1-L52C6)
- [Style Blockquotes](https://github.com/semanticdata/barebones/blob/9909528645b8d53df36e62be1ff38ff53ba8fed7/src/styles/global.css#L40C1-L44C4)
- [Style Tables](https://github.com/semanticdata/barebones/blob/9909528645b8d53df36e62be1ff38ff53ba8fed7/src/styles/global.css#L22C1-L38C4)
- [Style Tables (test link)](./src/styles/global.css#L22C1-L38C4)
- [404 Page](./src/pages/404.astro)
- [Link/Button component](./src/components/Link.astro)
- [Table of Contents component](./src/components/TableOfContents.astro)
