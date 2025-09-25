<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('front-pages.partials.head')

</head>

<body class="font-sans antialiased">

    <main>
        @include('front-pages.partials.navbar')
        @yield('content')
    </main>
    @include('front-pages.partials.footer')
    @include('front-pages.partials.scripts')
    @vite('resources/js/app.js')

    {{-- ======================================================= --}}
    {{-- == KOMPONEN CHAT TOGGLE FLOAT == --}}
    {{-- ======================================================= --}}
    @include('front-pages.partials.chat-toggle')

</body>

</html>