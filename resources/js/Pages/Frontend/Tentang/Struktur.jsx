import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function Struktur({ data }) {
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

    const title = data?.title || 'Struktur Organisasi';
    const subtitle = parsedContent.subtitle || 'Susunan kepengurusan dan pimpinan akademik STIKes Bogor Husada.';
    const htmlContent = parsedContent.content;
    const featuresTitle = parsedContent.features_title || 'Unsur Pimpinan Utama';
    const features = parsedContent.features || [];

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            <Hero
                content={{
                    title: title,
                    subtitle: subtitle,
                    image: data?.image || '/assets/img/hero-fallback.png',
                    gradient: 'dark',
                }}
            />

            <div className="py-16 md:py-24 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    {/* Visual / Image Content Container */}
                    {htmlContent ? (
                        <div className="max-w-5xl mx-auto mt-6 text-center prose prose-lg prose-indigo text-gray-700 mb-16 overflow-x-auto"
                             dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    ) : (data?.image ? (
                        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-lg border border-gray-100 inline-block mb-16">
                            <img src={`/storage/${data.image}`} alt="Struktur Organisasi" className="max-w-full h-auto rounded-xl" />
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-12 rounded-3xl border border-dashed border-gray-300 mb-16">
                            <i className="fas fa-sitemap text-4xl text-gray-400 mb-4 block"></i>
                            <p className="text-gray-500">Bagan sruktur organisasi belum diunggah.</p>
                        </div>
                    ))}

                    {/* Features (Pimpinan) Section */}
                    {features && features.length > 0 && (
                        <div className="mt-12 text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                                {featuresTitle}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-4">
                                            <i className={feature.icon || 'fas fa-user-circle'}></i>
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h4>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </MainLayout>
    );
}
