{{-- Form untuk tipe: stats --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Statistik (Opsional)</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Warna Background (Opsional)</label>
            <input type="text" name="content[background]" value="{{ old('content.background', $content['background'] ?? 'bg-orange-600') }}"
                placeholder="Contoh: bg-green-600"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    {{-- Stats Items Iteration Builder --}}
    <div x-data="{ items: {{ json_encode(old('content.items', $content['items'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Angka Statistik</h4>
            <button type="button" @click="items.push({value: '0', label: '', icon: '', suffix: '+'})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Angka</button>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <template x-for="(item, index) in items" :key="index">
                <div class="relative p-4 bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <button type="button" @click="items.splice(index, 1)" class="absolute top-2 right-2 p-1.5 text-red-600 hover:bg-red-50 rounded-md" title="Hapus Item">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    
                    <div class="grid gap-3 pr-6 mt-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Class Icon</label>
                            <input type="text" x-model="item.icon" :name="`content[items][${index}][icon]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="fa-solid fa-users">
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Nilai/Angka</label>
                                <input type="text" x-model="item.value" :name="`content[items][${index}][value]`" class="w-full p-2 text-sm font-bold border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required placeholder="1200">
                            </div>
                            <div>
                                <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Suffix (Akhiran)</label>
                                <input type="text" x-model="item.suffix" :name="`content[items][${index}][suffix]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="+ / M / %">
                            </div>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Label Text</label>
                            <input type="text" x-model="item.label" :name="`content[items][${index}][label]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required placeholder="Mahasiswa Aktif">
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="items.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada statistik ditambahkan.</p>
    </div>
</div>
