import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ program }) {
    const isEdit = !!program;
    const imageInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: program?.name || '',
        description: program?.description || '',
        image: null,
        link: program?.link || '',
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.programstudi.update', program.id), { preserveScroll: true });
        } else {
            post(route('admin.programstudi.store'), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'}</h2>}>
            <Head title={isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.programstudi.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Data Program' : 'Form Tambah Highlight Program'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Program Studi <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Cth: S1 Farmasi, D3 Kebidanan..."
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tautan Cepat (Opsional URL)</label>
                                <input
                                    type="url"
                                    className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={data.link}
                                    onChange={e => setData('link', e.target.value)}
                                    placeholder="https://pmb.stikes.ac.id/farmasi"
                                />
                                {errors.link && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.link}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Singkat Program</label>
                            <textarea
                                rows={4}
                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Tuliskan deskripsi singkat mengenai fokus dan tujuan prodi in..."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-start gap-4">
                            <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                <i className="fas fa-image mr-2 text-gray-400"></i> Cover / Gambar Program (Opsional)
                            </label>

                            <div className="flex gap-6 items-start w-full">
                                {isEdit && program?.image && (
                                    <div className="w-32 aspect-video rounded-lg overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm flex-shrink-0 bg-gray-100 dark:bg-gray-900">
                                        <img src={`/storage/${program.image.replace('storage/', '')}`} alt={program.name} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="flex-1 mt-1">
                                    <input
                                        type="file"
                                        ref={imageInputRef}
                                        className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 transition-colors cursor-pointer"
                                        onChange={e => setData('image', e.target.files[0])}
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                    />
                                    <p className="mt-2 text-xs text-gray-500">Gambar yang diunggah akan menggantikan gambar yang lama (jika ada). Disarankan rasio widescreen (16:9).</p>
                                    {errors.image && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.image}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.programstudi.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
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
                                    <><i className="fas fa-save"></i> Simpan Program Studi</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
