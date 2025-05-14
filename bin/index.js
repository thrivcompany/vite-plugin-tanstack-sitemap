import * as fsPromise from 'node:fs/promises';
import * as path from 'node:path';
const listFromManifest = (content) => {
    const manifestMatch = content.match(/ROUTE_MANIFEST_START([\s\S]*?)ROUTE_MANIFEST_END/);
    if (!manifestMatch)
        return [];
    try {
        const manifest = JSON.parse(manifestMatch[1]);
        return Object.keys(manifest.routes)
            .filter((route) => route !== '__root__')
            .map((route) => (route === '/' ? route : route.replace(/\/$/, '')));
    }
    catch (err) {
        console.log(`something went wrong :/ `, err);
        return [];
    }
};
export const sitemap = ({ hostname, filename = 'sitemap.xml', routeTreePath = 'src/routeTree.gen.ts', priority = 0.7, frequency = 'daily', route = {}, }) => {
    return {
        name: 'vite-plugin-tanstack-sitemap',
        apply: 'build',
        closeBundle: async () => {
            try {
                console.log(`generate sitemap...`);
                let routeTreeContent;
                try {
                    routeTreeContent = await fsPromise.readFile(routeTreePath, 'utf-8');
                    if (!routeTreeContent) {
                        throw new Error(`routeTree.gen.ts file empty`);
                    }
                }
                catch (_err) {
                    throw new Error(`could not locate routeTree.gen.ts file.\nplease provide routeTreePath as an option.`);
                }
                let routeList = listFromManifest(routeTreeContent);
                routeList = routeList.filter((singleRoute) => {
                    if (route[singleRoute]?.exclude === true) {
                        return null;
                    }
                });
                const today = new Date().toISOString().split('T')[0];
                const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${routeList
                    .map((singleRoute) => {
                    const routeOption = route[singleRoute] || {};
                    return `<url>
                <loc>${hostname}${singleRoute}</loc>
                <lastmod>${today}</lastmod>
                <changefreq>${routeOption.frequency || frequency}</changefreq>
                <priority>${routeOption.priority || priority}</priority>
              </url>`;
                })
                    .join('\n')}
          </urlset>`;
                const outputDirectory = path.resolve('public');
                await fsPromise.writeFile(path.resolve(outputDirectory, 'sitemap.xml'), sitemapContent);
                console.log(`sitemap at ${path.join(outputDirectory, filename)}`);
            }
            catch (err) {
                console.log(`something went wrong :/ `, err);
            }
        },
    };
};
//# sourceMappingURL=index.js.map