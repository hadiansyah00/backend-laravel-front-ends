import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import MediaPicker from '@/Components/MediaPicker';

const TABS = [
    { key: 'farmasi', label: 'S1 Farmasi', icon: 'fas fa-pills', slug: 's1-farmasi', defaultName: 'S1 Farmasi' },
    { key: 'gizi', label: 'S1 Gizi', icon: 'fas fa-apple-alt', slug: 's1-gizi', defaultName: 'S1 Gizi' },
    { key: 'kebidanan', label: 'D3 Kebidanan', icon: 'fas fa-baby', slug: 'd3-kebidanan', defaultName: 'D3 Kebidanan' },
    { key: 'kalender', label: 'Kalender Akademik', icon: 'fas fa-calendar-alt', type: 'link' },
    { key: 'dosen', label: 'Data Dosen', icon: 'fas fa-chalkboard-teacher', type: 'link' },
];

function ProdiForm({ prodi, tabConfig }) {
    const isEdit = !!prodi?.id;

    const [peluangItems, setPeluangItems] = useState(
        Array.isArray(prodi?.peluang_kerja) ? prodi.peluang_kerja : []
    );

    const { data, setData, post, processing, errors } = useForm({
        id: prodi?.id || null,
        name: prodi?.name || tabConfig.defaultName,
        description: prodi?.description || '',
        visi: prodi?.visi || '',
        misi: prodi?.misi || '',
        akreditasi: prodi?.akreditasi || '',
        gelar: prodi?.gelar || '',
        lama_studi: prodi?.lama_studi || '',
        kaprodi_name: prodi?.kaprodi_name || '',
        kaprodi_profile: prodi?.kaprodi_profile || '',
        kaprodi_photo: prodi?.kaprodi_photo || '',
        peluang_kerja: Array.isArray(prodi?.peluang_kerja) ? prodi.peluang_kerja : [],
        image: prodi?.image || '',
        is_active: prodi?.is_active ?? true,
    });

    const addPeluang = () => {
        const newItems = [...peluangItems, ''];
        setPeluangItems(newItems);
        setData('peluang_kerja', newItems);
    };

    const updatePeluang = (index, value) => {
        const newItems = [...peluangItems];
        newItems[index] = value;
        setPeluangItems(newItems);
        setData('peluang_kerja', newItems);
    };

    const removePeluang = (index) => {
        const newItems = peluangItems.filter((_, i) => i !== index);
        setPeluangItems(newItems);
        setData('peluang_kerja', newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.akademik.prodi.store'), {
            preserveScroll: true,
            onSuccess: () => toast.success('Data ' + tabConfig.label + ' berhasil disimpan!'),
            onError: () => toast.error('Gagal menyimpan data.'),
        });
    };

    const imgSrc = (val) => {
        if (!val) return null;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return '/storage/' + val.replace('storage/', '');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className={tabConfig.icon + ' text-indigo-500'}></i>
                        Pengaturan {tabConfig.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEdit ? 'Edit data program studi yang sudah ada.' : 'Belum ada data, silakan isi dan simpan.'}
                    </p>
                </div>
                <select
                    className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={data.is_active ? '1' : '0'}
                    onChange={e => setData('is_active', e.target.value === '1')}
                >
                    <option value="1">Aktif</option>
                    <option value="0">Draft</option>
                </select>
            </div>

            {/* Info Umum */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-5">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Informasi Umum</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Program Studi <span className="text-red-500">*</span></label>
                    <input type="text" className={"w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " + (errors.name ? 'border-red-500' : '')} value={data.name} onChange={e => setData('name', e.target.value)} required />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                    <textarea rows={4} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akreditasi</label>
                        <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.akreditasi} onChange={e => setData('akreditasi', e.target.value)} placeholder="Cth: B / Baik Sekali" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gelar Lulusan</label>
                        <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.gelar} onChange={e => setData('gelar', e.target.value)} placeholder="Cth: S.Farm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lama Studi</label>
                        <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.lama_studi} onChange={e => setData('lama_studi', e.target.value)} placeholder="Cth: 4 Tahun (8 Semester)" />
                    </div>
                </div>
            </div>

            {/* Visi Misi */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Visi & Misi</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visi</label>
                    <textarea rows={3} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.visi} onChange={e => setData('visi', e.target.value)}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Misi</label>
                    <textarea rows={5} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.misi} onChange={e => setData('misi', e.target.value)} placeholder="Tuliskan misi per baris"></textarea>
                </div>
            </div>

            {/* Media */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2"><i className="fas fa-image text-indigo-500 mr-2"></i>Foto Program Studi</h4>
                <div className="flex gap-4 items-center">
                    {data.image ? (
                        <div className="w-32 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
                            <img src={imgSrc(data.image)} alt={data.name} className="w-full h-full object-cover" onError={(e) => { e.target.src='https://via.placeholder.com/400x200?text=No+Image'; }} />
                        </div>
                    ) : (
                        <div className="w-32 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-400">
                            <i className="fas fa-image text-xl mb-1"></i>
                            <span className="text-[10px]">No Image</span>
                        </div>
                    )}
                    <div className="flex-1">
                        <input type="text" className="w-full text-sm border-gray-300 rounded-xl mb-2 bg-gray-50 focus:ring-0 cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-white" placeholder="Pilih dari media library..." value={data.image || ''} readOnly />
                        <div className="flex gap-2">
                            <MediaPicker onSelect={(url) => setData(prev => ({ ...prev, image: url }))} trigger={<button type="button" className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition flex items-center gap-2"><i className="fas fa-folder-open"></i> Media Library</button>} />
                            {data.image && (<button type="button" onClick={() => setData(prev => ({ ...prev, image: '' }))} className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition" title="Hapus Gambar"><i className="fas fa-times"></i></button>)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ketua Prodi */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2"><i className="fas fa-user-tie text-emerald-500 mr-2"></i>Ketua Program Studi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Kaprodi</label>
                        <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.kaprodi_name} onChange={e => setData('kaprodi_name', e.target.value)} placeholder="Cth: Dr. John Doe, M.Farm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foto Kaprodi</label>
                        <div className="flex gap-2 items-center">
                            {data.kaprodi_photo && (
                                <div className="w-10 h-10 rounded-full overflow-hidden border shrink-0">
                                    <img src={imgSrc(data.kaprodi_photo)} alt="Kaprodi" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <MediaPicker onSelect={(url) => setData(prev => ({ ...prev, kaprodi_photo: url }))} trigger={<button type="button" className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition flex items-center gap-1"><i className="fas fa-folder-open"></i> Pilih Foto</button>} />
                            {data.kaprodi_photo && (<button type="button" onClick={() => setData(prev => ({ ...prev, kaprodi_photo: '' }))} className="px-2 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs transition"><i className="fas fa-times"></i></button>)}
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profil Singkat Kaprodi</label>
                    <textarea rows={3} className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" value={data.kaprodi_profile} onChange={e => setData('kaprodi_profile', e.target.value)}></textarea>
                </div>
            </div>

            {/* Peluang Kerja */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                        <i className="fas fa-briefcase text-amber-500 mr-2"></i>Peluang Kerja Lulusan
                    </h4>
                    <button type="button" onClick={addPeluang} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition">
                        <i className="fas fa-plus"></i> Tambah
                    </button>
                </div>
                <div className="space-y-3 mt-4">
                    {peluangItems.length === 0 ? (
                        <div className="text-center py-6 text-gray-400">
                            <i className="fas fa-briefcase text-2xl mb-2 block"></i>
                            <p className="text-sm">Belum ada peluang kerja. Klik "Tambah".</p>
                        </div>
                    ) : (
                        peluangItems.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">{index + 1}</span>
                                <input type="text" value={item} onChange={e => updatePeluang(index, e.target.value)} className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm" placeholder="Cth: Apoteker, Ahli Gizi, Bidan Praktik" />
                                <button type="button" onClick={() => removePeluang(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><i className="fas fa-times"></i></button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button type="submit" disabled={processing} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2 font-semibold shadow-sm">
                    {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                    {isEdit ? 'Simpan Perubahan' : 'Simpan ' + tabConfig.label}
                </button>
            </div>
        </form>
    );
}

function LinkTab({ icon, label, description, count, recentItems, routeName, routeLabel }) {
    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className={icon + ' text-indigo-500'}></i> {label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
                <Link href={route(routeName)} className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold text-sm shadow-sm gap-2">
                    <i className="fas fa-external-link-alt"></i> {routeLabel}
                </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center">
                        <i className={icon + ' text-2xl text-indigo-600'}></i>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{count}</div>
                        <div className="text-sm text-gray-500">Total Data {label}</div>
                    </div>
                </div>
            </div>

            {/* Recent Items */}
            {recentItems && recentItems.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Data Terbaru</h4>
                    <div className="space-y-3">
                        {recentItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
                                    {idx + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {item.name || item.kegiatan || '-'}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {item.prodi || item.tahun_akademik || item.position || ''}
                                    </div>
                                </div>
                                {item.is_active !== undefined && (
                                    <span className={"inline-flex rounded-full px-2 text-[10px] font-bold uppercase " + (item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600')}>
                                        {item.is_active ? 'Aktif' : 'Draft'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Index({ prodiMap, dosenCount, dosenRecent, kalenderCount, kalenderRecent }) {
    const [activeTab, setActiveTab] = useState(TABS[0].key);
    const currentTab = TABS.find(t => t.key === activeTab);

    const getProdi = (slug) => {
        return prodiMap[slug] || null;
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Akademik</h2>}>
            <Head title="Akademik" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800">

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex overflow-x-auto p-4 gap-2" aria-label="Tabs">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={"whitespace-nowrap py-3 px-5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 " + (
                                        activeTab === tab.key
                                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800'
                                    )}
                                >
                                    <i className={tab.icon}></i>
                                    {tab.label}
                                    {tab.type !== 'link' && getProdi(tab.slug) && (
                                        <span className="ml-1 w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {currentTab.type === 'link' ? (
                            currentTab.key === 'kalender' ? (
                                <LinkTab
                                    icon={currentTab.icon}
                                    label="Kalender Akademik"
                                    description="Kelola agenda dan jadwal akademik per semester."
                                    count={kalenderCount}
                                    recentItems={kalenderRecent}
                                    routeName="admin.kalender.index"
                                    routeLabel="Kelola Kalender"
                                />
                            ) : (
                                <LinkTab
                                    icon={currentTab.icon}
                                    label="Data Dosen"
                                    description="Kelola profil dosen dan staff akademik."
                                    count={dosenCount}
                                    recentItems={dosenRecent}
                                    routeName="admin.dosens.index"
                                    routeLabel="Kelola Dosen"
                                />
                            )
                        ) : (
                            <ProdiForm
                                key={currentTab.key}
                                prodi={getProdi(currentTab.slug)}
                                tabConfig={currentTab}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
