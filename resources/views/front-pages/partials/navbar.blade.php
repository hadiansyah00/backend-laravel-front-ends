<nav x-data="{ atTop: true, isMobileMenuOpen: false }" @scroll.window="atTop = (window.scrollY < 50)"
    @keydown.escape.window="isMobileMenuOpen = false"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md bg-white/95 backdrop-blur-sm">

    <div class="container flex items-center justify-between px-6 mx-auto transition-all duration-300"
        :class="atTop && !isMobileMenuOpen ? 'py-4' : 'py-2'">

        {{-- Logo --}}
        <a href="{{ route('home') }}" @click="isMobileMenuOpen = false">

            {{-- Logo saat di puncak halaman --}}
            <img x-show="atTop && !isMobileMenuOpen" x-transition
                src="{{ setting('logo_main') ? asset('storage/' . setting('logo_main')) : asset('assets/img/icon/logo_sbh_persegi.png') }}"
                alt="Logo Utama" class="h-[60px] w-auto" />

            <img x-show="!atTop || isMobileMenuOpen" x-transition
                src="{{ setting('logo_sticky') ? asset('storage/' . setting('logo_sticky')) : asset('assets/img/icon/logo_sbh_persegi.png') }}"
                alt="Logo Sticky" class="h-[50px] w-auto" />

        </a>
        {{-- Menu Utama (Desktop) --}}
        <div class="items-center hidden space-x-8 text-sm font-semibold text-gray-700 md:flex">
            @foreach($menus as $menu)
            <x-menu-item :menu="$menu" />
            @endforeach

            <a href="#"
                class="px-5 py-2 font-semibold text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">
                Daftar
            </a>
        </div>

        {{-- Tombol Hamburger (Mobile) --}}
        <div class="md:hidden">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-700 focus:outline-none">
                <svg x-show="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <svg x-show="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    style="display: none;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    {{-- Menu Mobile --}}
    <div x-show="isMobileMenuOpen" x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95" class="absolute left-0 w-full bg-white shadow-md top-full md:hidden"
        style="display: none;">
        <div class="flex flex-col px-6 pt-2 pb-4 space-y-2">
            @foreach($menus as $menu)
            @if($menu->children->count())
            {{-- Dropdown Mobile (Accordion) --}}
            <div x-data="{ open: false }" class="text-gray-700">
                <button @click="open = !open"
                    class="flex items-center justify-between w-full py-2 font-semibold hover:text-purple-600">
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
                    <a href="{{ $child->url ?? '#' }}" class="block py-1 text-sm text-gray-600 hover:text-purple-600">
                        {{ $child->name }}
                    </a>
                    @endforeach
                </div>
            </div>
            @else
            {{-- url Biasa Mobile --}}
            <a href="{{ $menu->url ?? '#' }}" class="block py-2 font-semibold text-gray-700 hover:text-purple-600">{{
                $menu->name }}</a>
            @endif
            @endforeach

            <a href="#"
                class="block w-full px-5 py-2 mt-2 font-semibold text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                Donasi
            </a>
        </div>
    </div>
</nav>