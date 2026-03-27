import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MediaPicker from '@/Components/MediaPicker';

export default function Form({ page, section, sectionTypes }) {
    const isEdit = !!section;
    const pageData = page || section?.page; // Support create and edit context

    // Default empty content state
    const defaultContent = {
        title: '', subtitle: '', html: '', bg_image: '', btn_text: '', btn_url: '',
        layout: 'left', alignment: 'left',
        items: [], // For grids and arrays
    };

    const { data, setData, post, processing, errors } = useForm({
        type: section?.type || '',
        order: section?.order || 0,
        content: section?.content || defaultContent,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const [currentConfig, setCurrentConfig] = useState(data.content);

    // Sync complex JSON state back to Inertia form
    useEffect(() => {
        setData('content', currentConfig);
    }, [currentConfig]);

    const handleContentChange = (field, value) => {
        setCurrentConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleItemAdd = () => {
        setCurrentConfig(prev => ({
            ...prev,
            items: [...(prev.items || []), { title: '', desc: '', icon: '', image: '', link: '' }]
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...(currentConfig.items || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        setCurrentConfig(prev => ({ ...prev, items: newItems }));
    };

    const handleItemRemove = (index) => {
        const newItems = [...(currentConfig.items || [])];
        newItems.splice(index, 1);
        setCurrentConfig(prev => ({ ...prev, items: newItems }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Notice: File uploads inside nested JSON might require FormData parsing. 
        // For simplicity in this Universal Form, we assume file uploads are handled elsewhere (Media Library) 
        // or via direct URL paths, so we send the pure JSON.

        if (isEdit) {
            post(route('admin.sections.update', section.id));
        } else {
            post(route('admin.pages.sections.store', pageData.id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Blok Konten' : 'Tambah Blok Konten Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Section' : 'Tambah Section'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href={route('admin.pages.sections.index', encodeURIComponent(pageData?.slug || ''))} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {isEdit ? 'Edit Konfigurasi Section' : 'Tambah Section Baru'}
                                </h3>
                                <p className="text-sm text-gray-500 font-mono mt-1">Target Halaman: {pageData?.title}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        {/* 1. Core Settings */}
                        <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                            <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <i className="fas fa-cog text-indigo-500"></i> Pengaturan Dasar Blok
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Jenis Section <span className="text-red-500">*</span></label>
                                    <select
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        required
                                    >
                                        <option value="">-- Pilih Format Tampilan --</option>
                                        {Object.entries(sectionTypes).map(([key, label]) => (
                                            <option key={key} value={key}>{label} ({key})</option>
                                        ))}
                                    </select>
                                    {errors.type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan (Order) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.order}
                                        onChange={e => setData('order', e.target.value)}
                                        required
                                        min="0"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Angka urutan dari Atas (0) ke Bawah (99)</p>
                                    {errors.order && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.order}</p>}
                                </div>
                            </div>
                        </div>

                        {/* 2. Dynamic Content Inputs */}
                        {data.type && (
                            <div className="space-y-6">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                    <i className="fas fa-layer-group text-indigo-500"></i> Konten Blok: {sectionTypes[data.type]}
                                </h4>

                                {/* Common Text Fields */}
                                {['title', 'hero', 'content-with-image', 'cta-banner', 'feature', 'card-grid', 'image-text', 'faq'].includes(data.type) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Area (Heading)</label>
                                            <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white" value={currentConfig.title || ''} onChange={e => handleContentChange('title', e.target.value)} placeholder="Teks heading utama blok ini..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub-judul / Keterangan</label>
                                            <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white" value={currentConfig.subtitle || ''} onChange={e => handleContentChange('subtitle', e.target.value)} placeholder="Teks kecil di atas/bawah judul..." />
                                        </div>
                                    </div>
                                )}

                                {/* Media Fields */}
                                {['content-with-image', 'image-text', 'hero', 'cta-banner'].includes(data.type) && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Gambar / Background</label>
                                        <div className="flex gap-2 h-[42px]">
                                            <input type="text" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white font-mono text-sm" value={currentConfig.bg_image || ''} onChange={e => handleContentChange('bg_image', e.target.value)} placeholder="Misal: /storage/uploads/image.jpg" />
                                            <MediaPicker
                                                onSelect={(url) => handleContentChange('bg_image', url)}
                                                trigger={
                                                    <button type="button" className="px-4 h-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-colors text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" title="Buka Media Library">
                                                        <i className="fas fa-folder-open"></i>
                                                    </button>
                                                }
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Masukkan path URL gambar atau pilih dari Media Library.</p>
                                    </div>
                                )}

                                {/* Rich Text HTML Field */}
                                {['richtext', 'content-with-image', 'image-text', 'visi-misi', 'prodi-profile'].includes(data.type) && (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konten Teks Paragraf / HTML Dasar</label>
                                        <textarea rows="8" className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white font-mono text-sm" value={currentConfig.html || ''} onChange={e => handleContentChange('html', e.target.value)} placeholder="Tuliskan teks atau format HTML (contoh: <p>...</p>)"></textarea>
                                    </div>
                                )}

                                {/* Extensible JSON Items Array (for Grid, Cards, Accordion, Timeline) */}
                                {['feature', 'card-grid', 'faq', 'timeline', 'team-grid', 'document-list'].includes(data.type) && (
                                    <div className="mt-8 border border-indigo-100 dark:border-indigo-900 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
                                        <div className="bg-indigo-50 dark:bg-indigo-900/40 px-5 py-3 border-b border-indigo-100 dark:border-indigo-800/50 flex justify-between items-center">
                                            <h5 className="font-bold text-indigo-800 dark:text-indigo-300">Daftar Item (Cards/Grid/FAQ)</h5>
                                            <button type="button" onClick={handleItemAdd} className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded shadow hover:bg-indigo-700 transition">
                                                <i className="fas fa-plus"></i> Tambah Item
                                            </button>
                                        </div>
                                        <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
                                            {(!currentConfig.items || currentConfig.items.length === 0) && (
                                                <div className="text-center py-8 text-gray-400 italic">Belum ada item ditambahkan.</div>
                                            )}
                                            {currentConfig.items && currentConfig.items.map((item, index) => (
                                                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 relative group">
                                                    <div className="absolute top-2 right-2">
                                                        <button type="button" onClick={() => handleItemRemove(index)} className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 flex items-center justify-center">
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Item #{index + 1}</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs text-gray-600 dark:text-gray-400">Judul Item</label>
                                                            <input type="text" className="w-full text-sm rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" value={item.title || ''} onChange={e => handleItemChange(index, 'title', e.target.value)} />
                                                        </div>
                                                        {['feature', 'timeline'].includes(data.type) && (
                                                            <div>
                                                                <label className="text-xs text-gray-600 dark:text-gray-400">Ikon (FontAwesome)</label>
                                                                <input type="text" className="w-full text-sm rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" value={item.icon || ''} onChange={e => handleItemChange(index, 'icon', e.target.value)} placeholder="Cth: fa-star" />
                                                            </div>
                                                        )}
                                                        {['card-grid', 'team-grid'].includes(data.type) && (
                                                            <div>
                                                                <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">URL Gambar</label>
                                                                <div className="flex gap-2">
                                                                    <input type="text" className="w-full text-sm rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" value={item.image || ''} onChange={e => handleItemChange(index, 'image', e.target.value)} />
                                                                    <MediaPicker
                                                                        onSelect={(url) => handleItemChange(index, 'image', url)}
                                                                        trigger={
                                                                            <button type="button" className="px-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 cursor-pointer transition-colors focus:ring-2 focus:ring-indigo-500">
                                                                                <i className="fas fa-image"></i>
                                                                            </button>
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="md:col-span-2">
                                                            <label className="text-xs text-gray-600 dark:text-gray-400">Deskripsi/Konten (FAQ Answer, Card Text)</label>
                                                            <textarea rows="3" className="w-full text-sm rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" value={item.desc || ''} onChange={e => handleItemChange(index, 'desc', e.target.value)}></textarea>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="text-xs text-gray-600 dark:text-gray-400">URL Tautan (Opsional)</label>
                                                            <input type="text" className="w-full text-sm rounded bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 placeholder:text-gray-400" value={item.link || ''} onChange={e => handleItemChange(index, 'link', e.target.value)} placeholder="https://..." />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                            <Link href={route('admin.pages.sections.index', encodeURIComponent(pageData?.slug || ''))} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                Membatalkan
                            </Link>
                            <button
                                type="submit"
                                disabled={processing || !data.type}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-sm flex items-center gap-2"
                            >
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                                Simpan Blok Konten
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
