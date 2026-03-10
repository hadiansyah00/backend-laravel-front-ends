import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ lowongan }) {
    const isEdit = !!lowongan;

    const { data, setData, post, processing, errors } = useForm({
        title: lowongan?.title || '',
        company: lowongan?.company || '',
        location: lowongan?.location || '',
        type: lowongan?.type || 'full-time',
        description: lowongan?.description || '',
        requirements: lowongan?.requirements || '',
        salary_range: lowongan?.salary_range || '',
        deadline: lowongan?.deadline ? lowongan.deadline.substring(0, 10) : '',
        contact_info: lowongan?.contact_info || '',
        is_active: lowongan?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.lowongans.update', lowongan.id), { preserveScroll: true });
        } else {
            post(route('admin.lowongans.store'), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Lowongan Kerja' : 'Tambah Lowongan Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Lowongan' : 'Tambah Lowongan'} />

            <div className="max-w-5xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.lowongans.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Update Job Vacancy' : 'Form Posting Job Vacancy Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Informasi Dasar Pekerjaan */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Informasi Dasar Pekerjaan</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Posisi / Pekerjaan <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Cth: Perawat Pelaksana / Staff Farmasi"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Pekerjaan <span className="text-red-500">*</span></label>
                                        <select
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.type ? 'border-red-500' : ''}`}
                                            value={data.type}
                                            onChange={e => setData('type', e.target.value)}
                                        >
                                            <option value="full-time">Full-Time (Penuh Waktu)</option>
                                            <option value="part-time">Part-Time (Paruh Waktu)</option>
                                            <option value="magang">Magang / PKL</option>
                                            <option value="kontrak">Kontrak</option>
                                        </select>
                                        {errors.type && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.type}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Batas Waktu (Deadline)</label>
                                        <input
                                            type="date"
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.deadline ? 'border-red-500' : ''}`}
                                            value={data.deadline}
                                            onChange={e => setData('deadline', e.target.value)}
                                        />
                                        {errors.deadline && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.deadline}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profil Perusahaan & Lokasi */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Profil Perusahaan & Lokasi</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan / RS / Klinik <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.company ? 'border-red-500' : ''}`}
                                        value={data.company}
                                        onChange={e => setData('company', e.target.value)}
                                        placeholder="Cth: RS Cipto Mangunkusumo"
                                    />
                                    {errors.company && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi Penempatan</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.location ? 'border-red-500' : ''}`}
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="Cth: Surabaya, Jawa Timur"
                                    />
                                    {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Detail Lowongan */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Detail & Persyaratan</h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Pekerjaan</label>
                                <textarea
                                    rows={4}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Jelaskan peran dan tanggung jawab utama..."
                                ></textarea>
                                {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Persyaratan / Kualifikasi Keterampilan</label>
                                <textarea
                                    rows={4}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.requirements ? 'border-red-500' : ''}`}
                                    value={data.requirements}
                                    onChange={e => setData('requirements', e.target.value)}
                                    placeholder="Cth: Lulusan S1 Keperawatan, memiliki STR aktif..."
                                ></textarea>
                                {errors.requirements && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.requirements}</p>}
                            </div>
                        </div>

                        {/* Tambahan Info */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Info Tambahan & Kontak</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentang Gaji / Kompensasi (Opsional)</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.salary_range ? 'border-red-500' : ''}`}
                                        value={data.salary_range}
                                        onChange={e => setData('salary_range', e.target.value)}
                                        placeholder="Cth: Rp 4.000.000 - Rp 6.000.000 / Dirahasiakan"
                                    />
                                    {errors.salary_range && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.salary_range}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Info Kontak / Cara Melamar</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.contact_info ? 'border-red-500' : ''}`}
                                        value={data.contact_info}
                                        onChange={e => setData('contact_info', e.target.value)}
                                        placeholder="Cth: Email ke hrd@rs-example.com atau klik link..."
                                    />
                                    {errors.contact_info && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contact_info}</p>}
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group w-max">
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
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">Publikasikan Lowongan</span>
                                        <p className="text-[11px] text-gray-500 mt-0.5">Tampilkan informasi bursa kerja ini di halaman publik.</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.lowongans.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
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
                                    <><i className="fas fa-save"></i> {isEdit ? 'Update Info Loker' : 'Posting Loker'}</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
