@if ($errors->any())
<div
    class="p-4 mb-6 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-200 dark:border-red-700">
    <ul class="space-y-1 list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<div class="space-y-6" x-data="{ pageType: '{{ old('type', $page->type ?? 'standard') }}' }">

    {{-- Judul Halaman --}}
    <div>
        <label for="title" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Judul Halaman <span class="text-red-500">*</span>
        </label>
        <input type="text" name="title" id="title" value="{{ old('title', $page->title ?? '') }}" class="block w-full p-3 text-sm rounded-lg border
                      border-gray-300 bg-gray-50 text-gray-900
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      @error('title') border-red-500 focus:ring-red-500 @enderror" required>
        @error('title')
        <p class="mt-1 text-xs text-red-600 dark:text-red-400">{{ $message }}</p>
        @enderror
    </div>
    <div>
        {{-- Slug Halaman --}}
        <div>
            <label for="slug" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
                Slug Halaman
            </label>
            <input type="text" name="slug" id="slug" value="{{ old('slug', $page->slug ?? '') }}" class="block w-full p-3 text-sm rounded-lg border
                      border-gray-300 bg-gray-50 text-gray-900
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white
                      @error('slug') border-red-500 focus:ring-red-500 @enderror">
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Slug ini akan digunakan untuk URL halaman. Jika dikosongkan, slug akan dibuat otomatis dari judul.
            </p>
            @error('slug')
            <p class="mt-1 text-xs text-red-600 dark:text-red-400">{{ $message }}</p>
            @enderror
        </div>
    </div>
    {{-- Tipe Halaman --}}
    <div>
        <label for="type" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Tipe Halaman
        </label>
        <select name="type" id="type" x-model="pageType"
            class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="standard">Standard (Editor Teks)</option>
            <option value="modular">Modular (Builder)</option>
        </select>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Standard = pakai editor teks. Modular = builder section.
        </p>
    </div>

    {{-- Konten (CKEditor kalau standard) --}}
    <div x-show="pageType === 'standard'" x-cloak>
        <label for="content" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Konten
        </label>
        <textarea name="content" id="editor" rows="12"
            class="block w-full p-3 text-sm rounded-lg border
                         border-gray-300 bg-gray-50 text-gray-900
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white
                         @error('content') border-red-500 focus:ring-red-500 @enderror">{{ old('content', $page->content ?? '') }}</textarea>
        @error('content')
        <p class="mt-1 text-xs text-red-600 dark:text-red-400">{{ $message }}</p>
        @enderror
    </div>

    {{-- Info Modular --}}
    <div x-show="pageType === 'modular'" x-cloak
        class="p-6 text-center text-gray-500 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
        <p class="text-sm">
            Pengelolaan section modular akan tersedia setelah halaman ini disimpan.
        </p>
    </div>

    {{-- Status Publikasi --}}
    <div>
        <label for="is_published" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Status Publikasi
        </label>
        <select name="is_published" id="is_published"
            class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="1" @selected(old('is_published', $page->is_published ?? 1) == 1)>Published</option>
            <option value="0" @selected(old('is_published', $page->is_published ?? 1) == 0)>Draft</option>
        </select>
    </div>
</div>