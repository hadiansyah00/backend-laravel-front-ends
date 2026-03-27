import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Form({ permission, isEdit }) {

    const { data, setData, post, put, processing, errors } = useForm({
        name: permission?.name || '',
        permissions: [{ name: '' }] // Used only for multiple mode
    });

    const [isMultiMode, setIsMultiMode] = React.useState(false);
    const [multiSuccess, setMultiSuccess] = React.useState('');

    const submitSingle = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.permissions.update', permission.id));
        } else {
            post(route('admin.permissions.store'));
        }
    };

    const submitMultiple = (e) => {
        e.preventDefault();
        // Fallback to axios for storeMultiple since it returns JSON and stays on page
        axios.post(route('admin.permissions.storeMultiple'), { permissions: data.permissions })
            .then(res => {
                setMultiSuccess(res.data.message);
                setData('permissions', [{ name: '' }]); // Reset
                setTimeout(() => setMultiSuccess(''), 3000);
            })
            .catch(err => {
                alert('Gagal menyimpan permissions. Pastikan format nama unik.');
                console.error(err);
            });
    };

    const handleMultiChange = (index, value) => {
        const newPerms = [...data.permissions];
        newPerms[index].name = value;
        setData('permissions', newPerms);
    };

    const addMultiField = () => {
        setData('permissions', [...data.permissions, { name: '' }]);
    };

    const removeMultiField = (index) => {
        const newPerms = [...data.permissions];
        newPerms.splice(index, 1);
        setData('permissions', newPerms);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Permission' : 'Tambah Permission'}</h2>}>
            <Head title={isEdit ? 'Edit Permission' : 'Tambah Permission'} />

            <div className="max-w-3xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                    {!isEdit && (
                        <div className="flex border-b border-gray-100 dark:border-gray-800">
                            <button onClick={() => setIsMultiMode(false)} className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${!isMultiMode ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                                Mode Satuan
                            </button>
                            <button onClick={() => setIsMultiMode(true)} className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${isMultiMode ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                                Mode Multiple (Banyak Sekaligus)
                            </button>
                        </div>
                    )}

                    {(!isMultiMode || isEdit) ? (
                        <form onSubmit={submitSingle} className="p-6 sm:p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Permission <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    placeholder="Contoh: create articles"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                <p className="text-xs text-gray-500 mt-2">Gunakan format standar berbahasa Inggris kecil, contoh: <code className="bg-gray-100 px-1 rounded">edit pages</code></p>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                                <Link href={route('admin.permissions.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {processing && <i className="fas fa-spinner fa-spin"></i>}
                                    Simpan
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={submitMultiple} className="p-6 sm:p-8 space-y-6">

                            {multiSuccess && (
                                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl mb-4 text-sm font-medium">
                                    <i className="fas fa-check-circle mr-2"></i> {multiSuccess}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Daftar Permissions Baru</label>

                                <div className="space-y-3">
                                    {data.permissions.map((perm, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={perm.name}
                                                onChange={e => handleMultiChange(index, e.target.value)}
                                                className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                                placeholder={`Permission ke-${index + 1} (contoh: view reports)`}
                                                required
                                            />
                                            {data.permissions.length > 1 && (
                                                <button type="button" onClick={() => removeMultiField(index)} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button type="button" onClick={addMultiField} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
                                    <i className="fas fa-plus-circle"></i> Tambah Baris Lagi
                                </button>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                                <Link href={route('admin.permissions.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    Selesai / Kembali
                                </Link>
                                <button
                                    type="submit"
                                    disabled={data.permissions.some(p => p.name.trim() === '')}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    <i className="fas fa-save"></i>
                                    Simpan Batch
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
