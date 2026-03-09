<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
        <input type="text" id="name" name="name" value="{{ old('name', $alumni->name ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Nama lengkap alumni" required>
    </div>
    <div>
        <label for="nim" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIM</label>
        <input type="text" id="nim" name="nim" value="{{ old('nim', $alumni->nim ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Nomor Induk Mahasiswa">
    </div>
    <div>
        <label for="program_studi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Program Studi</label>
        <input type="text" id="program_studi" name="program_studi" value="{{ old('program_studi', $alumni->program_studi ?? '') }}" list="prodiList" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Pilih atau ketik prodi">
        <datalist id="prodiList">
            <option value="S1 Farmasi">
            <option value="S1 Gizi">
            <option value="D3 Kebidanan">
        </datalist>
    </div>
    <div>
        <label for="tahun_lulus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun Lulus</label>
        <input type="text" id="tahun_lulus" name="tahun_lulus" value="{{ old('tahun_lulus', $alumni->tahun_lulus ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="2024">
    </div>
    <div>
        <label for="tempat_kerja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat Kerja (Opsional)</label>
        <input type="text" id="tempat_kerja" name="tempat_kerja" value="{{ old('tempat_kerja', $alumni->tempat_kerja ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="RS Husada, Apotek Kimia Farma, dll">
    </div>
    <div>
        <label for="jabatan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan / Posisi (Opsional)</label>
        <input type="text" id="jabatan" name="jabatan" value="{{ old('jabatan', $alumni->jabatan ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Apoteker, Bidan, Ahli Gizi, dll">
    </div>
</div>

<div class="mb-6">
    <label for="testimonial" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Testimoni / Kesan Pesan (Opsional)</label>
    <textarea id="testimonial" name="testimonial" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Tuliskan testimoni alumni tentang pengalaman kuliah di STIKes...">{{ old('testimonial', $alumni->testimonial ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto Alumni (Opsional)</label>
    @if(isset($alumni) && $alumni->photo)
        <div class="mb-3">
            <img src="{{ asset($alumni->photo) }}" alt="Foto Alumni" class="w-20 h-20 object-cover rounded-full border border-gray-300 shadow-sm">
        </div>
    @endif
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600" id="photo" name="photo" type="file" accept="image/*">
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Format: JPG, PNG, WEBP. Maksimal 2MB.</p>
</div>

<div class="flex items-center gap-6 mb-4">
    <div class="flex items-center">
        <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $alumni->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600">
        <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tampilkan di website</label>
    </div>
    <div class="flex items-center">
        <input id="is_featured" name="is_featured" type="checkbox" value="1" {{ old('is_featured', $alumni->is_featured ?? false) ? 'checked' : '' }} class="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600">
        <label for="is_featured" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">⭐ Featured (unggulan)</label>
    </div>
</div>
