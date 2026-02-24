import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.SANITY_PROJECT_ID || 'your-project-id',
    dataset: import.meta.env.SANITY_DATASET || 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

export async function getProjects() {
    return await client.fetch(`*[_type == "project"] | order(publishedAt desc) {
        ...,
        "id": _id
    }`)
}

export async function getProject(slug: string) {
    return await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
}

export async function getSiteSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getHomePage() {
    return await client.fetch(`*[_type == "pageHome"][0]`)
}

export async function getAboutPage() {
    return await client.fetch(`*[_type == "pageAbout"][0]`)
}

export async function getCompanyPage() {
    return await client.fetch(`*[_type == "pageCompany"][0]`)
}
