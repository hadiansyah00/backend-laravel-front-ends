<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Manajemen User') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="flex justify-end mb-4">
                        <a href="{{ route('admin.users.create') }}"
                            class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                            + Tambah User
                        </a>
                    </div>

                    @if (session('success'))
                    <div class="relative px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded"
                        role="alert">
                        <span class="block sm:inline">{{ session('success') }}</span>
                    </div>
                    @endif

                    <div class="overflow-x-auto">
                        <table class="min-w-full text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100">
                            <thead class="bg-gray-200 dark:text-gray-600">
                                <tr>
                                    <th class="w-1/4 px-4 py-2 text-left">Nama</th>
                                    <th class="w-1/4 px-4 py-2 text-left">Email</th>
                                    <th class="w-1/4 px-4 py-2 text-left">Roles</th>
                                    <th class="w-1/4 px-4 py-2 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($users as $user)
                                <tr class="border-b">
                                    <td class="px-4 py-2">{{ $user->name }}</td>
                                    <td class="px-4 py-2">{{ $user->email }}</td>
                                    <td class="px-4 py-2">
                                        @foreach ($user->getRoleNames() as $role)
                                        <span
                                            class="bg-gray-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{{
                                            $role }}</span>
                                        @endforeach
                                    </td>
                                    <td class="flex px-4 py-2 space-x-2">
                                        <div class="flex items-center space-x-2">
                                            {{-- Edit Button with Pencil Icon --}}
                                            <a href="{{ route('admin.users.edit', $user->id) }}"
                                                class="flex items-center px-3 py-1 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none"
                                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                                                </svg>
                                                Edit
                                            </a>

                                            {{-- Delete Button with Trash Can Icon --}}
                                            <form action="{{ route('admin.users.destroy', $user->id) }}" method="POST"
                                                onsubmit="return confirm('Apakah Anda yakin ingin menghapus user ini?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit"
                                                    class="flex items-center px-3 py-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
                                    <td colspan="4" class="py-4 text-center">Tidak ada data user.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">
                        {{ $users->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>