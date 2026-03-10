import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ category }) {
    const isEdit = !!category;

    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
        slug: category?.slug || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.categories.update', category.id));
        } else {
            post(route('admin.categories.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Kategori' : 'Tambah Kategori'}</h2>}>
            <Head title={isEdit ? 'Edit Kategori' : 'Tambah Kategori'} />

            <div className="max-w-2xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block border-l-4 border-indigo-500 pl-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nama Kategori</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500"
                                placeholder="Cth: Teknologi, Berita Kampus"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block border-l-4 border-indigo-500 pl-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Slug URL (Opsional)</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 text-gray-500"
                                placeholder="Biarkan kosong agar otomatis"
                            />
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link href={route('admin.categories.index')} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">Batal</Link>
                            <button type="submit" disabled={processing} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2">
                                {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} Simpan Kategori
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
