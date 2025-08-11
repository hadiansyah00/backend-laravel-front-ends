@if ($errors->any())
<div class="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:text-red-400" role="alert">
    <ul class="list-disc list-inside">
        @foreach ($errors->all() as $error) <li>{{ $error }}</li> @endforeach
    </ul>
</div>
@endif

<div class="space-y-6" x-data="{ pageType: '{{ old('type', $page->type ?? 'standard') }}' }">
    <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Judul Halaman</label>
        <input type="text" name="title" id="title" value="{{ old('title', $page->title ?? '') }}"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required>
    </div>

    <div>
        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tipe Halaman</label>
        <select name="type" id="type" x-model="pageType"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="standard">Standard (Editor Teks)</option>
            <option value="modular">Modular (Builder)</option>
        </select>
    </div>

    <div x-show="pageType === 'standard'" x-cloak>
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Konten</label>
        <textarea name="content" id="content" rows="10"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ old('content', $page->content ?? '') }}</textarea>
    </div>

    <div x-show="pageType === 'modular'" x-cloak
        class="p-4 text-center border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600">
        <p class="text-sm text-gray-500 dark:text-gray-400">Pengelolaan section modular akan ditangani di halaman edit
            setelah halaman ini disimpan.</p>
    </div>

    <div>
        <label for="is_published" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status
            Publikasi</label>
        <select name="is_published" id="is_published"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="1" @if(old('is_published', $page->is_published ?? 1) == 1) selected @endif>Published</option>
            <option value="0" @if(old('is_published', $page->is_published ?? 1) == 0) selected @endif>Draft</option>
        </select>
    </div>
</div>