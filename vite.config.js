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
      },
    },
  },
});

