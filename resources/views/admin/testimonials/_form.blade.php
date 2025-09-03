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
    <label for="name" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
    <input type="text" name="name" id="name" value="{{ old('name', $testimonial->name ?? '') }}"
        class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white @error('name') border-red-500 @enderror"
        required>
    {{-- [PERBAIKAN] Menampilkan pesan error spesifik untuk 'name' --}}
    @error('name')
    <p class="mt-1 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="role" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Jabatan/Role</label>
    <input type="text" name="role" id="role" value="{{ old('role', $testimonial->role ?? '') }}"
        class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white @error('role') border-red-500 @enderror">
    {{-- [PERBAIKAN] Menampilkan pesan error spesifik untuk 'role' --}}
    @error('role')
    <p class="mt-1 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="message" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Pesan</label>
    <textarea name="message" id="message" rows="4"
        class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white @error('message') border-red-500 @enderror">{{ old('message', $testimonial->message ?? '') }}</textarea>
    {{-- [PERBAIKAN] Menampilkan pesan error spesifik untuk 'message' --}}
    @error('message')
    <p class="mt-1 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="photo" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Foto</label>
    <input type="file" name="photo" id="photo"
        class="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer focus:outline-none dark:bg-gray-700 dark:text-gray-300 @error('photo') border-red-500 @enderror">
    {{-- [PERBAIKAN] Menampilkan pesan error spesifik untuk 'photo' --}}
    @error('photo')
    <p class="mt-1 text-sm text-red-600 dark:text-red-500">{{ $message }}</p>
    @enderror

    @if (!empty($testimonial->photo))
    <img src="{{ asset('storage/' . $testimonial->photo) }}" alt="{{ $testimonial->name }}" class="h-16 mt-2 rounded">
    @endif
</div>

<div class="flex justify-end space-x-2">
    <a href="{{ route('admin.testimonials.index') }}"
        class="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
        Batal
    </a>
    <button type="submit"
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
        Simpan
    </button>
</div>