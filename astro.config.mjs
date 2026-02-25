import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
    outDir: './dist',
    publicDir: './public',
    output: 'static',

    integrations: [
        sanity({
            projectId: 'nw2y6nmp',
            dataset: 'production',
            useCdn: true,
            apiVersion: '2023-05-03',
            studioBasePath: '/admin',
            stega: {
                studioUrl: '/admin',
            },
        }),
        react(),
    ],

    adapter: vercel(),
});
