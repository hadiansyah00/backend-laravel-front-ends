import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ programStudi }) {
    const isEdit = !!programStudi;
    const fileRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: programStudi?.name || '',
        description: programStudi?.description || '',
        visi: programStudi?.visi || '',
        misi: programStudi?.misi || '',
        akreditasi: programStudi?.akreditasi || '',
        gelar: programStudi?.gelar || '',
        lama_studi: programStudi?.lama_studi || '',
        link: programStudi?.link || '',
        is_active: programStudi?.is_active ?? true,
        image: null,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.program-studis.update', programStudi.id));
        } else {
            post(route('admin.program-studis.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'}</h2>}>
            <Head title={isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'} />

            <div className="max-w-6xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800">
                    <form onSubmit={submit} className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Informasi Dasar</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Program Studi <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`} placeholder="Cth: D3 Kebidanan" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akreditasi</label>
                                        <input type="text" value={data.akreditasi} onChange={e => setData('akreditasi', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="A / B / Unggul" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Publikasi</label>
                                        <select value={data.is_active ? '1' : '0'} onChange={e => setData('is_active', e.target.value === '1')} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="1">Aktif / Tampil</option>
                                            <option value="0">Draft</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gelar Lulusan</label>
                                    <input type="text" value={data.gelar} onChange={e => setData('gelar', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cth: A.Md.Keb, S.Farm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lama Studi</label>
                                    <input type="text" value={data.lama_studi} onChange={e => setData('lama_studi', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cth: 3 Tahun (6 Semester)" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Website Khusus (Opsional)</label>
                                    <input type="url" value={data.link} onChange={e => setData('link', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="https://..." />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Deskripsi & Akademik</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profil Lulusan / Deskripsi Singkat</label>
                                    <textarea rows={3} value={data.description} onChange={e => setData('description', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Deskripsi mengenai prodi..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visi Prodi</label>
                                    <textarea rows={3} value={data.visi} onChange={e => setData('visi', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Menjadi prodi yang unggul..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Misi Prodi (Berurut/Daftar)</label>
                                    <textarea rows={4} value={data.misi} onChange={e => setData('misi', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="1. Menyelenggarakan Tri Dharma...&#10;2. Mengembangkan institusi..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                            <label className="block text-sm font-bold text-gray-700 dark:text-white mb-2"><i className="fas fa-image text-indigo-500 mr-2"></i> Logo / Cover Prodi</label>
                            {isEdit && programStudi?.image && (
                                <div className="mb-4">
                                    <img src={`/${programStudi.image.replace('storage/', 'storage/')}`} className="h-32 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" alt="Cover" />
                                </div>
                            )}
                            <input type="file" ref={fileRef} onChange={e => setData('image', e.target.files[0])} accept="image/*" className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.program-studis.index')} className="px-5 py-2.5 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition">Batal</Link>
                            <button type="submit" disabled={processing} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2">
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Simpan Program Studi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
