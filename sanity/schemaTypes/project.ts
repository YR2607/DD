import { defineType, defineField } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Название проекта',
            description: 'Отображается в карточках и как главный заголовок',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL адрес страницы (Slug)',
            description: 'Нажмите Generate, чтобы создать безопасный URL из названия',
            type: 'slug',
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
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Категории проекта',
            description: 'Служат для фильтрации на странице Works',
            type: 'array',
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
        }),
        defineField({
            name: 'completionYear',
            title: 'Год завершения (Completion)',
            description: 'Например: 2024',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Описание проекта (Concept)',
            description: 'Основной текстовый блок на левой панели детальной страницы',
            type: 'text',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Дата публикации',
            description: 'Дата для сортировки проектов (Новые сверху)',
            type: 'datetime',
        }),
    ],
})
