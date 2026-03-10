import React, { useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ pages }) {

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus halaman ini dan semua section di dalamnya?')) {
            router.delete(route('admin.pages.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // Group pages by menu name (atau parent menu)
    const groupedPages = useMemo(() => {
        const groups = {};

        // Handle pages without menus
        groups['Belum Berelasi Menu'] = [];

        if (pages && pages.length > 0) {
            pages.forEach(page => {
                if (page.menu) {
                    const menuName = page.menu.name;
                    if (!groups[menuName]) {
                        groups[menuName] = [];
                    }
                    groups[menuName].push(page);
                } else {
                    groups['Belum Berelasi Menu'].push(page);
                }
            });
        }

        // Delete 'Belum Berelasi Menu' if empty
        if (groups['Belum Berelasi Menu'].length === 0) {
            delete groups['Belum Berelasi Menu'];
        }

        return groups;
    }, [pages]);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Landing Pages</h2>}>
            <Head title="Landing Pages" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Halaman Utama (Pages)</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola halaman "Tentang Kami", "Akademik", "Profil", dll.</p>
                        </div>
                        <Link href={route('admin.pages.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm">
                            <i className="fas fa-plus mr-2"></i> Buat Halaman Baru
                        </Link>
                    </div>

                    <div className="p-6">
                        {Object.keys(groupedPages).length > 0 ? (
                            <div className="space-y-8">
                                {Object.entries(groupedPages).map(([menuName, groupPages]) => (
                                    <div key={menuName} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                                        <div className="bg-gray-50/80 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-3">
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                                <i className="fas fa-folder text-indigo-500"></i> Menu: {menuName}
                                            </h4>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                                                <thead className="bg-white dark:bg-gray-900">
                                                    <tr>
                                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">Judul / Path URL</th>
                                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-5 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi / Builder</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                                                    {groupPages.map((item) => (
                                                        <tr key={item.id} className="hover:bg-indigo-50/30 dark:hover:bg-gray-800/50 transition-colors">
                                                            <td className="px-5 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                                                                        <i className={`fas ${item.icon ? item.icon : 'fa-file-alt'} text-lg`}></i>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold text-gray-900 dark:text-white text-sm">
                                                                            {item.title}
                                                                        </div>
                                                                        <div className="text-xs text-gray-400 mt-0.5 font-mono">/{item.slug}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap">
                                                                <span className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md tracking-wider ${item.is_published ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                                                                    {item.is_published ? 'Published' : 'Draft'}
                                                                </span>
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    {item.template === 'default' ? (
                                                                        <Link href={route('admin.pages.sections.index', item.slug)} title="Universal Sections Builder" className="w-auto px-4 py-1.5 flex items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm text-xs font-bold gap-2">
                                                                            <i className="fas fa-layer-group"></i> Sections Builder
                                                                        </Link>
                                                                    ) : (
                                                                        <span title="Halaman ini menggunakan Template Tetap" className="w-auto px-4 py-1.5 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 shadow-inner text-xs font-bold gap-2 cursor-not-allowed border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500">
                                                                            <i className="fas fa-th-large"></i> Fixed Template
                                                                        </span>
                                                                    )}

                                                                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                                                                    <Link href={route('admin.seo.edit', { type: 'pages', id: item.id })} title="SEO Meta Data" className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 transition-colors">
                                                                        <i className="fas fa-search"></i>
                                                                    </Link>
                                                                    <Link href={route('admin.pages.edit', item.id)} title="Pengaturan Halaman & Hero" className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
                                                                        <i className="fas fa-cog"></i>
                                                                    </Link>
                                                                    <button onClick={() => handleDelete(item.id)} title="Hapus Halaman" className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors">
                                                                        <i className="fas fa-trash-alt"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <i className="fas fa-file-alt text-5xl mb-4 text-gray-300"></i>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Belum ada halaman dinamis.</h3>
                                <p>Klik tombol "Buat Halaman Baru" untuk memulai.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
