/**
 * Migration script: converts existing String fields to Portable Text (Array of blocks).
 * Run: node sanity/migrate-to-portable-text.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'nw2y6nmp',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_TOKEN,
})

// Convert a plain string to Portable Text block array
function stringToPortableText(text) {
    if (!text || typeof text !== 'string') return undefined

    // Split by newlines to create separate blocks
    const paragraphs = text.split('\n').filter(p => p.trim())

    return paragraphs.map((paragraph, i) => ({
        _type: 'block',
        _key: `block_${Date.now()}_${i}`,
        style: 'normal',
        markDefs: [],
        children: [{
            _type: 'span',
            _key: `span_${Date.now()}_${i}`,
            text: paragraph.trim(),
            marks: [],
        }],
    }))
}

async function migrate() {
    console.log('Starting migration: String -> Portable Text...\n')

    // 1. Migrate pageHome aboutSections
    const homeDoc = await client.fetch(`*[_type == "pageHome"][0]`)
    if (homeDoc?.aboutSections?.length) {
        let changed = false
        const sections = homeDoc.aboutSections.map(section => {
            const updated = { ...section }
            if (typeof section.leadText === 'string') {
                updated.leadText = stringToPortableText(section.leadText)
                changed = true
            }
            if (typeof section.bodyText === 'string') {
                updated.bodyText = stringToPortableText(section.bodyText)
                changed = true
            }
            return updated
        })
        if (changed) {
            await client.patch(homeDoc._id).set({ aboutSections: sections }).commit()
            console.log('[OK] pageHome.aboutSections migrated')
        } else {
            console.log('[SKIP] pageHome.aboutSections already migrated')
        }
    }

    // 2. Migrate pageAbout hero.description + sections
    const aboutDoc = await client.fetch(`*[_type == "pageAbout"][0]`)
    if (aboutDoc) {
        const patches = {}
        if (typeof aboutDoc.hero?.description === 'string') {
            patches['hero.description'] = stringToPortableText(aboutDoc.hero.description)
        }
        if (aboutDoc.sections?.length) {
            let changed = false
            const sections = aboutDoc.sections.map(section => {
                const updated = { ...section }
                if (typeof section.leadText === 'string') {
                    updated.leadText = stringToPortableText(section.leadText)
                    changed = true
                }
                if (typeof section.bodyText === 'string') {
                    updated.bodyText = stringToPortableText(section.bodyText)
                    changed = true
                }
                return updated
            })
            if (changed) patches.sections = sections
        }
        if (Object.keys(patches).length) {
            await client.patch(aboutDoc._id).set(patches).commit()
            console.log('[OK] pageAbout migrated')
        } else {
            console.log('[SKIP] pageAbout already migrated')
        }
    }

    // 3. Migrate pageCompany (statement.text, manifesto columns, history)
    const companyDoc = await client.fetch(`*[_type == "pageCompany"][0]`)
    if (companyDoc) {
        const patches = {}
        if (typeof companyDoc.statement?.text === 'string') {
            patches['statement.text'] = stringToPortableText(companyDoc.statement.text)
        }
        if (companyDoc.manifesto?.columns?.length) {
            let changed = false
            const cols = companyDoc.manifesto.columns.map(col => {
                const updated = { ...col }
                if (typeof col.text === 'string') {
                    updated.text = stringToPortableText(col.text)
                    changed = true
                }
                return updated
            })
            if (changed) patches['manifesto.columns'] = cols
        }
        if (companyDoc.history?.length) {
            let changed = false
            const entries = companyDoc.history.map(entry => {
                const updated = { ...entry }
                if (typeof entry.text === 'string') {
                    updated.text = stringToPortableText(entry.text)
                    changed = true
                }
                return updated
            })
            if (changed) patches.history = entries
        }
        if (Object.keys(patches).length) {
            await client.patch(companyDoc._id).set(patches).commit()
            console.log('[OK] pageCompany migrated')
        } else {
            console.log('[SKIP] pageCompany already migrated')
        }
    }

    // 4. Migrate projects (description)
    const projects = await client.fetch(`*[_type == "project"]`)
    for (const project of projects) {
        if (typeof project.description === 'string') {
            await client.patch(project._id).set({
                description: stringToPortableText(project.description)
            }).commit()
            console.log(`[OK] project "${project.title}" migrated`)
        } else {
            console.log(`[SKIP] project "${project.title}" already migrated`)
        }
    }

    console.log('\nMigration complete!')
}

migrate().catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
})
