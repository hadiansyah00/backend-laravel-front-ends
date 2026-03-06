{{-- Form untuk tipe: team-grid --}}
<div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
            <input type="text" name="content[title]" value="{{ old('content.title', $content['title'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white" required>
        </div>
        <div>
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subjudul (Opsional)</label>
            <input type="text" name="content[subtitle]" value="{{ old('content.subtitle', $content['subtitle'] ?? '') }}"
                class="block w-full border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
    </div>

    {{-- Tabs/Prodi Categories Builder (Alpine) --}}
    <div x-data="{ 
            groups: {{ json_encode(old('content.groups', current($content['groups'] ?? []) ? $content['groups'] : [])) }} 
        }" class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        
        <div class="flex items-center justify-between mb-4">
            <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Grup / Kategori Tim</h4>
                <p class="text-xs text-gray-500">Biarkan kosong jika hanya ada 1 grup (tidak ada tab).</p>
            </div>
            <button type="button" @click="groups.push({title: 'Grup Baru', members: []})" class="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">Tambah Grup</button>
        </div>
        
        <div class="space-y-6">
            <template x-for="(group, gIndex) in groups" :key="gIndex">
                <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="flex-1">
                            <label class="block mb-1 text-xs font-semibold text-gray-700 dark:text-gray-400">Nama Grup (Tab)</label>
                            <input type="text" x-model="group.title" :name="`content[groups][${gIndex}][title]`" placeholder="Ex: S1 Farmasi" class="w-full p-2 text-sm font-bold border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        </div>
                        <button type="button" @click="groups.splice(gIndex, 1)" class="p-2 mt-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-md">Hapus Grup</button>
                    </div>

                    {{-- Members inside group --}}
                    <div class="pl-4 mt-2 border-l-2 border-blue-200">
                        <div class="flex items-center justify-between mb-2">
                            <h5 class="text-xs font-medium text-gray-600 dark:text-gray-400">Anggota Tim:</h5>
                            <button type="button" @click="group.members = group.members || []; group.members.push({name: '', position: '', photo: '', linkedin: ''})" class="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
                                + Tambah Anggota
                            </button>
                        </div>
                        
                        <div class="space-y-3">
                            <template x-for="(member, mIndex) in group.members" :key="mIndex">
                                <div class="relative p-3 bg-gray-50 border border-gray-100 rounded dark:bg-gray-800 dark:border-gray-700">
                                    <button type="button" @click="group.members.splice(mIndex, 1)" class="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700" title="Hapus Anggota">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    
                                    <div class="grid gap-3 pr-6 sm:grid-cols-2">
                                        <div>
                                            <input type="text" x-model="member.name" :name="`content[groups][${gIndex}][members][${mIndex}][name]`" placeholder="Nama Lengkap" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                        <div>
                                            <input type="text" x-model="member.position" :name="`content[groups][${gIndex}][members][${mIndex}][position]`" placeholder="Jabatan/Posisi" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                        <div>
                                            <input type="text" x-model="member.photo" :name="`content[groups][${gIndex}][members][${mIndex}][photo]`" placeholder="URL Foto (assets/img/foto.jpg)" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                        <div>
                                            <input type="text" x-model="member.nidn" :name="`content[groups][${gIndex}][members][${mIndex}][nidn]`" placeholder="NIDN (Opsional)" class="w-full p-2 text-sm border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <p x-show="!group.members || group.members.length === 0" class="text-xs italic text-gray-500">Belum ada anggota di grup ini.</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <p x-show="groups.length === 0" class="mt-2 text-sm italic text-gray-500">Belum ada grup tim ditambahkan.</p>
    </div>
</div>
