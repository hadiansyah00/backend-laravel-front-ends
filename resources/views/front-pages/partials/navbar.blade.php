<nav x-data="{ atTop: true, isMobileMenuOpen: false }" @scroll.window="atTop = (window.scrollY < 50)"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{ 'bg-white/90 shadow-md backdrop-blur-sm': !atTop || isMobileMenuOpen }">

    <div class="container flex items-center justify-between px-6 mx-auto transition-all duration-300"
        :class="atTop && !isMobileMenuOpen ? 'py-4' : 'py-2'">

        <a href="{{ route('home') }}">
            <img x-show="atTop && !isMobileMenuOpen" x-transition src="{{ asset('assets/img/icon/logo.png') }}"
                alt="Logo Utama" class="w-15 h-15" />

            <img x-show="!atTop || isMobileMenuOpen" x-transition src="{{ asset('assets/img/icon/logo.png') }}"
                alt="Logo Sticky" class="w-10 h-10" />
        </a>

        <div class="items-center hidden space-x-8 text-sm font-semibold transition-colors duration-300 md:flex"
            :class="(atTop && !isMobileMenuOpen) ? 'text-white' : 'text-gray-700'">

            <a href="{{ route('home') }}" class="hover:text-purple-600">Beranda</a>

            <div x-data="{ isOpen: false }" class="relative">
                <button @mouseenter="isOpen = true" @mouseleave="isOpen = false"
                    class="flex items-center hover:text-purple-600">
                    Tentang Kami
                    <svg class="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <div x-show="isOpen" x-transition:enter="transition ease-out duration-200"
                    x-transition:enter-start="opacity-0 transform -translate-y-2"
                    x-transition:enter-end="opacity-100 transform translate-y-0"
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100 transform translate-y-0"
                    x-transition:leave-end="opacity-0 transform -translate-y-2" @mouseenter="isOpen = true"
                    @mouseleave="isOpen = false"
                    class="absolute left-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Visi &
                        Misi</a>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Sejarah</a>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Struktur
                        Organisasi</a>
                </div>
            </div>
            <a href="#" class="hover:text-purple-600">Publikasi</a>
            <a href="{{ route ('wilayah') }}" class="hover:text-purple-600">Wilayah</a>
            <a href="#"
                class="px-5 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700">Donasi</a>
        </div>

        <div class="md:hidden">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="focus:outline-none"
                :class="(atTop && !isMobileMenuOpen) ? 'text-white' : 'text-gray-800'">
                <svg x-show="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <svg x-show="isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    <div x-show="isMobileMenuOpen" x-transition
        class="absolute left-0 w-full shadow-lg md:hidden bg-white/95 backdrop-blur-sm top-full">
    </div>
</nav>