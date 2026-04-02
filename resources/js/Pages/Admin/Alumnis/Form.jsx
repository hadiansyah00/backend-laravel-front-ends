import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";

export default function Form({ alumni, programStudis }) {
    const isEdit = !!alumni;

    const { data, setData, post, processing, errors } = useForm({
        name: alumni?.name || '',
        nim: alumni?.nim || '',
        program_studi_id: alumni?.program_studi_id || '',
        tahun_lulus: alumni?.tahun_lulus || '',
        tempat_kerja: alumni?.tempat_kerja || '',
        jabatan: alumni?.jabatan || '',
        testimonial: alumni?.testimonial || '',
        photo: alumni?.photo || '',
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

    const getPreviewUrl = (photo) => {
        if (!photo) return '';
        if (typeof photo !== 'string') return '';
        if (photo.startsWith('http') || photo.startsWith('/')) return photo;
        return `/storage/${photo}`;
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
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.alumnis.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
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
                                {/* FOTO PROFIL - Modern MediaPicker style matching Events */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-4">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                        <i className="text-indigo-500 fas fa-camera"></i> Foto Profil
                                    </h4>

                                    <div className="flex flex-col gap-4">
                                        {/* Preview Selected Photo */}
                                        {data.photo && (
                                            <div className="relative group overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-700 border-dashed rounded-2xl w-full max-w-[200px] mx-auto aspect-square">
                                                <img
                                                    src={getPreviewUrl(data.photo)}
                                                    alt="Preview Foto"
                                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                                    <button
                                                        type="button"
                                                        onClick={() => setData('photo', '')}
                                                        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all flex items-center shadow-lg text-sm"
                                                    >
                                                        <i className="fas fa-trash-alt mr-2"></i> Hapus Foto
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Trigger MediaPicker */}
                                        {!data.photo && (
                                            <MediaPicker
                                                acceptType="image"
                                                onSelect={(url) => setData("photo", url)}
                                                trigger={
                                                    <div className="w-full max-w-[200px] mx-auto aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl cursor-pointer bg-gray-50 hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-900/20 transition-all flex flex-col items-center justify-center group overflow-hidden">
                                                        <div className="w-16 h-16 mb-3 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                                            <i className="fas fa-user-circle text-2xl"></i>
                                                        </div>
                                                        <span className="font-bold text-gray-900 dark:text-white mb-1 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Pilih Foto Profil</span>
                                                        <span className="text-xs text-gray-500 text-center max-w-[80%]">Klik untuk membuka Media Library</span>
                                                    </div>
                                                }
                                            />
                                        )}
                                    </div>

                                    {errors.photo && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium"><i className="fas fa-exclamation-circle mr-1"></i> {errors.photo}</p>}
                                </div>

                                {/* STATUS */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-4">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                        <i className="text-emerald-500 fas fa-check-circle"></i> Preferensi Tampil
                                    </h4>
                                    
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 transition-colors"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">Status Aktif</span>
                                            <span className="text-xs text-gray-500">Tampilkan data ini di direktori publik alumni.</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={data.is_featured}
                                                onChange={e => setData('is_featured', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500 transition-colors"></div>
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
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.alumnis.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm">
                                Batal
                            </Link>
                            <button disabled={processing} className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-indigo-500/20">
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save"></i> Simpan Alumni</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}