{{-- ======================================================= --}}
{{-- == WRAPPER HEADER UTAMA (YANG DIPERBAIKI) == --}}
{{-- ======================================================= --}}
@php
$socials = [
['icon' => 'fab fa-instagram', 'text' => 'stikesboda', 'url' => 'https://www.instagram.com/stikesbogorhusada/'],
['icon' => 'fab fa-tiktok', 'text' => 'stikes.boda', 'url' => 'https://www.tiktok.com/@stikesbogorhusada'],
['icon' => 'fab fa-facebook-f', 'text' => 'STIKes Bogor Husada', 'url' => 'https://www.facebook.com/stikesboda'],
['icon' => 'fab fa-youtube', 'text' => 'STTikes Bogor Husada', 'url' =>
'https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA'],
];
$contacts = [
// ['icon' => 'fas fa-phone', 'text' => '0251-8318456', 'url' => 'tel:02518318456'],
['icon' => 'fab fa-whatsapp', 'text' => '0811-1011-1560', 'url' => 'https://wa.me/6281110111560'],
];
@endphp
{{-- SOLUSI: Semua logika Alpine.js & 'fixed' disatukan di tag <header> ini. --}}
    {{-- Ini menjadi satu-satunya sumber kontrol untuk semua bagian header. --}}
    <header x-data="{ atTop: true, isMobileMenuOpen: false, isFooterVisible: false, headerHeight: 0 }" x-init="
            headerHeight = $el.offsetHeight;
            const observer = new IntersectionObserver(
                ([e]) => { isFooterVisible = e.isIntersecting },
                { threshold: [0.1] } /* Sedikit threshold agar lebih smooth */
            );
            /* Pastikan elemen dengan id 'page-footer' ada */
            if (document.querySelector('#page-footer')) {
                observer.observe(document.querySelector('#page-footer'));
            }
        " @scroll.window="atTop = (window.scrollY < 10)" @resize.window="headerHeight = $el.offsetHeight"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'headroom--unpinned': !atTop }">

        {{-- TOP BAR (Konten Anda dimasukkan ke dalam struktur yang benar) --}}
        <div class="w-full text-white bg-orange-600 shadow-sm">

            <div
                class="container flex flex-col items-center justify-between gap-2 px-4 py-2 mx-auto md:flex-row md:gap-0">

                <div class="flex items-center space-x-5">
                    @foreach ($socials as $social)
                    <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer"
                        class="transition-transform duration-200 hover:scale-110"
                        title="{{-- Teks ini akan muncul saat ikon di-hover --}}">
                        <i class="{{ $social['icon'] }} text-lg"></i> {{-- Ukuran ikon sedikit diperbesar --}}
                    </a>
                    @endforeach
                </div>

                <div class="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">

                    <div class="flex items-center space-x-6">
                        @foreach ($contacts as $contact)
                        <a href="{{ $contact['url'] }}"
                            class="flex items-center space-x-2 transition-opacity hover:opacity-80">
                            <i class="{{ $contact['icon'] }} text-base"></i>
                            {{-- Teks kontak disembunyikan di layar sangat kecil agar tidak berantakan --}}
                            <span class="hidden text-xs font-semibold sm:inline">{{ $contact['text'] }}</span>
                        </a>
                        @endforeach
                    </div>

                    <a href="https://pmb.sbh.ac.id/"
                        class="px-5 py-1.5 text-xs font-bold text-orange-700 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-orange-100 hover:shadow-lg">
                        Pendaftaran PMB
                    </a>
                </div>

            </div>
        </div>

        {{-- NAVIGASI UTAMA --}}
        <nav
            class="fixed left-0 right-0 z-40 w-full h-16 transition-all duration-300 shadow-md top-10 bg-white/95 backdrop-blur-sm">
            <div class="container flex items-center justify-between px-6 mx-auto transition-all duration-300"
                :class="atTop && !isMobileMenuOpen ? 'py-4' : 'py-2'">

                {{-- Logo --}}
                <a href="{{ route('home') }}" @click="isMobileMenuOpen = false" class="z-50">
                    <img x-show="atTop && !isMobileMenuOpen" x-transition
                        src="{{ setting('logo_main') ? asset('storage/' . setting('logo_main')) : asset('assets/img/icon/logo_sbh_persegi.png') }}"
                        alt="Logo Utama" class="h-[30px] w-auto" />
                    <img x-show="!atTop || isMobileMenuOpen" x-transition
                        src="{{ setting('logo_sticky') ? asset('storage/' . setting('logo_sticky')) : asset('assets/img/icon/logo_sbh_persegi.png') }}"
                        alt="Logo Sticky" class="h-[30px] w-auto" />
                </a>

                {{-- Menu + Search --}}
                <div class="items-center hidden space-x-6 text-sm font-semibold text-gray-700 md:flex">
                    @foreach($menus as $menu)
                    <x-menu-item :menu="$menu" variant="desktop" />
                    @endforeach

                    {{-- Search --}}
                    <form action="{{ route('search') }}" method="GET" class="relative">
                        <input type="text" name="q" placeholder="Cari..."
                            class="px-3 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                        <button type="submit"
                            class="absolute text-gray-500 -translate-y-1/2 right-2 top-1/2 hover:text-orange-600">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
        </nav>

        <div x-data="{
            isMobileMenuOpen: false,
            isSearchOpen: false,
            isFooterVisible: false,
        }" {{-- Tambahan: Logika untuk mendeteksi kapan footer terlihat --}} x-init="
            const footer = document.querySelector('#footer'); // Pastikan footer Anda memiliki id='footer'
            if (footer) {
                const observer = new IntersectionObserver(
                    ([e]) => { isFooterVisible = e.isIntersecting; },
                    { threshold: [0] }
                );
                observer.observe(footer);
            }
        " @keydown.escape.window="isSearchOpen = false">

            {{-- BOTTOM NAVIGATION BAR (IMPROVED) --}}
            <div x-show="!isFooterVisible" x-transition:enter="transition ease-out duration-300 transform"
                x-transition:enter-start="translate-y-full" x-transition:enter-end="translate-y-0"
                x-transition:leave="transition ease-in duration-300 transform" x-transition:leave-start="translate-y-0"
                x-transition:leave-end="translate-y-full"
                class="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-sm shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.1)] md:hidden">

                {{-- Menggunakan grid-cols-3 untuk 3 item --}}
                <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">

                    {{-- 1. Tombol HOME --}}
                    <a href="{{ route('home') }}"
                        class="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 hover:text-orange-600 dark:hover:bg-gray-800 {{ request()->routeIs('home') ? 'text-orange-600' : '' }}">
                        <svg class="w-6 h-6 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
                        </svg>
                        <span class="text-xs">Home</span>
                    </a>

                    {{-- 2. Tombol MENU --}}
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
                        class="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 hover:text-orange-600 dark:hover:bg-gray-800">
                        <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <span class="text-xs">Menu</span>
                    </button>

                    {{-- 3. Tombol CARI (Membuka Modal) --}}
                    <button @click="isSearchOpen = true; $nextTick(() => $refs.searchInput.focus())" type="button"
                        class="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 hover:text-orange-600 dark:hover:bg-gray-800">
                        <svg class="w-6 h-6 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <span class="text-xs">Cari</span>
                    </button>
                </div>
            </div>
            {{-- MOBILE MENU PANEL (Bagian yang Hilang) --}}
            {{-- Panel ini akan muncul dari kanan saat isMobileMenuOpen = true --}}
            <div x-show="isMobileMenuOpen" x-transition:enter="transition ease-in-out duration-300 transform"
                x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0"
                x-transition:leave="transition ease-in-out duration-300 transform"
                x-transition:leave-start="translate-x-0" x-transition:leave-end="translate-x-full"
                class="fixed inset-0 z-50 flex flex-col w-full max-w-sm ml-auto bg-white shadow-lg md:hidden"
                @click.outside="isMobileMenuOpen = false" x-cloak>

                {{-- Header Menu Mobile --}}
                <div class="flex items-center justify-between p-4 border-b">
                    <h2 class="text-lg font-semibold text-gray-800">Menu</h2>
                    <button @click="isMobileMenuOpen = false" class="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {{-- Daftar Link Menu --}}
                <div class="flex-grow p-4 space-y-2 overflow-y-auto">
                    @foreach($menus as $menu)
                    <x-menu-item :menu="$menu" variant="mobile" />
                    @endforeach
                </div>
            </div>

            {{-- Backdrop (Latar Belakang Gelap) --}}
            <div x-show="isMobileMenuOpen" x-transition:enter="ease-out duration-300"
                x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
                x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0" class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                x-cloak>
            </div>

            {{-- SEARCH MODAL (POP-UP) --}}
            <div x-show="isSearchOpen" x-trap="isSearchOpen" x-transition:enter="ease-out duration-300"
                x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
                x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-gray-900/60 backdrop-blur-sm"
                style="display: none;">

                <div @click.outside="isSearchOpen = false" x-show="isSearchOpen"
                    x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 scale-95"
                    x-transition:enter-end="opacity-100 scale-100" x-transition:leave="ease-in duration-200"
                    x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-95"
                    class="w-full max-w-lg p-4 bg-white shadow-lg rounded-xl">

                    <form action="{{ route('search') }}" method="GET" class="relative">
                        <input x-ref="searchInput" type="text" name="q" placeholder="Ketikkan kata kunci..."
                            class="w-full py-3 pl-4 pr-12 text-base text-gray-800 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                        <button type="submit"
                            class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 transition-colors rounded-r-lg hover:text-orange-600">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </form>
                    <p class="mt-2 text-xs text-center text-gray-500">Tekan 'Esc' untuk menutup</p>
                </div>
            </div>

        </div>

        {{-- FULL-SCREEN MENU PANEL (Struktur tetap sama, hanya dikontrol dari header utama) --}}
        <div x-show="isMobileMenuOpen" x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            style="display: none;">

            <div @click.away="isMobileMenuOpen = false" x-show="isMobileMenuOpen"
                x-transition:enter="transition ease-out duration-300 transform"
                x-transition:enter-start="translate-y-full" x-transition:enter-end="translate-y-0"
                x-transition:leave="transition ease-in duration-300 transform" x-transition:leave-start="translate-y-0"
                x-transition:leave-end="translate-y-full"
                class="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">

                {{-- Header Menu & Tombol Tutup --}}
                <div class="flex items-center justify-between p-4 border-b">
                    <h2 class="text-lg font-semibold text-gray-800">Menu Navigasi</h2>
                    <button @click="isMobileMenuOpen = false" class="p-1 text-gray-500 rounded-full hover:bg-gray-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>

                {{-- Daftar Menu (Logika lama Anda tetap bisa dipakai) --}}
                <div class="flex flex-col px-4 pt-2 pb-10 space-y-2">
                    @foreach($menus as $menu)
                    @php
                    // Gunakan url jika ada, jika tidak, fallback ke slug jika ada, jika tidak, #
                    $menuUrl = $menu->url ?? ($menu->slug ? url($menu->slug) : '#');
                    @endphp
                    @if($menu->children->count())
                    <div x-data="{ open: false }" class="text-gray-700">
                        <button @click="open = !open"
                            class="flex items-center justify-between w-full py-2 font-semibold hover:text-orange-600">
                            <span>{{ $menu->name }}</span>
                            <svg class="w-5 h-5 ml-1 transition-transform duration-200" :class="{'rotate-180': open}"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div x-show="open" x-transition class="pt-2 pb-1 pl-4 space-y-2">
                            @foreach($menu->children as $child)
                            @php
                            $childUrl = $child->url ?? ($child->slug ? url($child->slug) : '#');
                            @endphp
                            <a href="{{ $childUrl }}" @click="isMobileMenuOpen = false"
                                class="block py-1 text-sm text-gray-600 hover:text-orange-600">{{ $child->name
                                }}</a>
                            @endforeach
                        </div>
                    </div>
                    @else
                    <a href="{{ $menuUrl }}" @click="isMobileMenuOpen = false"
                        class="block py-2 font-semibold text-gray-700 hover:text-orange-600">{{ $menu->name }}</a>
                    @endif
                    @endforeach
                </div>
            </div>
        </div>
    </header>



    <div :style="`height: ${headerHeight}px`"></div>