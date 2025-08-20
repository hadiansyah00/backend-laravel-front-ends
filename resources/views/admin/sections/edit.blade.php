<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Section di Halaman: {{ $page->title }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="p-6 bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">

                <form action="{{ route('admin.sections.update', $section->id) }}" method="POST">
                    @csrf
                    @method('PUT')

                    {{-- Type --}}
                    <div class="mb-4">
                        <label for="type"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <input type="text" name="type" id="type" value="{{ old('type', $section->type) }}"
                            class="block w-full mt-1 border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        @error('type')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Content (JSON) --}}
                    <div class="mb-4">
                        <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Content
                            (JSON)</label>
                        <textarea name="content" id="content" rows="6"
                            class="block w-full mt-1 border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">{{ old('content', json_encode($section->content, JSON_PRETTY_PRINT)) }}</textarea>
                        @error('content')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Order --}}
                    <div class="mb-4">
                        <label for="order"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Urutan</label>
                        <input type="number" name="order" id="order" value="{{ old('order', $section->order) }}"
                            class="block w-full mt-1 border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        @error('order')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Buttons --}}
                    <div class="flex justify-end">
                        <a href="{{ route('admin.pages.sections.index', $page->slug) }}"
                            class="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md">Batal</a>
                        <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded-md">Simpan</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>