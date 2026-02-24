import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'nw2y6nmp',
    dataset: 'production',
    token: 'sk0MLSXIvlASbAHUV7sJfjTgjdS9bAjkt3NZoZNfTqa01Y97qqudhN1Bm6ZWUD7O5Rl7wpAXuqs30viXActdgXONtxMjSEHIWXjcwYME56zL01uZ7PfBTYDlbKUdNZ9kAsxGbAa94OdBBh3RUwBBm5BwHcjucKuVUzV40Ea5tKduamcsYeMw',
    apiVersion: '2023-05-03',
    useCdn: false,
});

async function seed() {
    console.log('Starting seed process...');

    // 1. Site Settings
    const siteSettings = {
        _type: 'siteSettings',
        _id: 'siteSettings',
        title: 'aspectmobili by HITOBA DESIGN | Tokyo Office Design & Layout',
        description: 'Tokyo\'s leading office design and layout agency focusing on productivity and branding.',
        logoText: 'ASPECTMOBILI',
        address: '205 Quest Court Harajuku 3-59-4 Sendagaya, Shibuya-ku, Tokyo',
        copyright: '©2025 HITOBA DESIGN',
        socialLinks: [
            { _key: '1', platform: 'Facebook', url: '#' },
            { _key: '2', platform: 'Instagram', url: '#' }
        ]
    };

    // 2. Home Page
    const pageHome = {
        _type: 'pageHome',
        _id: 'pageHome',
        heroLogoText: 'aspectmobili',
        heroSlides: [
            {
                _key: 'slide1',
                title: 'NTT DATA INTELLILINK',
                area: '3206m2',
                year: '2024',
                projectLink: '/works/ntt-data-intellilink'
            },
            {
                _key: 'slide2',
                title: 'SocioFuture, Ltd.',
                area: '3967m2',
                year: '2025',
                projectLink: '/works/sociofuture'
            }
        ],
        aboutSections: [
            {
                _key: 'ab1',
                number: '(01)',
                title: 'Beyond Spatial Design',
                leadText: 'We believe that offices are not just places to work, but architectural fragments that shape culture and productivity.',
                bodyText: 'Aspectmobili is a design manifest by HITOBA. We integrate minimal aesthetics with structural intelligence to create spaces that breathe and evolve with your business.',
                caption: 'FRAGMENT 205 — TOKYO',
                inverted: false
            },
            {
                _key: 'ab2',
                number: '(02)',
                title: 'Structural Intelligence',
                leadText: 'Complexity refined into simplicity. Our approach to structural design is rooted in the dialogue between matter and light.',
                bodyText: 'We leverage advanced structural engineering to push the boundaries of what a workspace can be, ensuring durability and timeless aesthetic value in every fragment.',
                caption: 'FRAGMENT 402 — STRUCTURAL',
                inverted: true
            }
        ],
        contactPortal: {
            tag: 'GET IN TOUCH',
            title: 'Start your project',
            btnText: 'CONTACT US'
        }
    };

    // 3. About Page
    const pageAbout = {
        _type: 'pageAbout',
        _id: 'pageAbout',
        hero: {
            title: 'Aesthetics of workspace.',
            subtitle: 'Spatial design platform by HITOBA'
        },
        sections: [
            {
                _key: 's1',
                number: '(01)',
                title: 'Concept',
                leadText: 'Creating fragments of architecture that enhance your work identity.',
                bodyText: 'Мы не просто проектируем пространство. Мы создаем среду, которая становится частью ДНК вашей компании.',
                caption: 'Design Concept 205'
            }
        ],
        style: {
            title: 'Our Style',
            items: [
                { _key: 'i1', title: 'Minimalist', text: 'Clean lines and purposeful voids.' },
                { _key: 'i2', title: 'Adaptive', text: 'Responsive to human movement and technology.' }
            ]
        }
    };

    // 4. Company Page
    const pageCompany = {
        _type: 'pageCompany',
        _id: 'pageCompany',
        hero: {
            mainTitle: 'Company',
            logoText: 'ASPECTMOBILI',
            description: 'Shaping the future <em>of workspace</em> — a spatial design studio crafting architectural fragments since 2018, Tokyo.'
        },
        statement: {
            number: '(01)',
            text: 'We are a spatial design studio creating <em>architectural fragments</em> that transform how people work, connect and grow.'
        },
        profileRows: [
            { _key: 'p1', key: 'Company Name', value: 'HITOBA DESIGN Inc.' },
            { _key: 'p2', key: 'CEO', value: 'Takeshi Yamamoto' }
        ],
        history: [
            { _key: 'h1', year: '2018', title: 'Foundation', text: 'HITOBA DESIGN established in Shibuya, Tokyo.' }
        ]
    };

    // 5. Sample Projects
    const projects = [
        {
            _type: 'project',
            _id: 'ntt-data-intellilink',
            title: 'NTT DATA INTELLILINK',
            slug: { _type: 'slug', current: 'ntt-data-intellilink' },
            area: '3206m2',
            completionYear: '2024',
            categories: ['office-design', 'branding'],
            description: 'A comprehensive office transformation focused on synergy and digital innovation.'
        },
        {
            _type: 'project',
            _id: 'sociofuture',
            title: 'SocioFuture, Ltd.',
            slug: { _type: 'slug', current: 'sociofuture' },
            area: '3967m2',
            completionYear: '2025',
            categories: ['office-design', 'consulting'],
            description: 'Shaping the future of social infrastructure through spatial intelligence.'
        }
    ];

    try {
        console.log('Uploading Site Settings...');
        await client.createOrReplace(siteSettings);

        console.log('Uploading Home Page...');
        await client.createOrReplace(pageHome);

        console.log('Uploading About Page...');
        await client.createOrReplace(pageAbout);

        console.log('Uploading Company Page...');
        await client.createOrReplace(pageCompany);

        console.log('Uploading Projects...');
        for (const project of projects) {
            await client.createOrReplace(project);
        }

        console.log('Seed process completed successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seed();
