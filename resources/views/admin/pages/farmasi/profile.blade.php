<section class="py-20 bg-slate-50" id="profil-prodi">
    <div class="container px-6 mx-auto lg:px-12">

        {{-- Judul dan Subjudul Section --}}
        <div class="mb-16 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span
                    class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $content['title'] ?? '' }}
                </span>
            </h2>
            <p class="max-w-2xl mx-auto mt-3 text-lg text-gray-600">
                Mengenal lebih dekat program studi kami, mulai dari visi, misi, hingga pimpinan program studi.
            </p>
        </div>

        {{-- Deskripsi dan Akreditasi --}}
        <div class="max-w-5xl p-8 mx-auto mb-16 bg-white shadow-sm rounded-2xl">
            <div class="space-y-6">
                @if(!empty($content['program_details']['description']))
                @foreach($content['program_details']['description'] as $paragraph)
                <p class="text-lg leading-relaxed text-gray-700">{{ $paragraph }}</p>
                @endforeach
                @else
                <p class="text-lg leading-relaxed text-gray-700">
                    Deskripsi program studi belum tersedia. Silakan hubungi administrasi untuk informasi lebih lanjut.
                </p>
                @endif

                @if(!empty($content['program_details']['accreditation_status']))
                <div class="pt-4">
                    <span class="inline-block px-4 py-2 text-sm font-semibold text-teal-800 bg-teal-100 rounded-full">
                        Akreditasi: {{ $content['program_details']['accreditation_status'] }}
                    </span>
                </div>
                @endif
            </div>
        </div>

        {{-- Kartu Profil Kaprodi --}}
        @if(!empty($content['head_of_program']))
        <div class="max-w-5xl mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
            <div class="grid grid-cols-1 md:grid-cols-3">

                {{-- Kolom Foto --}}
                <div
                    class="flex items-center justify-center p-8 md:col-span-1 bg-gradient-to-br from-gray-100 to-gray-200">
                    {{-- Container untuk menjaga aspect ratio 4:5 --}}
                    <div class="w-full relative pb-[125%] md:pb-0 md:h-full"> {{-- pb-[125%] = 5/4 * 100% --}}
                        <img src="{{ asset($content['head_of_program']['photo_url'] ?? 'placeholder.jpg') }}"
                            alt="{{ $content['head_of_program']['name'] ?? 'Foto Kaprodi' }}"
                            class="absolute inset-0 object-cover w-full h-full shadow-md rounded-xl ring-4 ring-white ring-offset-4 ring-offset-gray-100">
                    </div>
                </div>

                {{-- Kolom Data Kaprodi & Sambutan --}}
                <div class="p-8 md:col-span-2 md:p-10">
                    <div>
                        <p class="text-base font-semibold text-orange-600">
                            {{ $content['head_of_program']['job_title'] ?? 'Ketua Program Studi' }}
                        </p>
                        <h3 class="mt-1 text-2xl font-bold text-gray-900">
                            {{ $content['head_of_program']['name'] ?? 'Nama Kaprodi' }}
                        </h3>

                        {{-- Garis Pemisah --}}
                        <hr class="my-6 border-gray-200">

                        {{-- Paragraf Sambutan --}}
                        <div class="space-y-4 leading-relaxed text-gray-600">
                            @if(!empty($content['head_of_program']['greeting_paragraphs']))
                            @foreach($content['head_of_program']['greeting_paragraphs'] as $paragraph)
                            <p>{{ $paragraph }}</p>
                            @endforeach
                            @else
                            <p>Sambutan dari Ketua Program Studi akan segera ditampilkan di sini.</p>
                            @endif
                        </div>
                    </div>
                </div>

            </div>
        </div>
        @endif

    </div>
</section>