import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Настройка кастомного бокового меню (Desk Structure)
const deskStructure = (S: any) =>
    S.list()
        .title('Меню сайта')
        .items([
            // 1. Home
            S.listItem()
                .title('Home')
                .child(
                    S.document()
                        .schemaType('pageHome')
                        .documentId('pageHome')
                ),

            // 2. Works (Проекты)
            S.listItem()
                .title('Works')
                .schemaType('project')
                .child(S.documentTypeList('project').title('Works (Проекты)')),

            // 3. About
            S.listItem()
                .title('About')
                .child(
                    S.document()
                        .schemaType('pageAbout')
                        .documentId('pageAbout')
                ),

            // 4. Company
            S.listItem()
                .title('Company')
                .child(
                    S.document()
                        .schemaType('pageCompany')
                        .documentId('pageCompany')
                ),

            // 5. Contact & Settings (Глобальные настройки)
            S.listItem()
                .title('Contact & Settings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),
        ])

export default defineConfig({
    name: 'default',
    title: 'aspectmobili',

    projectId: 'nw2y6nmp', // My Sanity Project ID
    dataset: 'production',

    plugins: [
        deskTool({
            structure: deskStructure,
        }),
        visionTool()
    ],

    schema: {
        types: schemaTypes,
    },
})
