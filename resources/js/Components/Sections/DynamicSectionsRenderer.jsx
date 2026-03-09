import React from 'react';

// Import All Available Section Components
import HeroStaticSection from './HeroStaticSection';
import VisiMisiSection from './VisiMisiSection';
import ContentWithImageSection from './ContentWithImageSection';
import TimelineSection from './TimelineSection';
import RichTextSection from './RichTextSection';
import FeatureSection from './FeatureSection';
import DosenSection from './DosenSection';
import TableSection from './TableSection';
// Note: Future components (CardGrid, Testimonial, etc.) will be added here.

const COMPONENT_MAP = {
    'hero_static': HeroStaticSection,
    'visi_misi': VisiMisiSection,
    'content_with_image': ContentWithImageSection,
    'rich_text': RichTextSection,
    'feature': FeatureSection,
    'timeline': TimelineSection,
    'dosen_list': DosenSection,
    'table': TableSection,
};

export default function DynamicSectionsRenderer({ sections }) {
    if (!sections || !Array.isArray(sections) || sections.length === 0) {
        return (
            <div className="py-20 text-center text-gray-500 dark:text-gray-400">
                Belum ada konten untuk halaman ini.
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            {sections.map((section, index) => {
                const ComponentType = COMPONENT_MAP[section.type];

                // Jika komponen belum didefinisikan di map, abaikan render.
                if (!ComponentType) {
                    console.warn(`[Renderer] Missing component mapping for type: ${section.type}`);
                    return null;
                }

                // Render komponen dengan me-lempar state 'data'
                return <ComponentType key={`${section.type}-${index}`} data={section.content} />;
            })}
        </div>
    );
}
