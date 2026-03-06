<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Section di Halaman: <span class="font-bold">{{ $page->title }}</span>
        </h2>
    </x-slot>

    <div class="py-12" x-data="{ selectedType: '{{ old('type', $section->type) }}' }">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <form action="{{ route('admin.sections.update', $section->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                
                <div class="p-6 bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    @include('admin.sections.form')
                    
                    <div class="flex justify-end pt-6 mt-6 border-t dark:border-gray-600">
                        <a href="{{ route('admin.pages.sections.index', $page->slug) }}"
                            class="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-700">Batal</a>
                        <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Simpan</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>