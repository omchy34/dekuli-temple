import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Current directory fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Apna domain
const hostname = 'https://www.dekulimandir.com';

// Tumhare React app ke routes
const routes = ['/', '/about', '/darshan', '/events', '/contact'];

// Sitemap generate
async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({ hostname });

    const writeStream = createWriteStream(__dirname + '/public/sitemap.xml');
    sitemap.pipe(writeStream);

    routes.forEach(route => {
      sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
    });

    sitemap.end();

    // Wait for stream to finish
    await streamToPromise(sitemap);

    console.log('Sitemap generated successfully!');
  } catch (err) {
    console.error(err);
  }
}

generateSitemap();
