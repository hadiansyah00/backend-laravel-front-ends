<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Kelola Sections</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">Untuk Halaman: {{ $page->title }}</p>
            </div>
            <div class="flex items-center space-x-2">
                <a href="{{ route('admin.pages.index') }}"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Kembali
                    ke Halaman</a>
                <a href="{{ route('admin.pages.sections.create', $page) }}"
                    class="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">+
                    Tambah Section</a>
            </div>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative overflow-x-auto bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Urutan</th>
                            <th scope="col" class="px-6 py-3">Tipe</th>
                            <th scope="col" class="px-6 py-3">Konten (Preview)</th>
                            <th scope="col" class="px-6 py-3"><span class="sr-only">Aksi</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($sections as $section)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">{{ $section->order }}</td>
                            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ $section->type }}</td>
                            <td class="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                                <pre
                                    class="p-2 overflow-auto text-xs bg-gray-100 rounded-md max-h-24 dark:bg-gray-900"><code>{{ json_encode($section->content, JSON_PRETTY_PRINT) }}</code></pre>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end space-x-2">
                                    <a href="{{ route('admin.sections.edit', $section) }}"
                                        class="px-3 py-1 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500">Edit</a>
                                    <form action="{{ route('admin.sections.destroy', $section) }}" method="POST"
                                        onsubmit="return confirm('Yakin?');">
                                        @csrf @method('DELETE')
                                        <button type="submit"
                                            class="px-3 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500">Hapus</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr class="border-b dark:border-gray-700">
                            <td colspan="4" class="px-6 py-4 text-center">Belum ada section untuk halaman ini.</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>