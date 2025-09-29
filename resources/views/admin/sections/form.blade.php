@if ($errors->any())
<div class="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:text-red-400" role="alert">
    <ul class="list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<div class="space-y-6">
    <div>
        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Tipe Section
        </label>
        <input type="text" name="type" id="type" value="{{ old('type', $section->type ?? '') }}"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white @error('type') border-red-500 @enderror"
            placeholder="Contoh: hero, cta, gallery" required autocomplete="off">
        @error('type')
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>
    <div>
        <label for="order" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Urutan
        </label>
        <input type="number" name="order" id="order" value="{{ old('order', $section->order ?? 0) }}"
            class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white @error('order') border-red-500 @enderror"
            required min="0">
        @error('order')
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>
    <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content (JSON)
        </label>
        <textarea name="content" id="content" rows="6"
            class="block w-full mt-1 border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white @error('content') border-red-500 @enderror"
            placeholder='{"key": "value"}'>{{ old('content', isset($section->content) ? json_encode($section->content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) : '') }}</textarea>
        @error('content')
        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>
</div>