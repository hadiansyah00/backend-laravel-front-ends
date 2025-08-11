<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Edit Role & Tetapkan Permission') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <form action="{{ route('admin.roles.update', $role->id) }}" method="POST">
                        @csrf
                        @method('PUT')

                        {{-- Nama Role --}}
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                Nama Role:
                            </label>
                            <input type="text" name="name" id="name" value="{{ old('name', $role->name) }}"
                                class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                required>
                            @error('name') <p class="mt-2 text-xs text-red-500">{{ $message }}</p> @enderror
                        </div>

                        {{-- Permissions --}}
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                Permissions:
                            </label>
                            <div
                                class="grid grid-cols-2 p-4 border border-gray-200 rounded-md md:grid-cols-4 gap-y-2 gap-x-4 dark:border-gray-600">
                                @foreach ($permissions as $permission)
                                <div class="flex items-center">
                                    <input type="checkbox" name="permissions[]" id="permission_{{ $permission->id }}"
                                        value="{{ $permission->name }}"
                                        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                        @if ($role->hasPermissionTo($permission))
                                    checked
                                    @endif
                                    >
                                    <label for="permission_{{ $permission->id }}"
                                        class="block ml-2 text-sm text-gray-900 dark:text-gray-300">
                                        {{ $permission->name }}
                                    </label>
                                </div>
                                @endforeach
                            </div>
                        </div>

                        {{-- Tombol Aksi --}}
                        <div class="flex items-center justify-end">
                            {{-- Tombol Batal dengan Ikon 'X' --}}
                            <a href="{{ route('admin.roles.index') }}"
                                class="flex items-center px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Batal
                            </a>

                            {{-- Tombol Update dengan Ikon 'Check' --}}
                            <button type="submit"
                                class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Update Role
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>