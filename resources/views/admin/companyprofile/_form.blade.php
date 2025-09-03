@csrf
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
<div class="mb-4">
    <label for="title" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
    <input type="text" name="title" id="title" value="{{ old('title', $video->title ?? '') }}"
        class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
    @error('title') <p class="text-sm text-red-600">{{ $message }}</p> @enderror
</div>

<div class="mb-4">
    <label for="description" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
    <textarea name="description" id="description" rows="3"
        class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">{{ old('description', $video->description ?? '') }}</textarea>
    @error('description') <p class="text-sm text-red-600">{{ $message }}</p> @enderror
</div>

<div class="mb-4">
    <label for="video_url" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">URL Video</label>
    <input type="url" name="video_url" id="video_url" value="{{ old('video_url', $video->video_url ?? '') }}"
        class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
    @error('video_url') <p class="text-sm text-red-600">{{ $message }}</p> @enderror
</div>

<div class="mb-4">
    <label class="inline-flex items-center">
        <input type="checkbox" name="is_active" value="1" {{ old('is_active', $video->is_active ?? false) ? 'checked' :
        '' }}
        class="text-blue-600 border-gray-300 rounded focus:ring-blue-500">
        <span class="ml-2 text-gray-700 dark:text-gray-300">Aktif</span>
    </label>
</div>

<div class="flex justify-end">
    <x-button type="submit" variant="blue">
        {{ $submit ?? 'Simpan' }}
    </x-button>
</div>