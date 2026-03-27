import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ statistic }) {
    const isEdit = !!statistic;

    const { data, setData, post, put, processing, errors } = useForm({
        title: statistic?.title || '',
        value: statistic?.value || '',
        icon: statistic?.icon || 'fa-chart-bar',
        order: statistic?.order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('admin.statistics.update', statistic.id), { preserveScroll: true });
        } else {
            post(route('admin.statistics.store'), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Data Statistik' : 'Tambah Statistik Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Statistik' : 'Tambah Statistik'} />

            <div className="max-w-3xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.statistics.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Counter Statistik' : 'Form Tambah Counter Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul / Metrik <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Cth: Mahasiswa Aktif, Lulusan..."
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nilai Angka <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.value ? 'border-red-500' : ''}`}
                                    value={data.value}
                                    onChange={e => setData('value', e.target.value)}
                                    placeholder="Cth: 1540"
                                />
                                {errors.value && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.value}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ikon Font Awesome</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                        <i className={`fas ${data.icon || 'fa-chart-bar'}`}></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="flex-1 rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.icon}
                                        onChange={e => setData('icon', e.target.value)}
                                        placeholder="Cth: fa-users, fa-graduation-cap"
                                    />
                                </div>
                                <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                                    Cek referensi ikon di <a href="https://fontawesome.com/v5/search?m=free" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">FontAwesome 5 <i className="fas fa-external-link-alt"></i></a>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil (Order)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={data.order}
                                    onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                />
                                <p className="mt-1 text-xs text-gray-500">Angka makin kecil tampil makin kiri.</p>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.statistics.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                            >
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save"></i> Simpan Data</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
