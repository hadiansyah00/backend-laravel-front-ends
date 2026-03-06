{{-- Form untuk tipe: title --}}
<div class="space-y-4">
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
        <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
    </div>
    
    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
        <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Background Image URL</label>
        <input type="text" name="content[background]" value="{{ old('content.background', $content['background'] ?? '') }}"
            placeholder="assets/img/bg-title.jpg"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    </div>
</div>
