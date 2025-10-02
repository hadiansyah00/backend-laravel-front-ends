{{-- Menampilkan Validation Errors --}}
@if ($errors->any())
<div class="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
    <span class="font-medium">Oops! Terjadi kesalahan.</span>
    <ul class="mt-1.5 ml-4 list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

{{-- Alpine.js untuk menampilkan/menyembunyikan field URL secara dinamis --}}
<div x-data="{ type: '{{ old('type', $menu->type ?? 'page') }}' }">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        {{-- Nama Menu --}}
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama Menu</label>
            <input type="text" name="name" id="name" value="{{ old('name', $menu->name ?? '') }}"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Contoh: Tentang Kami" required>
        </div>

        {{-- Tipe Menu --}}
        <div>
            <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tipe</label>
            <select name="type" id="type" @change="type = $event.target.value"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option value="page" x-bind:selected="type === 'page'">Halaman (Slug)</option>
                <option value="link" x-bind:selected="type === 'link'">Link Manual</option>

            </select>
        </div>
        <div class="mb-4">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
            <input type="text" name="slug" value="{{ old('slug', $menu->slug ?? '') }}"
                class="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white">
            <p class="text-xs text-gray-500">Slug ini akan digunakan untuk URL menu</p>
        </div>
        {{-- URL (Hanya tampil jika tipe 'link') --}}
        <div x-show="type === 'link'" x-cloak>
            <label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">URL Manual</label>
            <input type="url" name="url" id="url" value="{{ old('url', $menu->url ?? '') }}"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="https://example.com">
        </div>

        {{-- Urutan --}}
        <div>
            <label for="order" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Urutan</label>
            <input type="number" name="order" id="order" value="{{ old('order', $menu->order ?? 0) }}"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required>
        </div>

        {{-- Status --}}
        <div class="md:col-span-2">
            <label for="is_active"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
            <select name="is_active" id="is_active"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option value="1" @if(old('is_active', $menu->is_active ?? 1) == 1) selected @endif>Aktif</option>
                <option value="0" @if(old('is_active', $menu->is_active ?? 1) == 0) selected @endif>Tidak Aktif</option>
            </select>
        </div>
        <div>
            <label for="parent_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Menu Induk
                (Opsional)</label>
            <select name="parent_id" id="parent_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option value="">-- Tidak Ada --</option>
                @foreach($parentMenus as $parent)
                <option value="{{ $parent->id }}" {{-- Pilih parent yang sesuai saat edit --}} @if(isset($menu) &&
                    $menu->
                    parent_id == $parent->id) selected @endif>
                    {{ $parent->name }}
                </option>
                @endforeach
            </select>
        </div>
    </div>
</div>