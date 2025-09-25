<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

{{-- Title & Metadata --}}
<title>{{ setting('meta_title', 'STIKes Bogor Husada') }}</title>
<meta name="description" content="{{ setting('meta_description', 'Deskripsi default website') }}">
<meta name="keywords" content="{{ setting('meta_keywords', 'kampus, kesehatan, bogor, stikeshusada') }}">
<meta name="author" content="STIKes Bogor Husada">

{{-- Open Graph (Facebook, LinkedIn, WhatsApp) --}}
<meta property="og:title" content="{{ setting('og_title', setting('meta_title', 'STIKes Bogor Husada')) }}">
<meta property="og:description"
    content="{{ setting('og_description', setting('meta_description', 'Deskripsi default website')) }}">
<meta property="og:image"
    content="{{ setting('og_image') ? asset('storage/' . setting('og_image')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">
<meta property="og:type" content="website">
<meta property="og:url" content="{{ url()->current() }}">

{{-- Twitter Card --}}
<meta name="twitter:card" content="{{ setting('twitter_card', 'summary_large_image') }}">
<meta name="twitter:title" content="{{ setting('meta_title', 'STIKes Bogor Husada') }}">
<meta name="twitter:description" content="{{ setting('meta_description', 'Deskripsi default website') }}">
<meta name="twitter:image"
    content="{{ setting('og_image') ? asset('storage/' . setting('og_image')) : asset('assets/img/icon/logo_sbh_persegi.png') }}">

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
{{-- Google Analytics (jika ada) --}}
@if(setting('google_analytics'))
{!! setting('google_analytics') !!}
@endif

{{-- Fonts --}}
<link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
<link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />

{{-- Styles --}}
@vite(['resources/css/app.css', 'resources/js/app.js'])
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

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