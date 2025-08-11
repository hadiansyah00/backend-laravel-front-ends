<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Tambah Menu Baru
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('admin.menus.store') }}" method="POST">
                        @csrf

                        @include('menu.form')

                        <div class="flex items-center justify-end mt-6">
                            <a href="{{ route('admin.menus.index') }}"
                                class="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500">
                                Batal
                            </a>
                            <button type="submit"
                                class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>