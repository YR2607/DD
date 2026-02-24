import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Название сайта (SEO)',
            description: 'Отображается во вкладке браузера и в поисковиках',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Описание сайта (SEO)',
            description: 'Краткое описание сайта для поисковиков (мета-тег description)',
            type: 'text',
        }),
        defineField({
            name: 'logoText',
            title: 'Текст логотипа (в шапке)',
            description: 'Например: ASPECTMOBILI',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Адрес офиса (в футере)',
            type: 'text',
        }),
        defineField({
            name: 'copyright',
            title: 'Копирайт (в футере)',
            description: 'Например: ©2025 HITOBA DESIGN',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Ссылки на соцсети (в футере)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Название (Facebook, Instagram)' },
                        { name: 'url', type: 'url', title: 'Ссылка' }
                    ]
                }
            ]
        }),
    ],
})
