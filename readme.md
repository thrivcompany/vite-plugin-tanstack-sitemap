<div align="center">

# 📡 vite-plugin-tanstack-sitemap

**Vite plugin to generate a `sitemap.xml` from your [TanStack Start](https://tanstack.com/start) route manifest**
  
Automatically create a SEO-friendly sitemap from your route definition during build time.

<div>

[![license](https://img.shields.io/github/license/thrivcompany/vite-plugin-tanstack-sitemap.svg?style=flat-square)](LICENSE) [![Pull Request](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/thrivcompany/vite-plugin-tanstack-sitemap/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) [![code with love by thrivcompany](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-thrivcompany-ff1414.svg?style=flat-square)](https://github.com/thrivcompany)

</div>

</div>

<details open="open">
  <summary>Table of Content</summary>

- [Getting Started](#getting-started)
- [Use](#use)
- [Options](#options)
  - [Per-Route Configuration](#per-route-configuration)
- [How It Works](#how-it-works)
- [Example Output](#example-output)
- [Gotcha](#gotcha)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
</details>

### 💥 Features
* 📁 Extracts routes from `routeTree.gen.ts`
* 🔧 Supports route-level configuration: `priority`, `changefreq`, `exclude`
* 🗂 Outputs a fully-formed `sitemap.xml` to `public/`

---

### 🚀 Getting Started
```shell
pnpm install vite-plugin-tanstack-sitemap --save-dev
```

### 🧑‍💻 Use
Add the plugin to your `app.config.ts` file:

```ts
import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

import { sitemap } from 'vite-plugin-tanstack-sitemap'

export default defineConfig({
  server: {
    preset: 'vercel',
  },
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      sitemap({
        hostname: 'https://www.example.com'
      })
    ],
  },
})
```

### 🛠️ Options
| Option          | Type                    | Default                  | Description                       |
| --------------- | ----------------------- | ------------------------ | --------------------------------- |
| `hostname`      | `string`                | **(required)**           | The full base URL of your site    |
| `filename`      | `string`                | `'sitemap.xml'`          | Output filename                   |
| `routeTreePath` | `string`                | `'src/routeTree.gen.ts'` | Path to your route manifest       |
| `priority`      | `number`                | `0.7`                    | Default route priority            |
| `frequency`     | `string`                | `'daily'`                | Default change frequency          |
| `route`         | `Record<string, Route>` | `{}`                     | Optional per-route overrides      |

##### Per-Route Configuration
You can configure specific routes using the `route` option:

```ts
route: {
  '/about': {
    priority: 0.5,
    frequency: 'monthly',
  },
  '/post': {
    priority: 0.9,
    frequency: 'hourly',
  },
  '/private': {
    exclude: true,
  },
}
```

### 🧠 How It Works
1. Reads the generated `routeTree.gen.ts`
2. Parses routes inside `ROUTE_MANIFEST_START...ROUTE_MANIFEST_END` block
3. Generates a `sitemap.xml` into your `public/` directory at build time

### 📰 Example Output
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2025-05-13</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.example.com/about</loc>
    <lastmod>2025-05-13</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.example.com/post</loc>
    <lastmod>2025-05-13</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 🐛 Gotcha
* Make sure `routeTree.gen.ts` is generated before the `build` phase
* Ensure your `public/` directory exists or is created by Vite

### 🚧 Roadmap
* [ ] Add testing
* [ ] Auto-detect base URL
* [ ] Auto-exclude dynamic routes, route groups and pathless routes

### 🫰 Contributing
Pull requests, issues, and suggestions are welcome!

### License
This project is licensed under the **MIT license**.
See [LICENSE](license) for more information.
