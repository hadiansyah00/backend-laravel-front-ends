import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";

export default function Form({ kerjasama }) {
    const isEdit = !!kerjasama;

    const { data, setData, post, put, errors, processing } = useForm({
        name: kerjasama?.name || '',
        logo: kerjasama?.logo || '',
        url: kerjasama?.url || '',
        is_active: kerjasama?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('admin.kerjasamas.update', kerjasama.id));
        } else {
            post(route('admin.kerjasamas.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Mitra Kerjasama' : 'Tambah Mitra Kerjasama'}</h2>}>
            <Head title={isEdit ? 'Edit Mitra' : 'Tambah Mitra'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    
                    {/* Header with Back Button */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
                        <Link href={route('admin.kerjasamas.index')} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors">
                            <i className="fas fa-arrow-left"></i>
                        </Link>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{isEdit ? 'Form Edit Mitra' : 'Form Tambah Mitra'}</h3>
                            <p className="text-sm text-gray-500">Lengkapi data institusi mitra kerjasama di bawah ini.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Institusi <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Contoh: Universitas Indonesia"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                        </div>

                        {/* URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Website Institusi (Opsional)</label>
                            <input
                                type="url"
                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.url ? 'border-red-500' : ''}`}
                                value={data.url}
                                onChange={e => setData('url', e.target.value)}
                                placeholder="Contoh: https://www.ui.ac.id"
                            />
                            {errors.url && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.url}</p>}
                        </div>

                        {/* Logo Upload with MediaPicker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Logo Institusi <span className="text-red-500">*</span></label>

                            {isEdit && kerjasama?.logo && (
                                <div className="mb-4">
                                    <div className="w-32 h-32 aspect-square rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-sm relative group p-2">
                                        <img src={kerjasama.logo.startsWith('http') ? kerjasama.logo : `/${kerjasama.logo}`} alt="Current Logo" className="w-full h-full object-contain" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm rounded-xl">
                                            <a href={kerjasama.logo.startsWith('http') ? kerjasama.logo : `/${kerjasama.logo}`} target="_blank" rel="noreferrer" className="text-white text-xs font-semibold hover:underline">Lihat Logo</a>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Logo yang sedang terpasang.</p>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    className="w-full text-sm border-gray-300 cursor-not-allowed rounded-xl bg-gray-50 focus:ring-0 dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-sm"
                                    placeholder="Pilih logo dari media library..."
                                    value={data.logo || ''}
                                    readOnly
                                />
                                <MediaPicker
                                    onSelect={(url) => setData("logo", url)}
                                    trigger={
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 transition border border-indigo-200 rounded-lg shrink-0 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-800 dark:hover:bg-indigo-900/50 dark:text-indigo-400"
                                        >
                                            <i className="fas fa-folder-open"></i>{" "}
                                            Pilih Media
                                        </button>
                                    }
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Gunakan ekstensi PNG yang memiliki background transparan minimal resolusi 200px agar terlihat rapi.</p>
                            {errors.logo && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.logo}</p>}
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
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Publikasikan Mitra</span>
                                    <p className="text-xs text-gray-500">Jika mati, logo tidak akan tampil di halaman Beranda.</p>
                                </div>
                            </label>
                            {errors.is_active && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.is_active}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.kerjasamas.index')} className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin mr-2"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save mr-2"></i> Simpan Data</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
