<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Models\Article;
use App\Models\Category;
use App\Models\Document;
use App\Models\Dosen;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Lowongan;
use App\Models\Pengumuman;
use App\Models\TentangKami;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PublicInfoController extends Controller
{
    public function __construct()
    {
        Inertia::setRootView('app-inertia');
    }

    /**
     * Display Profil STIKes
     */
    public function profilStikes()
    {
        $data = Cache::remember('tentang_profil', 3600, function() {
            return TentangKami::where('type', 'profil')->where('is_active', 1)->first();
        });
        $visiMisi = Cache::remember('tentang_visi_misi', 3600, function() {
            return TentangKami::where('type', 'visi_misi')->where('is_active', 1)->first();
        });
        return Inertia::render('Frontend/Tentang/Profil', [
            'data' => $data,
            'visiMisi' => $visiMisi
        ])->withViewData('seo', [
            'title'       => 'Profil - STIKes Bogor Husada',
            'description' => 'Profil lengkap STIKes Bogor Husada, sekolah tinggi ilmu kesehatan terkemuka di Bogor yang mencetak tenaga medis profesional.',
            'keywords'    => 'profil STIKes Bogor Husada, tentang kampus kesehatan bogor, sejarah stikes husada',
        ]);
    }

    /**
     * Display Sambutan Ketua
     */
    public function sambutanKetua()
    {
        $data = Cache::remember('tentang_sambutan', 3600, function() {
            return TentangKami::where('type', 'sambutan')->where('is_active', 1)->first();
        });
        return Inertia::render('Frontend/Tentang/Sambutan', ['data' => $data])
            ->withViewData('seo', [
                'title'       => 'Sambutan Ketua - STIKes Bogor Husada',
                'description' => 'Sambutan Ketua STIKes Bogor Husada mengenai visi, misi, dan komitmen institusi dalam mencetak tenaga kesehatan yang profesional.',
                'keywords'    => 'sambutan ketua STIKes Bogor Husada, kata sambutan kampus kesehatan',
            ]);
    }

    /**
     * Display Visi & Misi
     */
    public function visiMisi()
    {
        $data = Cache::remember('tentang_visi_misi', 3600, function() {
            return TentangKami::where('type', 'visi_misi')->where('is_active', 1)->first();
        });
        return Inertia::render('Frontend/Tentang/VisiMisi', ['data' => $data])
            ->withViewData('seo', [
                'title'       => 'Visi & Misi - STIKes Bogor Husada',
                'description' => 'Visi dan Misi STIKes Bogor Husada sebagai institusi pendidikan tinggi kesehatan unggulan di Bogor.',
                'keywords'    => 'visi misi STIKes Bogor Husada, tujuan kampus kesehatan bogor',
            ]);
    }

    /**
     * Display Sejarah Institusi
     */
    public function sejarah()
    {
        $data = Cache::remember('tentang_sejarah', 3600, function() {
            return TentangKami::where('type', 'sejarah')->where('is_active', 1)->first();
        });
        return Inertia::render('Frontend/Tentang/Sejarah', ['data' => $data])
            ->withViewData('seo', [
                'title'       => 'Sejarah - STIKes Bogor Husada',
                'description' => 'Sejarah pendirian dan perkembangan STIKes Bogor Husada dari awal hingga saat ini.',
                'keywords'    => 'sejarah STIKes Bogor Husada, asal usul kampus kesehatan bogor',
            ]);
    }

    /**
     * Display Struktur Organisasi
     */
    public function strukturOrganisasi()
    {
        $data = Cache::remember('tentang_struktur', 3600, function() {
            return TentangKami::where('type', 'struktur')->where('is_active', 1)->first();
        });
        return Inertia::render('Frontend/Tentang/Struktur', ['data' => $data])
            ->withViewData('seo', [
                'title'       => 'Struktur Organisasi - STIKes Bogor Husada',
                'description' => 'Struktur organisasi dan tata kelola STIKes Bogor Husada.',
                'keywords'    => 'struktur organisasi STIKes Bogor Husada, pimpinan kampus kesehatan bogor',
            ]);
    }

    // ================== AKADEMIK ==================
    public function farmasi()
    {
        $programData = Cache::remember('prodi_s1_farmasi', 3600, function() {
            return \App\Models\ProgramStudi::where('slug', 's1-farmasi')->firstOrFail();
        });
        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', ['programData' => $programData])
            ->withViewData('seo', [
                'title'       => 'S1 Farmasi - STIKes Bogor Husada',
                'description' => 'Program Studi S1 Farmasi STIKes Bogor Husada. Terakreditasi dan siap mencetak tenaga apoteker profesional.',
                'keywords'    => 'S1 Farmasi, program studi farmasi bogor, STIKes Bogor Husada, kuliah farmasi',
            ]);
    }
    public function gizi()
    {
        $programData = Cache::remember('prodi_s1_gizi', 3600, function() {
            return \App\Models\ProgramStudi::where('slug', 's1-gizi')->firstOrFail();
        });
        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', ['programData' => $programData])
            ->withViewData('seo', [
                'title'       => 'S1 Gizi - STIKes Bogor Husada',
                'description' => 'Program Studi S1 Gizi STIKes Bogor Husada. Mencetak ahli gizi profesional dengan kurikulum berbasis kompetensi.',
                'keywords'    => 'S1 Gizi, program studi gizi bogor, STIKes Bogor Husada, kuliah gizi',
            ]);
    }
    public function kebidanan()
    {
        $programData = Cache::remember('prodi_d3_kebidanan', 3600, function() {
            return \App\Models\ProgramStudi::where('slug', 'd3-kebidanan')->firstOrFail();
        });
        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', ['programData' => $programData])
            ->withViewData('seo', [
                'title'       => 'D3 Kebidanan - STIKes Bogor Husada',
                'description' => 'Program Studi D3 Kebidanan STIKes Bogor Husada. Pendidikan bidan profesional dengan fasilitas praktik lengkap.',
                'keywords'    => 'D3 Kebidanan, program studi kebidanan bogor, STIKes Bogor Husada, kuliah kebidanan',
            ]);
    }
    public function showProgramStudi($slug)
    {
        $programData = Cache::remember('prodi_' . $slug, 3600, function() use ($slug) {
            return \App\Models\ProgramStudi::where('slug', $slug)->firstOrFail();
        });

        return Inertia::render('Frontend/Akademik/ProgramStudiDetail', [
            'programData' => $programData
        ])->withViewData('seo', [
            'title'       => $programData->name . ' - STIKes Bogor Husada',
            'description' => $programData->description ? \Illuminate\Support\Str::limit(strip_tags($programData->description), 160) : 'Program Studi ' . $programData->name . ' di STIKes Bogor Husada. Terakreditasi dan siap mencetak tenaga kesehatan profesional.',
            'keywords'    => $programData->name . ', program studi kesehatan, STIKes Bogor Husada, ' . ($programData->gelar ?? ''),
            'image'       => $programData->image ? (str_starts_with($programData->image, 'http') ? $programData->image : asset('storage/' . $programData->image)) : null,
        ]);
    }
    public function kalenderAkademik()
    {
        $kalenders = Cache::remember('kalender_akademik', 3600, function() {
            return \App\Models\KalenderAkademik::where('is_active', 1)
                ->orderBy('order')
                ->get()
                ->groupBy('semester');
        });

        return Inertia::render('Frontend/Akademik/Kalender', [
            'kalenders' => $kalenders
        ])->withViewData('seo', [
            'title'       => 'Kalender Akademik - STIKes Bogor Husada',
            'description' => 'Kalender akademik STIKes Bogor Husada. Jadwal perkuliahan, UTS, UAS, dan kegiatan akademik lainnya.',
            'keywords'    => 'kalender akademik STIKes Bogor Husada, jadwal kuliah, jadwal ujian',
        ]);
    }

    // ================== UNIT LEMBAGA ==================
    public function laboratorium()
    {
        $fasilitasData = Cache::remember('fasilitas_laboratorium', 3600, function() {
            return \App\Models\Fasilitas::where('type', 'Laboratorium')->where('is_active', 1)->orderBy('order')->first();
        });
        return Inertia::render('Frontend/Akademik/Laboratorium', ['fasilitasData' => $fasilitasData])
            ->withViewData('seo', [
                'title'       => 'Laboratorium - STIKes Bogor Husada',
                'description' => 'Fasilitas laboratorium modern STIKes Bogor Husada untuk mendukung praktikum mahasiswa kesehatan.',
                'keywords'    => 'laboratorium STIKes Bogor Husada, fasilitas kampus kesehatan, lab praktikum',
            ]);
    }
    public function perpustakaan()
    {
        $fasilitasData = Cache::remember('fasilitas_perpustakaan', 3600, function() {
            return \App\Models\Fasilitas::where('type', 'Perpustakaan')->where('is_active', 1)->orderBy('order')->first();
        });
        return Inertia::render('Frontend/Akademik/Perpustakaan', ['fasilitasData' => $fasilitasData])
            ->withViewData('seo', [
                'title'       => 'Perpustakaan - STIKes Bogor Husada',
                'description' => 'Perpustakaan STIKes Bogor Husada dengan koleksi buku dan jurnal kesehatan yang lengkap.',
                'keywords'    => 'perpustakaan STIKes Bogor Husada, koleksi buku kesehatan, jurnal ilmiah',
            ]);
    }
    public function uppm()
    {
        $fasilitasData = Cache::remember('fasilitas_uppm', 3600, function() {
            return \App\Models\Fasilitas::where('type', 'UPPM')->where('is_active', 1)->orderBy('order')->first();
        });
        return Inertia::render('Frontend/UnitFasilitas/Uppm', ['fasilitasData' => $fasilitasData])
            ->withViewData('seo', [
                'title'       => 'UPPM - STIKes Bogor Husada',
                'description' => 'Unit Penelitian dan Pengabdian Masyarakat (UPPM) STIKes Bogor Husada.',
                'keywords'    => 'UPPM STIKes Bogor Husada, penelitian kesehatan, pengabdian masyarakat',
            ]);
    }
    public function upmi()
    {
        $fasilitasData = Cache::remember('fasilitas_upmi', 3600, function() {
            return \App\Models\Fasilitas::where('type', 'UPMI')->where('is_active', 1)->orderBy('order')->first();
        });
        return Inertia::render('Frontend/UnitFasilitas/Upmi', ['fasilitasData' => $fasilitasData])
            ->withViewData('seo', [
                'title'       => 'UPMI - STIKes Bogor Husada',
                'description' => 'Unit Penjaminan Mutu Internal (UPMI) STIKes Bogor Husada.',
                'keywords'    => 'UPMI STIKes Bogor Husada, penjaminan mutu, akreditasi kampus',
            ]);
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
        ])->withViewData('seo', [
            'title'       => 'Pengumuman - STIKes Bogor Husada',
            'description' => 'Daftar pengumuman resmi terbaru dari STIKes Bogor Husada. Informasi akademik, penerimaan mahasiswa baru, dan kegiatan kampus.',
            'keywords'    => 'pengumuman STIKes Bogor Husada, informasi kampus kesehatan, berita akademik',
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
        ])->withViewData('seo', [
            'title'       => $pengumuman->title . ' - Pengumuman STIKes Bogor Husada',
            'description' => \Illuminate\Support\Str::limit(strip_tags($pengumuman->content ?? $pengumuman->title), 160),
            'keywords'    => 'pengumuman ' . $pengumuman->title . ', STIKes Bogor Husada',
            'url'         => url('/pengumuman/' . $pengumuman->slug),
        ]);
    }

    /**
     * Display a listing of Events.
     */
    /**
     * Display a listing of Events.
     */
    public function event(Request $request)
    {
        // UBAH: is_published menjadi is_active sesuai Model
        $events = Event::where('is_active', 1)
            ->orderBy('start_date', 'asc')
            ->paginate(9);

        return Inertia::render('Frontend/Event', [
            'events' => $events,
        ])->withViewData('seo', [
            'title'       => 'Agenda & Kegiatan - STIKes Bogor Husada',
            'description' => 'Jadwal kegiatan, seminar, workshop, dan acara akademik dari STIKes Bogor Husada.',
            'keywords'    => 'agenda kampus, kegiatan STIKes Bogor Husada, seminar kesehatan, workshop kampus',
        ]);
    }

    /**
     * Display a single Event.
     */
    public function eventShow($slug)
    {
        // UBAH: is_published menjadi is_active sesuai Model
        $event = Event::where('slug', $slug)
            ->where('is_active', 1)
            ->firstOrFail();

        $upcomingEvents = Event::where('is_active', 1)
            ->where('id', '!=', $event->id)
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get();

        return Inertia::render('Frontend/EventDetail', [
            'event' => $event,
            'upcomingEvents' => $upcomingEvents,
        ])->withViewData('seo', [
            'title'       => $event->title . ' - Event STIKes Bogor Husada',
            'description' => \Illuminate\Support\Str::limit(strip_tags($event->description ?? $event->title), 160),
            'keywords'    => 'event ' . $event->title . ', kegiatan STIKes Bogor Husada',
            'url'         => url('/event/' . $event->slug),
            'image'       => $event->image ? (str_starts_with($event->image, 'http') ? $event->image : asset('storage/' . $event->image)) : null,
            'type'        => 'article',
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
        ])->withViewData('seo', [
            'title'       => 'Dokumen & Unduhan - STIKes Bogor Husada',
            'description' => 'Download dokumen resmi, formulir, dan berkas penting dari STIKes Bogor Husada.',
            'keywords'    => 'dokumen STIKes Bogor Husada, unduhan formulir, berkas kampus kesehatan',
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
        ])->withViewData('seo', [
            'title'       => 'Galeri Foto - STIKes Bogor Husada',
            'description' => 'Galeri foto kegiatan, fasilitas, dan suasana kampus STIKes Bogor Husada.',
            'keywords'    => 'galeri foto STIKes Bogor Husada, foto kampus kesehatan bogor, dokumentasi kegiatan',
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
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $dosens = $query->get();
        $prodiList = Dosen::where('is_active', 1)->select('prodi')->distinct()->orderBy('prodi')->pluck('prodi');

        return Inertia::render('Frontend/Dosen', [
            'dosens' => $dosens,
            'prodiList' => $prodiList,
            'filters' => $request->only(['prodi', 'search']),
        ])->withViewData('seo', [
            'title'       => 'Dosen & Tenaga Pengajar - STIKes Bogor Husada',
            'description' => 'Daftar dosen dan tenaga pengajar profesional di STIKes Bogor Husada, Bogor.',
            'keywords'    => 'dosen STIKes Bogor Husada, pengajar kampus kesehatan, tenaga pendidik',
        ]);
    }

    /**
     * Display Alumni directory.
     */
    public function alumni(Request $request)
    {
        $query = Alumni::with('programStudi')->where('is_active', 1)->orderBy('name');

        if ($request->filled('tahun_lulus')) {
            $query->where('tahun_lulus', $request->tahun_lulus);
        }
        if ($request->filled('prodi')) {
            $query->whereHas('programStudi', function ($q) use ($request) {
                $q->where('name', $request->prodi);
            });
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $alumnis = $query->paginate(12);

        $tahunList = Alumni::where('is_active', 1)->select('tahun_lulus')->whereNotNull('tahun_lulus')->distinct()->orderByDesc('tahun_lulus')->pluck('tahun_lulus');
        
        $prodiList = \App\Models\ProgramStudi::whereHas('alumni', function ($q) {
            $q->where('is_active', 1);
        })->orderBy('name')->pluck('name');

        return Inertia::render('Frontend/Alumni', [
            'alumnis' => $alumnis,
            'tahunList' => $tahunList,
            'prodiList' => $prodiList,
            'filters' => $request->only(['tahun_lulus', 'prodi', 'search']),
        ])->withViewData('seo', [
            'title'       => 'Alumni - STIKes Bogor Husada',
            'description' => 'Direktori alumni STIKes Bogor Husada. Lihat lulusan terbaik kami yang berkarya di dunia kesehatan.',
            'keywords'    => 'alumni STIKes Bogor Husada, lulusan kampus kesehatan bogor, tracer study',
        ]);
    }

    /**
     * Display Lowongan Kerja (Job Vacancies).
     */
    public function lowongan(Request $request)
    {
        $query = Lowongan::where('is_active', 1)->latest();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $lowongans = $query->paginate(9);

        return Inertia::render('Frontend/Lowongan', [
            'lowongans' => $lowongans,
            'filters' => $request->only(['search']),
        ])->withViewData('seo', [
            'title'       => 'Lowongan Kerja - STIKes Bogor Husada',
            'description' => 'Informasi lowongan kerja dan karir di STIKes Bogor Husada dan mitra kerjasama.',
            'keywords'    => 'lowongan kerja kesehatan, karir STIKes Bogor Husada, rekrutmen tenaga medis',
        ]);
    }

    /**
     * Display Kerjasama (Partnerships).
     */
    public function kerjasama(Request $request)
    {
        $kerjasamas = \App\Models\Kerjasama::where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Frontend/Kerjasama', [
            'kerjasamas' => $kerjasamas,
        ])->withViewData('seo', [
            'title'       => 'Kerjasama & Mitra - STIKes Bogor Husada',
            'description' => 'Daftar mitra kerjasama STIKes Bogor Husada dalam bidang pendidikan, riset, dan pengabdian masyarakat.',
            'keywords'    => 'kerjasama STIKes Bogor Husada, mitra kampus kesehatan, MoU institusi',
        ]);
    }
    // ================== BERITA & ARTIKEL ==================

    /**
     * Display a listing of Berita / Articles.
     */
    // ================== BERITA & ARTIKEL ==================

    /**
     * Display a listing of Berita / Articles.
     */
    public function berita(Request $request)
    {
        // Gunakan 'status' = 'published' sesuai model (ubah jika valuenya beda, misal 'tayang' atau '1')
        // Eager load category dan tags agar query lebih ringan
        $query = Article::with('category')
            ->select(['id', 'category_id', 'title', 'slug', 'excerpt', 'content', 'thumbnail', 'published_at'])
            ->where('status', 'published');

        // Filter pencarian dengan Grouping agar kondisi 'status' tidak bocor
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('content', 'like', '%' . $request->search . '%')
                    ->orWhere('excerpt', 'like', '%' . $request->search . '%');
            });
        }

        // Filter berdasarkan kategori
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Paginate menggunakan published_at dari model
        $articles = $query->latest('published_at')->paginate(6)->withQueryString();
        $articles->through(function (Article $article) {
            if (! $article->excerpt) {
                $article->excerpt = \Illuminate\Support\Str::limit(strip_tags($article->content), 150);
            }

            unset($article->content);

            return $article;
        });

        // Ambil kategori untuk sidebar
        // (Asumsi kamu punya model Category, ganti pemanggilannya jika beda)
        $categories = \App\Models\Category::all();

        return Inertia::render('Frontend/Berita', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ])->withViewData('seo', [
            'title'       => 'Berita & Artikel - STIKes Bogor Husada',
            'description' => 'Berita terbaru, artikel ilmiah, dan informasi akademik dari STIKes Bogor Husada.',
            'keywords'    => 'berita STIKes Bogor Husada, artikel kampus kesehatan, informasi akademik bogor',
        ]);
    }

    /**
     * Display a single Berita / Article Detail.
     */
    public function beritaShow($slug)
    {
        // Eager load category, tags, dan meta sekalian
        $article = Article::with(['category', 'tags', 'meta'])
            ->where('slug', $slug)
            ->where('status', 'published') // Sesuaikan dengan value kolom status kamu
            ->firstOrFail();

        $categories = \App\Models\Category::all();

        // Ambil artikel terbaru untuk ditaruh di sidebar
        $latestArticles = Article::with('category')
            ->select(['id', 'category_id', 'title', 'slug', 'thumbnail', 'published_at'])
            ->where('status', 'published')
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(5)
            ->get();

        // SEO dinamis dari data artikel
        $seoDesc = $article->meta?->meta_description
            ?: ($article->excerpt ?: \Illuminate\Support\Str::limit(strip_tags($article->content), 160));
        $seoKeywords = $article->meta?->meta_keywords
            ?: ($article->tags->pluck('name')->implode(', ') . ', STIKes Bogor Husada');

        return Inertia::render('Frontend/BeritaDetail', [
            'article' => $article,
            'categories' => $categories,
            'latestArticles' => $latestArticles,
        ])->withViewData('seo', [
            'title'       => $article->title . ' - STIKes Bogor Husada',
            'description' => $seoDesc,
            'keywords'    => $seoKeywords,
            'url'         => url('/artikel/' . $article->slug),
            'image'       => $article->thumbnail ? (str_starts_with($article->thumbnail, 'http') ? $article->thumbnail : asset('storage/' . $article->thumbnail)) : null,
            'type'        => 'article',
            'schema'      => [
                '@context'      => 'https://schema.org',
                '@type'         => 'Article',
                'headline'      => $article->title,
                'description'   => $seoDesc,
                'datePublished' => $article->published_at?->toIso8601String(),
                'author'        => [
                    '@type' => 'Organization',
                    'name'  => 'STIKes Bogor Husada',
                ],
                'publisher'     => [
                    '@type' => 'Organization',
                    'name'  => 'STIKes Bogor Husada',
                    'logo'  => [
                        '@type' => 'ImageObject',
                        'url'   => asset('assets/img/icon/logo_sbh_persegi.png'),
                    ],
                ],
            ],
        ]);
    }
}
