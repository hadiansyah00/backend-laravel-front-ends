import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ programStudi }) {
    const isEdit = !!programStudi;
    const fileRef = useRef(null);
    const kaprodiFileRef = useRef(null);

    const [peluangKerjaItems, setPeluangKerjaItems] = useState(
        programStudi?.peluang_kerja ? programStudi.peluang_kerja : []
    );

    const { data, setData, post, processing, errors } = useForm({
        name: programStudi?.name || '',
        description: programStudi?.description || '',
        visi: programStudi?.visi || '',
        misi: programStudi?.misi || '',
        akreditasi: programStudi?.akreditasi || '',
        gelar: programStudi?.gelar || '',
        lama_studi: programStudi?.lama_studi || '',
        kaprodi_name: programStudi?.kaprodi_name || '',
        kaprodi_profile: programStudi?.kaprodi_profile || '',
        peluang_kerja: programStudi?.peluang_kerja || [],
        link: programStudi?.link || '',
        is_active: programStudi?.is_active ?? true,
        image: null,
        kaprodi_photo: null,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const addPeluangKerja = () => {
        setPeluangKerjaItems([...peluangKerjaItems, { title: '', description: '' }]);
    };

    const updatePeluangKerja = (index, field, value) => {
        const newItems = [...peluangKerjaItems];
        newItems[index][field] = value;
        setPeluangKerjaItems(newItems);
        setData('peluang_kerja', newItems);
    };

    const removePeluangKerja = (index) => {
        const newItems = peluangKerjaItems.filter((_, i) => i !== index);
        setPeluangKerjaItems(newItems);
        setData('peluang_kerja', newItems);
    };

    const submit = (e) => {
        e.preventDefault();
        
        // Ensure data is synced before submit
        setData('peluang_kerja', peluangKerjaItems);

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

                                <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 mt-4">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-white mb-2"><i className="fas fa-image text-indigo-500 mr-2"></i> Logo / Cover Prodi</label>
                                    {isEdit && programStudi?.image && (
                                        <div className="mb-4">
                                            <img src={`/${programStudi.image.replace('storage/', 'storage/')}`} className="h-32 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" alt="Cover" />
                                        </div>
                                    )}
                                    <input type="file" ref={fileRef} onChange={e => setData('image', e.target.files[0])} accept="image/*" className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
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

                        {/* Kaprodi Section */}
                        <div className="border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 p-6 rounded-2xl">
                            <h4 className="font-bold text-gray-800 dark:text-white mb-4"><i className="fas fa-user-tie text-indigo-500 mr-2"></i> Profil Ketua Program Studi</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Kaprodi</label>
                                        <input type="text" value={data.kaprodi_name} onChange={e => setData('kaprodi_name', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Dr. Nama Kaprodi, M.Kes." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kata Sambutan / Profil Singkat Kaprodi</label>
                                        <textarea rows={4} value={data.kaprodi_profile} onChange={e => setData('kaprodi_profile', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Selamat datang di Program Studi..."></textarea>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foto Kaprodi</label>
                                    {isEdit && programStudi?.kaprodi_photo && (
                                        <div className="mb-4">
                                            <img src={`/${programStudi.kaprodi_photo.replace('storage/', 'storage/')}`} className="h-32 w-32 object-cover rounded-xl border-2 border-white shadow-md" alt="Kaprodi" />
                                        </div>
                                    )}
                                    <input type="file" ref={kaprodiFileRef} onChange={e => setData('kaprodi_photo', e.target.files[0])} accept="image/*" className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
                                    {errors.kaprodi_photo && <p className="text-red-500 text-xs mt-1">{errors.kaprodi_photo}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Peluang Kerja Section */}
                        <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-800 dark:text-white"><i className="fas fa-briefcase text-emerald-500 mr-2"></i> Peluang/Prospek Kerja (Capaian Lulusan)</h4>
                                <button type="button" onClick={addPeluangKerja} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-semibold transition-colors">
                                    <i className="fas fa-plus mr-1"></i> Tambah Prospek
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {peluangKerjaItems.length === 0 ? (
                                    <p className="text-sm text-gray-500 italic text-center py-4">Belum ada data peluang kerja. Klik tombol tambah di atas.</p>
                                ) : (
                                    peluangKerjaItems.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Profesi / Jabatan</label>
                                                    <input type="text" value={item.title} onChange={e => updatePeluangKerja(index, 'title', e.target.value)} className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" placeholder="Cth: Apoteker Klinis" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deskripsi / Peran</label>
                                                    <input type="text" value={item.description} onChange={e => updatePeluangKerja(index, 'description', e.target.value)} className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" placeholder="Deskripsi pekerjaan..." />
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removePeluangKerja(index)} className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.program-studis.index')} className="px-5 py-2.5 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition">Batal</Link>
                            <button type="submit" onClick={() => setData('peluang_kerja', peluangKerjaItems)} disabled={processing} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2">
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Simpan Program Studi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
