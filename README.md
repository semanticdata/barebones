# [MiguelPimentel.do](https://miguelpimentel.do/) - My Current Blog

This project contains my blog.

## Useful Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `npm install`         | Installs dependencies                            |
| `npm start`           | Starts local dev server at `localhost:4321`      |
| `npm run build`       | Build your production site to `./dist/`          |
| `npm run preview`     | Preview your build locally, before deploying     |
| `npx astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npx astro -- --help` | Get help using the Astro CLI                     |

## Changes from Upstream

- [Table of Contents](./src/components/TableOfContents.astro)
- [Links/Buttons](./src/components/Link.astro)
- [Footer](./src/components/Footer.astro)
- [Theme Toggle](./src/components/ThemeToggle.astro)
- [Back to Top](./src/components/BackToTop.astro)
- CSS Animations (`.animate`)
- Code Copy button (`.copy-code`)
- Full-bleed effect for codeblocks on small screens
- [404 Page](./src/pages/404.astro)
- [Previous/Next Blog post navigation](./src/components/PostNavigation.astro)

The code in this repository is available under the [MIT License](LICENSE).
