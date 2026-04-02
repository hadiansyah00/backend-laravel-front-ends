import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";

export default function Form({ alumni, programStudis }) {
    const isEdit = !!alumni;
    const photoInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: alumni?.name || '',
        nim: alumni?.nim || '',
        program_studi_id: alumni?.program_studi_id || '',
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
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {isEdit ? 'Edit Data Alumni' : 'Tambah Alumni Baru'}
                </h2>
            }
        >
            <Head title={isEdit ? 'Edit Alumni' : 'Tambah Alumni'} />

            <div className="max-w-5xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                    {/* Header */}
                    <div className="p-6 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.alumnis.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                                ←
                            </Link>
                            <h3 className="text-lg font-bold">
                                {isEdit ? 'Update Alumni' : 'Tambah Alumni'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* IDENTITAS */}
                            <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-5">
                                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                    <i className="text-indigo-500 fas fa-id-card"></i> Identitas Diri
                                </h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Cth: Dr. John Doe, M.Kes"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Induk Mahasiswa (NIM)</label>
                                    <input
                                        type="text"
                                        placeholder="Cth: 1920301"
                                        value={data.nim}
                                        onChange={e => setData('nim', e.target.value)}
                                        className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Studi <span className="text-red-500">*</span></label>
                                        <select
                                            value={data.program_studi_id}
                                            onChange={e => setData('program_studi_id', e.target.value)}
                                            className={`w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 ${errors.program_studi_id ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">-- Pilih Prodi --</option>
                                            {programStudis && programStudis.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                        {errors.program_studi_id && <p className="mt-1 text-xs text-red-600">{errors.program_studi_id}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Lulus</label>
                                        <input
                                            type="number"
                                            placeholder="Cth: 2023"
                                            value={data.tahun_lulus}
                                            onChange={e => setData('tahun_lulus', e.target.value)}
                                            className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* FOTO */}
                                <div className="p-6 border border-gray-100 bg-gray-50 dark:bg-gray-800/50 rounded-2xl dark:border-gray-800">
                                    <h4 className="flex items-center gap-2 mb-4 font-bold text-gray-900 dark:text-white">
                                        <i className="text-indigo-500 fas fa-camera"></i> Foto Profil
                                    </h4>

                                    <div className="flex items-center gap-6">
                                        {data.photo ? (
                                            <div className="relative overflow-hidden border border-gray-200 w-24 h-24 rounded-full dark:border-gray-700 shadow-md shrink-0 bg-white">
                                                <img
                                                    src={typeof data.photo === 'string' ? (data.photo.startsWith("http") || data.photo.startsWith("/") ? data.photo : `/storage/${data.photo}`) : ''}
                                                    alt="Photo"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative flex items-center justify-center overflow-hidden border border-dashed border-gray-300 w-24 h-24 rounded-full dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-900 text-gray-400">
                                                <i className="fas fa-user text-3xl"></i>
                                            </div>
                                        )}

                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                className="w-full text-xs font-mono border-gray-300 cursor-not-allowed rounded-xl bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-500"
                                                placeholder="Pilih file foto..."
                                                value={data.photo || ""}
                                                readOnly
                                            />
                                            <MediaPicker
                                                onSelect={(url) => setData("photo", url)}
                                                acceptType="image"
                                                trigger={
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold text-indigo-700 transition border border-indigo-200 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                                                    >
                                                        <i className="fas fa-folder-open"></i> Media Library
                                                    </button>
                                                }
                                            />
                                            {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* STATUS */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-4">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                        <i className="text-emerald-500 fas fa-check-circle"></i> Preferensi Tampil
                                    </h4>
                                    
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">Status Aktif</span>
                                            <span className="text-xs text-gray-500">Tampilkan data ini di direktori publik alumni.</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                                                checked={data.is_featured}
                                                onChange={e => setData('is_featured', e.target.checked)}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1.5"><i className="fas fa-star text-amber-500 text-xs"></i> Featured di Beranda</span>
                                            <span className="text-xs text-gray-500">Berikan sorotan di section testimoni depan web.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* KARIR */}
                        <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-5">
                            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                <i className="text-amber-500 fas fa-briefcase"></i> Data Pekerjaan & Testimoni
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Instansi / Tempat Kerja</label>
                                    <input
                                        type="text"
                                        placeholder="Cth: RSUD Kota Bogor"
                                        value={data.tempat_kerja}
                                        onChange={e => setData('tempat_kerja', e.target.value)}
                                        className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan / Profesi</label>
                                    <input
                                        type="text"
                                        placeholder="Cth: Kepala Ruangan Gawat Darurat"
                                        value={data.jabatan}
                                        onChange={e => setData('jabatan', e.target.value)}
                                        className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kesan & Pesan (Testimoni)</label>
                                <textarea
                                    rows="4"
                                    placeholder="Tulis opini, pengalaman, atau ucapan alumni selama kuliah..."
                                    value={data.testimonial}
                                    onChange={e => setData('testimonial', e.target.value)}
                                    className="w-full text-sm border-gray-300 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 resize-y"
                                ></textarea>
                                <p className="mt-1.5 text-xs text-gray-500">Bila diisi, direkomendasikan untuk mencentang 'Featured di Beranda' agar tertampil saat orang melihat Suara Alumni.</p>
                            </div>
                        </div>

                        {/* ACTION */}
                        <div className="sticky z-10 flex items-center justify-end w-full max-w-4xl gap-3 p-4 py-4 mx-auto mt-8 border-t border-gray-100 shadow-xl dark:border-gray-800 bottom-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl">
                            <Link href={route('admin.alumnis.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-sm">
                                Batal
                            </Link>
                            <button disabled={processing} className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-indigo-500/20">
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="mr-1 fas fa-save text-indigo-300"></i> Simpan Alumni</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}