<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $meta->og_title ?? $page->title ?? setting('meta_title', 'STIKes Bogor Husada') }}</title>
    <meta name="description"
        content="{{ $meta->meta_description ?? setting('meta_description', 'Deskripsi default') }}">
    <meta name="keywords" content="{{ $meta->meta_keywords ?? setting('meta_keywords', 'kampus, stikeshusada') }}">
    <meta name="robots" content="{{ $meta->robots ?? 'index, follow' }}">

    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $meta->og_title ?? $page->title ?? 'STIKes Bogor Husada' }}">
    <meta property="og:description" content="{{ $meta->og_description ?? $meta->meta_description }}">
    <meta property="og:image"
        content="{{ $meta->og_image ? asset('storage/'.$meta->og_image) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <meta property="og:type" content="{{ $meta->og_type ?? 'website' }}">
    <meta property="og:url" content="{{ $meta->og_url ?? url()->current() }}">
    <meta property="og:site_name" content="{{ $meta->og_site_name ?? 'STIKes Bogor Husada' }}">

    {{-- Twitter --}}
    <meta name="twitter:card" content="{{ $meta->twitter_card ?? 'summary_large_image' }}">
    <meta name="twitter:title" content="{{ $meta->twitter_title ?? $meta->og_title ?? $page->title }}">
    <meta name="twitter:description" content="{{ $meta->twitter_description ?? $meta->meta_description }}">
    <meta name="twitter:image"
        content="{{ $meta->twitter_image ? asset('storage/'.$meta->twitter_image) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <meta name="twitter:site" content="{{ $meta->twitter_site ?? '@stikesbh' }}">

    {{-- Canonical --}}
    <link rel="canonical" href="{{ $meta->canonical_url ?? url()->current() }}">

    {{-- Favicon & App Icons --}}
    <link rel="icon" type="image/png"
        href="{{ setting('site_favicon') ? asset('storage/' . setting('site_favicon')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <link rel="apple-touch-icon"
        href="{{ setting('site_logo') ? asset('storage/' . setting('site_logo')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />


    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />

    {{-- Styles --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    {{-- Custom Styles --}}
    <style>
        .carousel-container {
            scroll-behavior: smooth;
            scrollbar-width: none;
        }

        .carousel-container::-webkit-scrollbar {
            display: none;
        }

        .carousel-item {
            transition: transform 0.3s ease;
        }

        .carousel-btn[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .fade-in-up.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>

<body class="font-sans antialiased" x-data="{ loading: true }"
    x-init="window.addEventListener('load', () => { setTimeout(() => loading = false, 500) })">

    {{-- ======================================================= --}}
    {{-- == LOADING SPINNER (IMPROVED VISUAL) == --}}
    {{-- ======================================================= --}}
    <div x-show="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0">
        {{-- Spinner div dengan transisi tambahan --}}
        <div x-show="loading"
            class="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"
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

</body>
{{-- Alpine.js + Intersect Plugin --}}
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>

{{-- Alpine Component (Book Carousel) --}}
<script>
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
</script>
{{-- SwiperJS --}}
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
    new Swiper(".mySwiper", {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
</script>

</html>