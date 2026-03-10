import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    // Current date in Indonesian format
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                    Dashboard Overview
                </h2>
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                    Pantau kinerja dan statistik utama website STIKes Bogor Husada.
                </p>
            </div>
        }>
            <Head title="Dashboard Admin" />

            <div className="py-6 space-y-8">

                {/* 🌟 PREMIUM GREETING BANNER */}
                <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] border border-gray-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] p-8 sm:p-10 z-10 isolate group">
                    {/* Atmospheric Gradients */}
                    <div className="absolute -inset-x-20 -top-40 -bottom-20 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none transition-opacity duration-700 group-hover:opacity-80"></div>
                    <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 min-w-[30rem] min-h-[30rem] bg-gradient-to-bl from-blue-500/20 via-cyan-400/10 to-transparent blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="relative flex justify-between items-center z-20">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide uppercase border border-indigo-500/20 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                                Sistem Online
                            </span>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                                Selamat Datang kembali, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">{auth?.user?.name || 'Administrator'}</span> 👋
                            </h3>
                            <p className="mt-4 text-base text-gray-400 leading-relaxed max-w-xl">
                                Ini adalah pusat kendali untuk mengelola konten, halaman dnamis, dan navigasi website. Semua perubahan akan langsung ter-sinkronisasi.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <button className="px-6 py-2.5 bg-white text-gray-900 font-semibold rounded-xl shadow-lg shadow-white/10 hover:bg-gray-50 focus:ring-2 focus:ring-white/50 transition-all">
                                    Lihat Panduan
                                </button>
                                <button className="px-6 py-2.5 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm">
                                    Log Aktivitas
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block relative group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full"></div>
                            <svg className="w-48 h-48 text-indigo-400/80 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 📊 PREMIUM STATISTICS GRID */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Ikhtisar Konten</h3>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                            {today}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                        {/* Card: Berita */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-newspaper text-6xl text-blue-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                                    <i className="fas fa-newspaper text-xl text-blue-600 dark:text-blue-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.berita || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Berita Total</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Pengumuman */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-bullhorn text-6xl text-amber-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center border border-amber-100 dark:border-amber-500/20">
                                    <i className="fas fa-bullhorn text-xl text-amber-600 dark:text-amber-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.pengumuman || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Pengumuman</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Event */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="far fa-calendar-alt text-6xl text-emerald-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                                    <i className="far fa-calendar-alt text-xl text-emerald-600 dark:text-emerald-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.event || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Event/Agenda</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Dosen */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-chalkboard-teacher text-6xl text-purple-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center border border-purple-100 dark:border-purple-500/20">
                                    <i className="fas fa-chalkboard-teacher text-xl text-purple-600 dark:text-purple-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.dosen || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Data Dosen</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Alumni */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-user-graduate text-6xl text-pink-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center border border-pink-100 dark:border-pink-500/20">
                                    <i className="fas fa-user-graduate text-xl text-pink-600 dark:text-pink-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.alumni || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Data Alumni</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Halaman Dinamis */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="far fa-file-code text-6xl text-gray-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center border border-gray-200 dark:border-gray-600/50">
                                    <i className="far fa-file-code text-xl text-gray-700 dark:text-gray-300"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.pages || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Halaman Landing</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Users */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-users text-6xl text-indigo-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                                    <i className="fas fa-users text-xl text-indigo-600 dark:text-indigo-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.users || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Pengguna Akun</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Roles */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-user-shield text-6xl text-rose-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center border border-rose-100 dark:border-rose-500/20">
                                    <i className="fas fa-user-shield text-xl text-rose-600 dark:text-rose-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.roles || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Grup Akses (Roles)</p>
                                </div>
                            </div>
                        </div>

                        {/* Card: Menus */}
                        <div className="group relative overflow-hidden bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <i className="fas fa-sitemap text-6xl text-teal-500"></i>
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center border border-teal-100 dark:border-teal-500/20">
                                    <i className="fas fa-sitemap text-xl text-teal-600 dark:text-teal-400"></i>
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats?.menus || 0}</p>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Menu Navigasi</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 🚀 QUICK ACTIONS & SYSTEM INFO */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                    {/* Activity Feed Placeholder */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -z-10"></div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <i className="fas fa-bolt text-amber-500"></i>
                            Aktivitas Terbaru
                        </h4>

                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 ring-1 ring-gray-100 dark:ring-gray-700">
                                <i className="fas fa-history text-2xl text-gray-400"></i>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">Log aktivitas sedang dipersiapkan.</p>
                            <p className="text-sm text-gray-500 mt-2 max-w-sm">Pantau siapa saja yang menambah berita, mengubah menu, atau mengedit halaman di sini (segera hadir).</p>
                        </div>
                    </div>

                    {/* System Mini-Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-3xl border border-indigo-100 dark:border-gray-700/50 p-6 shadow-sm flex flex-col relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 text-indigo-100 dark:text-gray-800/50">
                            <i className="fas fa-server text-9xl"></i>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-3">
                            <i className="fas fa-microchip text-indigo-500"></i>
                            Status Sistem
                        </h4>

                        <div className="space-y-4 relative z-10 flex-1">
                            <div className="bg-white dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Versi Aplikasi</p>
                                <p className="text-gray-900 dark:text-white font-medium flex items-center justify-between">
                                    <span>SBH Portal v2.0-React</span>
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Environment</p>
                                <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                                    <i className="fab fa-laravel text-red-500"></i> Laravel 11 + <i className="fab fa-react text-cyan-400 ml-1"></i> React 18
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
