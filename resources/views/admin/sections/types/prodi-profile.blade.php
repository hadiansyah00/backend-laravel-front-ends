{{-- Form untuk tipe: prodi-profile --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Program Studi</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                placeholder="Contoh: S1 Farmasi"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nomor SK Penyelenggaraan / Akreditasi</label>
            <input type="text" name="content[sk_number]" value="{{ old('content.sk_number', $content['sk_number'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Status Akreditasi</label>
            <input type="text" name="content[accreditation]" value="{{ old('content.accreditation', $content['accreditation'] ?? 'Baik') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Gelar Lulusan</label>
            <input type="text" name="content[degree]" value="{{ old('content.degree', $content['degree'] ?? '') }}"
                placeholder="Ex: S.Farm / S.Gz / A.Md.Keb"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    <hr class="my-6 border-gray-200 dark:border-gray-700">
    <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Profil Singkat Program Studi</h4>

    <div x-data="{ paragraphs: {{ json_encode(old('content.paragraphs', $content['paragraphs'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Paragraf Deskripsi</h4>
            <button type="button" @click="paragraphs.push('')" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Paragraf</button>
        </div>
        
        <template x-for="(paragraph, index) in paragraphs" :key="index">
            <div class="flex items-start gap-2 mb-2">
                <textarea x-model="paragraphs[index]" :name="`content[paragraphs][${index}]`" rows="3" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Isi profil prodi..."></textarea>
                <button type="button" @click="paragraphs.splice(index, 1)" class="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </template>
        <p x-show="paragraphs.length === 0" class="text-sm italic text-gray-500">Tidak ada deskripsi profil.</p>
    </div>

    <hr class="my-6 border-gray-200 dark:border-gray-700">
    <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Data Kaprodi</h4>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Kaprodi</label>
            <input type="text" name="content[head][name]" value="{{ old('content.head.name', $content['head']['name'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">NIDN</label>
            <input type="text" name="content[head][nidn]" value="{{ old('content.head.nidn', $content['head']['nidn'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">URL Foto</label>
            <input type="text" name="content[head][photo]" value="{{ old('content.head.photo', $content['head']['photo'] ?? '') }}"
                placeholder="assets/img/kaprodi.jpg"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>
</div>
