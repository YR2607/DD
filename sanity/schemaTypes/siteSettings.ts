import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'branding', title: 'Branding', default: true },
        { name: 'contacts', title: 'Contacts' },
        { name: 'navigation', title: 'Navigation' },
        { name: 'contactPortal', title: 'Contact Portal' },
        { name: 'footer', title: 'Footer' },
    ],
    fields: [
        // --- SEO ---
        defineField({
            name: 'title',
            title: 'Название сайта (SEO)',
            description: 'Отображается во вкладке браузера и в поисковиках',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'description',
            title: 'Описание сайта (SEO)',
            description: 'Краткое описание сайта для поисковиков (мета-тег description)',
            type: 'text',
            group: 'seo',
        }),

        // --- BRANDING ---
        defineField({
            name: 'logoText',
            title: 'Текст логотипа (в шапке и футере)',
            description: 'Например: ASPECTMOBILI',
            type: 'string',
            group: 'branding',
            validation: (Rule) => Rule.required(),
        }),

        // --- CONTACTS ---
        defineField({
            name: 'email',
            title: 'Email',
            description: 'Контактный email компании',
            type: 'string',
            group: 'contacts',
        }),
        defineField({
            name: 'phone',
            title: 'Телефон',
            description: 'Контактный телефон',
            type: 'string',
            group: 'contacts',
        }),
        defineField({
            name: 'address',
            title: 'Адрес офиса',
            type: 'text',
            group: 'contacts',
        }),
        defineField({
            name: 'googleMapsUrl',
            title: 'Google Maps Embed URL',
            description: 'URL для iframe Google Maps (берётся из Google Maps -> Share -> Embed)',
            type: 'url',
            group: 'contacts',
        }),

        // --- NAVIGATION ---
        defineField({
            name: 'aboutText',
            title: 'Текст "О компании" (для меню)',
            description: 'Отображается в раскрывающемся меню-навигации слева',
            type: 'text',
            group: 'navigation',
        }),
        defineField({
            name: 'privacyPolicyUrl',
            title: 'Ссылка на Privacy Policy',
            description: 'URL страницы политики конфиденциальности',
            type: 'string',
            group: 'navigation',
        }),

        // --- CONTACT PORTAL ---
        defineField({
            name: 'contactPortal',
            title: 'Блок "Связаться" (Contact Portal)',
            description: 'Секция "Start your project" внизу каждой страницы. Меняется в одном месте для всего сайта.',
            type: 'object',
            group: 'contactPortal',
            fields: [
                { name: 'tag', type: 'string', title: 'Маленький тег (Например: GET IN TOUCH)' },
                { name: 'title', type: 'string', title: 'Главный заголовок (можно <br> для переноса)' },
                { name: 'btnText', type: 'string', title: 'Текст на кнопке (Например: CONTACT US)' },
                { name: 'link', type: 'string', title: 'Ссылка кнопки (Например: /contact/)', initialValue: '/contact/' },
            ],
        }),

        // --- FOOTER ---
        defineField({
            name: 'copyright',
            title: 'Копирайт (в футере)',
            description: 'Например: (c)2025 HITOBA DESIGN',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Ссылки на соцсети (в футере)',
            type: 'array',
            group: 'footer',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Название (Facebook, Instagram)' },
                        { name: 'url', type: 'url', title: 'Ссылка' },
                    ],
                    preview: {
                        select: { title: 'platform', subtitle: 'url' },
                    },
                },
            ],
        }),
    ],
})
