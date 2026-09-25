/**
 * Seed content for the Aba Power content management system.
 *
 * These values mirror what the public site shipped with, so the CMS starts
 * with the exact live content and every edit is a real change against it.
 *
 * Shape:
 *   collections -> ordered arrays of items (create / read / update / delete)
 *   settings    -> singletons (one editable object each)
 */
export const CMS_VERSION = 1;

export const seedContent = () => ({
    version: CMS_VERSION,
    collections: {
        /* ---------------------------------------------------------------- Hero */
        heroStats: [
            { id: 'hs-1', label: 'NETWORK', value: '110km+', caption: 'Overhead lines' },
            { id: 'hs-3', label: 'UTILITY', value: 'APLE', caption: 'Aba Power delivery' },
            { id: 'hs-4', label: 'MD CUSTOMERS', value: '1538', caption: 'Maximum demand customers' },
            { id: 'hs-5', label: 'NMD CUSTOMERS', value: '256795', caption: 'Non-maximum demand customers' },
        ],

        /* ------------------------------------------------- Ticker (marquee) */
        marquee: [
            { id: 'mq-1', text: 'APL ELECTRIC COMPANY', visible: true },
            { id: 'mq-2', text: 'RELIABLE POWER INFRASTRUCTURE', visible: true },
            { id: 'mq-3', text: 'INDUSTRIAL GROWTH IN ABA', visible: true },
            { id: 'mq-4', text: 'INTEGRATED GENERATION AND DISTRIBUTION', visible: true },
            { id: 'mq-5', text: 'ABA RING-FENCED AREA (9 LGAs)', visible: true },
            { id: 'mq-6', text: 'ENTERPRISE AND COMMUNITY IMPACT', visible: true },
            { id: 'mq-7', text: '27KM OWAZA GAS PIPELINE', visible: true },
            { id: 'mq-8', text: '188MW GENERATION CAPACITY', visible: true },
            { id: 'mq-9', text: 'STS SMART PREPAID METERING', visible: true },
        ],

        /* ------------------------------------------- Power stats (bento grid) */
        powerStats: [
            {
                id: 'ps-1',
                value: '11',
                caption: '33 KV Feeders',
                description: '',
                variant: 'image',
                image: 'https://i.pinimg.com/736x/25/61/29/2561292d8c143063a866a31e8e3a757b.jpg',
            },
            {
                id: 'ps-2',
                value: '35',
                caption: '11 KV Feeders',
                description: '',
                variant: 'blue',
                image: '',
            },
            {
                id: 'ps-3',
                value: '2800 +',
                caption: 'Distribution Substations',
                description: '',
                variant: 'accent',
                image: '',
            },
            {
                id: 'ps-4',
                value: '11',
                caption: 'Injection Substations',
                description: '',
                variant: 'white',
                image: '',
            },
            {
                id: 'ps-5',
                value: '9 LGAs',
                caption: 'Aba ring-fenced service area',
                description:
                    'Aba ring-fenced service area supporting businesses, households and communities.',
                variant: 'navy',
                image: '',
            },
        ],

        /* ------------------------------------------------------------ Newsroom */
        news: [
            {
                id: 'nw-1',
                title: 'APL Electric Commissions 188MW Gas Plant',
                category: 'Company Milestone',
                date: 'February 2024',
                readTime: '4 min read',
                image:
                    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
                summary: 'The integrated 188MW plant begins full commercial generation for the Aba network.',
                link: '#newsroom',
                published: true,
            },
            {
                id: 'nw-2',
                title: 'Aba Power Reaches 37,000+ Electrified Businesses',
                category: 'Industrial Growth',
                date: 'March 2024',
                readTime: '3 min read',
                image:
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
                summary: 'Small and medium enterprises across the ring-fenced area are now connected.',
                link: '#newsroom',
                published: true,
            },
            {
                id: 'nw-3',
                title: '27km Owaza Gas Pipeline Delivers Reliable Fuel',
                category: 'Infrastructure',
                date: 'April 2024',
                readTime: '5 min read',
                image:
                    'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80',
                summary: 'Dedicated gas supply secures uninterrupted generation for the utility.',
                link: '#newsroom',
                published: true,
            },
            {
                id: 'nw-4',
                title: 'Smart Prepaid Metering Expands Across 9 LGAs',
                category: 'Customer Service',
                date: 'May 2024',
                readTime: '3 min read',
                image:
                    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                summary: 'STS-compliant meters bring accurate, transparent billing to more customers.',
                link: '#newsroom',
                published: true,
            },
            {
                id: 'nw-5',
                title: 'Enyimba Economic City Secures Dedicated Power Feed',
                category: 'Special Economic Zone',
                date: 'June 2024',
                readTime: '4 min read',
                image:
                    'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=1200&q=80',
                summary: 'A dedicated feeder now serves the industrial cluster at Enyimba Economic City.',
                link: '#newsroom',
                published: true,
            },
            {
                id: 'nw-6',
                title: 'APL Electric Partners on Quad Power Expansion (+375MW)',
                category: 'Future Energy',
                date: 'July 2024',
                readTime: '4 min read',
                image:
                    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
                summary: 'The expansion raises combined capacity and strengthens grid resilience.',
                link: '#newsroom',
                published: true,
            },
        ],

        /* ---------------------------------------------------- Media: Events */
        events: [
            {
                id: 'ev-1',
                title: '188MW Gas Plant Commissioning Ceremony',
                category: 'Commissioning',
                date: 'February 2024',
                location: 'Osisioma, Aba',
                image:
                    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Executives cut the ribbon as the integrated 188MW gas-fired plant begins full commercial generation for the Aba network.',
                published: true,
            },
            {
                id: 'ev-2',
                title: 'Industrial Customers Power Summit',
                category: 'Industry',
                date: 'March 2024',
                location: 'Enyimba Economic City',
                image:
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Manufacturers and maximum-demand customers meet to discuss reliable supply and industrial growth in Abia State.',
                published: true,
            },
            {
                id: 'ev-3',
                title: 'Community Electrification Sensitisation',
                category: 'Community',
                date: 'April 2024',
                location: 'Aba North LGA',
                image:
                    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Residents learn about safe electricity use and the new connections rolling out across the ring-fenced area.',
                published: true,
            },
            {
                id: 'ev-4',
                title: 'Safety First Field Crews Workshop',
                category: 'Safety',
                date: 'May 2024',
                location: 'Aba Power Training Centre',
                image:
                    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Field engineers and linesmen complete a refresher on PPE, safe isolation and emergency response.',
                published: true,
            },
            {
                id: 'ev-5',
                title: 'Smart Meter Rollout Launch',
                category: 'Commissioning',
                date: 'May 2024',
                location: 'Aba South LGA',
                image:
                    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'STS-compliant prepaid meters begin installation, bringing accurate and transparent billing to more customers.',
                published: true,
            },
            {
                id: 'ev-6',
                title: 'Nkeanyi App Customer Clinic',
                category: 'Community',
                date: 'June 2024',
                location: 'Aba Power Service Centre',
                image:
                    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Customers are guided through digital vending, token purchase and outage reporting on the Nkeanyi App.',
                published: true,
            },
            {
                id: 'ev-7',
                title: 'Quarterly Stakeholders Forum',
                category: 'Corporate',
                date: 'June 2024',
                location: 'Aba Power Headquarters',
                image:
                    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Regulators, community leaders and customers review service performance and network expansion plans.',
                published: true,
            },
            {
                id: 'ev-8',
                title: 'Apprentice Electricians Graduation',
                category: 'Corporate',
                date: 'July 2024',
                location: 'Aba Power Training Centre',
                image:
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Local youths complete a skills programme in electrical installation, supporting jobs across the nine LGAs.',
                published: true,
            },
            {
                id: 'ev-9',
                title: 'Fallen Conductor Emergency Drill',
                category: 'Safety',
                date: 'July 2024',
                location: 'Osisioma Industrial Layout',
                image:
                    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'The 24/7 rapid-response desk and crews rehearse isolating faults and restoring supply safely.',
                published: true,
            },
            {
                id: 'ev-10',
                title: 'Quad Power Expansion Groundbreaking',
                category: 'Commissioning',
                date: 'August 2024',
                location: 'Aba Generation Site',
                image:
                    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Partners break ground on the +375MW expansion that strengthens grid resilience for the region.',
                published: true,
            },
            {
                id: 'ev-11',
                title: 'Schools Electrical Safety Outreach',
                category: 'Safety',
                date: 'September 2024',
                location: 'Aba, Abia State',
                image:
                    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Pupils learn to spot electrical hazards and stay safe around poles, transformers and appliances.',
                published: true,
            },
            {
                id: 'ev-12',
                title: 'Annual Staff Awards & Family Day',
                category: 'Corporate',
                date: 'October 2024',
                location: 'Aba Power Campus',
                image:
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
                caption:
                    'Staff and families celebrate a year of service milestones, safety records and customer wins.',
                published: true,
            },
        ],

        /* -------------------------------------------------- Health & Safety */
        safetyTopics: [
            {
                id: 'sf-1',
                slug: 'covid19-safety',
                title: 'Covid-19 Safety Tips',
                tagline: 'Healthy crews and safe customers keep the grid running.',
                iconKey: 'alert',
                tone: 'gold',
                intro:
                    'Aba Power continues to observe Covid-19 precautions across our network. These simple habits protect our engineers, field crews, service-centre staff and every customer they meet.',
                sections: [
                    {
                        heading: 'For our field crews',
                        bullets: [
                            'Wash or sanitise hands before and after handling meters, tokens and customer documents.',
                            'Wear a face mask during field visits, customer premises and indoor installations.',
                            'Clean and disinfect tools, meters and shared work surfaces regularly.',
                            'Carry personal hand sanitiser and avoid sharing tools between crew members where possible.',
                        ],
                    },
                    {
                        heading: 'At our service centres',
                        bullets: [
                            'Keep a safe physical distance while attending to customers at service centres.',
                            'Encourage customers to use the Nkeanyi App, customer portal and hotline for routine requests.',
                            'Ventilate service areas and disinfect counters and payment points frequently.',
                            'Stay home and seek medical advice if you feel unwell, and inform the Health & Safety desk.',
                        ],
                    },
                ],
            },
            {
                id: 'sf-2',
                slug: 'domestic-child-safety',
                title: 'Domestic & Child Safety',
                tagline: 'Simple habits at home protect your family from shock and fire.',
                iconKey: 'home',
                tone: 'blue',
                intro:
                    'Most electrical accidents happen at home and are entirely preventable. Use these guidelines to keep your household — especially children — safe around electricity.',
                sections: [
                    {
                        heading: 'Protecting children',
                        bullets: [
                            'Keep children away from sockets, extension leads and exposed wiring — fit socket covers and safety shutters.',
                            'Teach children never to touch poles, transformers, stay wires or any fallen conductor.',
                            'Keep kettles, irons and other heat-producing appliances out of children’s reach.',
                            'Never leave young children unattended in a room with a heater, fan or charging device.',
                        ],
                    },
                    {
                        heading: 'Safe use of appliances',
                        bullets: [
                            'Never run cables under rugs or across doorways where they can fray, overheat and start a fire.',
                            'Switch off and unplug appliances before cleaning them.',
                            'Avoid overloading a single socket with too many adaptors or high-power appliances.',
                            'Replace damaged plugs, cords and sockets immediately using a qualified electrician.',
                        ],
                    },
                    {
                        heading: 'What to do in an emergency',
                        bullets: [
                            'Switch off supply at the main switch only if it is safe to do so, then call our hotline.',
                            'Never throw water on electrical equipment or a fire near live wiring.',
                            'Report exposed wires or sparking sockets to Aba Power immediately — never attempt repairs yourself.',
                        ],
                    },
                ],
            },
            {
                id: 'sf-3',
                slug: 'emergency-hotline',
                title: 'Emergency and Hotline',
                tagline: 'Save these numbers. Our dispatch desk answers 24 hours a day.',
                iconKey: 'phone',
                tone: 'gold',
                intro:
                    'Fallen lines, sparks, fires and dangerous faults must be reported immediately. Our 24/7 dispatch team will isolate the fault and send a crew.',
                contacts: [
                    {
                        label: '24/7 Rapid Response Hotline',
                        value: '0700-APL-POWER',
                        tel: '+2347002757693',
                        note: 'Fallen lines, sparks, fires and dangerous faults',
                    },
                    {
                        label: 'Emergency Fault Line',
                        value: '0803-ABA-GRID',
                        tel: '',
                        note: 'Outages, damaged poles and transformer faults',
                    },
                    {
                        label: 'Head Office',
                        value: 'Osisioma Industrial Layout, Aba',
                        tel: '',
                        note: 'Abia State, Nigeria — walk-in support desk',
                    },
                ],
                sections: [
                    {
                        heading: 'What counts as an emergency',
                        bullets: [
                            'A power line that has fallen or is hanging low over a road, home or market.',
                            'Sparks, smoke, fire or burning smells coming from a pole, transformer or meter.',
                            'A substation left open, damaged or breached by vandals.',
                            'Anyone trapped, shocked or injured by electrical equipment.',
                        ],
                    },
                    {
                        heading: 'Reporting an emergency',
                        bullets: [
                            'If a power line falls near you or your vehicle, stay back at least 10 metres and keep everyone away — call the hotline at once.',
                            'Never touch a person or object in contact with a live conductor.',
                            'If a fire starts near electrical equipment, cut the power first and call the fire service — never throw water on live equipment.',
                            'Report faults with your meter number, street name and nearest landmark so our crews can locate and restore supply faster.',
                        ],
                    },
                ],
            },
            {
                id: 'sf-4',
                slug: 'safety-policy',
                title: 'Our Safety Policy',
                tagline: 'Mandatory standards for every field operation.',
                iconKey: 'document',
                tone: 'blue',
                intro:
                    'Safety is a core value at Aba Power, not a procedure we perform. Our zero-harm policy applies to every employee, contractor and visitor across generation and distribution.',
                sections: [
                    {
                        heading: 'Our commitment',
                        bullets: [
                            'We operate a zero-harm policy: no job is so urgent that it cannot be done safely.',
                            'We comply with all Nigerian electricity safety regulations and industry standards.',
                            'We train every member of staff and regularly audit our field operations.',
                            'We investigate every incident and near-miss to prevent recurrence.',
                        ],
                    },
                    {
                        heading: 'Non-negotiables on the network',
                        bullets: [
                            'Full PPE — coveralls, insulated gloves, safety boots and helmets — is mandatory before approaching any live equipment.',
                            'We isolate, lock-out and tag-out feeders before maintenance and verify dead before touching conductors.',
                            'We maintain safe approach distances from 33KV and 11KV lines and never work alone on the network.',
                            'Every incident, near-miss and unsafe condition is reported to the Health & Safety desk immediately.',
                        ],
                    },
                ],
            },
            {
                id: 'sf-5',
                slug: 'public-community-safety',
                title: 'Public & Community Safety',
                tagline: 'Everyone has a part to play in keeping the network safe.',
                iconKey: 'community',
                tone: 'dark',
                intro:
                    'The Aba ring-fenced network runs through homes, markets and busy streets. These shared guidelines help protect the whole community.',
                sections: [
                    {
                        heading: 'Around our network',
                        bullets: [
                            'Keep clear of substations, injection points and transformer yards — these are restricted, high-voltage areas.',
                            'Never build, farm, trade or park beneath overhead lines or around distribution transformers.',
                            'Do not climb poles or attach banners, cables or trading canopies to our equipment.',
                            'Keep roads, drainages and access routes to our equipment clear so crews can respond quickly in an emergency.',
                        ],
                    },
                    {
                        heading: 'Working together',
                        bullets: [
                            'Do not tap lines, bypass meters or connect unauthorised loads; illegal connections endanger the whole community.',
                            'Report vandalism, cable theft and damaged streetlights to Aba Power or your local security outfit.',
                            'Store and use electrical appliances safely, and never buy or install equipment without certified ratings.',
                            'Take part in community sensitisation programmes and share our safety tips with neighbours.',
                        ],
                    },
                ],
            },
        ],

        /* -------------------------------------------------- Support / FAQs */
        faqs: [
            {
                id: 'fq-1',
                question: 'How do I buy electricity tokens?',
                answer:
                    'Use the Nkeanyi App or customer portal with your meter number, or visit any Aba Power vending point.',
                category: 'Billing',
            },
            {
                id: 'fq-2',
                question: 'How do I report an outage?',
                answer:
                    'Call the 24/7 rapid response hotline or use the outage tracker on the website with your street and landmark.',
                category: 'Outages',
            },
            {
                id: 'fq-3',
                question: 'How do I apply for a new connection?',
                answer:
                    'Submit an application at our Osisioma head office or through the customer service desk. A survey will be scheduled.',
                category: 'Connections',
            },
        ],

        /* ------------------------------------------------ About: INSPIRED */
        inspiredValues: [
            {
                id: 'iv-in',
                letter: 'IN',
                label: 'Integrity',
                body: 'Business conducted with honesty, transparency, and accountability.',
            },
            {
                id: 'iv-s',
                letter: 'S',
                label: 'Social Responsibility',
                body: 'Commitment to employee safety and community wellbeing.',
            },
            {
                id: 'iv-p',
                letter: 'P',
                label: 'Professionalism',
                body: 'Technical expertise and ethical conduct guide operations.',
            },
            {
                id: 'iv-i',
                letter: 'I',
                label: 'Innovation',
                body: 'Continuous improvement through modern technology.',
            },
            {
                id: 'iv-re',
                letter: 'RE',
                label: 'Reliability',
                body: 'Infrastructure investment ensures stable power delivery.',
            },
            {
                id: 'iv-d',
                letter: 'D',
                label: 'Dynamic',
                body: 'Adaptable strategies responding to an evolving energy sector.',
            },
        ],

        /* ---------------------------------------------------- Leadership */
        leadership: [
            {
                id: 'ld-opiegbe',
                key: 'opiegbe',
                name: 'Barr. Ugochukwu Opiegbe',
                role: 'MD, APL Electric Company Limited',
                image:
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
                bio: 'Ugochukwu Opiegbe is the Managing Director of APL Electric Company Limited, leading Aba Power’s distribution business across the Aba ring-fenced area. A legal practitioner and seasoned business executive, he oversees commercial strategy, regulatory compliance and customer operations — driving the company’s mission to deliver reliable, affordable power to homes, businesses and industries across Abia State.',
            },
            {
                id: 'ld-siddi',
                key: 'siddi',
                name: 'Engr. Omeh Abdullahi Siddi',
                role: 'CTA, APL Electric Company Limited',
                image:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
                bio: 'Engr. Omeh Abdullahi Siddi serves as Chief Technical Adviser at APL Electric Company Limited. A chartered engineer with decades of experience in power generation and distribution, he provides technical leadership across the network — from the 188MW embedded generation plant to the 2,800+ distribution substations that keep Aba powered.',
            },
            {
                id: 'ld-nmaram',
                key: 'nmaram',
                name: 'Engr. Livinus Nwaoha Nmaram',
                role: 'DL&D, Geometric Power Training Institute',
                image:
                    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
                bio: 'Engr. Livinus Nwaoha Nmaram is Director of Learning & Development at the Geometric Power Training Institute. He leads capability building for the group’s engineering and technical workforce, ensuring the skills, safety culture and standards required to operate and grow a modern, resilient electricity network.',
            },
            {
                id: 'ld-ngwoke',
                key: 'ngwoke',
                name: 'Engr. Emeka Victor Ngwoke',
                role: 'DCO, APL Electric Company Limited',
                image:
                    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80',
                bio: 'Engr. Emeka Victor Ngwoke is the Distribution Control Officer at APL Electric Company Limited. He oversees real-time network operations — load management, switching and fault restoration — coordinating field crews to keep supply stable across the Aba ring-fenced area.',
            },
            {
                id: 'ld-okonji',
                key: 'okonji',
                name: 'Chigozie Okonji',
                role: 'HHR, Geometric Power Group',
                image:
                    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
                bio: 'Chigozie Okonji leads Human Resources for the Geometric Power Group. She is responsible for talent acquisition, employee engagement, performance management and the people policies that build a capable, motivated workforce for the group’s energy businesses.',
            },
            {
                id: 'ld-agbo',
                key: 'agbo',
                name: 'Stephen Chijioke Agbo',
                role: 'HF&A, APL Electric Company Limited',
                image:
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
                bio: 'Stephen Chijioke Agbo is Head of Finance & Accounts at APL Electric Company Limited. He manages financial reporting, treasury, budgeting and internal controls, ensuring the utility remains financially disciplined, transparent and able to invest in network reliability.',
            },
            {
                id: 'ld-akpata',
                key: 'akpata',
                name: 'Simon Akpata',
                role: 'Head Tech, APL Electric Company Limited',
                image:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
                bio: 'Simon Akpata is Head of Technology at APL Electric Company Limited. He leads the utility’s technical function — network planning, asset management and maintenance — ensuring the Aba distribution infrastructure is upgraded, safe and operated to modern engineering standards.',
            },
        ],
    },

    /* ------------------------------------------------------------- Settings */
    settings: {
        hero: {
            badge: 'POWER DISTRIBUTION',
            title: 'Delivering power directly to homes, businesses and industries.',
            subtitle:
                'Through state-of-the-art technology and distribution expertise, Aba Power supports reliable power delivery to customers, industries and communities.',
            videoUrl: '/aba-power-corporate.mp4',
            imageUrl: 'https://thesouthernexaminer.com/21-04-2023-05-22-54-am-411344.jpg',
            marqueeVisible: true,
        },
        newsroom: {
            badge: 'NEWSROOM',
            title: 'Latest News from',
            titleAccent: 'Aba Power',
            subtitle:
                'Stay informed on the milestones, infrastructure projects and customer updates powering Aba and the wider Abia State economy.',
            autoplay: true,
            speedMs: 4000,
        },
        media: {
            badge: 'MEDIA & EVENTS',
            title: 'Stories, moments and milestones from Aba Power',
            subtitle:
                'A single home for our newsroom and a gallery of the events, community outreaches, safety drives and commissioning ceremonies shaping power across the Aba ring-fenced area.',
            newsroomEyebrow: 'NEWSROOM',
            newsroomTitle: 'Latest news from Aba Power',
            galleryEyebrow: 'EVENTS GALLERY',
            galleryTitle: 'Moments from events at Aba Power',
        },
        branding: {
            siteName: 'APL Electric Company',
            legalName: 'Aba Power Limited',
            phone: '0700-APL-POWER',
            email: 'info@abapower.com',
            address: 'Osisioma Industrial Layout, Aba, Abia State, Nigeria',
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
            linkedin: 'https://linkedin.com',
        },
    },
});

export default seedContent;
