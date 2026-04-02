import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ alumnis }) {
    const { data: dataList, links } = alumnis;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Alumni ini?')) {
            router.delete(route('admin.alumnis.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Direktori Alumni</h2>}>
            <Head title="Manajemen Alumni" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Lulusan & Alumni</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola direktori alumni STIKes, posisi kerja, dan testimoni keberhasilan lulusan.</p>
                        </div>
                        <Link href={route('admin.alumnis.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm">
                            <i className="fas fa-user-graduate mr-2"></i> Tambah Data Alumni
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Profil Alumni</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Akademik</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Karir / Pekerjaan</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status Tampil</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {dataList && dataList.length > 0 ? dataList.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        
                                        {/* PROFIL */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border bg-gray-100 flex-shrink-0">
                                                    {item.photo ? (
                                                        <img
                                                            src={typeof item.photo === 'string' ? (item.photo.startsWith('http') || item.photo.startsWith('/') ? item.photo : `/storage/${item.photo}`) : ''}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.target.outerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold">${(item.name?.charAt(0) || 'A').toUpperCase()}</div>`; }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                                                            {(item.name?.charAt(0) || 'A').toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        NIM: {item.nim || '-'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* AKADEMIK */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs space-y-1">
                                                <div className="font-semibold text-gray-900 dark:text-gray-300">
                                                    {item.program_studi?.name || '-'}
                                                </div>
                                                <div className="text-gray-500">
                                                    Lulus: {item.tahun_lulus || '-'}
                                                </div>
                                            </div>
                                        </td>

                                        {/* KARIR */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.tempat_kerja || item.jabatan ? (
                                                <div className="text-xs space-y-1">
                                                    <div className="font-semibold text-gray-900 dark:text-gray-300">
                                                        {item.jabatan || 'Alumni'}
                                                    </div>
                                                    <div className="text-indigo-600">
                                                        {item.tempat_kerja || '-'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">
                                                    Belum ada data karir
                                                </span>
                                            )}
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">

                                                {item.is_active ? (
                                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                                                        Nonaktif
                                                    </span>
                                                )}

                                                {item.is_featured && (
                                                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                                                        ⭐ Featured
                                                    </span>
                                                )}

                                            </div>
                                        </td>

                                        {/* AKSI */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">

                                                <Link
                                                    href={route('admin.alumnis.edit', item.id)}
                                                    className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded"
                                                >
                                                    Hapus
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-400">
                                            Belum ada data alumni
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
