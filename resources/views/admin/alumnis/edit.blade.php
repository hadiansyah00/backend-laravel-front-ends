@extends('layouts.admin')

@section('title', 'Edit Alumni')

@section('content')
<div class="mb-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 sm:p-6">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Edit Alumni: {{ Str::limit($alumni->name, 40) }}</h3>
            <a href="{{ route('admin.alumnis.index') }}" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">&larr; Kembali</a>
        </div>
    </div>
    <div class="p-4 sm:p-6">
        @if ($errors->any())
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <ul class="list-disc pl-5">@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
            </div>
        @endif
        <form action="{{ route('admin.alumnis.update', $alumni) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            @include('admin.alumnis.form')
            <div class="mt-6 flex justify-end gap-3">
                <a href="{{ route('admin.alumnis.index') }}" class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">Batalkan</a>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>
@endsection
