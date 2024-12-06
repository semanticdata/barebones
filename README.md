# No Longer Barebones - Blog

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
- [Link/Button component](./src/components/Link.astro)
- [Table of Contents](./src/components/TableOfContents.astro)
- [404 Page](./src/pages/404.astro)
- [Theme Toggle](./src/components/ThemeToggle.astro)
- New CSS Animations (`.animate`)
- Code Copy button (`.copy-code`)
