import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ user, roles, isEdit }) {

    // Spatie Roles standardly pass IDs or names. We map existing user roles to an array of just the role IDs.
    const currentRoleIds = user && user.roles ? user.roles.map(r => r.name) : [];

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        roles: currentRoleIds,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.users.update', user.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    // Helper to toggle a role
    const handleRoleToggle = (roleName) => {
        let currentRoles = [...data.roles];
        if (currentRoles.includes(roleName)) {
            currentRoles = currentRoles.filter(r => r !== roleName);
        } else {
            currentRoles.push(roleName);
        }
        setData('roles', currentRoles);
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit User' : 'Tambah User Baru'}</h2>}>
            <Head title={isEdit ? 'Edit User' : 'Tambah User'} />

            <div className="max-w-3xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">

                        <div className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    placeholder="Contoh: Admin Akademik Utama"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Alamat Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                    placeholder="Contoh: admin@stikesbogorhusada.ac.id"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password {isEdit && <span className="text-xs text-gray-400 font-normal">(Isi jika ingin ubah)</span>}</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                        placeholder="Min. 8 Karakter"
                                        required={!isEdit}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                {/* Password Confirm */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Konfirmasi Password</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                        placeholder="Ulangi Password"
                                        required={!isEdit || data.password.length > 0}
                                    />
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800" />

                            {/* Roles Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Penugasan Peran (Roles) <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {roles.map(role => (
                                        <label key={role.id} className={`flex items-start p-3 border rounded-xl cursor-pointer transition-colors ${data.roles.includes(role.name) ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700'}`}>
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="checkbox"
                                                    value={role.name}
                                                    checked={data.roles.includes(role.name)}
                                                    onChange={() => handleRoleToggle(role.name)}
                                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <span className={`font-medium ${data.roles.includes(role.name) ? 'text-indigo-800 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    {role.name}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.roles && <p className="text-red-500 text-sm mt-2">{errors.roles}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                            <Link href={route('admin.users.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing && <i className="fas fa-spinner fa-spin"></i>}
                                Simpan Akun
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
