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
        <div class="items-center justify-between hidden w-full px-4 text-white bg-orange-600 md:flex h-15">
            <div class="container flex items-center justify-between px-6 py-2 mx-auto">
                <div class="flex items-center space-x-4">
                    @foreach ($socials as $social)
                    <a href="{{ $social['url'] }}" target="_blank"
                        class="flex items-center space-x-1.5 transition-opacity hover:opacity-80">
                        <i class="{{ $social['icon'] }} w-4 text-center"></i>
                        {{-- <span class="text-xs">{{ $social['text'] }}</span> --}}
                    </a>
                    @endforeach
                </div>
                <div class="flex items-center space-x-6">
                    @foreach ($contacts as $contact)
                    <a href="{{ $contact['url'] }}"
                        class="flex items-center space-x-2 transition-opacity hover:opacity-80">
                        <i class="{{ $contact['icon'] }} w-4 text-center"></i>
                        <span class="text-xs font-semibold">{{ $contact['text'] }}</span>
                    </a>
                    @endforeach
                    <a href="#"
                        class="px-4 py-1 text-xs font-semibold text-black transition bg-orange-200 rounded-full hover:bg-orange-300">
                        Bisa mereun
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
                    <x-menu-item :menu="$menu" />
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

        {{-- BOTTOM NAVIGATION BAR --}}
        {{-- SOLUSI: 'x-show' ditambahkan agar nav bawah bersembunyi di footer, dengan transisi. --}}
        <div x-show="!isFooterVisible" x-transition:enter="transition ease-out duration-300 transform"
            x-transition:enter-start="translate-y-full" x-transition:enter-end="translate-y-0"
            x-transition:leave="transition ease-in duration-300 transform" x-transition:leave-start="translate-y-0"
            x-transition:leave-end="translate-y-full"
            class="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-t-lg md:hidden">
            <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <a href="#"
                    class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                    {{-- Ganti dengan SVG icon Anda --}}
                    <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 11a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z">
                        </path>
                    </svg>
                    <span class="text-xs">A11Y</span>
                </a>
                <a href="{{ route('home') }}"
                    class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                    {{-- Ganti dengan SVG icon Anda --}}
                    <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                        </path>
                    </svg>
                    <span class="text-xs">Home</span>
                </a>
                <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
                    class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                    {{-- Ganti dengan SVG icon Anda --}}
                    <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5.5A.75.75 0 012.75 9.5h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 5.5A.75.75 0 012.75 15h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z">
                        </path>
                    </svg>
                    <span class="text-xs">Menu</span>
                </button>
                <form action="{{ route('search') }}" method="GET"
                    class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                    <svg class="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z">
                        </path>
                    </svg>
                    <input type="text" name="q" placeholder="Cari..."
                        class="w-20 text-xs text-center bg-transparent border-none focus:ring-0" />
                </form>
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