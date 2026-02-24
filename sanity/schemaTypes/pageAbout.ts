import { defineField, defineType } from 'sanity'

export const pageAboutType = defineType({
    name: 'pageAbout',
    title: 'About Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'About Page',
            readOnly: true,
        }),
        defineField({
            name: 'hero',
            title: 'Заголовок страницы (Hero)',
            description: 'Текст, который появляется с анимацией при загрузке страницы',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Главный огромный заголовок (About)' },
                { name: 'subtitle', type: 'string', title: 'Подзаголовок рядом (ASPECTMOBILI)' }
            ]
        }),
        defineField({
            name: 'sections',
            title: 'Текстовые блоки (Concept / Philosophy)',
            description: 'Основные абзацы с текстом, которые идут друг за другом',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', type: 'string', title: 'Порядковый номер (Например: (01))' },
                        { name: 'title', type: 'string', title: 'Заголовок блока' },
                        { name: 'leadText', type: 'text', title: 'Вводный крупный текст' },
                        { name: 'bodyText', type: 'text', title: 'Основной мелкий текст' },
                        { name: 'caption', type: 'string', title: 'Подпись к изображению (если блок четный)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'spreadImages',
            title: 'Галерея фотографий (Горизонтальный скролл)',
            description: 'Фотографии, которые уезжают влево при скролле страницы',
            type: 'array',
            of: [{ type: 'image', title: 'Изображение', options: { hotspot: true } }]
        }),
        defineField({
            name: 'style',
            title: 'Секция "Наш стиль" (Style)',
            description: 'Блок с автоматически нумеруемым списком внизу страницы',
            type: 'object',
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
                                { name: 'text', type: 'text', title: 'Текст пункта' }
                            ]
                        }
                    ]
                }
            ]
        })
    ]
})
