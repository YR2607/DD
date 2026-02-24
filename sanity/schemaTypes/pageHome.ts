import { defineField, defineType } from 'sanity'

export const pageHomeType = defineType({
    name: 'pageHome',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'Home Page',
            readOnly: true,
        }),
        defineField({
            name: 'heroLogoText',
            title: 'Огромный текст на фоне (Hero Logo)',
            description: 'Анимированный текст на главной (по умолчанию aspectmobili)',
            type: 'string',
        }),
        defineField({
            name: 'heroSlides',
            title: 'Слайдер проектов на главном экране (Hero)',
            description: 'Слайды с фотографиями и ссылками на лучшие проекты',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'image', type: 'image', title: 'Фотография слайда', options: { hotspot: true } },
                        { name: 'title', type: 'string', title: 'Название проекта' },
                        { name: 'area', type: 'string', title: 'Площадь (Area)' },
                        { name: 'year', type: 'string', title: 'Год завершения' },
                        { name: 'projectLink', type: 'url', title: 'Ссылка на проект (вида /works/nasvanie-proekta)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'aboutSections',
            title: 'Секции о компании (About Blocks)',
            description: 'Текстовые блоки с архитектурными изображениями на главной',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', type: 'string', title: 'Порядковый номер (например: (01))' },
                        { name: 'title', type: 'string', title: 'Заголовок блока' },
                        { name: 'leadText', type: 'text', title: 'Крупный вводный текст' },
                        { name: 'bodyText', type: 'text', title: 'Основной текст параграфа' },
                        { name: 'image', type: 'image', title: 'Фотография блока', options: { hotspot: true } },
                        { name: 'caption', type: 'string', title: 'Подпись под фото (Например: FRAGMENT 205)' },
                        { name: 'inverted', type: 'boolean', title: 'Инвертировать расположение? (Фото слева, текст справа)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'contactPortal',
            title: 'Блок связи (Footer Portal)',
            description: 'Большая секция "START YOUR PROJECT" внизу страницы',
            type: 'object',
            fields: [
                { name: 'tag', type: 'string', title: 'Маленький тег (Например: GET IN TOUCH)' },
                { name: 'title', type: 'string', title: 'Главный заголовок (можно использовать <br> для переноса)' },
                { name: 'btnText', type: 'string', title: 'Текст на кнопке (Например: CONTACT US)' }
            ]
        })
    ]
})
