<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Manajemen Role & Permission') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">

            {{-- Bagian Form Tambah Role Baru --}}
            <div class="p-6 mb-8 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Tambah Role Baru</h3>
                <form action="{{ route('admin.roles.store') }}" method="POST">
                    @csrf
                    <div class="mb-4">
                        <label for="name" class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Nama
                            Role:</label>
                        <input type="text" name="name" id="name" placeholder="Contoh: editor"
                            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required>
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Tetapkan
                            Permissions:</label>
                        <div
                            class="grid grid-cols-2 p-4 border border-gray-200 rounded-md md:grid-cols-4 gap-y-2 gap-x-4 dark:border-gray-600">
                            @foreach ($permissions as $permission)
                            <div class="flex items-center">
                                <input type="checkbox" name="permissions[]" id="perm_create_{{ $permission->id }}"
                                    value="{{ $permission->name }}"
                                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600">
                                <label for="perm_create_{{ $permission->id }}"
                                    class="block ml-2 text-sm text-gray-900 dark:text-gray-300">{{ $permission->name
                                    }}</label>
                            </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit"
                            class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Simpan Role Baru
                        </button>
                    </div>
                </form>
            </div>

            {{-- Bagian Daftar Role yang Ada --}}
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Daftar Role yang Ada</h3>
                    <div class="overflow-x-auto">
                        <table
                            class="min-w-full bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                        Nama Role</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                                        Permissions</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase dark:text-gray-300">
                                        Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                @forelse ($roles as $role)
                                <tr>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ $role->name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex flex-wrap gap-1">
                                            @forelse ($role->permissions->pluck('name') as $permissionName)
                                            <span
                                                class="px-2 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-full dark:bg-indigo-600">{{
                                                $permissionName }}</span>
                                            @empty
                                            <span class="text-xs text-gray-500 dark:text-gray-400">Belum ada
                                                permission</span>
                                            @endforelse
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <div class="flex items-center space-x-4">
                                            {{-- Tombol Edit dengan Ikon Pensil --}}
                                            <a href="{{ route('admin.roles.edit', $role) }}"
                                                class="flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none"
                                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Edit
                                            </a>

                                            {{-- Tombol Hapus dengan Ikon Tong Sampah --}}
                                            <form action="{{ route('admin.roles.destroy', $role) }}" method="POST"
                                                class="inline-block"
                                                onsubmit="return confirm('Apakah Anda yakin ingin menghapus role ini?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit"
                                                    class="flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1"
                                                        fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                        stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09.92-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                    Hapus
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="3"
                                        class="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Belum ada role yang dibuat.
                                    </td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>