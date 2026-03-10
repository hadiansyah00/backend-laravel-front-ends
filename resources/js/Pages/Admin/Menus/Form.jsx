import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ menu, parentMenus, isEdit }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: menu?.name || '',
        icon_svg: menu?.icon_svg || '',
        slug: menu?.slug || '',
        parent_id: menu?.parent_id || '',
        url: menu?.url || '',
        type: menu?.type || 'page',
        order: menu?.order || 0,
        is_active: menu ? menu.is_active : 1,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.menus.update', menu.id));
        } else {
            post(route('admin.menus.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Menu' : 'Tambah Menu Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Menu' : 'Tambah Menu'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nama Menu */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Menu <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    placeholder="Contoh: Profil Kami"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Slug */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Slug (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    placeholder="Contoh: profil-kami"
                                />
                                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                                <p className="text-xs text-gray-500 mt-1">Kosongkan jika auto-generate dari nama, atau untuk menu dropdown induk yang tidak diklik.</p>
                            </div>

                            {/* Parent ID */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Induk Menu (Parent)</label>
                                <select
                                    value={data.parent_id || ''}
                                    onChange={e => setData('parent_id', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                >
                                    <option value="">-- Menjadi Menu Utama (Bukan Sub-menu) --</option>
                                    {parentMenus.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                                {errors.parent_id && <p className="text-red-500 text-sm mt-1">{errors.parent_id}</p>}
                            </div>

                            {/* Tipe Menu */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipe Menu</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                >
                                    <option value="page">Halaman Tetap (Page CMS)</option>
                                    <option value="link">Tautan Eksternal / Custom URL</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                            </div>

                            {/* URL (Jika link) */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">URL / Redirect (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.url}
                                    onChange={e => setData('url', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    placeholder="Contoh: https://google.com atau /pengumuman"
                                />
                                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                            </div>

                            {/* Order & Status */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nomor Urut</label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    min="0"
                                />
                                {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Status Aktif</label>
                                <select
                                    value={data.is_active}
                                    onChange={e => setData('is_active', e.target.value === '1' || e.target.value === 1 ? 1 : 0)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                >
                                    <option value={1}>Aktif (Tampil)</option>
                                    <option value={0}>Nonaktif (Sembunyikan)</option>
                                </select>
                                {errors.is_active && <p className="text-red-500 text-sm mt-1">{errors.is_active}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.menus.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing && <i className="fas fa-spinner fa-spin"></i>}
                                Simpan Menu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
