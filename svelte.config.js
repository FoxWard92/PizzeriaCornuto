import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      // Sostituisci con il nome esatto della tua repo
      base: process.env.NODE_ENV === 'production' ? '/Pizzeria_Cornuto' : '',
    },
    prerender: {
      // QUESTA È LA PARTE NUOVA:
      handleHttpError: ({ path, referrer, message }) => {
        // Se l'errore è causato dal link alla radice "/", ignoralo e vai avanti
        if (path === '/') {
          return;
        }
        // Per tutti gli altri errori, fammi sapere
        throw new Error(message);
      }
    }
  }
};

export default config;