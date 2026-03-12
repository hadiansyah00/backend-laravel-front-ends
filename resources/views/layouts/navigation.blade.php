<nav x-data="{ open: false }" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <div class="flex items-center shrink-0">
                    <a href="{{ route('dashboard') }}">
                        <x-application-logo class="block w-auto text-gray-800 fill-current h-9 dark:text-gray-200" />
                    </a>
                </div>

                <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                        {{-- Ikon Home --}}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
                        </svg>

                        {{ __('Dashboard') }}
                    </x-nav-link>
                    {{-- Tampilkan link ini hanya untuk admin --}}
                    {{-- Dropdown untuk Menu Admin --}}
                    @role('admin')
                    <div class="hidden sm:flex sm:items-center sm:ms-10">
                        <x-dropdown align="right" width="48">
                            {{-- Tombol untuk membuka dropdown --}}
                            <x-slot name="trigger">
                                <button
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                                    {{-- Ikon Utama Dropdown --}}
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
                                    </svg>

                                    {{-- Teks Dropdown --}}
                                    <div>Kelola Akses</div>
                                    {{-- Panah Dropdown --}}
                                    <div class="ms-1">
                                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </x-slot>

                            {{-- Konten Dropdown (Link-link) --}}
                            <x-slot name="content">
                                {{-- Link Kelola User --}}
                                <x-dropdown-link :href="route('admin.users.index')"
                                    :active="request()->routeIs('admin.users.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.12-.24.232-.487.335-.737m-3.068 3.845A3.375 3.375 0 0012.75 15a3.375 3.375 0 00-3.068 3.845" />
                                        </svg>
                                        {{ __('Kelola User') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Link Kelola Role --}}
                                <x-dropdown-link :href="route('admin.roles.index')"
                                    :active="request()->routeIs('roles.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
                                        </svg>
                                        {{ __('Kelola Role') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Link Kelola Permission --}}
                                <x-dropdown-link :href="route('admin.permissions.index')"
                                    :active="request()->routeIs('admin.permissions.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v-2.25L10.875 12.187c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                        {{ __('Kelola Permission') }}
                                    </div>
                                </x-dropdown-link>
                                {{-- LINK BARU: Kelola Menu --}}

                            </x-slot>
                        </x-dropdown>
                    </div>
                    @endrole
                    @role('admin')
                    <div class="hidden sm:flex sm:items-center sm:ms-10">
                        <x-dropdown align="right" width="48">
                            {{-- Tombol untuk membuka dropdown --}}
                            <x-slot name="trigger">
                                <button
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                                    {{-- Ikon Utama Dropdown --}}
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M10.343 3.94c.09-.542.56-1.003 1.11-1.226l.043-.018c.22-.1.447-.137.662-.137l.229.008c.28.01.55.064.81.158l.027.01c.25.094.47.24.64.423l.02.022c.17.18.3.394.39.63l.013.04c.09.26.13.53.13.805l.001.125c.002.22.002.44-.002.66l-.004.18c-.01.29-.04.58-.08.87l-.02.13c-.05.28-.13.55-.23.81l-.03.08c-.1.26-.23.51-.38.74l-.04.06c-.15.23-.32.44-.5.63l-.03.03c-.18.18-.38.35-.6.49l-.04.03c-.22.14-.46.25-.7.34l-.04.01c-.24.07-.48.12-.73.15l-.07.01c-.22.02-.44.03-.66.03l-.23-.01c-.28-.01-.55-.06-.81-.16l-.03-.01c-.25-.09-.47-.24-.64-.42l-.02-.02c-.17-.18-.3-.39-.39-.63l-.01-.04c-.09-.26-.13-.53-.13-.8l-.002-.13c-.002-.22-.002-.44.002-.66l.003-.18c.01-.29.04-.58.08-.87l.02-.13c.05-.28.13.55.23.81l.03.08c.1-.26.23.51.38.74l.04.06c.15.23.32.44.5.63l.03.03c.18.18.38.35.6.49l.04.03c.22.14.46.25.7.34l.04.01c.24.07.48.12.73.15l.07.01c.22.02.44.03.66.03h.23z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                                    </svg>
                                    <div>Kelola Website</div>

                                    {{-- Panah Dropdown --}}
                                    <div class="ms-1">
                                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </x-slot>

                            {{-- Konten Dropdown (Link-link) --}}
                            <x-slot name="content">
                                {{-- LINK BARU: Kelola Menu --}}
                                <x-dropdown-link :href="route('admin.menus.index')"
                                    :active="request()->routeIs('menus.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                        {{ __('Kelola Menu') }}
                                    </div>
                                </x-dropdown-link>
                                <x-dropdown-link :href="route('admin.pages.index')"
                                    :active="request()->routeIs('pages.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {{ __('Kelola Page') }}
                                    </div>
                                </x-dropdown-link>

                            </x-slot>
                        </x-dropdown>
                        <x-dropdown align="right" width="48">
                            {{-- Tombol untuk membuka dropdown --}}
                            <x-slot name="trigger">
                                <button
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                                    {{-- Ikon Utama Dropdown --}}
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <div>Kelola Front Pages</div>

                                    {{-- Panah Dropdown --}}
                                    <div class="ms-1">
                                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </x-slot>

                            {{-- Konten Dropdown --}}
                            <x-slot name="content">

                                {{-- Sliders --}}
                                <x-dropdown-link :href="route('admin.sliders.index')"
                                    :active="request()->routeIs('admin.sliders.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 4.5h18m-18 6h18m-18 6h18" />
                                        </svg>
                                        {{ __('Kelola Sliders') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Testimonials --}}
                                <x-dropdown-link :href="route('admin.testimonials.index')"
                                    :active="request()->routeIs('admin.testimonials.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7.5 8.25h9M7.5 12h6m-6 3.75h3M4.5 6.75A2.25 2.25 0 012.25 9v6a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9a2.25 2.25 0 00-2.25-2.25h-15z" />
                                        </svg>
                                        {{ __('Kelola Testimoni') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Front Settings --}}
                                <x-dropdown-link :href="route('admin.frontsettings.index')"
                                    :active="request()->routeIs('admin.frontsettings.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11.25 4.5a.75.75 0 011.5 0v15a.75.75 0 01-1.5 0V4.5z" />
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M4.5 12a.75.75 0 000 1.5h15a.75.75 0 000-1.5H4.5z" />
                                        </svg>
                                        {{ __('Pengaturan Front Settings') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Program Studi --}}
                                <x-dropdown-link :href="route('admin.program-studis.index')"
                                    :active="request()->routeIs('admin.program-studis.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 14.25c1.242 0 2.25-1.008 2.25-2.25S13.242 9.75 12 9.75 9.75 10.758 9.75 12s1.008 2.25 2.25 2.25z" />
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 3v3.75m0 10.5V21m8.25-9H21M3 12h3.75" />
                                        </svg>
                                        {{ __('Kelola Program Studi') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Dosen & Staf --}}
                                <x-dropdown-link :href="route('admin.dosens.index')"
                                    :active="request()->routeIs('admin.dosens.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                        {{ __('Kelola Dosen & Staf') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Pengumuman --}}
                                <x-dropdown-link :href="route('admin.pengumumans.index')"
                                    :active="request()->routeIs('admin.pengumumans.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M10.34l-6.74 3.86a2.25 2.25 0 00-1.11 1.95v6.59m13.75-9.28l6.74 3.86a2.25 2.25 0 011.11 1.95v6.59m-8.94-11.45a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM12 21.75V11.25" />
                                        </svg>
                                        {{ __('Kelola Pengumuman') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Event & Agenda --}}
                                <x-dropdown-link :href="route('admin.events.index')"
                                    :active="request()->routeIs('admin.events.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
                                        {{ __('Kelola Event / Agenda') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Dokumen --}}
                                <x-dropdown-link :href="route('admin.documents.index')"
                                    :active="request()->routeIs('admin.documents.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>
                                        {{ __('Kelola Dokumen Unduhan') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Galeri Foto --}}
                                <x-dropdown-link :href="route('admin.galleries.index')"
                                    :active="request()->routeIs('admin.galleries.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
                                        {{ __('Kelola Galeri Foto') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Alumni --}}
                                <x-dropdown-link :href="route('admin.alumnis.index')"
                                    :active="request()->routeIs('admin.alumnis.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
                                        {{ __('Kelola Alumni') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Lowongan / Karir --}}
                                <x-dropdown-link :href="route('admin.lowongans.index')"
                                    :active="request()->routeIs('admin.lowongans.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
</svg>
                                        {{ __('Lowongan & Karir') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Statistics --}}
                                <x-dropdown-link :href="route('admin.statistics.index')"
                                    :active="request()->routeIs('admin.statistics.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 15.75l4.5-4.5L12 15.75l6-6 3 3v6H3v-3z" />
                                        </svg>
                                        {{ __('Kelola Statistik') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Company Profile Videos --}}
                                <x-dropdown-link :href="route('admin.companyprofile.index')"
                                    :active="request()->routeIs('admin.companyprofile.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15.75 10.5l-6 3.75V6.75l6 3.75z" />
                                        </svg>
                                        {{ __('Kelola Video Company Profile') }}
                                    </div>
                                </x-dropdown-link>
                                {{-- Pendaftaran Email --}}
                                <x-dropdown-link :href="route('admin.pendaftaran-email.index')"
                                    :active="request()->routeIs('admin.pendaftaran-email.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                        {{ __('Kelola Pendaftaran Email') }}
                                    </div>
                                </x-dropdown-link>
                            </x-slot>
                        </x-dropdown>
                        {{-- Dropdown Menu Kelola Berita & Artikel --}}
                        <x-dropdown align="right" width="48">
                            {{-- Tombol untuk membuka dropdown --}}
                            <x-slot name="trigger">
                                <button
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                                    {{-- Ikon Utama Dropdown --}}
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <div>Berita & Artikel</div>

                                    {{-- Panah Dropdown --}}
                                    <div class="ms-1">
                                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </x-slot>

                            {{-- Konten Dropdown --}}
                            <x-slot name="content">
                                {{-- Artikel & Berita --}}
                                <x-dropdown-link :href="route('admin.articles.index')"
                                    :active="request()->routeIs('admin.articles.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        {{ __('Kelola Artikel & Berita') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Kategori --}}
                                <x-dropdown-link :href="route('admin.categories.index')"
                                    :active="request()->routeIs('admin.categories.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                        {{ __('Kelola Kategori Artikel') }}
                                    </div>
                                </x-dropdown-link>

                                {{-- Tags --}}
                                <x-dropdown-link :href="route('admin.tags.index')"
                                    :active="request()->routeIs('admin.tags.*')">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7.5 7.5l9 9m0-9l-9 9" />
                                        </svg>
                                        {{ __('Kelola Tags Artikel') }}
                                    </div>
                                </x-dropdown-link>

                            </x-slot>
                        </x-dropdown>
                    </div>
                    @endrole
                </div>
            </div>

            <div class="hidden sm:flex sm:items-center sm:ms-6">
                <x-dark-mode-toggle />

                <x-dropdown align="right" width="48">
                    <x-slot name="trigger">
                        <button
                            class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:bg-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                            <div>{{ Auth::user()?->name }}</div>
                            <div class="ms-1">
                                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </x-slot>
                    <x-slot name="content">
                        <x-dropdown-link :href="route('admin.profile.edit')">
                            {{ __('Profile') }}
                        </x-dropdown-link>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <x-dropdown-link :href="route('logout')" onclick="event.preventDefault();
                                            this.closest('form').submit();">
                                {{ __('Log Out') }}
                            </x-dropdown-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

        </div>
    </div>
</nav>