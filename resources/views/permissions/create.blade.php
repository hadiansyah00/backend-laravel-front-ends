<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {{ __('Tambah Permission Baru (Real-time)') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100" x-data="permissionForm()"
                    x-init="$refs.input.focus()">

                    <div class="flex items-center mb-4 space-x-2">
                        <input type="text" x-ref="input" x-model="newPermission" @keydown.enter.prevent="addPermission"
                            placeholder="Tulis nama permission lalu tekan Enter"
                            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400">
                        <button @click="addPermission"
                            class="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-600 whitespace-nowrap dark:bg-indigo-600 dark:hover:bg-indigo-500"
                            :disabled="loading">
                            + Tambah
                        </button>
                    </div>

                    <template x-if="message">
                        <div x-text="message"
                            :class="message.startsWith('Error') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'"
                            class="mb-4 font-bold"></div>
                    </template>
                    <template x-if="errors['permissions.0.name']">
                        <div class="mb-4 text-sm text-red-600 dark:text-red-400"
                            x-text="'Error: ' + errors['permissions.0.name'][0]">
                        </div>
                    </template>

                    <h3 class="mb-2 font-bold dark:text-gray-200">Daftar Permission untuk Disimpan:</h3>
                    <div
                        class="border rounded-md p-4 min-h-[100px] bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600">
                        <template x-if="permissions.length === 0">
                            <p class="text-center text-gray-500 dark:text-gray-400">Belum ada permission yang
                                ditambahkan.
                            </p>
                        </template>
                        <ul class="space-y-2">
                            <template x-for="(permission, index) in permissions" :key="permission.name">
                                <li
                                    class="flex items-center justify-between p-2 bg-white border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                    <span x-text="permission.name" class="text-gray-800 dark:text-gray-200"></span>
                                    <button @click="removePermission(index)"
                                        class="font-bold text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                        :disabled="loading">
                                        &times;
                                    </button>
                                </li>
                            </template>
                        </ul>
                    </div>

                    <div class="flex items-center justify-end mt-6">
                        <a href="{{ route('admin.permissions.index') }}"
                            class="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-500">
                            Batal
                        </a>
                        <button @click="savePermissions" :disabled="loading || permissions.length === 0"
                            class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-500"
                            :class="{ 'opacity-50 cursor-not-allowed': loading || permissions.length === 0 }">
                            <svg x-show="loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span x-text="loading ? 'Menyimpan...' : 'Simpan Semua'"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        function permissionForm() {
            return {
                permissions: [],
                newPermission: '',
                loading: false,
                message: '',
                errors: {},
                addPermission() {
                    const name = this.newPermission.trim();
                    if (!name) return;
                    if (this.permissions.some(p => p.name.toLowerCase() === name.toLowerCase())) {
                        this.message = 'Error: Permission sudah ada di dalam daftar.';
                        setTimeout(() => this.message = '', 2000);
                        return;
                    }
                    this.permissions.push({ name });
                    this.newPermission = '';
                    this.$refs.input.focus();
                },
                removePermission(index) {
                    this.permissions.splice(index, 1);
                },
                async savePermissions() {
                    if (this.permissions.length === 0) {
                        this.message = 'Error: Silakan tambahkan setidaknya satu permission.';
                        setTimeout(() => this.message = '', 2000);
                        return;
                    }
                    this.loading = true;
                    this.message = '';
                    this.errors = {};

                    try {
                        const response = await fetch('{{ route('admin.permissions.storeMultiple') }}', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').getAttribute('content')
                            },
                            body: JSON.stringify({ permissions: this.permissions })
                        });

                        const text = await response.text();
                        let result;
                        try {
                            result = JSON.parse(text);
                        } catch (err) {
                            console.error('Respon bukan JSON:', text);
                            this.message = 'Error: Server mengembalikan respon yang tidak valid.';
                            this.loading = false;
                            return;
                        }

                        if (!response.ok) {
                            if (response.status === 422) {
                                this.errors = result.errors || {};
                                // Translate error keys to Bahasa Indonesia
                                if (this.errors['permissions.0.name']) {
                                    this.errors['permissions.0.name'][0] = this.translateError(this.errors['permissions.0.name'][0]);
                                }
                            }
                            this.message = 'Error: ' + (result.message || 'Terjadi kesalahan.');
                            this.loading = false;
                            return;
                        }

                        this.message = result.message || 'Permission berhasil disimpan.';
                        this.permissions = [];
                        setTimeout(() => {
                            window.location.href = '{{ route('admin.permissions.index') }}';
                        }, 1500);

                    } catch (error) {
                        this.message = 'Error: ' + error.message;
                    } finally {
                        this.loading = false;
                    }
                },
                translateError(errorMsg) {
                    // Contoh translasi sederhana, tambahkan sesuai kebutuhan
                    if (errorMsg.includes('The name field is required')) {
                        return 'Nama permission wajib diisi.';
                    }
                    if (errorMsg.includes('The name has already been taken')) {
                        return 'Nama permission sudah digunakan.';
                    }
                    if (errorMsg.includes('The name may not be greater than')) {
                        return 'Nama permission terlalu panjang.';
                    }
                    return errorMsg; // fallback
                }
            }
        }
    </script>
</x-app-layout>