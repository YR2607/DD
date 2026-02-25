import { defineField, defineType } from 'sanity'

export const pageHomeType = defineType({
    name: 'pageHome',
    title: 'Home Page',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero', default: true },
        { name: 'about', title: 'About Blocks' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'Home Page',
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
            name: 'heroLogoText',
            title: 'Огромный текст на фоне (Hero Logo)',
            description: 'Анимированный текст на главной (по умолчанию aspectmobili)',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroSlides',
            title: 'Слайдер проектов на главном экране (Hero)',
            description: 'Слайды с фотографиями и ссылками на лучшие проекты',
            type: 'array',
            group: 'hero',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'image', type: 'image', title: 'Фотография слайда', options: { hotspot: true } },
                        { name: 'title', type: 'string', title: 'Название проекта' },
                        { name: 'area', type: 'string', title: 'Площадь (Area)' },
                        { name: 'year', type: 'string', title: 'Год завершения' },
                        { name: 'projectLink', type: 'url', title: 'Ссылка на проект (вида /works/nasvanie-proekta)' },
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'year', media: 'image' },
                    },
                },
            ],
        }),

        // --- ABOUT BLOCKS ---
        defineField({
            name: 'aboutSections',
            title: 'Секции о компании (About Blocks)',
            description: 'Текстовые блоки с архитектурными изображениями на главной',
            type: 'array',
            group: 'about',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', type: 'string', title: 'Порядковый номер (например: (01))' },
                        { name: 'title', type: 'string', title: 'Заголовок блока' },
                        { name: 'leadText', type: 'blockContent', title: 'Крупный вводный текст' },
                        { name: 'bodyText', type: 'blockContent', title: 'Основной текст параграфа' },
                        { name: 'image', type: 'image', title: 'Фотография блока', options: { hotspot: true } },
                        { name: 'caption', type: 'string', title: 'Подпись под фото (Например: FRAGMENT 205)' },
                        { name: 'inverted', type: 'boolean', title: 'Инвертировать расположение? (Фото слева, текст справа)' },
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'number', media: 'image' },
                    },
                },
            ],
        }),
    ],
})
