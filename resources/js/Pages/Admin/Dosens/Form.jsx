import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ dosen, prodis }) {
    const isEdit = !!dosen;
    const photoInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: dosen?.name || '',
        nip: dosen?.nip || '',
        nidn: dosen?.nidn || '',
        position: dosen?.position || '',
        prodi: dosen?.prodi || '',
        photo: null,
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
                                {isEdit ? 'Form Pembaruan Data Profil Dosen' : 'Form Registrasi Profil Dosen Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* Identitas Utama */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Identitas & Informasi Akademik</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Studi / Instansi Homebase</label>
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
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">Kontak & Biografi Singkat</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        {/* Pengaturan Gambar & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-start gap-4 h-full">
                                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                                    <i className="fas fa-camera mr-2 text-gray-400"></i> Foto Profil Dosen
                                </label>

                                <div className="flex gap-4 items-center w-full">
                                    {isEdit && dosen?.photo ? (
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm flex-shrink-0 bg-gray-100">
                                            <img src={`/${dosen.photo}`} alt={dosen.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 flex-shrink-0">
                                            <i className="fas fa-user text-xl"></i>
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            ref={photoInputRef}
                                            className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 transition-colors cursor-pointer"
                                            onChange={e => setData('photo', e.target.files[0])}
                                            accept="image/jpeg,image/png,image/jpg"
                                        />
                                        <p className="mt-1.5 text-[10px] text-gray-500">Maksimal 2MB, format JPG/PNG, rasio 1:1, latar belakang rapi.</p>
                                        {errors.photo && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.photo}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil (Order) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.order ? 'border-red-500' : ''}`}
                                        value={data.order}
                                        onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                    />
                                    <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                                        Angka lebih kecil tampil lebih awal (0, 1, 2...). Berguna jika Pimpinan/Kaprodi ingin diletakkan di atas.
                                    </p>
                                    {errors.order && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.order}</p>}
                                </div>

                                <div className="flex flex-col justify-center pt-2">
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
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Status Aktif Dosen</span>
                                            <p className="text-[11px] text-gray-500 mt-0.5">Dosen aktif akan ditampilkan di halaman publik Profil Dosen.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.dosens.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
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
