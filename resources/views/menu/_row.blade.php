{{-- File: resources/views/admin/menus/partials/_row.blade.php --}}

<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    {{-- Nama Menu dengan Indentasi --}}
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        style="padding-left: {{ 1.5 + ($level * 1.5) }}rem;">
        @if($level > 0)
        <span class="mr-2 text-gray-400">&rdsh;</span>
        @endif
        {{ $menu->name }}
    </th>

    {{-- Tipe Menu --}}
    <td class="px-6 py-4">
        <span class="px-2.5 py-0.5 text-xs font-medium rounded-full
            {{ $menu->type == 'page'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' }}">
            {{ Str::ucfirst($menu->type) }}
        </span>
    </td>

    {{-- URL / Slug --}}
    <td class="px-6 py-4 font-mono text-xs">{{ $menu->type == 'page' ? ('/' . $menu->slug) : $menu->url }}
    </td>
    {{-- Urutan --}}
    <td class="px-6 py-4 text-center">{{ $menu->order }}</td>

    {{-- Status --}}
    <td class="px-6 py-4 text-center">
        <span class="px-2.5 py-0.5 text-xs font-medium rounded-full
            {{ $menu->is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }}">
            {{ $menu->is_active ? 'Aktif' : 'Nonaktif' }}
        </span>
    </td>

    {{-- Aksi --}}
    <td class="px-6 py-4">
        <div class="flex items-center justify-end space-x-2">
            {{-- Tombol Edit --}}
            <a href="{{ route('admin.menus.edit', $menu) }}"
                class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                title="Edit Menu">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z">
                    </path>
                </svg>
            </a>

            {{-- Tombol Hapus --}}
            <form action="{{ route('admin.menus.destroy', $menu) }}" method="POST"
                onsubmit="return confirm('Apakah Anda yakin ingin menghapus menu ini?');">
                @csrf
                @method('DELETE')
                <button type="submit"
                    class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title="Hapus Menu">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg>
                </button>
            </form>
        </div>
    </td>
</tr>

{{-- PANGGILAN REKURSIF: Ulangi untuk setiap anak dari menu ini --}}
@if ($menu->children->isNotEmpty())
@foreach ($menu->children as $child)
@include('menu._row', ['menu' => $child, 'level' => $level + 1])
@endforeach
@endif