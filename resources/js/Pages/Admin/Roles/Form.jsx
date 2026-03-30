import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ role, permissions, isEdit }) {

    const currentPermissionNames = role && role.permissions ? role.permissions.map(p => p.name) : [];

    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name || '',
        permissions: currentPermissionNames,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.roles.update', role.id));
        } else {
            post(route('admin.roles.store'));
        }
    };

    const handlePermissionToggle = (permName) => {
        let currentPerms = [...data.permissions];
        if (currentPerms.includes(permName)) {
            currentPerms = currentPerms.filter(p => p !== permName);
        } else {
            currentPerms.push(permName);
        }
        setData('permissions', currentPerms);
    };

    // Toggle all permissions shortcut
    const handleSelectAll = () => {
        if (data.permissions.length === permissions.length) {
            setData('permissions', []);
        } else {
            setData('permissions', permissions.map(p => p.name));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Role' : 'Tambah Role Baru'}</h2>}>
            <Head title={isEdit ? 'Edit Role' : 'Tambah Role'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Role Group <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full max-w-md rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                placeholder="Contoh: author, editor, dll"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <hr className="border-gray-100 dark:border-gray-800" />

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Hak Akses (Permissions) <span className="text-red-500">*</span></label>
                                <button type="button" onClick={handleSelectAll} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                                    {data.permissions.length === permissions.length ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {permissions.map(perm => (
                                    <label key={perm.id} className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${data.permissions.includes(perm.name) ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700'}`}>
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                value={perm.name}
                                                checked={data.permissions.includes(perm.name)}
                                                onChange={() => handlePermissionToggle(perm.name)}
                                                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <span className={`font-medium break-words block text-xs ${data.permissions.includes(perm.name) ? 'text-indigo-800 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {perm.name}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.permissions && <p className="text-red-500 text-sm mt-2">{errors.permissions}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.roles.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing && <i className="fas fa-spinner fa-spin"></i>}
                                Simpan Role
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
