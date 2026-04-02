import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ articles, filters }) {

    const { data: dataList, links } = articles;

    const [search, setSearch] = useState(filters.search || '');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.articles.index'), { search, start_date: startDate, end_date: endDate }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        router.get(route('admin.articles.index'));
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(route('admin.articles.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Berita & Artikel</h2>}>
            <Head title="Berita & Artikel" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Berita & Artikel</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola publikasi berita, artikel akademik, dan informasi lainnya.</p>
                        </div>
                        <Link href={route('admin.articles.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm">
                            <i className="fas fa-plus mr-2"></i> Tulis Artikel
                        </Link>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cari Judul</label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Ketik kata kunci..."
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="w-full sm:w-auto">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mulai Tgl</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="w-full sm:w-auto">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sampai Tgl</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                <button type="submit" className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                                    Filter
                                </button>
                                <button type="button" onClick={handleReset} className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Berita / Artikel</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {dataList && dataList.length > 0 ? dataList.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-4">
                                                {item.thumbnail ? (
                                                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 mt-1">
                                                        <img src={typeof item.thumbnail === 'string' ? (item.thumbnail.startsWith('http') || item.thumbnail.startsWith('/') ? item.thumbnail : `/storage/${item.thumbnail}`) : ''} alt={item.title} className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 shadow-sm border border-gray-200 dark:border-gray-700 mt-1">
                                                        <i className="far fa-newspaper text-xl"></i>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1">{item.title}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                                        <span><i className="far fa-clock mr-1"></i>{item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                        <span><i className="far fa-eye mr-1"></i>{item.views || 0} x dilihat</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                                                {item.category?.name || 'Uncategorized'}
                                            </span>
                                            {item.tags && item.tags.length > 0 && (
                                                <div className="mt-1.5 flex flex-wrap gap-1">
                                                    {item.tags.slice(0, 2).map((tag, i) => (
                                                        <span key={i} className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">#{tag.name}</span>
                                                    ))}
                                                    {item.tags.length > 2 && <span className="text-[10px] text-gray-400 bg-transparent px-1">+{item.tags.length - 2}</span>}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full tracking-wider ${item.status === 'published' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' : 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50'}`}>
                                                {item.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a href={`/berita/${item.slug}`} target="_blank" rel="noreferrer" title="Lihat di Web" className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                                <Link href={route('admin.seo.edit', { type: 'articles', id: item.id })} title="SEO Meta Data" className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors">
                                                    <i className="fas fa-search"></i>
                                                </Link>
                                                <Link href={route('admin.articles.edit', item.id)} title="Edit Artikel" className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors">
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button onClick={() => handleDelete(item.id)} title="Hapus Artikel" className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                            <i className="far fa-newspaper text-4xl mb-3 text-gray-300"></i>
                                            <p>Belum ada berita atau artikel.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {links && links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2">
                            {links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 min-w-[32px] text-center text-sm rounded-md transition-colors ${link.active ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
