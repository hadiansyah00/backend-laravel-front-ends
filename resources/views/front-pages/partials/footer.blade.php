{{-- Footer Section --}}
<footer class="text-white bg-purple-800" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="container px-6 pt-16 pb-8 mx-auto">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">

            {{-- Kolom Kiri: PEREMPUAN AMAN --}}
            <div class="space-y-4">
                <h3 class="text-xl font-bold">PEREMPUAN AMAN</h3>
                <div class="space-y-3 text-purple-200">
                    <div class="flex items-start gap-3">
                        <svg class="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.24.635-.431l.002-.002.003-.002a6.705 6.705 0 002.11-1.888A11.357 11.357 0 0015 11.07V10c0-1.138-.421-2.21-1.155-3.001l-.002-.003C13.123 6.199 12.11 6 11 6H9c-1.11 0-2.123.2-2.845.998l-.002.003C5.42 7.79 5 8.862 5 10v1.07c0 1.518.425 2.973 1.158 4.254.733 1.282 1.636 2.408 2.532 3.385l.002.002.003.003.002.002a6.705 6.705 0 002.11 1.888zM10 18C8.169 16.473 7 14.396 7 12.5V10c0-.665.234-1.284.649-1.764C7.942 7.843 8.452 7.5 9 7.5h2c.548 0 1.058.343 1.351.836.415.48.649 1.099.649 1.764v2.5c0 1.896-1.169 3.973-3 5.5z"
                                clip-rule="evenodd" />
                            <path d="M10 11a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                        <span>Jl. Sempur Kaler No.6, RT.04/RW.01, Sempur, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat
                            16129</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-1.528a13.5 13.5 0 01-13.5-13.5V3.5z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>+62 811 320 2062</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                            <path
                                d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                        </svg>
                        <span>rumah-pa@perempuanaman.or.id</span>
                    </div>
                </div>
            </div>

            {{-- Kolom Tengah: Logo, Sosial Media & Donasi --}}
            <div class="flex flex-col items-center text-center">
                <img src="{{ asset('path/to/your/logo.svg') }}" alt="Logo PEREMPUAN AMAN" class="h-16 mb-2">
                <p class="mb-4 font-semibold">PEREMPUAN AMAN</p>

                <div class="flex justify-center mb-6 space-x-4">
                    <a href="#" class="text-white hover:text-purple-300"><span class="sr-only">Facebook</span><svg
                            class="w-8 h-8 p-1 bg-blue-600 rounded-full" fill="currentColor" viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clip-rule="evenodd" />
                        </svg></a>
                    <a href="#" class="text-white hover:text-purple-300"><span class="sr-only">Instagram</span><svg
                            class="w-8 h-8 p-1 bg-pink-600 rounded-full" fill="currentColor" viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 11.172 2h.098zM12 0C9.528 0 9.176.01 8.148.057c-1.11.05-1.877.227-2.555.497a6.694 6.694 0 00-2.316 1.62c-.78.78-1.174 1.536-1.395 2.316C1.72 5.27 1.544 6.037 1.495 7.148.01 8.176 0 8.528 0 11s.01 2.824.057 3.852c.05 1.11.227 1.877.497 2.555a6.694 6.694 0 001.395 2.316c.78.78 1.536 1.174 2.316 1.395.678.27 1.445.447 2.555.497C8.176 21.99 8.528 22 11 22s2.824-.01 3.852-.057c1.11-.05 1.877-.227 2.555-.497a6.694 6.694 0 002.316-1.395c.78-.78 1.174-1.536 1.395-2.316.27-.678.447-1.445.497-2.555C21.99 13.824 22 13.472 22 11s-.01-2.824-.057-3.852c-.05-1.11-.227-1.877-.497-2.555a6.694 6.694 0 00-1.395-2.316c-.78-.78-1.536-1.174-2.316-1.395C14.73 1.72 13.963 1.544 12.852 1.495C11.824 1.01 11.472 1 11 1h.098z"
                                clip-rule="evenodd" />
                            <path
                                d="M12 6.845a5.155 5.155 0 100 10.31 5.155 5.155 0 000-10.31zM12 15a3 3 0 110-6 3 3 0 010 6z" />
                            <path d="M16.845 5.25a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" />
                        </svg></a>
                    <a href="#" class="text-white hover:text-purple-300"><span class="sr-only">Twitter</span><svg
                            class="w-8 h-8 p-1 rounded-full bg-sky-500" fill="currentColor" viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path
                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg></a>
                    <a href="#" class="text-white hover:text-purple-300"><span class="sr-only">YouTube</span><svg
                            class="w-8 h-8 p-1 bg-red-600 rounded-full" fill="currentColor" viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.781 22 12 22 12s0 3.219-.42 4.814a2.506 2.506 0 01-1.768 1.768c-1.595.42-7.812.42-7.812.42s-6.217 0-7.812-.42a2.506 2.506 0 01-1.768-1.768C2 15.219 2 12 2 12s0-3.219.42-4.814a2.506 2.506 0 011.768-1.768C5.783 5 12 5 12 5s6.217 0 7.812.418zM9.75 15.25V8.75l6 3.25-6 3.25z"
                                clip-rule="evenodd" />
                        </svg></a>
                    <a href="#" class="text-white hover:text-purple-300"><span class="sr-only">LinkedIn</span><svg
                            class="w-8 h-8 p-1 bg-blue-700 rounded-full" fill="currentColor" viewBox="0 0 24 24"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.71zM5.368 7.161a1.724 1.724 0 100-3.448 1.724 1.724 0 000 3.448zM6.623 16.338H4.11v-8.59h2.513v8.59zM17.638 2H6.362A4.362 4.362 0 002 6.362v11.276A4.362 4.362 0 006.362 22h11.276A4.362 4.362 0 0022 17.638V6.362A4.362 4.362 0 0017.638 2z"
                                clip-rule="evenodd" />
                        </svg></a>
                </div>

                <a href="#"
                    class="inline-block w-full max-w-xs px-8 py-3 mt-4 text-lg font-bold text-center text-purple-800 transition bg-white rounded-full hover:bg-purple-100">
                    Donasi
                </a>
            </div>

            {{-- Kolom Kanan: AMAN --}}
            <div class="space-y-4 md:text-right">
                <h3 class="text-xl font-bold">AMAN</h3>
                <div class="space-y-3 text-purple-200">
                    <div class="flex items-start gap-3 md:justify-end">
                        <svg class="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.24.635-.431l.002-.002.003-.002a6.705 6.705 0 002.11-1.888A11.357 11.357 0 0015 11.07V10c0-1.138-.421-2.21-1.155-3.001l-.002-.003C13.123 6.199 12.11 6 11 6H9c-1.11 0-2.123.2-2.845.998l-.002.003C5.42 7.79 5 8.862 5 10v1.07c0 1.518.425 2.973 1.158 4.254.733 1.282 1.636 2.408 2.532 3.385l.002.002.003.003.002.002a6.705 6.705 0 002.11 1.888zM10 18C8.169 16.473 7 14.396 7 12.5V10c0-.665.234-1.284.649-1.764C7.942 7.843 8.452 7.5 9 7.5h2c.548 0 1.058.343 1.351.836.415.48.649 1.099.649 1.764v2.5c0 1.896-1.169 3.973-3 5.5z"
                                clip-rule="evenodd" />
                            <path d="M10 11a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                        <span class="md:text-right">Jl. Tebet Timur Dalam Raya No.11 A, RT.8/RW.4, Tebet Tim., Kec.
                            Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12820</span>
                    </div>
                    <div class="flex items-center gap-3 md:justify-end">
                        <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-1.528a13.5 13.5 0 01-13.5-13.5V3.5z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>(021) 8297954</span>
                    </div>
                </div>
            </div>
        </div>

        {{-- Copyright & Back to Top Button --}}
        <div class="pt-8 mt-12 text-center text-purple-300 border-t border-purple-700">
            <p>&copy; <span x-text="new Date().getFullYear()"></span> PEREMPUAN AMAN | Powered by PEREMPUAN AMAN</p>
        </div>
    </div>

    {{-- Tombol Back to Top --}}
    <div x-data="{ shown: false }" x-intersect.once="shown = true"
        x-init="window.addEventListener('scroll', () => { shown = window.scrollY > 300 })" x-show="shown"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform translate-y-2"
        x-transition:enter-end="opacity-100 transform translate-y-0"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 transform translate-y-0"
        x-transition:leave-end="opacity-0 transform translate-y-2" class="fixed bottom-6 right-6" x-cloak>
        <button @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
            class="p-2 text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    </div>
</footer>