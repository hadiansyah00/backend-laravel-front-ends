{{-- Pesan Error --}}
@if ($errors->any())
<div class="p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-400"
    role="alert">
    <p class="font-bold">Terjadi Kesalahan</p>
    <ul class="pl-5 mt-2 list-disc">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<form action="{{ isset($user) ? route('admin.users.update', $user->id) : route('admin.users.store') }}" method="POST">
    @csrf
    @if (isset($user))
    @method('PUT')
    @endif

    {{-- Field Nama --}}
    <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Nama:</label>
        <input type="text" name="name" id="name" value="{{ old('name', $user->name ?? '') }}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline @error('name') border-red-500 @enderror dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:border-indigo-500"
            required>
    </div>

    {{-- Field Email --}}
    <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Email:</label>
        <input type="email" name="email" id="email" value="{{ old('email', $user->email ?? '') }}"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline @error('email') border-red-500 @enderror dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:border-indigo-500"
            required>
    </div>

    {{-- Field Password --}}
    <div class="mb-4">
        <label for="password" class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
            Password @if(isset($user)) (Baru, opsional) @endif
        </label>
        <input type="password" name="password" id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline @error('password') border-red-500 @enderror dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:border-indigo-500"
            {{ !isset($user) ? 'required' : '' }}>
        @if(isset($user))
        <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">Kosongkan jika tidak ingin mengubah password.</p>
        @endif
    </div>

    {{-- Field Konfirmasi Password --}}
    <div class="mb-4">
        <label for="password_confirmation"
            class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Konfirmasi Password:</label>
        <input type="password" name="password_confirmation" id="password_confirmation"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:border-indigo-500">
    </div>

    {{-- Field Roles --}}
    <div class="mb-6">
        <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Roles:</label>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            @foreach ($roles as $role)
            <div class="flex items-center">
                <input type="checkbox" name="roles[]" id="role_{{ $role->id }}" value="{{ $role->name }}"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    @if(isset($user) && $user->hasRole($role->name)) checked @elseif(is_array(old('roles')) &&
                in_array($role->name, old('roles'))) checked @endif>
                <label for="role_{{ $role->id }}" class="block ml-2 text-sm text-gray-900 dark:text-gray-300">{{
                    $role->name }}</label>
            </div>
            @endforeach
        </div>
    </div>

    {{-- Tombol Aksi --}}
    <div class="flex items-center justify-end">
        <a href="{{ route('admin.users.index') }}"
            class="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-500">
            Batal
        </a>
        <button type="submit"
            class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-500">
            {{ isset($user) ? 'Update' : 'Simpan' }}
        </button>
    </div>
</form>