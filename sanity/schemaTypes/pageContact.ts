import { defineType, defineField } from 'sanity'

export const pageContactType = defineType({
    name: 'pageContact',
    title: 'Contact Page',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero', default: true },
        { name: 'content', title: 'Content' },
    ],
    fields: [
        // --- SEO ---
        defineField({
            name: 'metaTitle',
            title: 'Meta Title (SEO)',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description (SEO)',
            type: 'text',
            group: 'seo',
        }),

        // --- HERO ---
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'title', type: 'string', title: 'Заголовок страницы', initialValue: 'Contact' },
                { name: 'subtitle', type: 'string', title: 'Логотип / подпись', initialValue: 'ASPECTMOBILI' },
                { name: 'description', type: 'blockContent', title: 'Описание (Portable Text)' },
            ],
        }),

        // --- CONTENT ---
        defineField({
            name: 'formTitle',
            title: 'Заголовок формы',
            description: 'Например: Send us a message',
            type: 'string',
            group: 'content',
            initialValue: 'Send us a message',
        }),
        defineField({
            name: 'infoTitle',
            title: 'Заголовок блока контактов',
            description: 'Например: Get in touch',
            type: 'string',
            group: 'content',
            initialValue: 'Get in touch',
        }),
        defineField({
            name: 'officeLabel',
            title: 'Подпись к адресу',
            type: 'string',
            group: 'content',
            initialValue: 'Office',
        }),
        defineField({
            name: 'mapTitle',
            title: 'Заголовок секции карты',
            type: 'string',
            group: 'content',
            initialValue: 'Find us',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Contact Page' }
        },
    },
})
