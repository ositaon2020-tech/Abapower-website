import React from 'react';
import { IconActivity } from './Icons';
import { useContent } from '../context/ContentContext';
import { useCountUp } from '../hooks/useCountUp';

/**
 * PowerStats
 * "Aba Power by the numbers" bento stat grid.
 * Layout mirrors the reference image (one tall image card + four stat tiles)
 * but is themed in the Aba Power blue / gold palette.
 *
 * Items are read from the CMS `powerStats` collection; each card's look is
 * chosen by its `variant` field (image / blue / accent / white / navy).
 */
const DEFAULT_STATS = [
    {
        id: 'ps-1',
        value: '11',
        caption: '33 KV Feeders',
        variant: 'image',
        image: 'https://i.pinimg.com/736x/25/61/29/2561292d8c143063a866a31e8e3a757b.jpg',
    },
    { id: 'ps-2', value: '35', caption: '11 KV Feeders', variant: 'blue' },
    { id: 'ps-3', value: '2800 +', caption: 'Distribution Substations', variant: 'accent' },
    { id: 'ps-4', value: '11', caption: 'Injection Substations', variant: 'white' },
    {
        id: 'ps-5',
        value: '9 LGAs',
        caption:
            'Aba ring-fenced service area supporting businesses, households and communities.',
        variant: 'navy',
    },
];

const VARIANTS = {
    image: {
        card: 'md:row-span-2 relative overflow-hidden min-h-[320px] md:min-h-full',
        value: 'text-white',
        caption: 'text-white/90',
        description: 'text-white/80',
    },
    blue: {
        card: 'bg-gradient-to-br from-[#0072CE] via-[#0066b8] to-[#00518f]',
        value: 'text-white',
        caption: 'text-white/90',
        description: 'text-white/75',
    },
    accent: {
        card: 'bg-gradient-to-br from-[#b8dcfb] to-[#8fc6f4] border border-white/60',
        value: 'text-[#0b2a4a]',
        caption: 'text-[#123a63]',
        description: 'text-[#123a63]/80',
    },
    navy: {
        card: 'bg-gradient-to-br from-[#0b2440] to-[#030f1e] border border-[#0072CE]/30',
        value: 'text-white',
        caption: 'text-white/85',
        description: 'text-white/70',
    },
    white: {
        card: 'bg-white border border-[#cfe2f5]',
        value: 'text-[#0b2a4a]',
        caption: 'text-[#3b5670]',
        description: 'text-[#3b5670]/80',
    },
};

function StatCard({ item }) {
    const variant = VARIANTS[item.variant] || VARIANTS.white;
    // Numbers tick up from zero the first time the tile is scrolled into view.
    const [valueRef, displayValue] = useCountUp(item.value);

    return (
        <div className={`group rounded-3xl p-8 min-h-[220px] shadow-lg flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1.5 ${variant.card}`}>
            {item.variant === 'image' && item.image && (
                <>
                    <img
                        src={item.image}
                        alt={item.caption}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030f1e]/95 via-[#030f1e]/70 to-[#030f1e]/35"></div>
                </>
            )}
            <div className="relative z-10">
                <div
                    ref={valueRef}
                    className={`text-5xl sm:text-6xl font-extrabold heading-font tracking-tight mb-4 ${variant.value}`}
                >
                    {displayValue}
                </div>
                <p className={`text-base leading-relaxed max-w-sm ${variant.caption}`}>
                    {item.caption}
                </p>
                {item.description && (
                    <p className={`text-sm leading-relaxed mt-2 max-w-sm ${variant.description}`}>
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function PowerStats() {
    const { getCollection } = useContent();
    const stored = getCollection('powerStats');
    const stats = stored.length ? stored : DEFAULT_STATS;

    return (
        <section
            id="stats"
            className="relative py-24 bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa] border-t border-[#0072CE]/20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12" data-reveal="up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                        <IconActivity className="w-3.5 h-3.5 text-[#F5B800]" />
                        <span>OUR STATS</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.08] max-w-3xl">
                        Aba Power by the numbers
                    </h2>
                </div>

                {/* Bento grid — cards come from the CMS `powerStats` collection */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5" data-reveal-stagger>
                    {stats.map((item) => (
                        <StatCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
