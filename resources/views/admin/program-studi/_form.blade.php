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
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Prodi</label>
    <input type="text" name="name" value="{{ old('name', $program->name ?? '') }}"
        class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white" required>
</div>

<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
    <textarea name="description" rows="4"
        class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white">{{ old('description', $program->description ?? '') }}</textarea>
</div>

<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Link (Opsional)</label>
    <input type="url" name="link" value="{{ old('link', $program->link ?? '') }}"
        class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white">
</div>

<div class="mb-4">
    <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Gambar (Opsional)</label>
    @if (!empty($program->image))
    <div class="mb-2">
        <img src="{{ asset('storage/' . $program->image) }}" alt="Preview" class="object-cover w-24 h-24 rounded">
    </div>
    @endif
    <input type="file" name="image" class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white">
</div>

<div class="flex justify-end">
    <x-button type="submit" variant="blue">
        Simpan
    </x-button>
</div>