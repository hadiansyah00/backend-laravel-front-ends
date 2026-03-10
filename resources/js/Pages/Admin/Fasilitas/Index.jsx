import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import MediaPicker from '@/Components/MediaPicker';

const tabIcons = {
    Laboratorium: 'fas fa-flask',
    Perpustakaan: 'fas fa-book',
    UPPM: 'fas fa-microscope',
    UPMI: 'fas fa-clipboard-check',
};

const tabColors = {
    Laboratorium: 'indigo',
    Perpustakaan: 'orange',
    UPPM: 'emerald',
    UPMI: 'pink',
};

export default function Index({ fasilitasGrouped, types }) {
    const typeKeys = Object.keys(types);
    const [activeTab, setActiveTab] = useState(typeKeys[0]);

    // Get existing data for active tab or empty default
    const getTabData = (type) => {
        const items = fasilitasGrouped[type] || [];
        const item = items[0] || {};
        return {
            id: item.id || null,
            name: item.name || types[type] || '',
            type: type,
            description: item.description || '',
            facilities: item.facilities || [],
            order: item.order || 0,
            is_active: item.is_active ?? true,
            image: null,
            existingImage: item.image || '',
            _method: item.id ? 'PUT' : 'POST',
        };
    };

    const [facilitiesItems, setFacilitiesItems] = useState(
        (fasilitasGrouped[activeTab] || [])[0]?.facilities || []
    );

    const { data, setData, post, processing, errors, reset } = useForm(getTabData(activeTab));

    const handleTabChange = (type) => {
        setActiveTab(type);
        const tabData = getTabData(type);
        setData(tabData);
        setFacilitiesItems(tabData.facilities || []);
    };

    const addFacility = () => {
        const newItems = [...facilitiesItems, { name: '', description: '' }];
        setFacilitiesItems(newItems);
        setData('facilities', newItems);
    };

    const updateFacility = (index, field, value) => {
        const newItems = [...facilitiesItems];
        newItems[index][field] = value;
        setFacilitiesItems(newItems);
        setData('facilities', newItems);
    };

    const removeFacility = (index) => {
        const newItems = facilitiesItems.filter((_, i) => i !== index);
        setFacilitiesItems(newItems);
        setData('facilities', newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...data, facilities: facilitiesItems };

        if (data.id) {
            post(route('admin.fasilitas.update', data.id), {
                preserveScroll: true,
                onSuccess: () => toast.success('Data ' + types[activeTab] + ' berhasil disimpan!'),
                onError: () => toast.error('Gagal menyimpan data.'),
            });
        } else {
            // Create new
            const createData = { ...payload };
            delete createData._method;
            delete createData.id;
            delete createData.existingImage;
            post(route('admin.fasilitas.store'), {
                data: createData,
                preserveScroll: true,
                onSuccess: () => toast.success('Data ' + types[activeTab] + ' berhasil ditambahkan!'),
                onError: () => toast.error('Gagal menyimpan data.'),
            });
        }
    };

    const handleDelete = () => {
        if (!data.id) return;
        if (confirm('Apakah Anda yakin ingin menghapus data ' + types[activeTab] + ' ini?')) {
            router.delete(route('admin.fasilitas.destroy', data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Data berhasil dihapus.');
                    handleTabChange(activeTab);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Unit & Fasilitas</h2>}>
            <Head title="Unit & Fasilitas" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800">

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex overflow-x-auto p-4 gap-2" aria-label="Tabs">
                            {typeKeys.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleTabChange(type)}
                                    className={`whitespace-nowrap py-3 px-5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                                        activeTab === type
                                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <i className={tabIcons[type] || 'fas fa-building'}></i>
                                    {types[type]}
                                    {(fasilitasGrouped[type] || []).length > 0 && (
                                        <span className="ml-1 w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Section */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <i className={tabIcons[activeTab] + ' text-indigo-500'}></i>
                                        Pengaturan {types[activeTab]}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {data.id ? 'Edit data yang sudah ada.' : 'Belum ada data, silakan isi dan simpan untuk pertama kali.'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <select
                                        className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.is_active ? '1' : '0'}
                                        onChange={e => setData('is_active', e.target.value === '1')}
                                    >
                                        <option value="1">Aktif</option>
                                        <option value="0">Draft</option>
                                    </select>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-5">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Informasi Umum</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama / Judul <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={"w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " + (errors.name ? 'border-red-500' : '')}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder={'Cth: ' + types[activeTab]}
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                                    <textarea
                                        rows={5}
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder={'Jelaskan tentang ' + types[activeTab] + '...'}
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan Tampil</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.order}
                                            onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    <i className="fas fa-image text-indigo-500 mr-2"></i>
                                    Foto / Banner
                                </h4>
                                <div className="flex gap-4 items-center">
                                    {data.existingImage ? (
                                        <div className="w-32 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                                            <img
                                                src={data.existingImage.startsWith('http') || data.existingImage.startsWith('/') ? data.existingImage : '/storage/' + data.existingImage}
                                                alt={'Foto ' + types[activeTab]}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src='https://via.placeholder.com/400x200?text=No+Image'; }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-400">
                                            <i className="fas fa-image text-xl mb-1"></i>
                                            <span className="text-[10px]">No Image</span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className="w-full text-sm border-gray-300 rounded-xl mb-2 bg-gray-50 focus:ring-0 cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                            placeholder="Pilih dari media library..."
                                            value={data.existingImage || ''}
                                            readOnly
                                        />
                                        <div className="flex gap-2">
                                            <MediaPicker
                                                onSelect={(url) => {
                                                    setData(prev => ({ ...prev, existingImage: url, image: url }));
                                                }}
                                                trigger={
                                                    <button type="button" className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                                                        <i className="fas fa-folder-open"></i> Buka Media Library
                                                    </button>
                                                }
                                            />
                                            {data.existingImage && (
                                                <button
                                                    type="button"
                                                    onClick={() => setData(prev => ({ ...prev, existingImage: '', image: '' }))}
                                                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition"
                                                    title="Hapus Gambar"
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Facilities List */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-gray-900 dark:text-white">
                                        <i className="fas fa-list text-emerald-500 mr-2"></i>
                                        Rincian / Program Kerja
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={addFacility}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition"
                                    >
                                        <i className="fas fa-plus"></i> Tambah Item
                                    </button>
                                </div>

                                <div className="space-y-3 mt-4">
                                    {facilitiesItems.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400">
                                            <i className="fas fa-inbox text-3xl mb-2 block"></i>
                                            <p className="text-sm">Belum ada rincian. Klik "Tambah Item" untuk mulai.</p>
                                        </div>
                                    ) : (
                                        facilitiesItems.map((item, index) => (
                                            <div key={index} className="flex gap-3 items-start p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <input
                                                        type="text"
                                                        value={item.name || ''}
                                                        onChange={e => updateFacility(index, 'name', e.target.value)}
                                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                        placeholder="Nama item (cth: Lab OSCE, Ruang Baca, dsb.)"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.description || ''}
                                                        onChange={e => updateFacility(index, 'description', e.target.value)}
                                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-500"
                                                        placeholder="Deskripsi singkat (opsional)"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFacility(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                                    title="Hapus"
                                                >
                                                    <i className="fas fa-trash-alt text-sm"></i>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    {data.id && (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-medium transition flex items-center gap-2"
                                        >
                                            <i className="fas fa-trash"></i> Hapus Data Ini
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2 font-semibold shadow-sm"
                                >
                                    {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                                    {data.id ? 'Simpan Perubahan' : 'Simpan ' + types[activeTab]}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
