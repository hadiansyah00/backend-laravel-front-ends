<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Posisi / Judul Lowongan</label>
        <input type="text" id="title" name="title" value="{{ old('title', $lowongan->title ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Apoteker, Bidan, Ahli Gizi, dll" required>
    </div>
    <div>
        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Perusahaan / Instansi</label>
        <input type="text" id="company" name="company" value="{{ old('company', $lowongan->company ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="RS Husada, Apotek Kimia Farma, dll" required>
    </div>
    <div>
        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi (Opsional)</label>
        <input type="text" id="location" name="location" value="{{ old('location', $lowongan->location ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Bogor, Jakarta, Remote, dll">
    </div>
    <div>
        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Lowongan</label>
        <select id="type" name="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
            <option value="full-time" {{ old('type', $lowongan->type ?? '') == 'full-time' ? 'selected' : '' }}>Full-Time</option>
            <option value="part-time" {{ old('type', $lowongan->type ?? '') == 'part-time' ? 'selected' : '' }}>Part-Time</option>
            <option value="magang" {{ old('type', $lowongan->type ?? '') == 'magang' ? 'selected' : '' }}>Magang / Internship</option>
            <option value="kontrak" {{ old('type', $lowongan->type ?? '') == 'kontrak' ? 'selected' : '' }}>Kontrak</option>
        </select>
    </div>
    <div>
        <label for="salary_range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kisaran Gaji (Opsional)</label>
        <input type="text" id="salary_range" name="salary_range" value="{{ old('salary_range', $lowongan->salary_range ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Rp 5.000.000 - Rp 8.000.000">
    </div>
    <div>
        <label for="deadline" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline Lamaran (Opsional)</label>
        <input type="date" id="deadline" name="deadline" value="{{ old('deadline', isset($lowongan) && $lowongan->deadline ? $lowongan->deadline->format('Y-m-d') : '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
    </div>
</div>

<div class="mb-6">
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi Pekerjaan (Opsional)</label>
    <textarea id="description" name="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Jelaskan tentang pekerjaan ini...">{{ old('description', $lowongan->description ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label for="requirements" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Persyaratan / Kualifikasi (Opsional)</label>
    <textarea id="requirements" name="requirements" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="1. Lulusan S1 Farmasi&#10;2. Pengalaman minimal 1 tahun&#10;3. Memiliki STR aktif">{{ old('requirements', $lowongan->requirements ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label for="contact_info" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Info Kontak / Cara Melamar (Opsional)</label>
    <input type="text" id="contact_info" name="contact_info" value="{{ old('contact_info', $lowongan->contact_info ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Email ke hrd@perusahaan.com atau WhatsApp 08123456789">
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $lowongan->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tampilkan lowongan ini di website</label>
</div>
