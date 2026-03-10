import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ galleries }) {

    const dataList = galleries && galleries.data ? galleries.data : galleries;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus foto galeri ini?')) {
            router.delete(route('admin.galleries.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Galeri</h2>}>
            <Head title="Galeri Foto & Video" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Galeri</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola album foto, dokumentasi kegiatan, dan aset visual lainnya.</p>
                        </div>
                        <Link href={route('admin.galleries.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm">
                            <i className="fas fa-plus mr-2"></i> Tambah Foto
                        </Link>
                    </div>

                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dataList && dataList.length > 0 ? dataList.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
                                    <img src={`/${item.image}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link href={route('admin.galleries.edit', item.id)} title="Edit Gambar" className="w-8 h-8 rounded-lg bg-white/90 text-indigo-600 flex items-center justify-center shadow hover:bg-white hover:scale-105 transition-all">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} title="Hapus Gambar" className="w-8 h-8 rounded-lg bg-white/90 text-red-600 flex items-center justify-center shadow hover:bg-white hover:scale-105 transition-all">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <div className="absolute top-2 left-2">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md shadow-sm backdrop-blur-md ${item.is_active ? 'bg-emerald-500/80 text-white' : 'bg-gray-800/80 text-gray-300'}`}>
                                            {item.is_active ? 'Publik' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md">
                                            {item.category || 'Galeri'}
                                        </span>
                                        <span className="text-[10px] text-gray-500">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                <i className="fas fa-images text-4xl mb-3 text-gray-300"></i>
                                <p>Belum ada foto di galeri.</p>
                            </div>
                        )}
                    </div>

                    {galleries && galleries.links && galleries.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2">
                            {galleries.links.map((link, idx) => (
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
