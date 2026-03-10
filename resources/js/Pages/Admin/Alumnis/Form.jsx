import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ alumni }) {
    const isEdit = !!alumni;
    const photoInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: alumni?.name || '',
        nim: alumni?.nim || '',
        program_studi: alumni?.program_studi || '',
        tahun_lulus: alumni?.tahun_lulus || '',
        tempat_kerja: alumni?.tempat_kerja || '',
        jabatan: alumni?.jabatan || '',
        testimonial: alumni?.testimonial || '',
        photo: null,
        is_featured: alumni?.is_featured ?? false,
        is_active: alumni?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.alumnis.update', alumni.id), { preserveScroll: true });
        } else {
            post(route('admin.alumnis.store'), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Data Alumni' : 'Tambah Alumni Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Alumni' : 'Tambah Alumni'} />

            <div className="max-w-5xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.alumnis.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Update Profil Alumni' : 'Form Registrasi Data Alumni Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Identitas Diri */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Identitas & Akademik</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap Alumni <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Cth: Siti Aminah, S.Kep."
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIM (Opsional)</label>
                                        <input
                                            type="text"
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.nim ? 'border-red-500' : ''}`}
                                            value={data.nim}
                                            onChange={e => setData('nim', e.target.value)}
                                            placeholder="Nomor Induk Mhs"
                                        />
                                        {errors.nim && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nim}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Lulus / Angkatan</label>
                                        <input
                                            type="text"
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.tahun_lulus ? 'border-red-500' : ''}`}
                                            value={data.tahun_lulus}
                                            onChange={e => setData('tahun_lulus', e.target.value)}
                                            placeholder="Cth: 2021"
                                        />
                                        {errors.tahun_lulus && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.tahun_lulus}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Studi Asal</label>
                                <select
                                    className={`w-full md:w-1/2 rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.program_studi ? 'border-red-500' : ''}`}
                                    value={data.program_studi}
                                    onChange={e => setData('program_studi', e.target.value)}
                                >
                                    <option value="">-- Pilih Program Studi --</option>
                                    <option value="S1 Farmasi">S1 Farmasi</option>
                                    <option value="S1 Gizi">S1 Gizi</option>
                                    <option value="D3 Kebidanan">D3 Kebidanan</option>
                                </select>
                                {errors.program_studi && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.program_studi}</p>}
                            </div>
                        </div>

                        {/* Karir & Testimoni */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Karir & Testimoni</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instansi / Tempat Kerja Saat Ini</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.tempat_kerja ? 'border-red-500' : ''}`}
                                        value={data.tempat_kerja}
                                        onChange={e => setData('tempat_kerja', e.target.value)}
                                        placeholder="Cth: RSUD Dr. Soetomo Surabaya"
                                    />
                                    {errors.tempat_kerja && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tempat_kerja}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posisi / Jabatan Pekerjaan</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.jabatan ? 'border-red-500' : ''}`}
                                        value={data.jabatan}
                                        onChange={e => setData('jabatan', e.target.value)}
                                        placeholder="Cth: Kepala Instalasi Farmasi / Perawat Ahli"
                                    />
                                    {errors.jabatan && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.jabatan}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kesan & Pesan / Testimoni (Opsional)</label>
                                <textarea
                                    rows={4}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.testimonial ? 'border-red-500' : ''}`}
                                    value={data.testimonial}
                                    onChange={e => setData('testimonial', e.target.value)}
                                    placeholder="Tuliskan pengalaman selama kuliah..."
                                ></textarea>
                                {errors.testimonial && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.testimonial}</p>}
                            </div>
                        </div>

                        {/* Pengaturan Gambar & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-start gap-4 h-full">
                                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                    <i className="fas fa-camera mr-2 text-gray-400"></i> Foto Profil Alumni
                                </label>

                                <div className="flex gap-4 items-center w-full">
                                    {isEdit && alumni?.photo ? (
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm flex-shrink-0 bg-gray-100">
                                            <img src={`/${alumni.photo}`} alt={alumni.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 flex-shrink-0">
                                            <i className="fas fa-user-graduate text-xl"></i>
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            ref={photoInputRef}
                                            className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 transition-colors cursor-pointer"
                                            onChange={e => setData('photo', e.target.files[0])}
                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                        />
                                        <p className="mt-1.5 text-[10px] text-gray-500">Maks 2MB, format JPG/PNG, rasio 1:1.</p>
                                        {errors.photo && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.photo}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 transition-colors"></div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Status Aktif Data</span>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Tampilkan data ini di halaman direktori alumni publik.</p>
                                        </div>
                                    </label>
                                </div>

                                <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-900/10">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={data.is_featured}
                                                onChange={e => setData('is_featured', e.target.checked)}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500 transition-colors"></div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-amber-900 dark:text-amber-400">Jadikan Featured/Unggulan</span>
                                            <p className="text-[11px] text-amber-700/70 dark:text-amber-500/70 mt-0.5">Alumni dengan karir menonjol akan disorot di halaman utama/slider.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.alumnis.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
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
                                    <><i className="fas fa-save"></i> Simpan Data Alumni</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
