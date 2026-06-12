<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Beranda;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Pengumuman;
use App\Models\ProgramStudi;
use App\Models\Alumni;
use App\Models\Kerjasama;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response; // Gunakan Response dari Inertia

class FrontPagesController extends Controller
{
    /**
     * Menampilkan halaman utama (Beranda)
     */
    public function index(): Response
    {
        // 1. Ambil Berita (Cache 10 Menit)
        $berita = Cache::remember('berita_terbaru_home', 600, function () {
            return Article::with('category')
                ->select(['id', 'category_id', 'title', 'slug', 'thumbnail', 'published_at'])
                ->where('status', 'published')
                ->latest('published_at')
                ->take(6)
                ->get();
        });

        // 2. Ambil Setup Beranda & Decode JSON (Cache 1 Jam)
        $beranda = Cache::remember('beranda_data', 3600, function () {
            return Beranda::where('is_active', true)
                ->get()
                ->keyBy('type')
                ->map(function ($item) {
                    $data = $item->toArray();
                    
                    // Decode JSON content dengan aman
                    if (!empty($data['content'])) {
                        $decoded = json_decode($data['content'], true);
                        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                            // Merge data agar property JSON langsung bisa diakses di React
                            $data = array_merge($data, $decoded);
                        }
                    }
                    return $data;
                });
        });

        // 3. Ambil Program Studi (Cache 1 Jam)
        $programStudis = Cache::remember('program_studis_active', 3600, function () {
            return ProgramStudi::where('is_active', true)->get();
        });

        // 5. Ambil Pengumuman (Cache 10 Menit)
        $pengumuman = Cache::remember('pengumuman_terbaru', 600, function () {
            return Pengumuman::where('is_active', true)
                ->latest('created_at') // Sama dengan orderBy('created_at', 'desc') tapi lebih rapi
                ->take(5)
                ->get();
        });

        // 6. Ambil Event/Agenda (Cache 10 Menit)
        $events = Cache::remember('events_terbaru', 600, function () {
            return Event::where('is_active', true)
                // Lebih aman cek start_date, karena end_date bisa saja Null
                ->where('start_date', '>=', today()) 
                ->orderBy('start_date', 'asc')
                ->take(4)
                ->get();
        });

        // 7. Ambil Galeri Terbaru (Cache 10 Menit)
        $galleries = Cache::remember('galleries_terbaru', 600, function () {
            return Gallery::latest('created_at')
                ->take(6)
                ->get();
        });
// 1. Ambil Data Alumni (Gantikan Testimoni Manual)
        $alumnis = Cache::remember('alumnis_home', 600, function () {
            return Alumni::where('is_active', 1)
                ->inRandomOrder() // Acak agar yang tampil bergantian
                ->take(6)
                ->get();
        });

        // 8. Data Mitra Kerjasama (Cache 1 Jam)
        $kerjasamas = Cache::remember('kerjasamas_home', 3600, function () {
            return Kerjasama::where('is_active', true)->get();
        });
        // SEO Data — akan di-render server-side di blade template
        $seo = [
            'title'       => 'Beranda - STIKes Bogor Husada',
            'description' => setting('meta_description', 'Selamat datang di website resmi STIKes Bogor Husada. Kampus kesehatan terbaik yang mencetak tenaga medis profesional di Bogor. Pendaftaran mahasiswa baru dibuka!'),
            'keywords'    => setting('meta_keywords', 'STIKes Bogor Husada, kampus kesehatan bogor, sekolah tinggi ilmu kesehatan, pendaftaran mahasiswa baru, SNBT, PMB, kuliah kesehatan'),
            'url'         => url('/'),
            'image'       => asset('assets/img/icon/logo_sbh_persegi.png'),
            'type'        => 'website',
            'schema'      => [
                '@context'    => 'https://schema.org',
                '@type'       => 'EducationalOrganization',
                'name'        => 'STIKes Bogor Husada',
                'url'         => url('/'),
                'logo'        => asset('assets/img/icon/logo_sbh_persegi.png'),
                'description' => 'Kampus kesehatan terbaik yang mencetak tenaga medis profesional.',
                'address'     => [
                    '@type'           => 'PostalAddress',
                    'addressLocality' => 'Bogor',
                    'addressRegion'   => 'Jawa Barat',
                    'addressCountry'  => 'ID',
                ],
            ],
        ];

        // Lempar data ke React Frontend + SEO ke Blade
        return Inertia::render('Home', compact(
            'berita',
            'programStudis',
            'beranda',
            'pengumuman',
            'events',
            'galleries',
            'alumnis',
            'kerjasamas'
        ))->withViewData('seo', $seo);
    }
}
