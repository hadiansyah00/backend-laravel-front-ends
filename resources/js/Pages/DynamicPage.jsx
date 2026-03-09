import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import SectionRenderer from '../Sections/SectionRenderer';
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
                {/* Looping semua sections dan me-render berdasarkan type */}
                {sections && sections.length > 0 ? (
                    sections.map((section, index) => (
                        <SectionRenderer key={section.id || index} section={section} pageInfo={page} />
                    ))
                ) : (
                    // Fallback jika page tidak menggunakan section modular tapi content HTML/JSON basic
                    <div className="pt-32 pb-24 bg-gray-50">
                        <div className="container px-6 mx-auto lg:px-12">
                            <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-3xl">
                                <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl text-center mb-6">
                                    {page?.title}
                                </h1>
                                <div className="w-24 h-1.5 mx-auto mt-6 mb-12 bg-orange-600 rounded-full"></div>
                                <div className="prose prose-lg prose-indigo max-w-none text-gray-600 leading-relaxed">
                                    <div dangerouslySetInnerHTML={{ __html: parseBlockContent(page?.content) || '<p class="text-center text-gray-500 italic">Konten halaman sedang diperbarui.</p>' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </article>

        </MainLayout>
    );
}
