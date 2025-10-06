<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('front-pages.partials.head')
</head>

<body class="pt-24 font-sans antialiased" x-data="{ loading: true }"
    x-init="window.addEventListener('load', () => { setTimeout(() => loading = false, 500) })">

    {{-- ======================================================= --}}
    {{-- == LOADING SPINNER (IMPROVED VISUAL) == --}}
    {{-- ======================================================= --}}
    <div x-show="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0">
        {{-- Spinner div dengan transisi tambahan --}}
        <div x-show="loading"
            class="w-12 h-12 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"
            x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-90">
        </div>
    </div>

    {{-- ======================================================= --}}
    {{-- == MAIN CONTENT == --}}
    {{-- ======================================================= --}}
    <main x-show="!loading" x-cloak x-transition.opacity>
        @include('front-pages.partials.navbar')
        @yield('content')
    </main>

    @include('front-pages.partials.footer')

    {{-- ======================================================= --}}
    {{-- == KOMPONEN CHAT TOGGLE FLOAT == --}}
    {{-- ======================================================= --}}
    @include('front-pages.partials.chat-toggle')
    @vite(['resources/js/app.js','resources/js/swiper.js'])
</body>
{{-- Alpine.js + Intersect Plugin --}}
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>

{{-- Alpine Component (Book Carousel) --}}
{{-- <script>
    document.addEventListener('alpine:init', () => {
            Alpine.data('bookCarousel', () => ({
                currentIndex: 0,
                totalItems: 0,
                init() {
                    this.totalItems = this.$refs.slider.children.length;
                    this.$refs.slider.addEventListener('scroll', () => {
                        const itemWidth = this.$refs.slider.children[0].offsetWidth;
                        this.currentIndex = Math.round(this.$refs.slider.scrollLeft / itemWidth);
                    });
                },
                scrollNext() {
                    const itemWidth = this.$refs.slider.children[0].offsetWidth + 24;
                    this.$refs.slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
                },
                scrollPrev() {
                    const itemWidth = this.$refs.slider.children[0].offsetWidth + 24;
                    this.$refs.slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
                }
            }));
        });
</script> --}}
{{-- SwiperJS --}}
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


</html>