@csrf
<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
    <input type="text" name="title" value="{{ old('title', $statistic->title ?? '') }}"
        class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white">
    @error('title') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
</div>

<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nilai</label>
    <input type="number" name="value" value="{{ old('value', $statistic->value ?? '') }}"
        class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white">
    @error('value') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
</div>

<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Icon (CSS Class)</label>
    <input type="text" name="icon" value="{{ old('icon', $statistic->icon ?? '') }}"
        placeholder="misal: fa fa-user-graduate"
        class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white">
    @error('icon') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
</div>

<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Urutan</label>
    <input type="number" name="order" value="{{ old('order', $statistic->order ?? 0) }}"
        class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white">
    @error('order') <p class="mt-1 text-sm text-red-600">{{ $message }}</p> @enderror
</div>