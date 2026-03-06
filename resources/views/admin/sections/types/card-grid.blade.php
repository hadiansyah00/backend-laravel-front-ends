{{-- Form untuk tipe: card-grid --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-3">
        <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Grid</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Jumlah Kolom Desktop</label>
            <select name="content[columns]" class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option value="2" {{ (old('content.columns', $content['columns'] ?? 3) == 2) ? 'selected' : '' }}>2 Kolom</option>
                <option value="3" {{ (old('content.columns', $content['columns'] ?? 3) == 3) ? 'selected' : '' }}>3 Kolom</option>
                <option value="4" {{ (old('content.columns', $content['columns'] ?? 3) == 4) ? 'selected' : '' }}>4 Kolom</option>
            </select>
        </div>
    </div>

    <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
        <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
            class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    </div>

    {{-- Cards Iteration Builder --}}
    <div x-data="{ cards: {{ json_encode(old('content.cards', $content['cards'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Daftar Kartu</h4>
            <button type="button" @click="cards.push({title: '', description: '', icon: '', url: '', image: ''})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Kartu</button>
        </div>
        
        <div class="space-y-4">
            <template x-for="(card, index) in cards" :key="index">
                <div class="relative p-4 bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <button type="button" @click="cards.splice(index, 1)" class="absolute top-2 right-2 p-1.5 text-red-600 hover:bg-red-50 rounded-md" title="Hapus Kartu">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    
                    <div class="grid gap-3 mt-2 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Judul Kartu</label>
                            <input type="text" x-model="card.title" :name="`content[cards][${index}][title]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">URL Link (Opsional)</label>
                            <input type="text" x-model="card.url" :name="`content[cards][${index}][url]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="/link-tujuan">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Deskripsi Singkat</label>
                            <textarea x-model="card.description" :name="`content[cards][${index}][description]`" rows="2" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"></textarea>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Class Icon (FontAwesome)</label>
                            <input type="text" x-model="card.icon" :name="`content[cards][${index}][icon]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="fa-solid fa-graduation-cap">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Gambar/Logo Alternatif URL</label>
                            <input type="text" x-model="card.image" :name="`content[cards][${index}][image]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="assets/img/logo.png">
                            <p class="mt-1 text-xs text-gray-500">Isi jika tidak menggunakan Icon</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="cards.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada kartu ditambahkan.</p>
    </div>
</div>
