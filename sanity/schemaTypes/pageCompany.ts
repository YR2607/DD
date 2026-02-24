import { defineField, defineType } from 'sanity'

export const pageCompanyType = defineType({
    name: 'pageCompany',
    title: 'Company Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Системное название (только для админки)',
            type: 'string',
            initialValue: 'Company Page',
            readOnly: true,
        }),
        defineField({
            name: 'hero',
            title: 'Заголовок страницы (Hero)',
            description: 'Текст с анимацией при загрузке страницы',
            type: 'object',
            fields: [
                { name: 'mainTitle', type: 'string', title: 'Огромный заголовок (Company)' },
                { name: 'logoText', type: 'string', title: 'Подзаголовок (ASPECTMOBILI)' },
                { name: 'description', type: 'text', title: 'Краткое описание внизу' }
            ]
        }),
        defineField({
            name: 'statement',
            title: 'Главное заявление (Statement)',
            description: 'Основная философия компании, крупный текст',
            type: 'object',
            fields: [
                { name: 'number', type: 'string', title: 'Порядковый номер (Например: (01))' },
                { name: 'text', type: 'text', title: 'Текст философии' }
            ]
        }),
        defineField({
            name: 'numbers',
            title: 'Статистика в цифрах (Счетчики)',
            description: 'Автоматически анимируемые цифры (годы, проекты, площадь)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Описание (Например: YEARS)' },
                        { name: 'value', type: 'string', title: 'ТОЛЬКО ЦИФРЫ (Например: 10)' },
                        { name: 'suffix', type: 'string', title: 'Символ после цифры (Например: + или m2)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'profileRows',
            title: 'Таблица профиля компании',
            description: 'Официальные данные компании (Год основания, CEO и т.д.)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'key', type: 'string', title: 'Свойство (Например: Founded)' },
                        { name: 'value', type: 'string', title: 'Значение (Например: JAN 2025)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'manifesto',
            title: 'Манифест (Текст в колонках)',
            description: 'Принципы работы компании',
            type: 'object',
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
                                { name: 'text', type: 'text', title: 'Текст' }
                            ]
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'history',
            title: 'История компании (Таймлайн)',
            description: 'Список важных событий по годам',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Год (Например: 2024)' },
                        { name: 'title', type: 'string', title: 'Главное событие' },
                        { name: 'text', type: 'text', title: 'Описание события' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'clients',
            title: 'Список клиентов (Client List)',
            description: 'Длинный список брендов и компаний',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Название компании' },
                        { name: 'type', type: 'string', title: 'Сфера деятельности (необязательно)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'access',
            title: 'Раздел "Как добраться" (Адрес и Карта)',
            description: 'Контактные данные и адрес для блока с картой',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Заголовок (Access)' },
                {
                    name: 'details',
                    title: 'Блоки контактной информации',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Тип (Назначение, Адрес, Тел.)' },
                                { name: 'text', type: 'text', title: 'Сами данные (можно <br>)' }
                            ]
                        }
                    ]
                }
            ]
        })
    ]
})
