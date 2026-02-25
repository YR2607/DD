import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2023-05-03","projectId":"nw2y6nmp","dataset":"production","useCdn":true,"stega":{"studioUrl":"\u002Fadmin"}}
          );

globalThis.sanityClient = sanityClient;
