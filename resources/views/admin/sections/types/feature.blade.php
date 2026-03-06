{{-- Form untuk tipe: feature --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-3">
        <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Grid Fitur</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Jumlah Kolom</label>
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

    {{-- Items Iteration Builder --}}
    <div x-data="{ items: {{ json_encode(old('content.items', $content['items'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Daftar Fitur (Icon + Judul)</h4>
            <button type="button" @click="items.push({title: '', desc: '', icon: ''})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Fitur</button>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2">
            <template x-for="(item, index) in items" :key="index">
                <div class="relative p-4 bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <button type="button" @click="items.splice(index, 1)" class="absolute top-2 right-2 p-1.5 text-red-600 hover:bg-red-50 rounded-md" title="Hapus Fitur">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    
                    <div class="grid gap-3 pr-6 mt-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Class Icon (FontAwesome)</label>
                            <input type="text" x-model="item.icon" :name="`content[items][${index}][icon]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="fa-solid fa-graduation-cap">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Judul Fitur</label>
                            <input type="text" x-model="item.title" :name="`content[items][${index}][title]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Deskripsi Singkat</label>
                            <textarea x-model="item.desc" :name="`content[items][${index}][desc]`" rows="2" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"></textarea>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="items.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada fitur ditambahkan.</p>
    </div>
</div>
