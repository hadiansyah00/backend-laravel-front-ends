{{-- [PERBAIKAN] Menambahkan ringkasan semua error di bagian atas form --}}
@if ($errors->any())
<div class="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
    <p class="font-bold">Oops! Terjadi kesalahan:</p>
    <ul class="mt-2 text-sm list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif
<div class="p-6 bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
    <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
        <input type="text" name="title" value="{{ old('title', $slider->title ?? '') }}"
            class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200" />
    </div>

    <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul</label>
        <input type="text" name="subtitle" value="{{ old('subtitle', $slider->subtitle ?? '') }}"
            class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200" />
    </div>

    <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Gambar</label>
        <input type="file" name="image"
            class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200" />

        @if (!empty($slider->image))
        <div class="mt-2">
            <img src="{{ asset('storage/'.$slider->image) }}" class="h-20 rounded">
        </div>
        @endif
    </div>

    <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Link (opsional)</label>
        <input type="url" name="link" value="{{ old('link', $slider->link ?? '') }}"
            class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200" />
    </div>

    <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Order</label>
        <input type="number" name="order" value="{{ old('order', $slider->order ?? 0) }}"
            class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-200" />
    </div>
</div>