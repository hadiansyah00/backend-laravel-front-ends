<x-app-layout>
    {{-- Slot untuk Header Halaman --}}
    <x-slot name="header">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
                {{-- Breadcrumb yang lebih kontekstual --}}
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <a href="{{ route('admin.pages.index') }}"
                                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                Halaman
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                {{-- Menampilkan judul halaman untuk konteks yang lebih baik --}}
                                <a href="{{ route('admin.seo.edit', ['type' => 'pages', 'id' => $model->id]) }}"
                                    class="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">{{
                                    $model->title }}</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="text-sm font-medium text-gray-500 ms-1 md:ms-2 dark:text-gray-400">Edit
                                    Meta</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h2 class="mt-2 text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                    Pengaturan Meta
                </h2>
            </div>

            {{-- Tombol Aksi Terpusat di Header --}}
            <div class="flex items-center space-x-2">
                <a href="{{ route('admin.pages.index') }}"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Batal
                </a>
                {{-- Tombol ini akan men-submit form dengan id 'edit-meta-form' --}}
                <button type="submit" form="edit-meta-form"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    :disabled="submitting">Simpan
                    <span x-show="!submitting">Simpan Perubahan</span>
                    <span x-show="submitting">Menyimpan...</span>
                </button>
            </div>
        </div>
    </x-slot>

    {{-- Konten Utama --}}
    <div class="py-12">
        {{-- Menggunakan max-w-5xl untuk layout form yang lebih ideal --}}
        <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
            {{-- Menambahkan id dan Alpine.js untuk state management --}}
            <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
                {{-- Menambahkan id dan Alpine.js untuk state management --}}
                <form id="edit-meta-form" method="POST"
                    action="{{ route('admin.seo.update', ['type' => $type, 'id' => $model->id]) }}"
                    enctype="multipart/form-data" x-data="{ submitting: false }" @submit="submitting = true">
                    @csrf
                    @method('PUT')

                    @include('admin.meta._form', ['meta' => $meta])

                    <button type="submit" x-bind:disabled="submitting">
                        <span x-show="!submitting">Simpan</span>
                        <span x-show="submitting">Menyimpan...</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
    @vite(['resources/js/ckeditor.js'])
</x-app-layout>