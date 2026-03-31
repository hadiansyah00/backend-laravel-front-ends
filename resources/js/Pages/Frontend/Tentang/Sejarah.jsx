import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Sections/Hero';
import { Head } from '@inertiajs/react';

export default function Sejarah({ data }) {
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

    const title = data?.title || 'Sejarah Institusi';
    const subtitle = parsedContent.subtitle || 'Perjalanan panjang STIKes Bogor Husada';
    const textContent = parsedContent.content || '<p>Konten sejarah belum tersedia.</p>';
    const timeline = parsedContent.timeline || { items: [] };

    return (
        <MainLayout title={title}>
            <Head>
                <title>{title}</title>
            </Head>

            <Hero
                content={{
                    title: title,
                    subtitle: subtitle,
                    image: data?.image || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
                    gradient: 'orange',
                    breadcrumbs: [
                        { label: 'Tentang Kami', url: null },
                        { label: 'Sejarah Institusi', url: null }
                    ]
                }}
            />

            {/* Rich Text Presentation Section */}
            <div className="py-16 md:py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-bold tracking-widest uppercase mb-4">
                            Latar Belakang
                        </span>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto"></div>
                    </div>
                    <div className="prose prose-lg prose-orange text-gray-700 max-w-none leading-relaxed" 
                         dangerouslySetInnerHTML={{ __html: textContent }} />
                </div>
            </div>

            {/* Timeline Roadmap Section */}
            {timeline.items && timeline.items.length > 0 && (
                <div className="py-16 md:py-24 bg-gray-50/50 border-t border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm text-orange-600 flex items-center justify-center text-3xl mx-auto mb-6">
                                <i className={timeline.icon || 'fas fa-route'}></i>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                                {timeline.title || 'Roadmap'}
                            </h2>
                        </div>

                        <div className="relative border-l-4 border-orange-200 ml-4 md:ml-0 md:border-none">
                            {/* Desktop center line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 -translate-x-1/2 rounded-full"></div>
                            
                            <div className="space-y-12">
                                {timeline.items.map((item, idx) => {
                                    const isEven = idx % 2 === 0;
                                    return (
                                        <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                            
                                            {/* Node Marker */}
                                            <div className="absolute -left-[1.35rem] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-orange-500 shadow flex items-center justify-center z-10 top-0 md:top-auto">
                                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            </div>

                                            {/* Content side */}
                                            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                                <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 transition-transform duration-300 hover:-translate-y-1 relative group`}>
                                                    
                                                    {/* Decorative arrow pointing to timeline */}
                                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-100 transform rotate-45 ${isEven ? '-right-2 border-l border-b-transparent' : '-left-2 border-b border-r-transparent border-t-transparent'}`}></div>

                                                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 font-bold rounded-lg mb-3 shadow-sm border border-orange-100">
                                                        {item.year || 'Tahun'}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                                                </div>
                                            </div>

                                            {/* Empty side for spacing */}
                                            <div className="hidden md:block w-1/2"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
