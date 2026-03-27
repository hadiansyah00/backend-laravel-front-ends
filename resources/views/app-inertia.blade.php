<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'STIKes Bogor Husada') }}</title>
    
    <link rel="icon" type="image/png" href="{{ asset('assets/img/icon/logo-bulet-sbh.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/img/icon/logo-bulet-sbh.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    
    <!-- Inertia Head Injector -->
    @inertiaHead
</head>

<body class="font-sans antialiased text-gray-900 bg-gray-50">
    <!-- Inertia App Entry Point -->
    @inertia
</body>

</html>
