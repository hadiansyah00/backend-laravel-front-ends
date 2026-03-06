{{-- Form untuk tipe: faq --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul FAQ</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? 'Pertanyaan Tersering') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    {{-- FAQ Items Iteration Builder --}}
    <div x-data="{ items: {{ json_encode(old('content.items', $content['items'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Daftar Pertanyaan (Q&A)</h4>
            <button type="button" @click="items.push({question: '', answer: ''})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Q&A</button>
        </div>
        
        <div class="space-y-4">
            <template x-for="(item, index) in items" :key="index">
                <div class="relative p-4 bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <button type="button" @click="items.splice(index, 1)" class="absolute top-2 right-2 p-1.5 text-red-600 hover:bg-red-50 rounded-md" title="Hapus Q&A">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    
                    <div class="pr-6 mt-2 space-y-3">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Pertanyaan</label>
                            <input type="text" x-model="item.question" :name="`content[items][${index}][question]`" class="w-full p-2 text-sm font-semibold border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Berapa biaya pendaftaran?">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Jawaban</label>
                            <textarea x-model="item.answer" :name="`content[items][${index}][answer]`" rows="3" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Biaya pendaftaran adalah..."></textarea>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="items.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada FAQ ditambahkan.</p>
    </div>
</div>
