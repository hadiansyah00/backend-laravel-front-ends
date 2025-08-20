<!DOCTYPE html>
{{-- Tambahkan script untuk memeriksa localStorage di sini --}}
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    x-data="{ darkMode: localStorage.getItem('darkMode') === 'true'}"
    x-init="$watch('darkMode', val => localStorage.setItem('darkMode', val))" :class="{ 'dark': darkMode }">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased">
    {{-- Ubah class latar belakang utama di div ini --}}
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        @include('layouts.navigation')

        @if (isset($header))
        {{-- Ubah class latar belakang header di sini --}}
        <header class="bg-white shadow dark:bg-gray-800">
            <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {{ $header }}
            </div>
        </header>
        @endif

        <main>
            {{ $slot }}
        </main>
    </div>
</body>

<script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
            const editorElement = document.querySelector("#editor");
            if (editorElement) {
                ClassicEditor
                    .create(editorElement, {
                        toolbar: [
                            'heading', '|',
                            'bold', 'italic', 'link', 'blockQuote', 'bulletedList', 'numberedList',
                            '|', 'insertTable', 'undo', 'redo'
                        ]
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
</script>

</html>