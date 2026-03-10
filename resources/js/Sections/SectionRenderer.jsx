import React from 'react';

// Import Generic Components
import Hero from './Hero';
import TextContent from './TextContent';
import ContentWithImage from './ContentWithImage';
import CardGrid from './CardGrid';
import Feature from './Feature';
import Testimonial from './Testimonial';
import VisiMisi from './VisiMisi';
import ProdiProfile from './ProdiProfile';
import Stats from './Stats';
import Faq from './Faq';
import ContactInfo from './ContactInfo';

// Fallback component for unimplemented sections
const DefaultSection = ({ type }) => (
    <div className="container py-12 mx-auto text-center border-2 border-dashed border-gray-300 rounded-lg">
        <h3 className="font-semibold text-gray-500">Unimplemented Section Type: <span className="text-orange-600">{type}</span></h3>
    </div>
);

export default function SectionRenderer({ section, pageInfo }) {
    if (!section || !section.content) return null;

    // Normalizing section content type string if needed 
    const type = section.type;

    // Content is a JSON object from Laravel
    const content = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;

    switch (type) {
        case 'hero':
            // Hero is now rendered centrally in DynamicPage.jsx using page specific fields
            return null;

        case 'content-with-image':
        case 'image-text':
            return <ContentWithImage content={content} />;

        case 'card-grid':
            return <CardGrid content={content} />;

        case 'feature':
            return <Feature content={content} />;

        case 'testimonial':
            return <Testimonial content={content} />;

        case 'visi-misi':
            return <VisiMisi content={content} />;

        case 'prodi-profile':
            return <ProdiProfile content={content} />;

        case 'stats':
            return <Stats content={content} />;

        case 'faq':
            return <Faq content={content} />;

        case 'contact-info':
            return <ContactInfo content={content} />;

        case 'text_content':
        case 'title':
        case 'richtext':
            return <TextContent content={content} />;

        default:
            return <DefaultSection type={type} />;
    }
}
