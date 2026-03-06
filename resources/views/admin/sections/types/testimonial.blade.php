{{-- Form untuk tipe: testimonial --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Testimonial</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? 'Apa Kata Alumni?') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    {{-- Testimonial Items Iteration Builder --}}
    <div x-data="{ items: {{ json_encode(old('content.items', $content['items'] ?? [])) }} }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Daftar Testimonial</h4>
            <button type="button" @click="items.push({name: '', position: '', quote: '', photo: ''})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Testimonial</button>
        </div>
        
        <div class="space-y-4">
            <template x-for="(item, index) in items" :key="index">
                <div class="relative p-4 bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <button type="button" @click="items.splice(index, 1)" class="absolute top-2 right-2 p-1.5 text-red-600 hover:bg-red-50 rounded-md" title="Hapus Testimonial">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    
                    <div class="pr-6 mt-2 space-y-3">
                        <div class="grid gap-3 sm:grid-cols-3">
                            <div>
                                <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Nama</label>
                                <input type="text" x-model="item.name" :name="`content[items][${index}][name]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Nama Lengkap" required>
                            </div>
                            <div>
                                <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Posisi / Status</label>
                                <input type="text" x-model="item.position" :name="`content[items][${index}][position]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Alumni 2020 / Perawat">
                            </div>
                            <div>
                                <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">URL Foto (Opsional)</label>
                                <input type="text" x-model="item.photo" :name="`content[items][${index}][photo]`" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="assets/img/testimoni.jpg">
                            </div>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">Isi Kutipan / Testimoni</label>
                            <textarea x-model="item.quote" :name="`content[items][${index}][quote]`" rows="2" class="w-full p-2 text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Kuliah di sini sangat menyenangkan..." required></textarea>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="items.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada testimonial ditambahkan.</p>
    </div>
</div>
