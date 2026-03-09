@extends('layouts.admin')

@section('title', 'Data Lowongan / Karir')

@section('content')
<div class="mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 sm:p-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Lowongan & Karir</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Kelola informasi lowongan kerja, magang, dan karir untuk alumni & mahasiswa.</p>
            </div>
            <a href="{{ route('admin.lowongans.create') }}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Lowongan
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
                        <th scope="col" class="px-4 py-3">Posisi / Judul</th>
                        <th scope="col" class="px-4 py-3">Perusahaan</th>
                        <th scope="col" class="px-4 py-3">Tipe</th>
                        <th scope="col" class="px-4 py-3">Deadline</th>
                        <th scope="col" class="px-4 py-3">Status</th>
                        <th scope="col" class="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($lowongans as $lowongan)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                                {{ $lowongan->title }}
                                @if($lowongan->location)
                                    <p class="text-xs text-gray-400 font-normal">📍 {{ $lowongan->location }}</p>
                                @endif
                            </th>
                            <td class="px-4 py-3">{{ $lowongan->company }}</td>
                            <td class="px-4 py-3">
                                @php
                                    $colors = ['full-time' => 'blue', 'part-time' => 'purple', 'magang' => 'yellow', 'kontrak' => 'indigo'];
                                    $c = $colors[$lowongan->type] ?? 'gray';
                                @endphp
                                <span class="bg-{{ $c }}-100 text-{{ $c }}-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-{{ $c }}-900 dark:text-{{ $c }}-300">
                                    {{ ucfirst($lowongan->type) }}
                                </span>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-xs">
                                @if($lowongan->deadline)
                                    {{ $lowongan->deadline->format('d M Y') }}
                                    @if($lowongan->deadline->isPast())
                                        <span class="text-red-500">(Expired)</span>
                                    @endif
                                @else
                                    <span class="text-gray-400">-</span>
                                @endif
                            </td>
                            <td class="px-4 py-3">
                                @if($lowongan->is_active)
                                    <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Aktif</span>
                                @else
                                    <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Nonaktif</span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-right flex justify-end gap-2">
                                <a href="{{ route('admin.lowongans.edit', $lowongan) }}" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Edit</a>
                                <form action="{{ route('admin.lowongans.destroy', $lowongan) }}" method="POST" class="inline-block" onsubmit="return confirm('Yakin hapus lowongan ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-4 py-8 text-center text-gray-500">Belum ada data lowongan.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="mt-4">{{ $lowongans->links() }}</div>
    </div>
</div>
@endsection
