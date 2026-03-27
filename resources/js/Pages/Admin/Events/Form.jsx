import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Form({ event }) {
    const isEdit = !!event;
    const fileInputRef = useRef(null);

    // Helper to format date for input type="date"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toISOString().split('T')[0];
    };

    const { data, setData, post, put, errors, processing } = useForm({
        title: event?.title || '',
        content: event?.content || '',
        location: event?.location || '',
        start_date: formatDate(event?.start_date),
        end_date: formatDate(event?.end_date),
        image: null,
        is_active: event?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.events.update', event.id), {
                preserveScroll: true,
            });
        } else {
            post(route('admin.events.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Event & Agenda' : 'Tambah Event & Agenda'}</h2>}>
            <Head title={isEdit ? 'Edit Event' : 'Tambah Event'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.events.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Event' : 'Form Tambah Event / Agenda Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Kegiatan <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Cth: Seminar Nasional Gizi 2026..."
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Kegiatan</label>
                            <textarea
                                rows={6}
                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.content ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder="Jelaskan detail dari kegiatan ini..."
                            ></textarea>
                            {errors.content && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>}
                        </div>

                        {/* Schedule & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Mulai <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.start_date ? 'border-red-500' : ''}`}
                                    value={data.start_date}
                                    onChange={e => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.start_date}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Selesai</label>
                                <input
                                    type="date"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.end_date ? 'border-red-500' : ''}`}
                                    value={data.end_date}
                                    onChange={e => setData('end_date', e.target.value)}
                                />
                                {errors.end_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.end_date}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi Kegiatan</label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.location ? 'border-red-500' : ''}`}
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    placeholder="Cth: Aula Utama"
                                />
                                {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                            </div>
                        </div>

                        {/* Image Attachment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poster Kegiatan / Gambar Banner</label>

                            {isEdit && event?.image && (
                                <div className="mb-4">
                                    <div className="w-32 h-32 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                                        <img src={`/${event.image}`} alt="Current Poster" className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Gambar saat ini. Abaikan jika tidak ingin mengubah.</p>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="block w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 dark:hover:file:bg-indigo-900/50 transition-colors"
                                onChange={e => setData('image', e.target.files[0])}
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                            />
                            {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
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
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Publikasikan Event</span>
                                    <p className="text-xs text-gray-500">Tampilkan kegiatan ini di halaman publik.</p>
                                </div>
                            </label>
                            {errors.is_active && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.is_active}</p>}
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.events.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
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
                                    <><i className="fas fa-save"></i> Simpan Event</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
