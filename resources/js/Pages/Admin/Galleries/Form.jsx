import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";
export default function Form({ gallery }) {
    const isEdit = !!gallery;
    const fileInputRef = useRef(null);

    const { data, setData, post, errors, processing } = useForm({
        title: gallery?.title || '',
        description: gallery?.description || '',
        category: gallery?.category || '',
        image: gallery?.image || '',
        is_active: gallery?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.galleries.update', gallery.id), {
                preserveScroll: true,
            });
        } else {
            post(route('admin.galleries.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Foto Galeri' : 'Upload Foto Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Galeri' : 'Upload Foto'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.galleries.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Foto Galeri' : 'Form Tambah Foto Galeri'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Foto <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Cth: Dokumentasi Wisuda 2026..."
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori / Album</label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    placeholder="Cth: Wisuda, Seminar, Mahasiswa Baru..."
                                    list="categories"
                                />
                                <datalist id="categories">
                                    <option value="Wisuda" />
                                    <option value="Kegiatan Mahasiswa" />
                                    <option value="Seminar & Workshop" />
                                    <option value="Dosen & Staff" />
                                    <option value="Fasilitas Kampus" />
                                </datalist>
                                {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan / Deskripsi Foto</label>
                            <textarea
                                rows={3}
                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Ceritakan sedikit tentang foto ini..."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                        </div>

                        {/* Image Upload dengan MediaPicker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih File Gambar {isEdit ? '(Opsional)' : '<span className="text-red-500">*</span>'}</label>

                            {isEdit && gallery?.image && (
                                <div className="mb-4">
                                    <div className="w-48 aspect-video rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm relative group">
                                        <img src={gallery.image.startsWith('http') ? gallery.image : `/${gallery.image}`} alt="Current" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <a href={gallery.image.startsWith('http') ? gallery.image : `/${gallery.image}`} target="_blank" rel="noreferrer" className="text-white text-sm font-semibold hover:underline">Lihat Penuh</a>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Gambar saat ini. Folder akan otomatis menimpanya jika memilih file baru.</p>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    className="w-full text-sm border-gray-300 cursor-not-allowed rounded-xl bg-gray-50 focus:ring-0 dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-sm"
                                    placeholder="Pilih gambar dari media library..."
                                    value={data.image || ''}
                                    readOnly
                                />
                                <MediaPicker
                                    onSelect={(url) => setData("image", url)}
                                    trigger={
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 transition border border-indigo-200 rounded-lg shrink-0 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-800 dark:hover:bg-indigo-900/50 dark:text-indigo-400"
                                        >
                                            <i className="fas fa-folder-open"></i>{" "}
                                            Pilih Foto
                                        </button>
                                    }
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Pilih foto yang ingin dilampirkan dari Media Library kampus.</p>
                            {errors.image && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.image}</p>}
                        </div>

                        {/* Status / Is Active */}
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 transition-colors"></div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Tampilkan di Galeri Publik</span>
                                    <p className="text-xs text-gray-500">Jika hijau, foto akan muncul di landing page galeri utama kampus.</p>
                                </div>
                            </label>
                            {errors.is_active && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.is_active}</p>}
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.galleries.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                            >
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save"></i> Simpan Ke Galeri</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
