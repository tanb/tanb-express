import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';

const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
  urlPrefix: 'https://tanb.express',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
  ignoredRoutes: [
    '/404',
    '/settings',
    '/dev-tools',
    '/ja/dev-tools'
  ],
  routes: {
    '/blog/:slug': {
      changeFreq: 'daily',
      priority: '0.9',
      merge: true
    },
  },
});

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "tanb-express",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};
