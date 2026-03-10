import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ page, menus, templates }) {
    const isEdit = !!page;

    const { data, setData, post, processing, errors } = useForm({
        menu_id: page?.menu_id || '',
        title: page?.title || '',
        slug: page?.slug || '',
        template: page?.template || 'default',
        is_published: page?.is_published ?? true,
        hero_title: page?.hero_title || '',
        hero_subtitle: page?.hero_subtitle || '',
        hero_bg_image: null,
        content: page?.content ? (typeof page.content === 'string' ? JSON.parse(page.content) : page.content) : {},
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.pages.update', page.id), { preserveScroll: true });
        } else {
            post(route('admin.pages.store'), { preserveScroll: true });
        }
    };

    const renderTemplateFields = () => {
        if (data.template === 'profil_institusi') {
            return (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 pb-2">Konten: Profil Institusi</h4>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visi</label>
                        <textarea
                            rows={3}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.content?.visi || ''}
                            onChange={e => setData('content', { ...data.content, visi: e.target.value })}
                            placeholder="Tuliskan Visi Institusi..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Misi</label>
                        <textarea
                            rows={5}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.content?.misi || ''}
                            onChange={e => setData('content', { ...data.content, misi: e.target.value })}
                            placeholder="Tuliskan Misi Institusi..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sejarah Singkat (Teks Paragraf)</label>
                        <textarea
                            rows={6}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.content?.sejarah || ''}
                            onChange={e => setData('content', { ...data.content, sejarah: e.target.value })}
                            placeholder="Tuliskan sejarah institusi..."
                        />
                    </div>
                </div>
            );
        }

        if (data.template === 'fasilitas') {
            return (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 pb-2">Konten: Fasilitas Kampus</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Tambahan Fasilitas</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.content?.deskripsi_fasilitas || ''}
                            onChange={e => setData('content', { ...data.content, deskripsi_fasilitas: e.target.value })}
                            placeholder="Penjelasan umum mengenai fasilitas..."
                        />
                    </div>
                    {/* Disini admin dapat memasukkan array JSON list fasilitas lewat form, atau merender gallery terpisah */}
                    <p className="text-xs text-gray-500">Catatan: Galeri foto detail fasilitas biasanya diambil dari modul Galeri Foto secara dinamis.</p>
                </div>
            );
        }

        if (data.template === 'unit_lembaga') {
            return (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 pb-2">Konten: Profil Unit / Lembaga</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Kepala Unit</label>
                        <input
                            type="text"
                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={data.content?.kepala_unit || ''}
                            onChange={e => setData('content', { ...data.content, kepala_unit: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profil Khusus Unit (Rich Text/HTML)</label>
                        <textarea
                            rows={6}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono text-xs"
                            value={data.content?.profil_html || ''}
                            onChange={e => setData('content', { ...data.content, profil_html: e.target.value })}
                            placeholder="<p>Struktur HTML untuk profil lembaga</p>"
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Pengaturan Halaman Utama' : 'Buat Halaman Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Halaman' : 'Buat Halaman'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.pages.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Update Konfigurasi Halaman & Hero' : 'Setup Halaman Web (Page)'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">

                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">Informasi Dasar</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Menu Induk <span className="text-red-500">*</span></label>
                                    <select
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.menu_id ? 'border-red-500' : ''}`}
                                        value={data.menu_id}
                                        onChange={e => setData('menu_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Penempatan Menu --</option>
                                        {menus && Object.values(menus).map(menu => (
                                            <optgroup key={menu.id} label={menu.name}>
                                                <option value={menu.id}>{menu.name} (Menu Utama)</option>
                                                {menu.children && menu.children.map(child => (
                                                    <option key={child.id} value={child.id}>— {child.name}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    {errors.menu_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.menu_id}</p>}
                                    <p className="mt-1 text-xs text-gray-500">Halaman ini akan dikelompokkan dibawah menu yang dipilih.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Halaman <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Cth: Profil STIKes, Visi Misi, Sejarah..."
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug URL</label>
                                    <div className="flex items-center rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 focus-within:border-indigo-500">
                                        <span className="bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-300 dark:border-gray-700">/</span>
                                        <input
                                            type="text"
                                            className="w-full border-0 bg-transparent py-2 px-3 text-sm focus:ring-0 dark:text-white"
                                            value={data.slug}
                                            onChange={e => setData('slug', e.target.value)}
                                            placeholder="Kosongkan untuk otomatis dari judul"
                                        />
                                    </div>
                                    {errors.slug && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.slug}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Publikasi <span className="text-red-500">*</span></label>
                                    <select
                                        className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={data.is_published ? '1' : '0'}
                                        onChange={e => setData('is_published', e.target.value === '1')}
                                    >
                                        <option value="1">Published (Tampil di Web)</option>
                                        <option value="0">Draft (Sembunyikan)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Template Halaman <span className="text-red-500">*</span></label>
                                    <select
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.template ? 'border-red-500' : ''}`}
                                        value={data.template}
                                        onChange={e => setData('template', e.target.value)}
                                        disabled={isEdit}
                                    >
                                        {templates && Object.entries(templates).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                    {isEdit && <p className="mt-1 text-xs text-orange-500">Template tidak bisa diubah setelah halaman dibuat.</p>}
                                    {errors.template && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.template}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h4 className="font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">Hero Section (Banner Atas)</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Hero (Opsional)</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.hero_title ? 'border-red-500' : ''}`}
                                        value={data.hero_title}
                                        onChange={e => setData('hero_title', e.target.value)}
                                        placeholder="Cth: Mengenal STIKes Bogor Husada"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Jika kosong akan menggunakan Judul Halaman.</p>
                                    {errors.hero_title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.hero_title}</p>}
                                </div>

                                <div className="row-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background Image Hero</label>
                                    {isEdit && page.hero_bg_image && (
                                        <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img src={`/storage/${page.hero_bg_image}`} alt="Hero Banner" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="text-white text-xs font-bold drop-shadow-sm">Current Banner</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <div className="space-y-1 text-center">
                                            <i className="fas fa-image text-gray-400 text-3xl mb-2"></i>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                                <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-[ring-indigo-500] focus-[border-indigo-500]">
                                                    <span>Upload file banner baru</span>
                                                    <input type="file" className="sr-only" onChange={e => setData('hero_bg_image', e.target.files[0])} accept="image/*" />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG up to 2MB. Resolusi disarankan: 1920x600px.</p>
                                        </div>
                                    </div>
                                    {errors.hero_bg_image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.hero_bg_image}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Singkat / Subtitle Hero</label>
                                    <textarea
                                        rows={3}
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.hero_subtitle ? 'border-red-500' : ''}`}
                                        value={data.hero_subtitle}
                                        onChange={e => setData('hero_subtitle', e.target.value)}
                                        placeholder="Keterangan teks kecil dibawah judul di dalam banner..."
                                    ></textarea>
                                    {errors.hero_subtitle && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.hero_subtitle}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Merender template content form berdasarkan pilihan dropdown template */}
                        {data.template !== 'default' && renderTemplateFields()}

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
                            <Link
                                href={route('admin.pages.index')}
                                className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                            >    Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                            >
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                                {isEdit ? 'Simpan Perubahan' : 'Buat Halaman'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
