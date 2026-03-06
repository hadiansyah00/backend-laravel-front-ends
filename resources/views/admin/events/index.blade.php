@extends('layouts.admin')

@section('title', 'Data Event / Agenda')

@section('content')
<div class="mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 sm:p-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Event & Agenda</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Kelola daftar event, kegiatan, dan agenda kampus.</p>
            </div>
            <a href="{{ route('admin.events.create') }}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Event
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
                        <th scope="col" class="px-4 py-3">Tgl. Mulai</th>
                        <th scope="col" class="px-4 py-3">Judul Event</th>
                        <th scope="col" class="px-4 py-3">Lokasi</th>
                        <th scope="col" class="px-4 py-3">Status</th>
                        <th scope="col" class="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($events as $event)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                                {{ $event->start_date->format('d M Y, H:i') }}
                                @if($event->end_date)
                                    <br><span class="text-gray-400">s/d {{ $event->end_date->format('d M Y, H:i') }}</span>
                                @endif
                            </td>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs truncate whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    @if($event->image)
                                        <img src="{{ asset($event->image) }}" class="w-10 h-10 object-cover border rounded" alt="Gambar">
                                    @else
                                        <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                    @endif
                                    <span class="truncate">{{ $event->title }}</span>
                                </div>
                            </th>
                            <td class="px-4 py-3 truncate max-w-[150px]">
                                {{ $event->location ?? '-' }}
                            </td>
                            <td class="px-4 py-3">
                                @if($event->is_active)
                                    <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Publish</span>
                                @else
                                    <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Draft</span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-right flex justify-end gap-2">
                                <a href="{{ route('admin.events.edit', $event) }}" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Edit</a>
                                <form action="{{ route('admin.events.destroy', $event) }}" method="POST" class="inline-block" onsubmit="return confirm('Yakin hapus event ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                                Belum ada event atau agenda.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        <div class="mt-4">
            {{ $events->links() }}
        </div>
    </div>
</div>
@endsection
