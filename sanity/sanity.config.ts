import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { presentationTool } from '@sanity/presentation'
import { schemaTypes } from './schemaTypes'

const deskStructure = (S: any) =>
    S.list()
        .title('Menu')
        .items([
            S.listItem()
                .title('Home')
                .child(
                    S.document()
                        .schemaType('pageHome')
                        .documentId('pageHome')
                ),

            S.listItem()
                .title('Works')
                .child(
                    S.list()
                        .title('Works')
                        .items([
                            S.listItem()
                                .title('Works Page Settings')
                                .child(
                                    S.document()
                                        .schemaType('pageWorks')
                                        .documentId('pageWorks')
                                ),
                            S.listItem()
                                .title('All Projects')
                                .schemaType('project')
                                .child(S.documentTypeList('project').title('All Projects')),
                        ])
                ),

            S.listItem()
                .title('About')
                .child(
                    S.document()
                        .schemaType('pageAbout')
                        .documentId('pageAbout')
                ),

            S.listItem()
                .title('Company')
                .child(
                    S.document()
                        .schemaType('pageCompany')
                        .documentId('pageCompany')
                ),

            S.listItem()
                .title('Site Settings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),
        ])

export default defineConfig({
    name: 'default',
    title: 'aspectmobili',

    projectId: 'nw2y6nmp',
    dataset: 'production',

    plugins: [
        deskTool({
            structure: deskStructure,
        }),
        presentationTool({
            previewUrl: {
                draftMode: {
                    enable: '/api/draft-mode/enable',
                },
            },
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})
