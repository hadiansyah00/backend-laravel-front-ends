import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";

export default function Form({ dosen, prodis }) {
    const isEdit = !!dosen;

    const { data, setData, post, processing, errors } = useForm({
        name: dosen?.name || '',
        nip: dosen?.nip || '',
        nidn: dosen?.nidn || '',
        position: dosen?.position || '',
        prodi: dosen?.prodi || '',
        photo: dosen?.photo || '',
        bio: dosen?.bio || '',
        linkedin_url: dosen?.linkedin_url || '',
        email: dosen?.email || '',
        order: dosen?.order || 0,
        is_active: dosen?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.dosens.update', dosen.id), { preserveScroll: true });
        } else {
            post(route('admin.dosens.store'), { preserveScroll: true });
        }
    };

    const getPreviewUrl = (photo) => {
        if (!photo) return '';
        if (typeof photo !== 'string') return '';
        if (photo.startsWith('http') || photo.startsWith('/')) return photo;
        if (photo.startsWith('storage/')) return `/${photo}`;
        return `/storage/${photo}`;
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Data Dosen' : 'Tambah Dosen Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Dosen' : 'Tambah Dosen'} />

            <div className="max-w-5xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.dosens.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Pembaruan Profil Dosen' : 'Form Registrasi Dosen Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* LEFT COLUMN: Photo & Status */}
                            <div className="space-y-6">
                                {/* FOTO PROFIL - Modern MediaPicker */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-4">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 text-sm">
                                        <i className="text-indigo-500 fas fa-camera"></i> Foto Profil
                                    </h4>

                                    <div className="flex flex-col gap-4">
                                        {/* Preview Selected Photo */}
                                        {data.photo && (
                                            <div className="relative group overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-700 border-dashed rounded-2xl w-full aspect-[3/4]">
                                                <img
                                                    src={getPreviewUrl(data.photo)}
                                                    alt="Preview Foto"
                                                    className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-300 group-hover:scale-105"
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
                                                    <div className="w-full aspect-[3/4] border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl cursor-pointer bg-gray-50 hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-900/20 transition-all flex flex-col items-center justify-center group overflow-hidden">
                                                        <div className="w-16 h-16 mb-3 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                                            <i className="fas fa-user-circle text-2xl"></i>
                                                        </div>
                                                        <span className="font-bold text-gray-900 dark:text-white mb-1 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Pilih Foto Dosen</span>
                                                        <span className="text-xs text-gray-500 text-center px-4">Klik untuk membuka Media Library</span>
                                                        <span className="text-[10px] text-gray-400 mt-2">Rasio 3:4, JPG/PNG</span>
                                                    </div>
                                                }
                                            />
                                        )}
                                    </div>
                                    {errors.photo && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium"><i className="fas fa-exclamation-circle mr-1"></i> {errors.photo}</p>}
                                </div>

                                {/* STATUS & ORDER */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-5">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 text-sm">
                                        <i className="text-emerald-500 fas fa-sliders-h"></i> Pengaturan
                                    </h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.order ? 'border-red-500' : ''}`}
                                            value={data.order}
                                            onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                        />
                                        <p className="mt-1.5 text-[10px] text-gray-500">Angka lebih kecil tampil lebih awal (0, 1, 2...)</p>
                                        {errors.order && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.order}</p>}
                                    </div>

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
                                            <span className="text-xs text-gray-500">Tampilkan di halaman publik.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Form Fields */}
                            <div className="md:col-span-2 space-y-8">
                                {/* Identitas Utama */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-5">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 text-sm">
                                        <i className="text-indigo-500 fas fa-id-card"></i> Identitas & Informasi Akademik
                                    </h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap (beserta gelar) <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="Cth: Dr. Budi Santoso, M.Kes."
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIDN</label>
                                            <input
                                                type="text"
                                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.nidn ? 'border-red-500' : ''}`}
                                                value={data.nidn}
                                                onChange={e => setData('nidn', e.target.value)}
                                                placeholder="Nomor Induk Dosen"
                                            />
                                            {errors.nidn && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nidn}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIP (Opsional)</label>
                                            <input
                                                type="text"
                                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.nip ? 'border-red-500' : ''}`}
                                                value={data.nip}
                                                onChange={e => setData('nip', e.target.value)}
                                                placeholder="Nomor Induk Pegawai"
                                            />
                                            {errors.nip && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nip}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan / Posisi Akademik</label>
                                            <input
                                                type="text"
                                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.position ? 'border-red-500' : ''}`}
                                                value={data.position}
                                                onChange={e => setData('position', e.target.value)}
                                                placeholder="Cth: Lektor Kepala / Kaprodi"
                                            />
                                            {errors.position && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.position}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Studi</label>
                                            <select
                                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.prodi ? 'border-red-500' : ''}`}
                                                value={data.prodi}
                                                onChange={e => setData('prodi', e.target.value)}
                                            >
                                                <option value="">-- Pilih Program Studi --</option>
                                                {prodis && prodis.map((p, idx) => (
                                                    <option key={idx} value={p}>{p}</option>
                                                ))}
                                            </select>
                                            {errors.prodi && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.prodi}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Kontak & Bio */}
                                <div className="p-6 border border-gray-100 bg-white dark:bg-gray-800/50 rounded-2xl dark:border-gray-800 shadow-sm space-y-5">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3 text-sm">
                                        <i className="text-amber-500 fas fa-address-book"></i> Kontak & Biografi
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Institusi <i className="fas fa-envelope text-gray-400 ml-1"></i></label>
                                            <input
                                                type="email"
                                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="cth: dosen@stikes-sbh.ac.id"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profil LinkedIn <i className="fab fa-linkedin text-blue-500 ml-1"></i></label>
                                            <input
                                                type="url"
                                                className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.linkedin_url ? 'border-red-500' : ''}`}
                                                value={data.linkedin_url}
                                                onChange={e => setData('linkedin_url', e.target.value)}
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                            {errors.linkedin_url && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.linkedin_url}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biografi Singkat / Keahlian</label>
                                        <textarea
                                            rows={4}
                                            className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.bio ? 'border-red-500' : ''}`}
                                            value={data.bio}
                                            onChange={e => setData('bio', e.target.value)}
                                            placeholder="Tuliskan latar belakang singkat dan bidang keahlian..."
                                        ></textarea>
                                        {errors.bio && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bio}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.dosens.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-indigo-500/20"
                            >
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save"></i> Simpan Profil</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
