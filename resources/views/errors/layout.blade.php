<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">

    <style>
        /* Menggunakan font Inter jika tersedia */
        body {
            font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }
    </style>
</head>

<body class="bg-gray-100">
    <main class="grid min-h-screen px-6 py-24 place-items-center sm:py-32 lg:px-8">
        <div class="p-8 text-center bg-white shadow-lg sm:p-12 rounded-xl">

            <p class="text-base font-semibold text-orange-600">@yield('code')</p>

            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                @yield('title')
            </h1>

            <p class="mt-6 text-base leading-7 text-gray-600">
                @yield('message')
            </p>

            <div class="flex items-center justify-center mt-10 gap-x-6">
                <a href="{{ app('router')->has('home') ? route('home') : url('/') }}"
                    class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors duration-200">
                    Kembali ke Beranda
                </a>
                {{-- Anda bisa menambahkan link lain di sini, misalnya "Hubungi Support" --}}
            </div>
        </div>
    </main>
</body>

</html>