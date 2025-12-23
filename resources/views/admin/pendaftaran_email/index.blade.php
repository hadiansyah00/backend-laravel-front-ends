<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Kelola Pendaftaran Email
            </h2>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            @if (session('success'))
            <div class="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
                role="alert">
                {{ session('success') }}
            </div>
            @endif

            <div class="relative overflow-x-auto bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="px-6 py-3">Nama</th>
                            <th class="px-6 py-3">Program Studi</th>
                            <th class="px-6 py-3">No. HP</th>
                            <th class="px-6 py-3">Status</th>
                            <th class="px-6 py-3">Password</th>
                            <th class="px-6 py-3"><span class="sr-only">Aksi</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($pendaftaran as $p)
                        <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ $p->first_name }} {{ $p->last_name }}
                            </td>
                            <td class="px-6 py-4">{{ $p->program_studi ?? '-' }}</td>
                            <td class="px-6 py-4">{{ $p->phone ?? '-' }}</td>

                            <td class="px-6 py-4">
                                <span
                                    class="px-2 py-1 text-xs font-semibold rounded
                                        {{ $p->status == 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }}">
                                    {{ ucfirst($p->status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4">{{ $p->password ?? '-' }}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center justify-end space-x-1">

                                    {{-- Detail (Modal Trigger) --}}
                                    <button type="button" class="p-2 text-blue-500 hover:text-blue-700 detailBtn"
                                        data-id="{{ $p->id }}" title="Detail">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11.25 9h.008v.008H11.25V9zM3.75 12s2.25-4.5 8.25-4.5S20.25 12 20.25 12s-2.25 4.5-8.25 4.5S3.75 12 3.75 12z" />
                                        </svg>
                                    </button>

                                    {{-- Delete --}}
                                    <form action="{{ route('admin.pendaftaran-email.destroy', $p->id) }}" method="POST"
                                        onsubmit="return confirm('Yakin ingin menghapus data ini?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 text-red-500 hover:text-red-700" title="Hapus">
                                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397M9 5.25V4.334c0-1.18.91-2.134 2.09-2.201a51.964 51.964 0 013.32 0c1.18.067 2.09.92 2.09 2.201V5.25" />
                                            </svg>
                                        </button>
                                    </form>

                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr class="border-b dark:border-gray-700">
                            <td colspan="5" class="px-6 py-4 text-center">Belum ada data pendaftaran.</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <div class="mt-4">
                {{ $pendaftaran->links() }}
            </div>
        </div>
    </div>

    <!-- Modal Detail -->
    <div id="detailModal" class="fixed inset-0 z-50 items-center justify-center hidden bg-gray-900 bg-opacity-50">
        <div class="w-1/3 p-6 bg-white rounded shadow-lg dark:bg-gray-800 dark:text-gray-200">
            <h3 class="mb-4 text-lg font-bold">Detail Pendaftaran</h3>
            <p><strong>Nama:</strong> <span id="modalName"></span></p>
            <p><strong>Program Studi:</strong> <span id="modalProdi"></span></p>
            <p><strong>No. HP:</strong> <span id="modalPhone"></span></p>
            <p><strong>Status:</strong> <span id="modalStatus"></span></p>

            <div class="mt-4 text-right">
                <button id="closeModal"
                    class="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">Tutup</button>
            </div>
        </div>
    </div>

    @push('scripts')
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const modal = document.getElementById("detailModal");
            const closeModal = document.getElementById("closeModal");

            document.querySelectorAll(".detailBtn").forEach(btn => {
                btn.addEventListener("click", function () {
                    let id = this.dataset.id;

                    fetch(`/admin/pendaftaran-email/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            document.getElementById("modalName").innerText = data.first_name + " " + data.last_name;
                            document.getElementById("modalProdi").innerText = data.program_studi ?? "-";
                            document.getElementById("modalPhone").innerText = data.phone ?? "-";
                            document.getElementById("modalStatus").innerText = data.status;

                            modal.classList.remove("hidden");
                            modal.classList.add("flex");
                        });
                });
            });

            closeModal.addEventListener("click", function () {
                modal.classList.add("hidden");
                modal.classList.remove("flex");
            });
        });
    </script>
    @endpush
</x-app-layout>