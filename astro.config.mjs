import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // Since we are migrating a multi-page site, we keep it simple
    outDir: './dist',
    publicDir: './public',
});
