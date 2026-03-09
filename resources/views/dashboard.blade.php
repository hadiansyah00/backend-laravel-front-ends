<x-app-layout>

    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Dashboard Admin') }}
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

            {{-- ============ GREETING BANNER ============ --}}
            <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 shadow-lg">
                <div class="absolute right-0 top-0 opacity-10">
                    <svg class="h-48 w-48 -mr-8 -mt-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.25c1.242 0 2.25-1.008 2.25-2.25S13.242 9.75 12 9.75 9.75 10.758 9.75 12s1.008 2.25 2.25 2.25z"/><path d="M12 3v3.75m0 10.5V21m8.25-9H21M3 12h3.75"/></svg>
                </div>
                <div class="relative">
                    <h3 class="text-2xl font-bold text-white">
                        Selamat Datang, {{ Auth::user()->name ?? 'Admin' }} 👋
                    </h3>
                    <p class="mt-1 text-blue-200 text-sm">
                        Panel Administrasi Website STIKes Bogor Husada — {{ now()->translatedFormat('l, d F Y') }}
                    </p>
                </div>
            </div>

            {{-- ============ STATISTICS CARDS ============ --}}
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

                {{-- Berita --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Pages::where('category', 'berita')->count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Berita</p>
                    </div>
                </div>

                {{-- Pengumuman --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Pengumuman::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Pengumuman</p>
                    </div>
                </div>

                {{-- Event --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Event::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Event / Agenda</p>
                    </div>
                </div>

                {{-- Dosen --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Dosen::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Dosen & Staf</p>
                    </div>
                </div>

                {{-- Alumni --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"/></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Alumni::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Alumni</p>
                    </div>
                </div>

            </div>

            {{-- ============ ROW 2: MORE STATS ============ --}}
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">

                {{-- Galeri --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Gallery::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Foto Galeri</p>
                    </div>
                </div>

                {{-- Dokumen --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <div>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Document::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Dokumen</p>
                    </div>
                </div>

                {{-- Program Studi --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/></svg>
                    </div>
                    <div>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ \App\Models\ProgramStudi::count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Program Studi</p>
                    </div>
                </div>

                {{-- Lowongan Aktif --}}
                <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-600 dark:bg-lime-900 dark:text-lime-300">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/></svg>
                    </div>
                    <div>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ \App\Models\Lowongan::where('is_active', true)->count() }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Lowongan Aktif</p>
                    </div>
                </div>

            </div>

            {{-- ============ QUICK ACCESS GRID ============ --}}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                    <h4 class="text-base font-semibold text-gray-900 dark:text-white">⚡ Akses Cepat Kelola Konten</h4>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-200 dark:bg-gray-700">

                    <a href="{{ route('admin.pengumumans.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Pengumuman</span>
                    </a>

                    <a href="{{ route('admin.events.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Event / Agenda</span>
                    </a>

                    <a href="{{ route('admin.dosens.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Dosen & Staf</span>
                    </a>

                    <a href="{{ route('admin.galleries.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center text-pink-600 dark:text-pink-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Galeri Foto</span>
                    </a>

                    <a href="{{ route('admin.documents.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Dokumen</span>
                    </a>

                    <a href="{{ route('admin.program-studis.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Program Studi</span>
                    </a>

                    <a href="{{ route('admin.alumnis.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Alumni</span>
                    </a>

                    <a href="{{ route('admin.lowongans.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900 flex items-center justify-center text-lime-600 dark:text-lime-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Lowongan</span>
                    </a>

                    <a href="{{ route('admin.pages.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Halaman & Sections</span>
                    </a>

                    <a href="{{ route('admin.pendaftaran-email.index') }}" class="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 p-5 text-center hover:bg-blue-50 dark:hover:bg-gray-750 transition group">
                        <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Pendaftaran Email</span>
                    </a>

                </div>
            </div>

            {{-- ============ RECENT ACTIVITY TABLES ============ --}}
            <div class="grid gap-6 lg:grid-cols-2">

                {{-- Pengumuman Terbaru --}}
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h4 class="text-sm font-semibold text-gray-900 dark:text-white">📢 Pengumuman Terbaru</h4>
                        <a href="{{ route('admin.pengumumans.index') }}" class="text-xs text-blue-600 hover:underline">Lihat Semua →</a>
                    </div>
                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                        @forelse(\App\Models\Pengumuman::latest()->take(5)->get() as $item)
                            <div class="px-4 py-3 flex items-center justify-between">
                                <div class="min-w-0">
                                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ $item->title }}</p>
                                    <p class="text-xs text-gray-400">{{ $item->created_at->diffForHumans() }}</p>
                                </div>
                                @if($item->is_active)
                                    <span class="shrink-0 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Aktif</span>
                                @else
                                    <span class="shrink-0 bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400">Draft</span>
                                @endif
                            </div>
                        @empty
                            <p class="px-4 py-6 text-sm text-gray-400 text-center">Belum ada pengumuman.</p>
                        @endforelse
                    </div>
                </div>

                {{-- Event Mendatang --}}
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h4 class="text-sm font-semibold text-gray-900 dark:text-white">📅 Event Mendatang</h4>
                        <a href="{{ route('admin.events.index') }}" class="text-xs text-blue-600 hover:underline">Lihat Semua →</a>
                    </div>
                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                        @forelse(\App\Models\Event::where('start_date', '>=', now())->orderBy('start_date')->take(5)->get() as $event)
                            <div class="px-4 py-3 flex items-center gap-3">
                                <div class="shrink-0 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900 flex flex-col items-center justify-center">
                                    <span class="text-xs font-bold text-blue-600 dark:text-blue-300 leading-none">{{ $event->start_date->format('d') }}</span>
                                    <span class="text-[10px] text-blue-500 dark:text-blue-400 uppercase">{{ $event->start_date->format('M') }}</span>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ $event->title }}</p>
                                    <p class="text-xs text-gray-400">📍 {{ $event->location ?? 'Lokasi belum diatur' }}</p>
                                </div>
                            </div>
                        @empty
                            <p class="px-4 py-6 text-sm text-gray-400 text-center">Tidak ada event mendatang.</p>
                        @endforelse
                    </div>
                </div>

            </div>

        </div>
    </div>

</x-app-layout>