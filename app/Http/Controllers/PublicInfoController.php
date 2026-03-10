<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use App\Models\Event;
use App\Models\Document;
use App\Models\Gallery;
use App\Models\Dosen;
use App\Models\Alumni;
use App\Models\Lowongan;
use App\Models\TentangKami;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicInfoController extends Controller
{
    /**
     * Display Profil STIKes
     */
    public function profilStikes()
    {
        $data = TentangKami::where('type', 'profil')->where('is_active', 1)->first();
        $visiMisi = TentangKami::where('type', 'visi_misi')->where('is_active', 1)->first();
        return Inertia::render('Frontend/Tentang/Profil', [
            'data' => $data,
            'visiMisi' => $visiMisi
        ]);
    }

    /**
     * Display Sambutan Ketua
     */
    public function sambutanKetua()
    {
        $data = TentangKami::where('type', 'sambutan')->where('is_active', 1)->first();
        return Inertia::render('Frontend/Tentang/Sambutan', ['data' => $data]);
    }

    /**
     * Display Visi & Misi
     */
    public function visiMisi()
    {
        $data = TentangKami::where('type', 'visi_misi')->where('is_active', 1)->first();
        return Inertia::render('Frontend/Tentang/VisiMisi', ['data' => $data]);
    }

    /**
     * Display Sejarah Institusi
     */
    public function sejarah()
    {
        $data = TentangKami::where('type', 'sejarah')->where('is_active', 1)->first();
        return Inertia::render('Frontend/Tentang/Sejarah', ['data' => $data]);
    }

    /**
     * Display Struktur Organisasi
     */
    public function strukturOrganisasi()
    {
        $data = TentangKami::where('type', 'struktur')->where('is_active', 1)->first();
        return Inertia::render('Frontend/Tentang/Struktur', ['data' => $data]);
    }

    // ================== AKADEMIK ==================
    public function farmasi() { 
        $programData = \App\Models\ProgramStudi::where('slug', 's1-farmasi')->firstOrFail();
        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', ['programData' => $programData]); 
    }
    public function gizi() { 
        $programData = \App\Models\ProgramStudi::where('slug', 's1-gizi')->firstOrFail();
        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', ['programData' => $programData]); 
    }
    public function kebidanan() { 
        $programData = \App\Models\ProgramStudi::where('slug', 'd3-kebidanan')->firstOrFail();
        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', ['programData' => $programData]); 
    }
    public function kalenderAkademik() { 
        $kalenders = \App\Models\KalenderAkademik::where('is_active', 1)
                        ->orderBy('order')
                        ->get()
                        ->groupBy('semester');
                        
        return Inertia::render('Frontend/Akademik/Kalender', [
            'kalenders' => $kalenders
        ]); 
    }

    // ================== UNIT LEMBAGA ==================
    public function laboratorium() { 
        $fasilitasData = \App\Models\Fasilitas::where('type', 'Laboratorium')->where('is_active', 1)->orderBy('order')->first();
        return Inertia::render('Frontend/Akademik/Laboratorium', ['fasilitasData' => $fasilitasData]); 
    }
    public function perpustakaan() { 
        $fasilitasData = \App\Models\Fasilitas::where('type', 'Perpustakaan')->where('is_active', 1)->orderBy('order')->first();
        return Inertia::render('Frontend/Akademik/Perpustakaan', ['fasilitasData' => $fasilitasData]); 
    }
    public function uppm() { 
        $fasilitasData = \App\Models\Fasilitas::where('type', 'UPPM')->where('is_active', 1)->orderBy('order')->first();
        return Inertia::render('Frontend/UPPM', ['fasilitasData' => $fasilitasData]); 
    }
    public function upmi() { 
        $fasilitasData = \App\Models\Fasilitas::where('type', 'UPMI')->where('is_active', 1)->orderBy('order')->first();
        return Inertia::render('Frontend/UPMI', ['fasilitasData' => $fasilitasData]); 
    }

    /**
     * Display a listing of Pengumuman (Announcements).
     */
    public function pengumuman(Request $request)
    {
        $pengumumans = Pengumuman::where('is_active', 1)
            ->latest()
            ->paginate(10);

        return Inertia::render('Frontend/Pengumuman', [
            'pengumumans' => $pengumumans,
        ]);
    }

    /**
     * Display a single Pengumuman.
     */
    public function pengumumanShow($slug)
    {
        $pengumuman = Pengumuman::where('slug', $slug)
            ->where('is_active', 1)
            ->firstOrFail();

        $recentPengumumans = Pengumuman::where('is_active', 1)
            ->where('id', '!=', $pengumuman->id)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Frontend/PengumumanDetail', [
            'pengumuman' => $pengumuman,
            'recentPengumumans' => $recentPengumumans,
        ]);
    }

    /**
     * Display a listing of Events.
     */
    public function event(Request $request)
    {
        $events = Event::where('is_published', 1)
            ->orderBy('start_date', 'asc')
            ->paginate(9);

        return Inertia::render('Frontend/Event', [
            'events' => $events,
        ]);
    }

    /**
     * Display a single Event.
     */
    public function eventShow($slug)
    {
        $event = Event::where('slug', $slug)
            ->where('is_published', 1)
            ->firstOrFail();

        $upcomingEvents = Event::where('is_published', 1)
            ->where('id', '!=', $event->id)
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get();

        return Inertia::render('Frontend/EventDetail', [
            'event' => $event,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }

    /**
     * Display a listing of Documents (Unduhan).
     */
    public function dokumen(Request $request)
    {
        $query = Document::where('is_active', 1);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $documents = $query->latest()->paginate(12);
        
        // Get unique categories for filter
        $categories = Document::where('is_active', 1)
            ->whereNotNull('category')
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Frontend/Dokumen', [
            'documents' => $documents,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
        ]);
    }

    /**
     * Display a listing of Galleries.
     */
    public function galeri(Request $request)
    {
        $query = Gallery::where('is_active', 1);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $galleries = $query->latest()->paginate(12);

        // Get unique categories for filter
        $categories = Gallery::where('is_active', 1)
            ->whereNotNull('category')
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Frontend/Galeri', [
            'galleries' => $galleries,
            'categories' => $categories,
            'filters' => $request->only(['category']),
        ]);
    }

    /**
     * Display Dosen (Lecturers directory).
     */
    public function dosen(Request $request)
    {
        $query = Dosen::where('is_active', 1)->orderBy('order')->orderBy('name');

        if ($request->filled('prodi')) {
            $query->where('prodi', $request->prodi);
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $dosens = $query->get();
        $prodiList = Dosen::where('is_active', 1)->select('prodi')->distinct()->orderBy('prodi')->pluck('prodi');

        return Inertia::render('Frontend/Dosen', [
            'dosens' => $dosens,
            'prodiList' => $prodiList,
            'filters' => $request->only(['prodi', 'search']),
        ]);
    }

    /**
     * Display Alumni directory.
     */
    public function alumni(Request $request)
    {
        $query = Alumni::where('is_active', 1)->orderBy('name');

        if ($request->filled('tahun_lulus')) {
            $query->where('tahun_lulus', $request->tahun_lulus);
        }
        if ($request->filled('prodi')) {
            $query->where('program_studi', $request->prodi);
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $alumnis = $query->paginate(12);

        $tahunList = Alumni::select('tahun_lulus')->distinct()->orderByDesc('tahun_lulus')->pluck('tahun_lulus');
        $prodiList = Alumni::select('program_studi')->distinct()->orderBy('program_studi')->pluck('program_studi');

        return Inertia::render('Frontend/Alumni', [
            'alumnis' => $alumnis,
            'tahunList' => $tahunList,
            'prodiList' => $prodiList,
            'filters' => $request->only(['tahun_lulus', 'prodi', 'search']),
        ]);
    }

    /**
     * Display Lowongan Kerja (Job Vacancies).
     */
    public function lowongan(Request $request)
    {
        $query = Lowongan::where('is_active', 1)->latest();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }

        $lowongans = $query->paginate(9);

        return Inertia::render('Frontend/Lowongan', [
            'lowongans' => $lowongans,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Display Kerjasama (Partnerships).
     */
    public function kerjasama(Request $request)
    {
        // Kerjasama belum memiliki model sendiri, tampilkan halaman statis
        return Inertia::render('Frontend/Kerjasama', [
            'kerjasamas' => collect(),
        ]);
    }
}
