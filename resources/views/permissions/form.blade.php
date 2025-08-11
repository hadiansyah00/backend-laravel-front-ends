@if ($errors->any())
<div class="p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 dark:bg-red-900/20 dark:text-red-400"
    role="alert">
    <p class="font-bold">Terjadi Kesalahan</p>
    <ul class="mt-2 list-disc list-inside">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
    </ul>
</div>
@endif

<form
    action="{{ isset($permission) ? route('admin.permissions.update', $permission->id) : route('permissions.store') }}"
    method="POST">
    @csrf
    @if (isset($permission))
    @method('PUT')
    @endif

    <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Nama Permission:</label>
        <input type="text" name="name" id="name" value="{{ old('name', $permission->name ?? '') }}"
            placeholder="Contoh: manage products"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline @error('name') border-red-500 @enderror dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            required>
    </div>

    <div class="flex items-center justify-end">
        <a href="{{ route('permissions.index') }}"
            class="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-500">
            Batal
        </a>
        <button type="submit"
            class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-500">
            {{ isset($permission) ? 'Update' : 'Simpan' }}
        </button>
    </div>
</form>