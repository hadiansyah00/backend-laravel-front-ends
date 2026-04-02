import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ kerjasamas }) {

    const dataList = kerjasamas && kerjasamas.data ? kerjasamas.data : kerjasamas;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus mitra kerjasama ini?')) {
            router.delete(route('admin.kerjasamas.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Jaringan Mitra</h2>}>
            <Head title="Jaringan Mitra" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Mitra Kerjasama</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola logo dan institusi jaringan kemitraan yang muncul pada beranda utama.</p>
                        </div>
                        <Link href={route('admin.kerjasamas.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-xl font-semibold text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm">
                            <i className="fas fa-plus mr-2"></i> Tambah Mitra
                        </Link>
                    </div>

                    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {dataList && dataList.length > 0 ? dataList.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col items-center p-4">
                                <div className="relative w-full aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-xl mb-4 group overflow-hidden">
                                    <img src={typeof item.logo === 'string' ? (item.logo.startsWith('http') || item.logo.startsWith('/') ? item.logo : `/storage/${item.logo}`) : ''} alt={item.name} className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500" />
                                    
                                    {/* Action Overlays */}
                                    <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                        <Link href={route('admin.kerjasamas.edit', item.id)} title="Edit Mitra" className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white hover:text-gray-900 flex items-center justify-center transition">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} title="Hapus Mitra" className="w-8 h-8 rounded-full bg-red-500/80 text-white hover:bg-red-600 flex items-center justify-center transition">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        {item.url && (
                                            <a href={item.url} target="_blank" rel="noreferrer" title="Lihat Website" className="w-8 h-8 rounded-full bg-indigo-500/80 text-white hover:bg-indigo-600 flex items-center justify-center transition">
                                                <i className="fas fa-external-link-alt"></i>
                                            </a>
                                        )}
                                    </div>
                                    
                                    <div className="absolute top-2 left-2">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md shadow-sm backdrop-blur-md ${item.is_active ? 'bg-emerald-500/80 text-white' : 'bg-gray-800/80 text-gray-300'}`}>
                                            {item.is_active ? 'Aktif' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 text-center text-sm">{item.name}</h4>
                            </div>
                        )) : (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                <i className="fas fa-handshake text-4xl mb-3 text-gray-300"></i>
                                <p>Belum ada data mitra kerjasama.</p>
                            </div>
                        )}
                    </div>

                    {kerjasamas && kerjasamas.links && kerjasamas.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2">
                            {kerjasamas.links.map((link, idx) => (
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
