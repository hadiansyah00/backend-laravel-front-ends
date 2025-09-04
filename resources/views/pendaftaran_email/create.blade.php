<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Email Mahasiswa Baru</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>

<body class="flex items-center justify-center min-h-screen bg-gray-50">

    <div class="w-full max-w-xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
        <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Form Pendaftaran Email Mahasiswa Baru</h2>

        {{-- ✅ Notifikasi sukses --}}
        @if(session('success'))
        <div class="flex items-center p-4 mb-4 text-green-700 bg-green-100 rounded-lg" role="alert">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l5-5-1.5-1.5L9 11l-1.5-1.5L6 11l3 3z"
                    clip-rule="evenodd"></path>
            </svg>
            <span>{{ session('success') }}</span>
        </div>
        @endif

        {{-- ✅ Notifikasi error --}}
        @if ($errors->any())
        <div class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
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
                get generatedEmail() {
                    if (!this.firstName || !this.lastName) return '';
                    let first = this.firstName.toLowerCase().replace(/\s+/g, '');
                    let last = this.lastName.toLowerCase().replace(/\s+/g, '');
                    return `${first}.${last}@sbh.ac.id`;
                }
            }">
            @csrf
            <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label for="first_name" class="block text-sm font-medium text-gray-700">Nama Depan</label>
                    <input type="text" id="first_name" name="first_name"
                        class="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required x-model="firstName">
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-gray-700">Nama Belakang</label>
                    <input type="text" id="last_name" name="last_name"
                        class="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required x-model="lastName">
                </div>
            </div>

            <div x-show="generatedEmail"
                class="p-3 mb-4 text-sm text-blue-800 border border-blue-200 rounded-md bg-blue-50">
                Email Mahasiswa: <strong x-text="generatedEmail"></strong>
            </div>

            <!-- hidden input supaya ikut terkirim ke backend -->
            <input type="hidden" name="email" :value="generatedEmail">

            <div class="mb-4">
                <label for="program_studi" class="block text-sm font-medium text-gray-700">Program Studi</label>
                <input type="text" id="program_studi" name="program_studi"
                    class="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            </div>

            <div class="mb-6">
                <label for="phone" class="block text-sm font-medium text-gray-700">No. HP</label>
                <input type="tel" id="phone" name="phone"
                    class="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            </div>

            <button type="submit"
                class="w-full px-4 py-2 font-bold text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Daftar
            </button>
        </form>
    </div>

</body>

</html>