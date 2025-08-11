<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Halaman: {{ $page->title
            }}</h2>
    </x-slot>
    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <form action="{{ route('admin.pages.update', $page) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="p-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    @include('admin.pages.form', ['page' => $page])
                    <div class="flex items-center justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-600">
                        <a href="{{ route('admin.pages.index') }}"
                            class="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500">Batal</a>
                        <button type="submit"
                            class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">Update
                            Halaman</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>