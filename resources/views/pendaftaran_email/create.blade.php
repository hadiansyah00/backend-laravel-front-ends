@extends('layouts.app-front')

@section('content')

{{-- Latar belakang abu-abu untuk kontras --}}
<div class="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-100">

    {{-- Kartu Formulir dengan bayangan dan sudut membulat --}}
    <div class="w-full max-w-2xl p-8 space-y-8 bg-white shadow-lg rounded-xl">

        {{-- Header Formulir --}}
        <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900">Pendaftaran Akun Mahasiswa</h2>
            <p class="mt-2 text-sm text-gray-600">Buat email <span class="font-semibold">@sbh.ac.id</span> Anda dan
                lengkapi data berikut.</p>
        </div>
        {{-- ✅ Notifikasi sukses --}}
        @if(session('success'))
        <div class="flex items-center p-4 mb-4 text-green-700 bg-green-100 border border-green-200 rounded-lg"
            role="alert">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l5-5-1.5-1.5L9 11l-1.5-1.5L6 11l3 3z"
                    clip-rule="evenodd"></path>
            </svg>
            <span>{{ session('success') }}</span>
        </div>
        @endif

        {{-- ✅ Notifikasi error --}}
        @if ($errors->any())
        <div class="p-4 mb-4 text-red-700 bg-red-100 border border-red-200 rounded-lg">
            <ul class="ml-4 list-disc">
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif
        <form action="{{ route('pendaftaran-email.store') }}" method="POST" x-data="{
            firstName: '',
            lastName: '',
            showPassword: false,
            copied: false,
            get generatedEmail() {
                if (!this.firstName || !this.lastName) return '';
                // Membersihkan input dari spasi dan karakter non-alfanumerik
                let first = this.firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
                let last = this.lastName.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (!first || !last) return '';
                return `${first}.${last}@sbh.ac.id`;
            },
            copyToClipboard() {
                if (!this.generatedEmail) return;
                navigator.clipboard.writeText(this.generatedEmail);
                this.copied = true;
                setTimeout(() => { this.copied = false }, 2000); // Reset status 'copied' setelah 2 detik
            }
        }">
            @csrf

            {{-- Input Nama Depan & Belakang --}}
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-700">Nama Depan</label>
                    <div class="relative">
                        <span
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        <input type="text" id="first_name" name="first_name" x-model.debounce.300ms="firstName"
                            class="w-full py-2.5 pl-10 pr-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Contoh: Budi" required>
                    </div>
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-700">Nama Belakang</label>
                    <div class="relative">
                        <span
                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        <input type="text" id="last_name" name="last_name" x-model.debounce.300ms="lastName"
                            class="w-full py-2.5 pl-10 pr-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Contoh: Santoso" required>
                    </div>
                </div>
            </div>

            {{-- Pratinjau Email yang Dihasilkan --}}
            <div x-show="generatedEmail" x-transition
                class="flex items-center justify-between p-3 mt-5 text-sm text-indigo-800 border-2 border-indigo-200 border-dashed rounded-lg bg-indigo-50">
                <div class="overflow-hidden">
                    <span class="text-gray-600">Email Anda: </span>
                    <strong x-text="generatedEmail" class="font-semibold"></strong>
                </div>
                <button type="button" @click="copyToClipboard()"
                    class="relative flex-shrink-0 p-2 ml-4 text-indigo-600 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <span x-show="!copied" class="flex items-center">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </span>
                    <span x-show="copied" class="flex items-center text-green-600">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
            </div>
            <input type="hidden" name="email" :value="generatedEmail">

            {{-- Input Lainnya --}}
            <div class="mt-6 space-y-6">
                <div>
                    <label for="program_studi" class="block mb-2 text-sm font-medium text-gray-700">Program
                        Studi</label>
                    <select id="program_studi" name="program_studi"
                        class="w-full py-2.5 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                        <option value="" disabled selected>Pilih Program Studi Anda</option>
                        <option value="FARMASI">FARMASI</option>
                        <option value="GIZI">GIZI</option>
                        <option value="KEBIDANAN">KEBIDANAN</option>
                    </select>
                </div>

                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-700">No. HP</label>
                    <input type="tel" id="phone" name="phone"
                        class="w-full py-2.5 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="081234567890">
                </div>

                {{-- Input Password dengan Tombol Lihat/Sembunyikan --}}

            </div>

            {{-- Tombol Submit --}}
            <div class="pt-4">
                <button type="submit"
                    class="w-full px-4 py-3 font-bold text-white transition-all duration-300 transform bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:-translate-y-1">
                    Daftar Sekarang
                </button>
            </div>
        </form>
    </div>
</div>

@endsection