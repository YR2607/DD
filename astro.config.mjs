import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
    output: 'server',
    outDir: './dist',
    publicDir: './public',

    integrations: [
        sanity({
            projectId: 'nw2y6nmp',
            dataset: 'production',
            useCdn: false,
            apiVersion: '2023-05-03',
            studioBasePath: '/admin',
            stega: {
                studioUrl: '/admin',
            },
        }),
        react(),
    ],

    adapter: vercel(),

    vite: {
        server: {
            allowedHosts: ['3794-89-28-107-89.ngrok-free.app'],
        },
    },
});
