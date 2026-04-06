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
        $seoImage       = ($seo['image'] ?? null) ?: (setting('og_image') ? asset('storage/' . setting('og_image')) : asset('assets/img/icon/logo_sbh_persegi.png'));
        $seoUrl         = ($seo['url'] ?? null) ?: url()->current();
        $seoType        = ($seo['type'] ?? null) ?: 'website';
        $seoAuthor      = ($seo['author'] ?? null) ?: setting('site_name', 'STIKes Bogor Husada');

        // OG bisa punya judul/deskripsi sendiri yg beda dari meta biasa
        $ogTitle        = ($seo['og_title'] ?? null) ?: setting('og_title') ?: $seoTitle;
        $ogDescription  = ($seo['og_description'] ?? null) ?: setting('og_description') ?: $seoDescription;

        // Twitter Card Type dari setting
        $twitterCard    = setting('twitter_card', 'summary_large_image');

        // Favicon dari setting atau fallback
        $faviconUrl     = setting('site_favicon') ? asset('storage/' . setting('site_favicon')) : asset('assets/img/icon/logo-bulet-sbh.png');
    @endphp

    <title inertia>{{ $seoTitle }}</title>

    {{-- Primary Meta Tags --}}
    <meta name="description" content="{{ $seoDescription }}">
    <meta name="keywords" content="{{ $seoKeywords }}">
    <meta name="author" content="{{ $seoAuthor }}">
    <meta name="robots" content="{{ $seo['robots'] ?? 'index, follow' }}">
    <link rel="canonical" href="{{ $seoUrl }}">

    {{-- Open Graph / Facebook / WhatsApp --}}
    <meta property="og:type" content="{{ $seoType }}">
    <meta property="og:url" content="{{ $seoUrl }}">
    <meta property="og:title" content="{{ $ogTitle }}">
    <meta property="og:description" content="{{ $ogDescription }}">
    <meta property="og:image" content="{{ $seoImage }}">
    <meta property="og:site_name" content="{{ setting('site_name', 'STIKes Bogor Husada') }}">
    <meta property="og:locale" content="id_ID">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="{{ $twitterCard }}">
    <meta name="twitter:url" content="{{ $seoUrl }}">
    <meta name="twitter:title" content="{{ $ogTitle }}">
    <meta name="twitter:description" content="{{ $ogDescription }}">
    <meta name="twitter:image" content="{{ $seoImage }}">

    {{-- Favicon (dari admin setting atau fallback) --}}
    <link rel="icon" type="image/png" href="{{ $faviconUrl }}">
    <link rel="apple-touch-icon" href="{{ $faviconUrl }}">

    {{-- Preload Critical Assets --}}
    <link rel="preload" href="/assets/img/icon/logo-bulet-sbh.png" as="image" />
    <link rel="dns-prefetch" href="https://fonts.bunny.net" />
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

    {{-- Fonts (non-blocking with display=swap) --}}
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />

    {{-- Font Awesome — deferred so it doesn't block rendering --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" /></noscript>

    {{-- JSON-LD Structured Data (tampil di View Page Source) --}}
    @if(!empty($seo['schema']))
        <script type="application/ld+json">{!! json_encode($seo['schema'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @else
        <script type="application/ld+json">{!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'EducationalOrganization',
            'name' => setting('site_name', 'STIKes Bogor Husada'),
            'url' => url('/'),
            'logo' => asset('assets/img/icon/logo_sbh_persegi.png'),
            'description' => $seoDescription,
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => setting('contact_address', ''),
                'addressLocality' => 'Bogor',
                'addressRegion' => 'Jawa Barat',
                'addressCountry' => 'ID',
            ],
            'telephone' => setting('contact_phone', ''),
            'email' => setting('contact_email', ''),
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endif

    {{-- Google Analytics (dari admin setting) --}}
    @if(setting('google_analytics'))
        {!! setting('google_analytics') !!}
    @endif

    {{-- Scripts --}}
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])

    {{-- Inertia Head Injector --}}
    @inertiaHead
</head>

<body class="font-sans antialiased text-gray-900 bg-gray-50">
    {{-- Instant / Flash Preloader untuk mencegah Blank Screen sebelum JS selesai dunduh --}}
    <style>
        @keyframes pulse-logo {
            0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 10px rgba(249,115,22,0.6)); }
            50% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 20px rgba(249,115,22,0.2)); }
        }
    </style>
    <div id="server-preloader" style="position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0c1220 100%);">
        <div style="width:160px;height:auto;display:flex;justify-content:center;align-items:center; animation: pulse-logo 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;">
            <img src="/assets/img/icon/logo_putih_sbh.png" alt="Loading..." style="width:100%;height:auto;object-fit:contain;filter: drop-shadow(0 0 10px rgba(249,115,22,0.3));" />
        </div>
    </div>

    {{-- Inertia App Entry Point --}}
    @inertia
</body>

</html>
