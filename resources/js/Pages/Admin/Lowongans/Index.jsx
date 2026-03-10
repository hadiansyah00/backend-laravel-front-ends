import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ lowongans }) {
    const { data: dataList, links } = lowongans;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Lowongan ini?')) {
            router.delete(route('admin.lowongans.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'full-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400';
            case 'part-time': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400';
            case 'magang': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400';
            case 'kontrak': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const formatType = (type) => {
        switch (type) {
            case 'full-time': return 'Penuh Waktu (Full-Time)';
            case 'part-time': return 'Paruh Waktu (Part-Time)';
            case 'magang': return 'Magang / PKL';
            case 'kontrak': return 'Pegawai Kontrak';
            default: return type;
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Bursa Kerja</h2>}>
            <Head title="Bursa Kerja / Lowongan" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Lowongan Pekerjaan</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola data bursa kerja (Job Portal) yang ditujukan untuk lulusan dan umum.</p>
                        </div>
                        <Link href={route('admin.lowongans.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm">
                            <i className="fas fa-briefcase mr-2"></i> Tambah Lowongan
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Perusahaan & Posisi</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipe & Lokasi</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Jadwal & Deadline</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {dataList && dataList.length > 0 ? dataList.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-indigo-500">
                                                    <i className="fas fa-building text-2xl"></i>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white text-base mb-0.5">{item.title}</div>
                                                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{item.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs space-y-1.5 flex flex-col items-start gap-1">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getTypeColor(item.type)}`}>
                                                    {formatType(item.type)}
                                                </span>
                                                <div className="text-gray-600 dark:text-gray-400"><i className="fas fa-map-marker-alt text-gray-400 mr-1.5 w-3 text-center"></i> {item.location || '-'}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs space-y-1.5">
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    <i className="far fa-calendar-alt text-gray-400 w-4 text-center"></i> Dibuat: {new Date(item.created_at).toLocaleDateString('id-ID')}
                                                </div>
                                                <div className={`font-semibold ${item.deadline && new Date(item.deadline) < new Date() ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-300'}`}>
                                                    <i className="fas fa-hourglass-half text-gray-400 w-4 text-center"></i> DL: {item.deadline ? new Date(item.deadline).toLocaleDateString('id-ID') : 'Tidak ditentukan'}
                                                </div>
                                            </div>
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
                                                <Link href={route('admin.lowongans.edit', item.id)} title="Edit Loker" className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors">
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button onClick={() => handleDelete(item.id)} title="Hapus Loker" className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            <i className="fas fa-briefcase text-4xl mb-3 text-gray-300"></i>
                                            <p>Belum ada data lowongan pekerjaan.</p>
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
