<div x-data="{
    showButton: false,
    chatOpen: false
}" x-init="window.addEventListener('scroll', () => { showButton = (window.scrollY > 300) })"
    @keydown.escape.window="chatOpen = false" {{-- PERUBAHAN DI SINI: menaikkan posisi dari bawah --}}
    class="fixed z-50 bottom-24 right-8">

    <template x-if="showButton">
        <div x-show="showButton" x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 transform translate-y-4"
            x-transition:enter-end="opacity-100 transform translate-y-0"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100 transform translate-y-0"
            x-transition:leave-end="opacity-0 transform translate-y-4">

            {{-- Jendela Chat --}}
            <div x-show="chatOpen" x-transition @click.outside="chatOpen = false"
                class="absolute right-0 flex flex-col overflow-hidden bg-white border border-gray-200 shadow-2xl bottom-20 w-80 rounded-xl">

                {{-- Header Chat --}}
                <div class="flex items-center justify-between p-4 text-white bg-orange-600">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <img class="w-10 h-10 p-1 bg-orange-200 rounded-full"
                                src="{{ asset('assets/img/icon/logo_sbh.png') }}" alt="Avatar Admin">
                            <span
                                class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-gray-800"></span>
                        </div>
                        <div>
                            <p class="text-sm text-gray-300">Mengobrol dengan</p>
                            <p class="font-semibold">Halo STIKes</p>
                        </div>
                    </div>
                    <button @click="chatOpen = false" class="text-gray-400 hover:text-white">&times;</button>
                </div>

                {{-- Isi Pesan --}}
                <div class="h-64 p-4 overflow-y-auto bg-gray-50">
                    <div class="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg">
                        Halo, <br>
                        Dengan Layanan Bantuan STIKes Bogor Husada. Ada yang bisa kami bantu hari ini?
                        <div class="mt-1 text-xs text-right text-gray-500">- Admin</div>
                    </div>
                </div>

                {{-- Area Input Pesan (Link ke WhatsApp) --}}
                <div class="p-4 bg-white border-t">
                    <form action="https://api.whatsapp.com/send" method="get" target="_blank">
                        <input type="hidden" name="phone" value="6281110111560">
                        <textarea name="text"
                            class="w-full p-2 text-sm border rounded-md focus:ring-orange-500 focus:border-orange-500"
                            rows="2" placeholder="Ketik pesanmu disini..."></textarea>
                        <button type="submit"
                            class="w-full px-4 py-2 mt-2 font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700">
                            KIRIM
                        </button>
                    </form>
                </div>
            </div>

            {{-- Tombol Toggle Awal (Floating Button) --}}
            <button @click="chatOpen = !chatOpen"
                class="flex items-center justify-center w-16 h-16 text-white transition-transform duration-300 bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 hover:scale-110">
                {{-- Ikon close saat chat terbuka --}}
                <svg x-show="chatOpen" x-transition class="w-8 h-8" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
                {{-- Ikon chat saat chat tertutup --}}
                <svg x-show="!chatOpen" x-transition class="w-8 h-8" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                    </path>
                </svg>
            </button>
        </div>
    </template>
</div>