@if ($errors->any())
<div class="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:text-red-400" role="alert">
    <ul class="list-disc list-inside">@foreach ($errors->all() as $error) <li>{{ $error }}</li> @endforeach</ul>
</div>
@endif

<div class="space-y-6">
    <div>
        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tipe Section</label>
        <input type="text" name="type" id="type" value="{{ old('type', $section->type ?? '') }}"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Contoh: hero, cta, gallery" required>
    </div>
    <div>
        <label for="order" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Urutan</label>
        <input type="number" name="order" id="order" value="{{ old('order', $section->order ?? 0) }}"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required>
    </div>
    <div>
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Konten
            (JSON)</label>
        <textarea name="content" id="content" rows="10"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ old('content', isset($section) ? json_encode($section->content, JSON_PRETTY_PRINT) : '') }}</textarea>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Masukkan konten dalam format JSON yang valid. Contoh:
            `{"title": "Judul Hero", "subtitle": "Subjudul keren"}`</p>
    </div>
</div>