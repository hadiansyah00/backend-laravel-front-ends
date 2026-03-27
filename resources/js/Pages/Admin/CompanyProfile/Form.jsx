import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ video }) {
    const isEdit = !!video;
    const [previewUrl, setPreviewUrl] = useState(video?.video_url || '');

    const { data, setData, post, put, processing, errors } = useForm({
        title: video?.title || '',
        description: video?.description || '',
        video_url: video?.video_url || '',
        is_active: video?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('admin.companyprofile.update', video.id), { preserveScroll: true });
        } else {
            post(route('admin.companyprofile.store'), { preserveScroll: true });
        }
    };

    // Helper untuk live preview iframe YT
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setData('video_url', url);
        setPreviewUrl(url);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Video Profil' : 'Tambah Video Profil'}</h2>}>
            <Head title={isEdit ? 'Edit Video' : 'Tambah Video'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.companyprofile.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Video YouTube' : 'Form Tambah Video YouTube'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Video <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Cth: Video Profil STIKes Mahardika 2024"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL YouTube <span className="text-red-500">*</span></label>
                                    <div className="flex rounded-xl shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                                            <i className="fab fa-youtube text-red-500"></i>
                                        </span>
                                        <input
                                            type="url"
                                            className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white ${errors.video_url ? 'border-red-500' : ''}`}
                                            value={data.video_url}
                                            onChange={handleUrlChange}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                    </div>
                                    <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                                        Saat ini sistem hanya mendukung tautan dari platform YouTube.
                                    </p>
                                    {errors.video_url && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.video_url}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi & Catatan (Opsional)</label>
                                    <textarea
                                        rows={4}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Tuliskan catatan opsional..."
                                    ></textarea>
                                </div>

                                <div className="flex flex-col justify-center pt-2">
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
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Status Tayang Aktif</span>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Hanya video aktif yang akan ditampilkan di web.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Video Live Preview */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 h-full">
                                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                                    <i className="fas fa-play-circle mr-2 text-indigo-500"></i> Live Preview Video
                                </label>

                                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center shadow-inner relative">
                                    {getYouTubeEmbedUrl(previewUrl) ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={getYouTubeEmbedUrl(previewUrl)}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0"
                                        ></iframe>
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500 px-6 text-center">
                                            <i className="fab fa-youtube text-4xl mb-3 opacity-30"></i>
                                            <span className="text-sm">Masukkan URL YouTube yang valid<br />untuk melihat pratinjau.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.companyprofile.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
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
                                    <><i className="fas fa-save"></i> Simpan Data Video</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
