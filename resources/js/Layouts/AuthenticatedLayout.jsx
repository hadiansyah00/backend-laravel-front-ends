import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#0B1120] font-sans selection:bg-indigo-500 selection:text-white">

            {/* S I D E B A R (Desktop) */}
            <aside className="hidden lg:flex flex-col w-72 bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 sticky top-0 h-screen transition-all duration-300">
                <div className="flex items-center justify-center h-24 border-b border-gray-100/50 dark:border-gray-800/50">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                            SBH <span className="text-indigo-600 dark:text-indigo-400">Admin</span>
                        </span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-5 space-y-1.5 custom-scrollbar">
                    <p className="px-3 mb-3 text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">Navigasi Utama</p>

                    <Link href={route('dashboard')} className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${route().current('dashboard') ? 'bg-white dark:bg-gray-800/80 shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-700/50 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-white'}`}>
                        {route().current('dashboard') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>}
                        <i className={`fas fa-layer-group w-6 text-center text-lg mr-4 ${route().current('dashboard') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors'}`}></i>
                        <span>Dashboard Utama</span>
                    </Link>

                    <Link href="/admin/pages" className="flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-white">
                        <i className="fas fa-file-alt w-6 text-center text-lg mr-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"></i>
                        <span>Landing Pages</span>
                    </Link>

                    <div className="pt-8 my-2"></div>
                    <p className="px-3 mb-3 text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">Pengaturan Site</p>

                    <Link href="#" className="flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-white">
                        <i className="fas fa-sitemap w-6 text-center text-lg mr-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"></i>
                        <span>Menu Navigasi</span>
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-white">
                        <i className="fas fa-sliders-h w-6 text-center text-lg mr-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"></i>
                        <span>General Settings</span>
                    </Link>
                </div>

                <div className="p-5 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800/60 transition-colors cursor-pointer group">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-lg uppercase ring-2 ring-white dark:ring-gray-800 shadow-sm">
                            {auth?.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{auth?.user?.name || 'Administrator'}</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-0.5">{auth?.user?.email}</p>
                        </div>
                        <i className="fas fa-chevron-right text-xs text-gray-400 group-hover:text-indigo-500 mr-2"></i>
                    </div>
                </div>
            </aside>

            {/* M A I N   C O N T E N T */}
            <div className="flex-1 flex flex-col min-w-0 relative">

                {/* TOP HEADER */}
                <header className="sticky top-0 z-10 bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300">
                    <div className="px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="p-2.5 -mr-2 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </div>

                        {/* Page Title injected from Props */}
                        <div className="hidden sm:block">
                            {header ? (
                                <div className="text-gray-800 dark:text-white">{header}</div>
                            ) : (
                                <div className="text-sm font-medium text-gray-500">Overview</div>
                            )}
                        </div>

                        {/* Right Tools */}
                        <div className="flex items-center gap-5">
                            <button className="p-2.5 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
                                <i className="far fa-bell text-xl"></i>
                                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 shadow-sm"></span>
                            </button>

                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

                            <Link href={route('logout')} method="post" as="button" className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full transition-colors relative overflow-hidden group">
                                <div className="absolute inset-0 bg-red-100 dark:bg-red-500/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 ease-out origin-center"></div>
                                <i className="fas fa-sign-out-alt relative z-10"></i>
                                <span className="relative z-10">Logout</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Mobile Sidebar Back-drop & Menu Component (Simplified for brevity) */}
                {showingNavigationDropdown && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={() => setShowingNavigationDropdown(false)}></div>
                        <div className="relative flex flex-col w-72 max-w-sm bg-white dark:bg-[#0B1120] h-full shadow-2xl animate-fade-in-right">
                            <div className="p-6">
                                <h2 className="text-2xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">Men<span className="text-indigo-600">u</span></h2>
                                <div className="space-y-4">
                                    <Link href={route('dashboard')} className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-lg font-medium"><i className="fas fa-layer-group w-8 text-indigo-500"></i> Dashboard</Link>
                                    <Link href="/admin/pages" className="flex items-center p-3 rounded-xl text-gray-700 dark:text-gray-300 text-lg font-medium"><i className="fas fa-file-alt w-8 text-gray-400"></i> Landing Pages</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN INNER CONTENT */}
                <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-screen-2xl mx-auto w-full relative z-0">
                    {/* Decorative Ambient Background Gradients */}
                    <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-400/5 dark:bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                    <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/5 dark:bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
                .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #475569; }
                
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-right { animation: fadeInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
}
