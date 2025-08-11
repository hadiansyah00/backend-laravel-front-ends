<x-app-layout>

    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {{-- Mengubah latar belakang card dan shadow --}}
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                {{-- Mengubah warna teks utama di dalam card --}}
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("You're logged in!") }}

                    <div class="mt-4">
                        <h3 class="font-bold">Menu Navigasi Sesuai Role:</h3>
                        {{-- Menambahkan warna teks untuk <ul> agar heading di atas juga berubah --}}
                            <ul class="space-y-2">
                                @can('manage users')
                                <li>
                                    {{-- Mengubah warna link agar kontras di mode gelap --}}
                                    <a href="{{ route('admin.users.index') }}"
                                        class="text-blue-500 hover:underline dark:text-blue-400">
                                        Kelola User
                                    </a>
                                </li>
                                @endcan

                                @can('manage articles')
                                <li>
                                    <a href="{{ route('admin.articles.index') }}"
                                        class="text-blue-500 hover:underline dark:text-blue-400">
                                        Kelola Artikel
                                    </a>
                                </li>
                                @endcan

                                @role('admin')
                                {{-- Mengubah warna teks khusus role admin --}}
                                <li class="text-green-600 dark:text-green-400">Anda adalah seorang Admin.</li>
                                @endrole

                                @role('writer')
                                {{-- Mengubah warna teks khusus role writer --}}
                                <li class="text-yellow-600 dark:text-yellow-400">Anda adalah seorang Penulis.
                                </li>
                                @endrole
                            </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>