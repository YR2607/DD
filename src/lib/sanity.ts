import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'nw2y6nmp',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    stega: {
        enabled: true,
        studioUrl: '/admin',
    },
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

export async function getContactPage() {
    return await client.fetch(`*[_type == "pageContact"][0]`)
}

export async function getWorksPage() {
    return await client.fetch(`*[_type == "pageWorks"][0]`)
}
