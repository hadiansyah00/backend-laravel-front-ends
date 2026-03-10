import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function Sambutan({ data }) {
    // Parse the JSON content from `data.content`
    let parsedContent = {};
    if (data?.content) {
        try {
            parsedContent = JSON.parse(data.content);
        } catch (e) {
            // fallback if it's not JSON but plain text
            parsedContent = {
                content: data.content
            };
        }
    }

    const pageTitle = data?.title || 'Sambutan Ketua';
    const subtitle = parsedContent.subtitle || 'Pesan dari pimpinan STIKes Bogor Husada';
    const contentTitle = parsedContent.content_title || pageTitle;
    const sambutanHtml = parsedContent.content || '<p>Sambutan belum tersedia.</p>';
    const imageAlign = parsedContent.image_align || 'left';
    const contentImage = parsedContent.content_image;

    // Optional styling based on alignment
    const isImageLeft = imageAlign === 'left';
    const flexDirClass = isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse';

    return (
        <MainLayout title={pageTitle}>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <Hero
                content={{
                    title: pageTitle,
                    subtitle: subtitle,
                    image: data?.image || '/assets/img/hero-fallback.png',
                    gradient: 'dark',
                }}
            />

            <div className="py-16 md:py-24 bg-gray-50/50">
                <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${flexDirClass} gap-12 items-start`}>
                    {contentImage && (
                        <div className="md:w-1/3 flex-shrink-0 w-full">
                            <img 
                                src={contentImage.startsWith('http') || contentImage.startsWith('/') ? contentImage : `/storage/${contentImage}`} 
                                alt="Ketua STIKes" 
                                className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[890/2560] object-top" 
                            />
                        </div>
                    )}
                    <div className="md:w-2/3 w-full">
                        {contentTitle && (
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
                                {contentTitle}
                            </h2>
                        )}
                        <div className="prose prose-lg prose-indigo text-gray-700 max-w-none whitespace-pre-wrap leading-relaxed" 
                             dangerouslySetInnerHTML={{ __html: sambutanHtml }} 
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
