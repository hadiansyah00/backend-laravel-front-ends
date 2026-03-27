import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ kalender }) {
    const isEdit = !!kalender;

    const { data, setData, post, put, processing, errors } = useForm({
        semester: kalender?.semester || 'Ganjil',
        tahun_akademik: kalender?.tahun_akademik || '',
        kegiatan: kalender?.kegiatan || '',
        mulai: kalender?.mulai || '',
        selesai: kalender?.selesai || '',
        keterangan: kalender?.keterangan || '',
        order: kalender?.order || 0,
        is_active: kalender?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.kalender.update', kalender.id));
        } else {
            post(route('admin.kalender.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Agenda Akademik' : 'Tambah Agenda Akademik'}</h2>}>
            <Head title={isEdit ? 'Edit Agenda' : 'Tambah Agenda'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Konteks */}
                            <div className="md:col-span-2 space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Konteks Waktu</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester <span className="text-red-500">*</span></label>
                                        <select value={data.semester} onChange={e => setData('semester', e.target.value)} className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.semester ? 'border-red-500' : ''}`}>
                                            <option value="Ganjil">Ganjil</option>
                                            <option value="Genap">Genap</option>
                                        </select>
                                        {errors.semester && <p className="text-red-500 text-xs mt-1">{errors.semester}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Akademik <span className="text-red-500">*</span></label>
                                        <input type="text" value={data.tahun_akademik} onChange={e => setData('tahun_akademik', e.target.value)} className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.tahun_akademik ? 'border-red-500' : ''}`} placeholder="Cth: 2024/2025" />
                                        {errors.tahun_akademik && <p className="text-red-500 text-xs mt-1">{errors.tahun_akademik}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Detil Kegiatan */}
                            <div className="md:col-span-2 space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Detail Agenda</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Kegiatan <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.kegiatan} onChange={e => setData('kegiatan', e.target.value)} className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.kegiatan ? 'border-red-500' : ''}`} placeholder="Cth: Ujian Tengah Semester (UTS)" />
                                    {errors.kegiatan && <p className="text-red-500 text-xs mt-1">{errors.kegiatan}</p>}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Mulai</label>
                                        <input type="text" value={data.mulai} onChange={e => setData('mulai', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cth: 11 Desember 2023" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Selesai (Jika ada rentang)</label>
                                        <input type="text" value={data.selesai} onChange={e => setData('selesai', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cth: 20 Desember 2023" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan Tambahan / Catatan</label>
                                    <textarea rows={2} value={data.keterangan} onChange={e => setData('keterangan', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Syarat pembayaran 50%, dll."></textarea>
                                </div>
                            </div>

                            {/* Pengaturan Tampilan */}
                            <div className="md:col-span-2 space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Pengaturan Tampilan</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Publikasi</label>
                                        <select value={data.is_active ? '1' : '0'} onChange={e => setData('is_active', e.target.value === '1')} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="1">Aktif / Tampil</option>
                                            <option value="0">Draft</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan (Opsional)</label>
                                        <input type="number" min="0" value={data.order} onChange={e => setData('order', parseInt(e.target.value) || 0)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        <p className="text-xs text-gray-500 mt-1">Angka lebih kecil tampil lebih dulu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.kalender.index')} className="px-5 py-2.5 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition">Batal</Link>
                            <button type="submit" disabled={processing} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2">
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Simpan Agenda
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
