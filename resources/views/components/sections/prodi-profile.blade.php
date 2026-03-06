{{--
    Section: PRODI-PROFILE
    Detailed program studi profile with description, accreditation badge, and head of program card.
    Replaces: kebidanan/profile, farmasi/profile, gizi/profile
    
    JSON keys: title, program_details {description, accreditation_status},
               head_of_program {name, job_title, photo_url, greeting_paragraphs []}
--}}
@php $data = $section->decoded_content ?? $data ?? $content ?? []; @endphp

<section class="py-20 bg-slate-50" id="profil-prodi">
    <div class="container px-6 mx-auto lg:px-12">

        {{-- Section Title --}}
        <div class="mb-16 text-center">
            <h2 class="inline-flex items-center overflow-hidden rounded-lg shadow-lg">
                <div class="flex items-center justify-center bg-orange-500 w-14 h-14">
                    <img src="{{ asset('assets/img/icon/element.svg') }}" alt="Icon" class="w-8 h-8">
                </div>
                <span class="flex items-center px-6 text-xl font-bold tracking-wide text-white uppercase bg-gray-800 h-14 lg:text-2xl">
                    {{ $data['title'] ?? '' }}
                </span>
            </h2>
            @if(!empty($data['subtitle']))
                <p class="max-w-2xl mx-auto mt-3 text-lg text-gray-600">{{ $data['subtitle'] }}</p>
            @endif
        </div>

        {{-- Description & Accreditation --}}
        @if(!empty($data['program_details']))
        <div class="max-w-5xl p-8 mx-auto mb-16 bg-white shadow-sm rounded-2xl">
            <div class="space-y-6">
                <p class="text-lg leading-relaxed text-gray-700">
                    {{ $data['program_details']['description'] ?? 'Deskripsi program studi belum tersedia.' }}
                </p>

                @if(!empty($data['program_details']['accreditation_status']))
                <div class="pt-4">
                    <span class="inline-block px-4 py-2 text-sm font-semibold text-teal-800 bg-teal-100 rounded-full">
                        Akreditasi: {{ $data['program_details']['accreditation_status'] }}
                    </span>
                </div>
                @endif
            </div>
        </div>
        @endif

        {{-- Head of Program Card --}}
        @if(!empty($data['head_of_program']))
        <div class="max-w-5xl mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
            <div class="grid grid-cols-1 md:grid-cols-3">
                <div class="flex items-center justify-center p-8 md:col-span-1 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div class="w-full relative pb-[125%] md:pb-0 md:h-full">
                        <img src="{{ asset($data['head_of_program']['photo_url'] ?? 'placeholder.jpg') }}"
                            alt="{{ $data['head_of_program']['name'] ?? 'Foto Kaprodi' }}"
                            class="absolute inset-0 object-cover w-full h-full shadow-md rounded-xl ring-4 ring-white ring-offset-4 ring-offset-gray-100">
                    </div>
                </div>

                <div class="p-8 md:col-span-2 md:p-10">
                    <p class="text-base font-semibold text-orange-600">
                        {{ $data['head_of_program']['job_title'] ?? 'Ketua Program Studi' }}
                    </p>
                    <h3 class="mt-1 text-2xl font-bold text-gray-900">
                        {{ $data['head_of_program']['name'] ?? '' }}
                    </h3>

                    <hr class="my-6 border-gray-200">

                    <div class="space-y-4 leading-relaxed text-gray-600">
                        @if(!empty($data['head_of_program']['greeting_paragraphs']))
                            @foreach($data['head_of_program']['greeting_paragraphs'] as $paragraph)
                                <p>{{ $paragraph }}</p>
                            @endforeach
                        @else
                            <p>Sambutan dari Ketua Program Studi akan segera ditampilkan di sini.</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>
        @endif
    </div>
</section>
