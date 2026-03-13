import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    // ==========================================
    // FORM 1: PROFIL & AVATAR
    // ==========================================
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
        _method: 'PATCH',
    });

    const [previewUrl, setPreviewUrl] = useState(user.avatar ? `/storage/${user.avatar}` : null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('avatar', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route('admin.profile.update'), {
            preserveScroll: true,
        });
    };

    // ==========================================
    // FORM 2: UPDATE PASSWORD
    // ==========================================
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('admin.profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    passwordForm.reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pengaturan Profil</h2>}>
            <Head title="Profil Administrator" />

            <div className="max-w-4xl mx-auto py-6 space-y-6">
                
                {/* --- KARTU 1: UPDATE PROFIL & AVATAR --- */}
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="fas fa-user-circle text-indigo-500"></i> Informasi Profil
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Perbarui foto profil, nama, dan alamat email akun Anda.</p>
                    </div>

                    <form onSubmit={submitProfile} className="p-6">
                        <div className="flex flex-col sm:flex-row gap-8">
                            
                            {/* Kiri: Avatar Upload */}
                            <div className="flex flex-col items-center sm:items-start gap-4">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 dark:border-indigo-900/30 shadow-lg group">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-indigo-500 font-bold text-4xl">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    {/* Overlay Hover */}
                                    <div 
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                                    >
                                        <i className="fas fa-camera text-white text-xl"></i>
                                    </div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleAvatarChange}
                                        className="hidden" 
                                        accept="image/jpeg, image/png, image/jpg"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => fileInputRef.current.click()}
                                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
                                    >
                                        Ubah Foto Profil
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG max. 2MB</p>
                                    {profileForm.errors.avatar && <p className="mt-1 text-xs text-red-600">{profileForm.errors.avatar}</p>}
                                </div>
                            </div>

                            {/* Kanan: Form Input Profil */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${profileForm.errors.name ? 'border-red-500' : ''}`}
                                        value={profileForm.data.name}
                                        onChange={e => profileForm.setData('name', e.target.value)}
                                        required
                                    />
                                    {profileForm.errors.name && <p className="mt-1 text-sm text-red-600">{profileForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Email</label>
                                    <input
                                        type="email"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${profileForm.errors.email ? 'border-red-500' : ''}`}
                                        value={profileForm.data.email}
                                        onChange={e => profileForm.setData('email', e.target.value)}
                                        required
                                    />
                                    {profileForm.errors.email && <p className="mt-1 text-sm text-red-600">{profileForm.errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-4">
                            {profileForm.recentlySuccessful && <span className="text-sm text-emerald-600 font-medium mr-2 flex items-center gap-1"><i className="fas fa-check-circle"></i> Tersimpan</span>}
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                            >
                                {profileForm.processing ? <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</> : 'Simpan Profil'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- KARTU 2: UPDATE PASSWORD --- */}
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="fas fa-shield-alt text-indigo-500"></i> Keamanan Akun
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Pastikan akun Anda menggunakan kata sandi acak dan panjang untuk tetap aman.</p>
                    </div>

                    <form onSubmit={submitPassword} className="p-6">
                        <div className="space-y-6 max-w-xl">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password Saat Ini</label>
                                <input
                                    type="password"
                                    ref={currentPasswordInput}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${passwordForm.errors.current_password ? 'border-red-500' : ''}`}
                                    value={passwordForm.data.current_password}
                                    onChange={e => passwordForm.setData('current_password', e.target.value)}
                                    autoComplete="current-password"
                                />
                                {passwordForm.errors.current_password && <p className="mt-1 text-sm text-red-600">{passwordForm.errors.current_password}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password Baru</label>
                                <input
                                    type="password"
                                    ref={passwordInput}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${passwordForm.errors.password ? 'border-red-500' : ''}`}
                                    value={passwordForm.data.password}
                                    onChange={e => passwordForm.setData('password', e.target.value)}
                                    autoComplete="new-password"
                                />
                                {passwordForm.errors.password && <p className="mt-1 text-sm text-red-600">{passwordForm.errors.password}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password Baru</label>
                                <input
                                    type="password"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${passwordForm.errors.password_confirmation ? 'border-red-500' : ''}`}
                                    value={passwordForm.data.password_confirmation}
                                    onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                />
                                {passwordForm.errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{passwordForm.errors.password_confirmation}</p>}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-4">
                            {passwordForm.recentlySuccessful && <span className="text-sm text-emerald-600 font-medium mr-2 flex items-center gap-1"><i className="fas fa-check-circle"></i> Tersimpan</span>}
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                {passwordForm.processing ? <><i className="fas fa-spinner fa-spin mr-2"></i> Memproses...</> : 'Ubah Password'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}