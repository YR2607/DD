import { defineType, defineField } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    groups: [
        { name: 'main', title: 'Основное', default: true },
        { name: 'details', title: 'Детали' },
        { name: 'gallery', title: 'Галерея' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // --- MAIN ---
        defineField({
            name: 'title',
            title: 'Название проекта',
            description: 'Отображается в карточках и как главный заголовок',
            type: 'string',
            group: 'main',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL адрес страницы (Slug)',
            description: 'Нажмите Generate, чтобы создать безопасный URL из названия',
            type: 'slug',
            group: 'main',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Главное изображение (Обложка)',
            description: 'Фотография, которая будет показана в списке проектов',
            type: 'image',
            group: 'main',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Описание проекта (Concept)',
            description: 'Основной текстовый блок на детальной странице проекта',
            type: 'text',
            group: 'main',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Дата публикации',
            description: 'Дата для сортировки проектов (Новые сверху)',
            type: 'datetime',
            group: 'main',
        }),

        // --- DETAILS ---
        defineField({
            name: 'categories',
            title: 'Категории проекта',
            description: 'Служат для фильтрации на странице Works',
            type: 'array',
            group: 'details',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Офисный дизайн (Office Design)', value: 'office-design' },
                    { title: 'Брендинг (Branding)', value: 'branding' },
                    { title: 'Консалтинг (Consulting)', value: 'consulting' },
                ],
            },
        }),
        defineField({
            name: 'area',
            title: 'Площадь (Area)',
            description: 'Например: 3206m2',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'completionYear',
            title: 'Год завершения (Completion)',
            description: 'Например: 2024',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'client',
            title: 'Клиент',
            description: 'Название компании-клиента',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'location',
            title: 'Локация',
            description: 'Город / район, например: Shibuya, Tokyo',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'services',
            title: 'Оказанные услуги',
            description: 'Список услуг (Office Design, Branding и т.д.)',
            type: 'array',
            group: 'details',
            of: [{ type: 'string' }],
        }),

        // --- GALLERY ---
        defineField({
            name: 'gallery',
            title: 'Галерея проекта',
            description: 'Дополнительные фотографии проекта для детальной страницы',
            type: 'array',
            group: 'gallery',
            of: [
                {
                    type: 'image',
                    title: 'Фотография',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Подпись к фото (необязательно)',
                        },
                    ],
                },
            ],
        }),
    ],
    orderings: [
        {
            title: 'Дата публикации (новые)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Дата публикации (старые)',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
        {
            title: 'Название (А-Я)',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'completionYear',
            media: 'mainImage',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                subtitle: subtitle ? `Completion: ${subtitle}` : '',
                media: media,
            }
        },
    },
})
