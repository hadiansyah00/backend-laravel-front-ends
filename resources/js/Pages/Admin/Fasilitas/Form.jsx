import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ fasilitasData }) {
    const isEdit = !!fasilitasData;
    const fileRef = useRef(null);

    const [facilitiesItems, setFacilitiesItems] = useState(
        fasilitasData?.facilities ? fasilitasData.facilities : []
    );

    const { data, setData, post, processing, errors } = useForm({
        name: fasilitasData?.name || '',
        type: fasilitasData?.type || 'Laboratorium',
        description: fasilitasData?.description || '',
        facilities: fasilitasData?.facilities || [],
        order: fasilitasData?.order || 0,
        is_active: fasilitasData?.is_active ?? true,
        image: null,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const addFacility = () => {
        setFacilitiesItems([...facilitiesItems, { name: '' }]);
    };

    const updateFacility = (index, value) => {
        const newItems = [...facilitiesItems];
        newItems[index].name = value;
        setFacilitiesItems(newItems);
        setData('facilities', newItems);
    };

    const removeFacility = (index) => {
        const newItems = facilitiesItems.filter((_, i) => i !== index);
        setFacilitiesItems(newItems);
        setData('facilities', newItems);
    };

    const submit = (e) => {
        e.preventDefault();
        setData('facilities', facilitiesItems);

        if (isEdit) {
            post(route('admin.fasilitas.update', fasilitasData.id));
        } else {
            post(route('admin.fasilitas.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</h2>}>
            <Head title={isEdit ? 'Edit Fasilitas' : 'Tambah Fasilitas'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800">
                    <form onSubmit={submit} className="p-6 space-y-6">

                        {/* General Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Informasi Umum</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama / Judul Fasilitas <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`} placeholder="Cth: Laboratorium OSCE Terpadu" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori Fasilitas</label>
                                        <select value={data.type} onChange={e => setData('type', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="Laboratorium">Laboratorium</option>
                                            <option value="Perpustakaan">Perpustakaan</option>
                                            <option value="UPPM">UPPM</option>
                                            <option value="UPMI">UPMI</option>
                                        </select>
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Fasilitas</label>
                                    <textarea rows={4} value={data.description} onChange={e => setData('description', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Jelaskan tentang fasilitas ini..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil</label>
                                    <input type="number" min="0" value={data.order} onChange={e => setData('order', parseInt(e.target.value) || 0)} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Media & Daftar Sub-Fasilitas</h4>
                                <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-white mb-2"><i className="fas fa-image text-indigo-500 mr-2"></i> Foto Fasilitas</label>
                                    {isEdit && fasilitasData?.image && (
                                        <div className="mb-4">
                                            <img src={`/${fasilitasData.image.replace('storage/', 'storage/')}`} className="h-32 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm object-cover" alt="Foto Fasilitas" />
                                        </div>
                                    )}
                                    <input type="file" ref={fileRef} onChange={e => setData('image', e.target.files[0])} accept="image/*" className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                </div>

                                <div className="mt-6 border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-900">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-white"><i className="fas fa-list text-emerald-500 mr-2"></i> Rincian/Detail (Opsional)</label>
                                        <button type="button" onClick={addFacility} className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold transition-colors">
                                            <i className="fas fa-plus mr-1"></i> Tambah Item
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {facilitiesItems.length === 0 ? (
                                            <p className="text-xs text-gray-500 italic text-center py-2">Belum ada item rincian.</p>
                                        ) : (
                                            facilitiesItems.map((item, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <input type="text" value={item.name} onChange={e => updateFacility(index, e.target.value)} className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Contoh: Bed Pasien / Ruang Diskusi" />
                                                    <button type="button" onClick={() => removeFacility(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.fasilitas.index')} className="px-5 py-2.5 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition">Batal</Link>
                            <button type="submit" onClick={() => setData('facilities', facilitiesItems)} disabled={processing} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2">
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Simpan Fasilitas
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
