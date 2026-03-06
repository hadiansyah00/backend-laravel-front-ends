{{-- Form untuk tipe: org-chart --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Struktur</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    {{-- Tabs/Kategori Struktur Organisasi Builder (Alpine) --}}
    <div x-data="{ 
            groups: {{ json_encode(old('content.groups', current($content['groups'] ?? []) ? $content['groups'] : [])) }} 
        }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        
        <div class="flex items-center justify-between mb-4">
            <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Bagian Struktur (Tab)</h4>
                <p class="text-xs text-gray-500">Misal: Yayasan, Pimpinan, Senat Akademik</p>
            </div>
            <button type="button" @click="groups.push({title: 'Yayasan', members: []})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Bagian</button>
        </div>
        
        <div class="space-y-6">
            <template x-for="(group, gIndex) in groups" :key="gIndex">
                <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="flex-1">
                            <label class="block mb-1 text-xs font-semibold text-gray-700 dark:text-gray-400">Nama Bagian (Judul Tab)</label>
                            <input type="text" x-model="group.title" :name="`content[groups][${gIndex}][title]`" placeholder="Yayasan / Senat" class="w-full p-2 text-sm font-bold border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        </div>
                        <button type="button" @click="groups.splice(gIndex, 1)" class="p-2 mt-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-md">Hapus Bagian</button>
                    </div>

                    {{-- Members inside group --}}
                    <div class="pl-4 mt-2 border-l-2 border-green-300">
                        <div class="flex items-center justify-between mb-2">
                            <h5 class="text-xs font-medium text-gray-600 dark:text-gray-400">Pejabat / Anggota:</h5>
                            <button type="button" @click="group.members = group.members || []; group.members.push({name: '', position: '', photo: '', level: 'staff'})" class="px-2 py-1 text-xs text-green-700 bg-green-100 rounded hover:bg-green-200">
                                + Tambah Pejabat
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            <template x-for="(member, mIndex) in group.members" :key="mIndex">
                                <div class="relative p-3 bg-gray-50 border border-gray-100 rounded dark:bg-gray-800 dark:border-gray-700" :class="{'border-l-4 border-l-yellow-400': member.level === 'ketua', 'border-l-4 border-l-blue-400': member.level === 'wakil'}">
                                    <button type="button" @click="group.members.splice(mIndex, 1)" class="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700" title="Hapus Pejabat">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    
                                    <div class="grid gap-3 pr-6 sm:grid-cols-2 lg:grid-cols-4">
                                        <div class="lg:col-span-2">
                                            <label class="block mb-1 text-xs font-medium text-gray-500">Nama</label>
                                            <input type="text" x-model="member.name" :name="`content[groups][${gIndex}][members][${mIndex}][name]`" placeholder="Nama Lengkap" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                        <div class="lg:col-span-2">
                                            <label class="block mb-1 text-xs font-medium text-gray-500">Jabatan</label>
                                            <input type="text" x-model="member.position" :name="`content[groups][${gIndex}][members][${mIndex}][position]`" placeholder="Ketua Yayasan" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                        <div class="lg:col-span-3">
                                            <label class="block mb-1 text-xs font-medium text-gray-500">Photo URL</label>
                                            <input type="text" x-model="member.photo" :name="`content[groups][${gIndex}][members][${mIndex}][photo]`" placeholder="assets/img/pejabat.jpg" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                        <div>
                                            <label class="block mb-1 text-xs font-medium text-gray-500">Level/Hierarki</label>
                                            <select x-model="member.level" :name="`content[groups][${gIndex}][members][${mIndex}][level]`" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                                <option value="ketua">Tingkat 1 (Pimpinan)</option>
                                                <option value="wakil">Tingkat 2 (Wakil)</option>
                                                <option value="staff">Tingkat 3 (Staff/Anggota)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <p x-show="!group.members || group.members.length === 0" class="text-xs italic text-gray-500">Belum ada pejabat.</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="groups.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada bagian/tab ditambahkan.</p>
    </div>
</div>
