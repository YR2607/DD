import { defineField, defineType } from 'sanity'

export const pageCompanyType = defineType({
    name: 'pageCompany',
    title: 'Company Page',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero', default: true },
        { name: 'statement', title: 'Statement' },
        { name: 'numbers', title: 'Numbers' },
        { name: 'profile', title: 'Profile' },
        { name: 'manifesto', title: 'Manifesto' },
        { name: 'history', title: 'History' },
        { name: 'clients', title: 'Clients' },
        { name: 'location', title: 'Location' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'Company Page',
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
            description: 'Текст с анимацией при загрузке страницы',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'mainTitle', type: 'string', title: 'Огромный заголовок (Company)' },
                { name: 'logoText', type: 'string', title: 'Подзаголовок (ASPECTMOBILI)' },
                { name: 'description', type: 'text', title: 'Краткое описание внизу' },
            ],
        }),

        // --- STATEMENT ---
        defineField({
            name: 'statement',
            title: 'Главное заявление (Statement)',
            description: 'Основная философия компании, крупный текст',
            type: 'object',
            group: 'statement',
            fields: [
                { name: 'number', type: 'string', title: 'Порядковый номер (Например: (01))' },
                { name: 'text', type: 'blockContent', title: 'Текст философии' },
            ],
        }),

        // --- NUMBERS ---
        defineField({
            name: 'numbers',
            title: 'Статистика в цифрах (Счетчики)',
            description: 'Автоматически анимируемые цифры (годы, проекты, площадь)',
            type: 'array',
            group: 'numbers',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Описание (Например: YEARS)' },
                        { name: 'value', type: 'string', title: 'ТОЛЬКО ЦИФРЫ (Например: 10)' },
                        { name: 'suffix', type: 'string', title: 'Символ после цифры (Например: + или m2)' },
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                        prepare(selection) {
                            return {
                                title: selection.title,
                                subtitle: selection.subtitle ? `Value: ${selection.subtitle}` : '',
                            }
                        },
                    },
                },
            ],
        }),

        // --- PROFILE ---
        defineField({
            name: 'profileSectionTitle',
            title: 'Заголовок секции "Профиль"',
            description: 'Например: Company Profile',
            type: 'string',
            group: 'profile',
        }),
        defineField({
            name: 'profileRows',
            title: 'Таблица профиля компании',
            description: 'Официальные данные компании (Год основания, CEO и т.д.)',
            type: 'array',
            group: 'profile',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'key', type: 'string', title: 'Свойство (Например: Founded)' },
                        { name: 'value', type: 'string', title: 'Значение (Например: JAN 2025)' },
                    ],
                    preview: {
                        select: { title: 'key', subtitle: 'value' },
                    },
                },
            ],
        }),

        // --- MANIFESTO ---
        defineField({
            name: 'manifesto',
            title: 'Манифест (Текст в колонках)',
            description: 'Принципы работы компании',
            type: 'object',
            group: 'manifesto',
            fields: [
                { name: 'title', type: 'string', title: 'Заголовок блока' },
                {
                    name: 'columns',
                    title: 'Колонки',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'num', type: 'string', title: 'Номер (01)' },
                                { name: 'title', type: 'string', title: 'Заголовок колонки' },
                                { name: 'text', type: 'blockContent', title: 'Текст' },
                            ],
                            preview: {
                                select: { title: 'title', subtitle: 'num' },
                            },
                        },
                    ],
                },
            ],
        }),

        // --- HISTORY ---
        defineField({
            name: 'historySectionTitle',
            title: 'Заголовок секции "История"',
            description: 'Например: History',
            type: 'string',
            group: 'history',
        }),
        defineField({
            name: 'history',
            title: 'История компании (Таймлайн)',
            description: 'Список важных событий по годам',
            type: 'array',
            group: 'history',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Год (Например: 2024)' },
                        { name: 'title', type: 'string', title: 'Главное событие' },
                        { name: 'text', type: 'blockContent', title: 'Описание события' },
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'year' },
                    },
                },
            ],
        }),

        // --- CLIENTS ---
        defineField({
            name: 'clientsSectionTitle',
            title: 'Заголовок секции "Клиенты"',
            description: 'Например: Clients',
            type: 'string',
            group: 'clients',
        }),
        defineField({
            name: 'clients',
            title: 'Список клиентов (Client List)',
            description: 'Длинный список брендов и компаний',
            type: 'array',
            group: 'clients',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Название компании' },
                        { name: 'type', type: 'string', title: 'Сфера деятельности (необязательно)' },
                    ],
                    preview: {
                        select: { title: 'name', subtitle: 'type' },
                    },
                },
            ],
        }),

        // --- LOCATION ---
        defineField({
            name: 'access',
            title: 'Раздел "Как добраться" (Адрес и Карта)',
            description: 'Контактные данные и адрес для блока с картой',
            type: 'object',
            group: 'location',
            fields: [
                { name: 'title', type: 'string', title: 'Заголовок (Access)' },
                { name: 'googleMapsUrl', type: 'url', title: 'Google Maps Embed URL (из Google Maps -> Share -> Embed a map)' },
                {
                    name: 'details',
                    title: 'Блоки контактной информации',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Тип (Назначение, Адрес, Тел.)' },
                                { name: 'text', type: 'text', title: 'Сами данные (можно <br>)' },
                            ],
                            preview: {
                                select: { title: 'label', subtitle: 'text' },
                            },
                        },
                    ],
                },
            ],
        }),
    ],
})
