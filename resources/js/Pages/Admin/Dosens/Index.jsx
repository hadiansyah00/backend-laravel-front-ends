import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ dosens, filters, prodis }) {
    const { data: dataList, links } = dosens;

    const [search, setSearch] = useState(filters?.search || '');
    const [prodi, setProdi] = useState(filters?.prodi || '');

    const handleFilter = () => {
        router.get(route('admin.dosens.index'), { search, prodi }, {
            preserveState: true,
            replace: true,
        });
    };

    // Auto-search when prodi changes
    useEffect(() => {
        if (prodi !== (filters?.prodi || '')) {
            handleFilter();
        }
    }, [prodi]);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Dosen ini?')) {
            router.delete(route('admin.dosens.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Dosen</h2>}>
            <Head title="Staff Akademik & Dosen" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Dosen STIKes</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola data dosen dan staff akademik yang tampil di website lembaga.</p>
                        </div>
                        <Link href={route('admin.dosens.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm whitespace-nowrap">
                            <i className="fas fa-user-plus mr-2"></i> Tambah Dosen
                        </Link>
                    </div>

                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i className="fas fa-search text-gray-400"></i>
                                </span>
                                <input
                                    type="text"
                                    className="block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white pl-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                                    placeholder="Cari Dosen (Nama, NIDN, NIP)..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                />
                            </div>
                            <div className="sm:w-64">
                                <select
                                    className="block w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                                    value={prodi}
                                    onChange={(e) => setProdi(e.target.value)}
                                >
                                    <option value="">Semua Program Studi</option>
                                    {prodis && prodis.map((p, idx) => (
                                        <option key={idx} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleFilter}
                                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm"
                            >
                                Filter
                            </button>
                            {(search || prodi) && (
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setProdi('');
                                        router.get(route('admin.dosens.index'));
                                    }}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Profil Dosen</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Identitas & Kontak</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Program Studi</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {dataList && dataList.length > 0 ? dataList.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                                    {item.photo ? (
                                                        <img src={`/${item.photo}`} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg bg-gray-200 dark:bg-gray-700">
                                                            {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{item.name}</div>
                                                    <div className="text-xs text-gray-500 font-medium">{item.position || '-'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs space-y-1">
                                                <div className="text-gray-900 dark:text-gray-300"><span className="text-gray-500 uppercase w-10 inline-block">NIDN</span> : <span className="font-semibold">{item.nidn || '-'}</span></div>
                                                <div className="text-gray-900 dark:text-gray-300"><span className="text-gray-500 uppercase w-10 inline-block">NIP</span> : <span className="font-semibold">{item.nip || '-'}</span></div>
                                                {item.email && (
                                                    <div className="text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1.5"><i className="fas fa-envelope text-gray-400"></i> {item.email}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                                                {item.prodi || 'Umum'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.is_active ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span> Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.dosens.edit', item.id)} title="Edit Profil" className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors">
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button onClick={() => handleDelete(item.id)} title="Hapus Dosen" className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            <i className="fas fa-chalkboard-teacher text-4xl mb-3 text-gray-300"></i>
                                            <p>Belum ada data Dosen.</p>
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
