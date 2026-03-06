<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Foto</label>
        <input type="text" id="title" name="title" value="{{ old('title', $gallery->title ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pengecekan Fasilitas Laboratorium" required>
    </div>

    <div>
        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori / Album</label>
        <input type="text" id="category" name="category" value="{{ old('category', $gallery->category ?? '') }}" list="categoryList" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pilih atau ketik kategori baru" required>
        <datalist id="categoryList">
            <option value="Fasilitas Kampus">
            <option value="Kegiatan Akademik">
            <option value="Kegiatan Kemahasiswaan">
            <option value="Prestasi">
            <option value="Umum">
        </datalist>
    </div>
</div>

<div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caption / Deskripsi Singkat (Opsional)</label>
    <textarea id="description" name="description" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{{ old('description', $gallery->description ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Gambar</label>
    
    @if(isset($gallery) && $gallery->image)
        <div class="mb-3">
            <img src="{{ asset($gallery->image) }}" alt="Preview Gambar" class="object-cover h-40 rounded-lg border border-gray-300 shadow-sm">
        </div>
    @endif
    
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name="image" type="file" accept="image/*" {{ !isset($gallery) ? 'required' : '' }}>
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Format yang didukung: JPG, PNG, WEBP. Maksimal ukuran file 5MB. Rasio 16:9 atau 4:3 disarankan.</p>
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $gallery->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tampilkan foto ini di halaman Galeri Website</label>
</div>
