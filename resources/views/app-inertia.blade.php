<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- ============================================================
         SEO META TAGS (Server-Side Rendered)
         Variabel $seo di-pass dari Controller via withViewData('seo', [...])
         Jika $seo tidak ada, gunakan setting() atau fallback default.
    ============================================================ --}}
    @php
        $seo = $seo ?? [];
        $seoTitle       = ($seo['title'] ?? null) ?: setting('meta_title', config('app.name', 'STIKes Bogor Husada'));
        $seoDescription = ($seo['description'] ?? null) ?: setting('meta_description', 'Selamat datang di website resmi STIKes Bogor Husada. Kampus kesehatan terbaik yang mencetak tenaga medis profesional di Bogor.');
        $seoKeywords    = ($seo['keywords'] ?? null) ?: setting('meta_keywords', 'STIKes Bogor Husada, kampus kesehatan bogor, sekolah tinggi ilmu kesehatan, pendaftaran mahasiswa baru');
        $seoImage       = ($seo['image'] ?? null) ?: asset('assets/img/icon/logo_sbh_persegi.png');
        $seoUrl         = ($seo['url'] ?? null) ?: url()->current();
        $seoType        = ($seo['type'] ?? null) ?: 'website';
        $seoAuthor      = ($seo['author'] ?? null) ?: 'STIKes Bogor Husada';
    @endphp

    <title inertia>{{ $seoTitle }}</title>

    {{-- Primary Meta Tags --}}
    <meta name="description" content="{{ $seoDescription }}">
    <meta name="keywords" content="{{ $seoKeywords }}">
    <meta name="author" content="{{ $seoAuthor }}">
    <meta name="robots" content="{{ $seo['robots'] ?? 'index, follow' }}">
    <link rel="canonical" href="{{ $seoUrl }}">

    {{-- Open Graph / Facebook --}}
    <meta property="og:type" content="{{ $seoType }}">
    <meta property="og:url" content="{{ $seoUrl }}">
    <meta property="og:title" content="{{ $seoTitle }}">
    <meta property="og:description" content="{{ $seoDescription }}">
    <meta property="og:image" content="{{ $seoImage }}">
    <meta property="og:site_name" content="STIKes Bogor Husada">
    <meta property="og:locale" content="id_ID">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ $seoUrl }}">
    <meta name="twitter:title" content="{{ $seoTitle }}">
    <meta name="twitter:description" content="{{ $seoDescription }}">
    <meta name="twitter:image" content="{{ $seoImage }}">

    {{-- Favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('assets/img/icon/logo-bulet-sbh.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/img/icon/logo-bulet-sbh.png') }}">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />

    {{-- JSON-LD Structured Data (tampil di View Page Source) --}}
    @if(!empty($seo['schema']))
        <script type="application/ld+json">{!! json_encode($seo['schema'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @else
        <script type="application/ld+json">{!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'EducationalOrganization',
            'name' => 'STIKes Bogor Husada',
            'url' => url('/'),
            'logo' => asset('assets/img/icon/logo_sbh_persegi.png'),
            'description' => $seoDescription,
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => 'Bogor',
                'addressRegion' => 'Jawa Barat',
                'addressCountry' => 'ID',
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endif

    {{-- Scripts --}}
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])

    {{-- Inertia Head Injector --}}
    @inertiaHead
</head>

<body class="font-sans antialiased text-gray-900 bg-gray-50">
    {{-- Inertia App Entry Point --}}
    @inertia
</body>

</html>
