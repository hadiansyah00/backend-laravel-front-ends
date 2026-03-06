<div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap (beserta gelar)</label>
        <input type="text" id="name" name="name" value="{{ old('name', $dosen->name ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: Dr. Budi Santoso, M.Kes" required>
    </div>
    
    <div>
        <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan Fungsional / Struktural</label>
        <input type="text" id="position" name="position" value="{{ old('position', $dosen->position ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contoh: Lektor / Ketua Program Studi">
    </div>

    <div>
        <label for="nidn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIDN</label>
        <input type="text" id="nidn" name="nidn" value="{{ old('nidn', $dosen->nidn ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor Induk Dosen Nasional">
    </div>
    
    <div>
        <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP / NIPY (Opsional)</label>
        <input type="text" id="nip" name="nip" value="{{ old('nip', $dosen->nip ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor Induk Pegawai">
    </div>

    <div>
        <label for="prodi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Homebase / Program Studi</label>
        <select id="prodi" name="prodi" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Pilih Program Studi</option>
            @foreach($prodis as $prodi)
                <option value="{{ $prodi }}" {{ old('prodi', $dosen->prodi ?? '') == $prodi ? 'selected' : '' }}>{{ $prodi }}</option>
            @endforeach
        </select>
    </div>
    
    <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="email" id="email" name="email" value="{{ old('email', $dosen->email ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="dosen@stikes-bogor.ac.id">
    </div>

    <div>
        <label for="linkedin_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL LinkedIn (Opsional)</label>
        <input type="url" id="linkedin_url" name="linkedin_url" value="{{ old('linkedin_url', $dosen->linkedin_url ?? '') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://linkedin.com/in/username">
    </div>
    
    <div>
        <label for="order" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Urutan Tampil</label>
        <input type="number" id="order" name="order" value="{{ old('order', $dosen->order ?? 0) }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Semakin kecil angkanya, semakin di atas (contoh: 0 akan tampil sebelum 1).</p>
    </div>
</div>

<div class="mb-6">
    <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Riwayat Singkat / Bio (Opsional)</label>
    <textarea id="bio" name="bio" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{{ old('bio', $dosen->bio ?? '') }}</textarea>
</div>

<div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto Profil</label>
    @if(isset($dosen) && $dosen->photo)
        <div class="mb-3">
            <img src="{{ asset($dosen->photo) }}" alt="Preview" class="object-cover h-32 rounded-lg w-28">
        </div>
    @endif
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="photo" name="photo" type="file" accept="image/*">
    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Rekomendasi rasio portrait (3:4). Maksimal 2MB.</p>
</div>

<div class="flex items-center mb-4">
    <input id="is_active" name="is_active" type="checkbox" value="1" {{ old('is_active', $dosen->is_active ?? true) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status Aktif (Tampil di website)</label>
</div>
