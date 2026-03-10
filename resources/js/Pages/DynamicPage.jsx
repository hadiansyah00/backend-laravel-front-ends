import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import SectionRenderer from '../Sections/SectionRenderer';
import Hero from '../Sections/Hero';
import { Head } from '@inertiajs/react';

// Helper untuk memparsing JSON string Editor.js
function parseBlockContent(jsonContent) {
    if (!jsonContent) return '';
    try {
        const parsed = JSON.parse(jsonContent);
        if (parsed.blocks && Array.isArray(parsed.blocks)) {
            return parsed.blocks.map(block => {
                if (block.type === 'paragraph') return `<p>${block.data.text}</p>`;
                if (block.type === 'header') return `<h${block.data.level || 2} class="font-bold text-gray-900 mt-8 mb-4">${block.data.text}</h${block.data.level || 2}>`;
                if (block.type === 'list') {
                    const listType = block.data.style === 'ordered' ? 'ol' : 'ul';
                    const listClass = block.data.style === 'ordered' ? 'list-decimal list-inside' : 'list-disc list-inside';
                    const items = block.data.items.map(item => `<li>${item}</li>`).join('');
                    return `<${listType} class="${listClass} my-4 space-y-2 text-gray-600">${items}</${listType}>`;
                }
                // Tambahkan parser block type lainnya jika diperlukan
                return '';
            }).join('');
        }
        return jsonContent; // Jika bukan format Editor.js
    } catch (e) {
        // Jika raw HTML biasa
        return jsonContent;
    }
}

export default function DynamicPage({ page, sections }) {
    // page.title, page.content dll bisa dipakai
    return (
        <MainLayout title={page?.title || 'Halaman Dinamis'}>

            {/* SEO Meta ditangani via <Head> (Basic) dan custom tags di Header laravel kalo ada */}
            <Head>
                <title>{page?.title}</title>
            </Head>

            <article className="w-full">

                {/* 1. Universal Hero Section (Built-in for all pages) */}
                <Hero
                    content={{
                        title: page?.hero_title || page?.title,
                        subtitle: page?.hero_subtitle,
                        image: page?.hero_bg_image,
                        gradient: 'dark', // default visual
                        breadcrumbs: []   // add breadcrumb logic if needed
                    }}
                    pageInfo={page}
                />

                {/* 2. Dynamic Content Sections Builder */}
                <div className="bg-white">
                    {sections && sections.length > 0 ? (
                        sections.map((section, index) => (
                            <SectionRenderer key={section.id || index} section={section} pageInfo={page} />
                        ))
                    ) : (
                        /* Fallback jika page tidak memiliki section satupun / masih kosong */
                        <div className="py-24 max-w-4xl mx-auto px-6 text-center">
                            {page?.content ? (
                                /* Legacy support jika masih ada data konten lama di database */
                                <div className="prose prose-lg prose-indigo mx-auto text-left text-gray-600">
                                    <div dangerouslySetInnerHTML={{ __html: parseBlockContent(page?.content) }} />
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Konten halaman sedang dalam penyesuaian oleh tim admin.</p>
                            )}
                        </div>
                    )}
                </div>
            </article>

        </MainLayout>
    );
}
