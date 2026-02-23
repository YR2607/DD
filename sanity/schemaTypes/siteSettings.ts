import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
        }),
        defineField({
            name: 'footerText',
            title: 'Footer Text',
            type: 'text',
        }),
        defineField({
            name: 'address',
            title: 'Office Address',
            type: 'text',
        }),
    ],
})
