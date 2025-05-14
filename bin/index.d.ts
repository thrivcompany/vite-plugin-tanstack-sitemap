import type { Plugin } from 'vite';
export interface Route {
    priority?: number;
    frequency?: string;
    exclude?: boolean;
}
export interface SitemapOption {
    hostname: string;
    filename?: string;
    routeTreePath?: string;
    priority?: number;
    frequency?: string;
    route?: Record<string, Route>;
}
export declare const sitemap: ({ hostname, filename, routeTreePath, priority, frequency, route, }: SitemapOption) => Plugin;
