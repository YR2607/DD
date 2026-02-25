import { defineField, defineType } from 'sanity'

export const pageAboutType = defineType({
    name: 'pageAbout',
    title: 'About Page',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero', default: true },
        { name: 'content', title: 'Content' },
        { name: 'gallery', title: 'Gallery' },
        { name: 'style', title: 'Style Section' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'About Page',
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
            name: 'hero',
            title: 'Заголовок страницы (Hero)',
            description: 'Текст, который появляется с анимацией при загрузке страницы',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'title', type: 'string', title: 'Главный огромный заголовок (About)' },
                { name: 'subtitle', type: 'string', title: 'Подзаголовок рядом (ASPECTMOBILI)' },
                { name: 'description', type: 'text', title: 'Описание внизу hero-секции' },
            ],
        }),

        // --- CONTENT ---
        defineField({
            name: 'sections',
            title: 'Текстовые блоки (Concept / Philosophy)',
            description: 'Основные абзацы с текстом, которые идут друг за другом',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', type: 'string', title: 'Порядковый номер (Например: (01))' },
                        { name: 'title', type: 'string', title: 'Заголовок блока' },
                        { name: 'leadText', type: 'text', title: 'Вводный крупный текст' },
                        { name: 'bodyText', type: 'text', title: 'Основной мелкий текст' },
                        { name: 'caption', type: 'string', title: 'Подпись к изображению (если блок четный)' },
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'number' },
                    },
                },
            ],
        }),

        // --- GALLERY ---
        defineField({
            name: 'spreadImages',
            title: 'Галерея фотографий (Горизонтальный скролл)',
            description: 'Фотографии, которые уезжают влево при скролле страницы',
            type: 'array',
            group: 'gallery',
            of: [{ type: 'image', title: 'Изображение', options: { hotspot: true } }],
        }),

        // --- STYLE ---
        defineField({
            name: 'style',
            title: 'Секция "Наш стиль" (Style)',
            description: 'Блок с автоматически нумеруемым списком внизу страницы',
            type: 'object',
            group: 'style',
            fields: [
                { name: 'title', type: 'string', title: 'Заголовок секции (Style)' },
                {
                    name: 'items',
                    title: 'Пункты списка',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Заголовок пункта' },
                                { name: 'text', type: 'text', title: 'Текст пункта' },
                            ],
                            preview: {
                                select: { title: 'title' },
                            },
                        },
                    ],
                },
            ],
        }),
    ],
})
