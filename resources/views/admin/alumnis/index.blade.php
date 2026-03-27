@extends('layouts.admin')

@section('title', 'Data Alumni')

@section('content')
<div class="mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 sm:p-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Data Alumni</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Kelola daftar alumni dan testimoni mereka.</p>
            </div>
            <a href="{{ route('admin.alumnis.create') }}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Alumni
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
                        <th scope="col" class="px-4 py-3">Alumni</th>
                        <th scope="col" class="px-4 py-3">NIM</th>
                        <th scope="col" class="px-4 py-3">Prodi / Lulus</th>
                        <th scope="col" class="px-4 py-3">Karir Saat Ini</th>
                        <th scope="col" class="px-4 py-3">Status</th>
                        <th scope="col" class="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($alumnis as $alumni)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                <div class="flex items-center gap-3">
                                    @if($alumni->photo)
                                        <img src="{{ asset($alumni->photo) }}" class="w-10 h-10 object-cover rounded-full border" alt="">
                                    @else
                                        <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm font-bold">
                                            {{ strtoupper(substr($alumni->name, 0, 1)) }}
                                        </div>
                                    @endif
                                    <div>
                                        <span class="block">{{ $alumni->name }}</span>
                                        @if($alumni->is_featured)
                                            <span class="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">⭐ Featured</span>
                                        @endif
                                    </div>
                                </div>
                            </th>
                            <td class="px-4 py-3">{{ $alumni->nim ?? '-' }}</td>
                            <td class="px-4 py-3 text-xs">
                                {{ $alumni->program_studi ?? '-' }}
                                @if($alumni->tahun_lulus)
                                    <br><span class="text-gray-400">Lulus {{ $alumni->tahun_lulus }}</span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-xs">
                                {{ $alumni->jabatan ?? '-' }}
                                @if($alumni->tempat_kerja)
                                    <br><span class="text-gray-400">di {{ $alumni->tempat_kerja }}</span>
                                @endif
                            </td>
                            <td class="px-4 py-3">
                                @if($alumni->is_active)
                                    <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Tampil</span>
                                @else
                                    <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Sembunyi</span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-right flex justify-end gap-2">
                                <a href="{{ route('admin.alumnis.edit', $alumni) }}" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Edit</a>
                                <form action="{{ route('admin.alumnis.destroy', $alumni) }}" method="POST" class="inline-block" onsubmit="return confirm('Yakin hapus data alumni ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                                Belum ada data alumni.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="mt-4">{{ $alumnis->links() }}</div>
    </div>
</div>
@endsection
