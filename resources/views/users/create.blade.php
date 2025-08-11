<x-app-layout>
    <x-slot name="header">
        {{-- Mengubah warna teks header --}}
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Tambah User Baru') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {{-- Mengubah warna latar belakang card --}}
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                {{-- Mengubah warna teks default di dalam card --}}
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{-- File 'users.form' sudah di-improve sebelumnya, jadi tidak perlu diubah --}}
                    @include('users.form', ['roles' => $roles])
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
