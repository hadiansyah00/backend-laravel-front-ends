@extends('layouts.admin')

@section('title', 'Data Program Studi')

@section('content')
<div class="mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 sm:p-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Program Studi</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Kelola informasi detail Program Studi yang ada di institusi.</p>
            </div>
            <a href="{{ route('admin.program-studis.create') }}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Prodi
            </a>
        </div>
    </div>
    
    <div class="p-4 sm:p-6">
        @if (session('success'))
            <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span class="font-medium">Success!</span> {{ session('success') }}
            </div>
        @endif

        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-4 py-3">Nama Prodi</th>
                        <th scope="col" class="px-4 py-3">Gelar Lulusan</th>
                        <th scope="col" class="px-4 py-3">Akreditasi</th>
                        <th scope="col" class="px-4 py-3">Lama Studi</th>
                        <th scope="col" class="px-4 py-3">Status</th>
                        <th scope="col" class="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($programStudis as $prodi)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                                <div class="flex items-center gap-3">
                                    @if($prodi->image)
                                        <img src="{{ asset($prodi->image) }}" class="w-10 h-10 object-cover border rounded" alt="Gambar">
                                    @else
                                        <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                        </div>
                                    @endif
                                    <span class="truncate">{{ $prodi->name }}</span>
                                </div>
                            </th>
                            <td class="px-4 py-3">
                                {{ $prodi->gelar ?? '-' }}
                            </td>
                            <td class="px-4 py-3">
                                @if($prodi->akreditasi)
                                    <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded border border-indigo-400 dark:bg-gray-700 dark:text-indigo-400 dark:border-indigo-500">
                                        {{ $prodi->akreditasi }}
                                    </span>
                                @else
                                    <span class="text-gray-400">-</span>
                                @endif
                            </td>
                            <td class="px-4 py-3">
                                {{ $prodi->lama_studi ?? '-' }}
                            </td>
                            <td class="px-4 py-3">
                                @if($prodi->is_active)
                                    <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Tampil</span>
                                @else
                                    <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Sembunyi</span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-right flex justify-end gap-2">
                                <a href="{{ route('admin.program-studis.edit', $prodi) }}" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Edit</a>
                                <form action="{{ route('admin.program-studis.destroy', $prodi) }}" method="POST" class="inline-block" onsubmit="return confirm('Yakin hapus Program Studi ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                                Belum ada data Program Studi.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        <div class="mt-4">
            {{ $programStudis->links() }}
        </div>
    </div>
</div>
@endsection
