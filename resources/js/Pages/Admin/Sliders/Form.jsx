import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ slider }) {
    const isEdit = !!slider;
    const desktopInputRef = useRef(null);
    const mobileInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        title: slider?.title || '',
        subtitle: slider?.subtitle || '',
        image: null,
        image_mobile: null,
        link: slider?.link || '',
        order: slider?.order || 0,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.sliders.update', slider.id), { preserveScroll: true });
        } else {
            post(route('admin.sliders.store'), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Banner Slider' : 'Tambah Banner Slider'}</h2>}>
            <Head title={isEdit ? 'Edit Slider' : 'Tambah Slider'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.sliders.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Banner' : 'Form Tambah Banner Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50 flex items-start gap-3 mb-6">
                            <i className="fas fa-bullhorn text-indigo-600 dark:text-indigo-400 mt-0.5"></i>
                            <div className="text-sm text-indigo-800 dark:text-indigo-300">
                                <p className="font-semibold">Info Banner Banner Utama</p>
                                <p className="mt-1">Banner ini akan muncul di halaman beranda paling atas (Hero Section). Disarankan gambar Desktop rasio 16:9 (cth: 1920x1080px) dan Mobile rasio 4:5 (cth: 1080x1350px).</p>
                            </div>
                        </div>

                        {/* Image Uploads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Desktop Image */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    <i className="fas fa-desktop mr-2"></i> Gambar Desktop {isEdit ? '(Opsional)' : '<span className="text-red-500">*</span>'}
                                </label>

                                {isEdit && slider?.image && (
                                    <div className="mb-3 aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 relative group">
                                        <img src={`/storage/${slider.image.replace('storage/', '')}`} alt="Current Desktop" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={desktopInputRef}
                                    className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400"
                                    onChange={e => setData('image', e.target.files[0])}
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                />
                                {errors.image && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.image}</p>}
                            </div>

                            {/* Mobile Image */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center">
                                <label className="block w-full text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    <i className="fas fa-mobile-alt mr-2"></i> Gambar Mobile (Opsional)
                                </label>

                                {isEdit && slider?.image_mobile && (
                                    <div className="mb-3 w-24 aspect-[4/5] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 relative group">
                                        <img src={`/storage/${slider.image_mobile.replace('storage/', '')}`} alt="Current Mobile" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={mobileInputRef}
                                    className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 dark:file:bg-gray-700 dark:file:text-gray-300"
                                    onChange={e => setData('image_mobile', e.target.files[0])}
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                />
                                <p className="mt-2 text-[10px] text-gray-500 w-full text-left">Jika dikosongkan, gambar desktop akan menyesuaikan otomatis.</p>
                                {errors.image_mobile && <p className="mt-1 text-xs text-red-600 dark:text-red-400 w-full text-left">{errors.image_mobile}</p>}
                            </div>
                        </div>

                        {/* Texts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Overlay (Opsional)</label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Cth: Penerimaan Mahasiswa Baru..."
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub-Judul Overlay (Opsional)</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={data.subtitle}
                                    onChange={e => setData('subtitle', e.target.value)}
                                    placeholder="Cth: Daftar sekarang dan wujudkan..."
                                />
                            </div>
                        </div>

                        {/* Action Link & Order */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tautan URL (Saat Diklik)</label>
                                <input
                                    type="url"
                                    className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={data.link}
                                    onChange={e => setData('link', e.target.value)}
                                    placeholder="https://pmb.stikes.ac.id"
                                />
                                {errors.link && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.link}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={data.order}
                                    onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                />
                                <p className="mt-1 text-xs text-gray-500">Urutan makin kecil = tampil lebih awal (kiri).</p>
                                {errors.order && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.order}</p>}
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.sliders.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                            >
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save"></i> Simpan Banner Slider</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
