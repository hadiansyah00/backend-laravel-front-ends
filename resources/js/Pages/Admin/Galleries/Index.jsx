import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ galleries }) {
    // Pastikan kita menangani data array biasa atau struktur paginasi Laravel
    const dataList = galleries?.data || galleries || [];
    const hasPagination = galleries?.links && galleries.links.length > 3;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus foto galeri ini?')) {
            router.delete(route('admin.galleries.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manajemen Galeri
                </h2>
            }
        >
            <Head title="Galeri Foto & Video" />

            <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white border border-gray-100 shadow-sm sm:rounded-2xl dark:bg-gray-900 dark:border-gray-800">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4 p-6 border-b border-gray-100 sm:flex-row sm:items-center justify-between dark:border-gray-800">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Galeri</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Kelola album foto, dokumentasi kegiatan, dan aset visual lainnya.
                            </p>
                        </div>
                        <Link
                            href={route('admin.galleries.create')}
                            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition bg-indigo-600 border border-transparent rounded-xl shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <i className="mr-2 fas fa-plus"></i> Tambah Foto
                        </Link>
                    </div>

                    {/* Grid Section */}
                    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {dataList.length > 0 ? (
                            dataList.map((item) => (
                                <div
                                    key={item.id}
                                    className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 group hover:shadow-md hover:-translate-y-1 relative flex flex-col"
                                >
                                    <div className="relative overflow-hidden bg-gray-100 aspect-video dark:bg-gray-900 shrink-0">
                                        <img
                                            src={typeof item.image === 'string' ? (item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : ''}
                                            alt={item.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Overlay & Actions */}
                                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100"></div>

                                        <div className="absolute flex items-center gap-2 transition-opacity duration-300 opacity-0 top-3 right-3 group-hover:opacity-100">
                                            <Link
                                                href={route('admin.galleries.edit', item.id)}
                                                title="Edit Gambar"
                                                className="flex items-center justify-center w-8 h-8 text-indigo-600 transition-all shadow rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                title="Hapus Gambar"
                                                className="flex items-center justify-center w-8 h-8 text-red-600 transition-all shadow rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span
                                                className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-lg shadow-sm backdrop-blur-md ${item.is_active
                                                        ? 'bg-emerald-500/90 text-white'
                                                        : 'bg-gray-800/90 text-gray-200'
                                                    }`}
                                            >
                                                {item.is_active ? 'Publik' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-col flex-1 p-4">
                                        <h4 className="font-bold text-gray-900 line-clamp-2 dark:text-white" title={item.title}>
                                            {item.title}
                                        </h4>
                                        <div className="flex items-end justify-between flex-1 mt-4">
                                            <span className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md dark:bg-indigo-900/40 dark:text-indigo-300">
                                                {item.category || 'Galeri Umum'}
                                            </span>
                                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 col-span-full">
                                <i className="mb-4 text-5xl text-gray-300 fas fa-images dark:text-gray-600"></i>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-300">Belum ada foto</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Silakan tambahkan foto baru untuk mengisi galeri.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Section */}
                    {hasPagination && (
                        <div className="flex flex-wrap items-center justify-center gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                            {galleries.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    onClick={(e) => !link.url && e.preventDefault()}
                                    className={`px-3.5 py-2 min-w-[36px] text-center text-sm rounded-lg transition-colors font-medium border ${link.active
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                                        }`}
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