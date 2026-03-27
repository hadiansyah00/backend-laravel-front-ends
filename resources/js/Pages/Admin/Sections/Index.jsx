import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ page, sections, sectionTypes }) {

    // Sort sections explicitly by order just in case
    const sortedSections = [...(sections || [])].sort((a, b) => a.order - b.order);

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus section (blok konten) ini?')) {
            router.delete(route('admin.pages.sections.destroy', { page: page.slug, section: id }), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Universal Builder: {page.title}</h2>}>
            <Head title={`Builder - ${page.title}`} />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/20">
                        <div className="flex items-center gap-4">
                            <Link href={route('admin.pages.index')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-indigo-600 shadow-sm border border-gray-200 dark:border-gray-700 transition-all">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">Halaman</span>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">{page.title}</h3>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <i className="fas fa-link text-gray-400"></i> /{page.slug}
                                    <span className="text-gray-300 dark:text-gray-600">|</span>
                                    <span>Halaman Induk: {page.menu ? page.menu.name : 'Tidak ada'}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-bold text-xs text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition shadow-sm">
                                <i className="fas fa-external-link-alt mr-2"></i> Preview Halaman
                            </a>
                            <Link href={`/admin/pages/${page.id}/sections/create`} className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 border border-transparent rounded-lg font-bold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 transition shadow-sm">
                                <i className="fas fa-plus mr-2"></i> Tambah Section Blok
                            </Link>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50/30 dark:bg-gray-900/50 min-h-[400px]">
                        {sortedSections && sortedSections.length > 0 ? (
                            <div className="space-y-4 max-w-5xl mx-auto">

                                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border border-blue-100 dark:border-blue-800/50 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                                        <i className="fas fa-info-circle"></i>
                                        <span>Susunan antarmuka halaman dibangun berdasarkan urutan blok konten section di bawah ini.</span>
                                    </div>
                                    <span className="font-mono bg-blue-100 dark:bg-blue-900 py-0.5 px-2 rounded font-bold text-blue-700 dark:text-blue-400 text-xs">Total: {sortedSections.length} Blok</span>
                                </div>

                                {sortedSections.map((section, index) => (
                                    <div key={section.id} className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all overflow-hidden flex items-stretch">

                                        {/* Drag Handle & Order */}
                                        <div className="w-16 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 border-r border-gray-100 dark:border-gray-700 cursor-move py-4">
                                            <span className="text-gray-300 dark:text-gray-600 group-hover:text-indigo-400 mb-1 transition-colors">
                                                <i className="fas fa-grip-vertical"></i>
                                            </span>
                                            <span className="text-xs font-black text-gray-500">{section.order}</span>
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 p-5 flex items-center justify-between gap-4">
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                                    {sectionTypes[section.type] || section.type}
                                                    <span className="text-[10px] font-mono font-normal uppercase tracking-wider bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
                                                        {section.type}
                                                    </span>
                                                </h4>

                                                {/* Preview text hint based on content JSON */}
                                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1.5 flex gap-3">
                                                    {section.content?.title && (
                                                        <span><span className="font-semibold text-gray-600 dark:text-gray-300">H:</span> {section.content.title}</span>
                                                    )}
                                                    {section.content?.subtitle && (
                                                        <span><span className="font-semibold text-gray-600 dark:text-gray-300">S:</span> {section.content.subtitle}</span>
                                                    )}
                                                    {section.content?.html && (
                                                        <span><span className="font-semibold text-gray-600 dark:text-gray-300">HTML:</span> Rich Text Content...</span>
                                                    )}
                                                    {(!section.content?.title && !section.content?.subtitle && !section.content?.html) && (
                                                        <span className="italic">Data konfigurasi khusus komponen...</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                                                <Link href={route('admin.pages.sections.edit', { page: page.slug, section: section.id })} className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 transition-colors shadow-sm">
                                                    <i className="fas fa-pen"></i>
                                                </Link>
                                                <button onClick={() => handleDelete(section.id)} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 transition-colors shadow-sm">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-flex w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/20 items-center justify-center mb-6">
                                    <i className="fas fa-layer-group text-4xl text-indigo-300 dark:text-indigo-500/50 relative">
                                        <i className="fas fa-plus absolute -bottom-1 -right-1 text-xl text-indigo-500 bg-indigo-50 dark:bg-gray-900 rounded-full border-2 border-white dark:border-gray-900 w-8 h-8 flex items-center justify-center"></i>
                                    </i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum ada blok konten (Section)</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">Halaman ini masih kosong. Silakan tambahkan section baru seperti "Title", "Text w/ Image", "Grid Tim", atau "Call to Action" untuk mulai membangun halaman dinamis ini.</p>
                                <Link href={`/admin/pages/${page.id}/sections/create`} className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 border border-transparent rounded-xl font-bold text-sm text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none">
                                    <i className="fas fa-plus mr-2"></i> Tambah Section Pertama
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
