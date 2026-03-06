<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Program Studi</label>
        <input type="text" id="name" name="name" value="{{ old('name', $programStudi->name ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="S1 Farmasi, D3 Kebidanan, dll" required>
    </div>

    <div>
        <label for="akreditasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status Akreditasi</label>
        <select id="akreditasi" name="akreditasi" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">-- Pilih Akreditasi --</option>
            <option value="Unggul" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'Unggul' ? 'selected' : '' }}>Unggul</option>
            <option value="A" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'A' ? 'selected' : '' }}>A (Sangat Baik)</option>
            <option value="Baik Sekali" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'Baik Sekali' ? 'selected' : '' }}>Baik Sekali</option>
            <option value="B" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'B' ? 'selected' : '' }}>B (Baik)</option>
            <option value="Baik" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'Baik' ? 'selected' : '' }}>Baik</option>
            <option value="C" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'C' ? 'selected' : '' }}>C (Cukup)</option>
            <option value="Proses Akreditasi" {{ old('akreditasi', $programStudi->akreditasi ?? '') == 'Proses Akreditasi' ? 'selected' : '' }}>Proses Akreditasi</option>
        </select>
    </div>

    <div>
        <label for="gelar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gelar Lulusan (Opsional)</label>
        <input type="text" id="gelar" name="gelar" value="{{ old('gelar', $programStudi->gelar ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: S.Kep., S.Farm., A.Md.Keb.">
    </div>

    <div>
        <label for="lama_studi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lama Studi (Opsional)</label>
        <input type="text" id="lama_studi" name="lama_studi" value="{{ old('lama_studi', $programStudi->lama_studi ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: 8 Semester (4 Tahun)">
    </div>
</div>

<div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profil / Deskripsi Singkat</label>
    <textarea id="description" name="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deskripsikan program studi ini secara singkat...">{{ old('description', $programStudi->description ?? '') }}</textarea>
</div>

<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="visi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visi (Opsional)</label>
        <textarea id="visi" name="visi" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan Visi Program Studi">{{ old('visi', $programStudi->visi ?? '') }}</textarea>
    </div>

    <div>
        <label for="misi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Misi (Opsional)</label>
        <textarea id="misi" name="misi" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan Misi Program Studi (Gunakan nomor atau bullet list)">{{ old('misi', $programStudi->misi ?? '') }}</textarea>
    </div>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brosur / Gambar Header Prodi (Opsional)</label>
    
    @if(isset($programStudi) && $programStudi->image)
        <div class="mb-3">
            <img src="{{ asset($programStudi->image) }}" alt="Preview Gambar" class="object-cover h-32 rounded-lg w-auto border border-gray-300 shadow-sm">
        </div>
    @endif
    
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name="image" type="file" accept="image/*">
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Rekomendasi ukuran file maksimal 2MB (JPG, PNG).</p>
</div>

<div class="mb-6 mt-6">
    <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link Website External / Pendaftaran Prodi (Opsional)</label>
    <div class="flex">
      <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
      </span>
      <input type="url" id="link" name="link" value="{{ old('link', $programStudi->link ?? '') }}" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://pmb.kampus.ac.id/farmasi">
    </div>
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $programStudi->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tampilkan Prodi ini di Halaman Utama</label>
</div>
