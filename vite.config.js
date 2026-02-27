import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms-of-service.html'),
        'besplatna-verzija': resolve(__dirname, 'besplatna-verzija.html'),
        'usluge-web-stranice': resolve(__dirname, 'usluge/web-stranice.html'),
        'usluge-webshop': resolve(__dirname, 'usluge/webshop.html'),
        'usluge-booking': resolve(__dirname, 'usluge/booking.html'),
        'usluge-aplikacije': resolve(__dirname, 'usluge/aplikacije.html'),
        'blog-index': resolve(__dirname, 'blog/index.html'),
        'blog-cijene': resolve(__dirname, 'blog/koliko-kosta-izrada-web-stranice.html'),
        'blog-wordpress': resolve(__dirname, 'blog/wordpress-vs-custom-web-stranica.html'),
        'blog-booking': resolve(__dirname, 'blog/booking-sustav-za-salon.html'),
        'blog-agencija': resolve(__dirname, 'blog/kako-odabrati-web-agenciju.html'),
        'city-zagreb': resolve(__dirname, 'izrada-web-stranica-zagreb.html'),
        'city-split': resolve(__dirname, 'izrada-web-stranica-split.html'),
        'city-rijeka': resolve(__dirname, 'izrada-web-stranica-rijeka.html'),
        'city-osijek': resolve(__dirname, 'izrada-web-stranica-osijek.html'),

        // English versions
        'en-main': resolve(__dirname, 'en/index.html'),
        'en-privacy': resolve(__dirname, 'en/privacy-policy.html'),
        'en-terms': resolve(__dirname, 'en/terms-of-service.html'),
        'en-besplatna-verzija': resolve(__dirname, 'en/besplatna-verzija.html'),
        'en-usluge-web-stranice': resolve(__dirname, 'en/usluge/web-stranice.html'),
        'en-usluge-webshop': resolve(__dirname, 'en/usluge/webshop.html'),
        'en-usluge-booking': resolve(__dirname, 'en/usluge/booking.html'),
        'en-usluge-aplikacije': resolve(__dirname, 'en/usluge/aplikacije.html'),
        'en-blog-index': resolve(__dirname, 'en/blog/index.html'),
        'en-blog-cijene': resolve(__dirname, 'en/blog/web-design-pricing.html'),
        'en-blog-wordpress': resolve(__dirname, 'en/blog/wordpress-vs-custom-website.html'),
        'en-blog-booking': resolve(__dirname, 'en/blog/booking-system-for-salon.html'),
        'en-blog-agencija': resolve(__dirname, 'en/blog/how-to-choose-web-agency.html'),
        'en-city-zagreb': resolve(__dirname, 'en/web-design-zagreb.html'),
        'en-city-split': resolve(__dirname, 'en/web-design-split.html'),
        'en-city-rijeka': resolve(__dirname, 'en/web-design-rijeka.html'),
        'en-city-osijek': resolve(__dirname, 'en/web-design-osijek.html'),
      },
    },
  },
});

