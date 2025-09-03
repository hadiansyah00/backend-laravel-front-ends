<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Kelola Sliders
            </h2>
            <a href="{{ route('admin.sliders.create') }}"
                class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah Slider
            </a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            @if (session('success'))
            <div class="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
                role="alert">
                {{ session('success') }}
            </div>
            @endif

            <div class="relative overflow-x-auto bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Judul</th>
                            <th scope="col" class="px-6 py-3">Subjudul</th>
                            <th scope="col" class="px-6 py-3">Gambar</th>
                            <th scope="col" class="px-6 py-3">Link</th>
                            <th scope="col" class="px-6 py-3">Order</th>
                            <th scope="col" class="px-6 py-3"><span class="sr-only">Aksi</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($sliders as $slider)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ $slider->title }}
                            </td>
                            <td class="px-6 py-4">{{ $slider->subtitle }}</td>
                            <td class="px-6 py-4">
                                {{-- [PERBAIKAN] Menambahkan alt tag untuk aksesibilitas --}}
                                <img src="{{ asset('storage/'.$slider->image) }}" alt="{{ $slider->title }}"
                                    class="h-12 rounded">
                            </td>
                            <td class="px-6 py-4">
                                @if($slider->link)
                                <a href="{{ $slider->link }}" target="_blank"
                                    class="text-blue-500 hover:underline">Lihat</a>
                                @else
                                -
                                @endif
                            </td>
                            <td class="px-6 py-4">{{ $slider->order }}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end space-x-1">

                                    {{-- Tombol Edit (Ikon Saja) --}}
                                    <x-button variant="yellow" href="{{ route('admin.sliders.edit', $slider->id) }}"
                                        title="Edit Slider">
                                        {{-- Ikon Edit --}}
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                                        </svg>
                                    </x-button>

                                    {{-- Tombol Hapus (Ikon Saja) --}}
                                    <form action="{{ route('admin.sliders.destroy', $slider->id) }}" method="POST"
                                        onsubmit="return confirm('Yakin ingin menghapus slider ini?');">
                                        @csrf
                                        @method('DELETE')
                                        <x-button variant="red" title="Hapus Slider">
                                            {{-- Ikon Hapus --}}
                                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09.92-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </x-button>
                                    </form>

                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr class="border-b dark:border-gray-700">
                            <td colspan="6" class="px-6 py-4 text-center">Belum ada slider dibuat.</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <div class="mt-4">
                {{ $sliders->links() }}
            </div>
        </div>
    </div>
</x-app-layout>