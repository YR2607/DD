import { defineField, defineType } from 'sanity'

export const pageWorksType = defineType({
    name: 'pageWorks',
    title: 'Works Page',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero', default: true },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'Works Page',
            readOnly: true,
        }),

        // --- SEO ---
        defineField({
            name: 'metaTitle',
            title: 'SEO Title',
            description: 'Заголовок страницы для браузера и поисковиков',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'metaDescription',
            title: 'SEO Description',
            description: 'Описание страницы для поисковиков',
            type: 'text',
            group: 'seo',
        }),

        // --- HERO ---
        defineField({
            name: 'heroTitle',
            title: 'Заголовок страницы (Hero)',
            description: 'Огромный заголовок вверху страницы (Works)',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'filterAllLabel',
            title: 'Текст кнопки "Все проекты"',
            description: 'Текст по кнопке "All Projects" в фильтре',
            type: 'string',
            group: 'hero',
            initialValue: 'All Projects',
        }),
    ],
})
