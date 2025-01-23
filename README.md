# [MiguelPimentel.do](https://miguelpimentel.do/)

My personal website and blog built with [Astro](https://astro.build/). Features a minimalist design, dark mode support, and excellent performance metrics.

## Features

- ⚡️ **Fast & Lightweight** - Built with Astro for optimal performance
- 🌙 **Dark Mode** - Automatic theme detection with manual toggle
- 📱 **Responsive Design** - Mobile-first approach
- 📝 **Blog Support** - Write in Markdown/MDX
- 🔍 **SEO Optimized** - Meta tags and structured data
- 📰 **RSS Feed** - Automatic RSS generation
- 🗺️ **Sitemap** - Automatic sitemap generation
- 📊 **Analytics Ready** - Privacy-focused analytics setup
- 🎨 **Tailwind CSS** - For styling and rapid development

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/miguelpimentel-do.git
```

2. Install dependencies:

```bash
npm install
```

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
