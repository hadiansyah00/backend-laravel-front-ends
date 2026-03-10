<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Gallery;
use App\Models\Menu;
use App\Models\Pengumuman;
use App\Models\ProgramStudi;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\View\View;
use Inertia\Inertia;

class FrontPagesController extends Controller
{
    /**
     * Menampilkan halaman utama
     */
    public function index()
    {
        // Ambil berita dengan cache 10 menit
        $berita = Cache::remember('berita_terbaru', 600, function () {
            try {
                $response = Http::timeout(3)->get('https://api.sbh.ac.id/wp-json/wp/v2/posts', [
                    '_embed' => true,
                    'per_page' => 6,
                ]);

                if ($response->successful()) {
                    return $response->json();
                }

                \Log::error('Gagal fetch berita', ['status' => $response->status()]);
            } catch (\Exception $e) {
                \Log::error('Catch error fetch berita', ['message' => $e->getMessage()]);
            }

            return []; // default kalau gagal
        });
        $menus = Cache::remember('menus_active', 3600, function () {
            return Menu::whereNull('parent_id')
                ->active()
                ->with('children')
                ->orderBy('order')
                ->get();
        });

        $beranda = Cache::remember('beranda_data', 3600, function () {
            return \App\Models\Beranda::where('is_active', true)->get()->keyBy('type')->map(function ($item) {
                // Decode JSON content if any
                $data = $item->toArray();
                if ($data['content']) {
                    $decoded = json_decode($data['content'], true);
                    if (is_array($decoded)) {
                        $data = array_merge($data, $decoded);
                    }
                }
                return $data;
            });
        });

        $programStudis = Cache::remember('program_studis_active', 3600, function () {
            return ProgramStudi::where('is_active', true)->get();
        });

        // Fetch Data Informasi Publik
        $pengumuman = Cache::remember('pengumuman_terbaru', 600, function () {
            return Pengumuman::where('is_active', true)
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
        });

        $events = Cache::remember('events_terbaru', 600, function () {
            return Event::where('is_active', true)
                ->where('end_date', '>=', now())
                ->orderBy('start_date', 'asc')
                ->take(4)
                ->get();
        });

        $galleries = Cache::remember('galleries_terbaru', 600, function () {
            return Gallery::orderBy('created_at', 'desc')
                ->take(6)
                ->get();
        });

        return Inertia::render('Home', compact(
            'berita',
            'menus',
            'programStudis',
            'beranda',
            'pengumuman',
            'events',
            'galleries'
        ));
    }

    public function wilayahOrganisasi(): View
    {
        // Di sini Anda bisa mengambil data dari database jika perlu.
        // Untuk saat ini, kita hanya akan menampilkan view-nya.
        return view('front-pages.wilayah-organisasi.index');
    }

    public function beritaDetail($slug)
    {
        try {
            $response = Http::get('https://api.sbh.ac.id/wp-json/wp/v2/posts', [
                'slug' => $slug,
                '_embed' => true,
            ]);

            if ($response->successful()) {
                $posts = $response->json();

                // Pastikan ada data
                if (! empty($posts)) {
                    $detail = $posts[0]; // slug selalu unik → ambil index 0

                    return view('front-pages.berita.index', compact('detail'));
                } else {
                    abort(404, 'Berita tidak ditemukan');
                }
            } else {
                \Log::error('Gagal fetch detail berita', ['status' => $response->status()]);
                abort(500, 'Gagal mengambil data dari server');
            }
        } catch (\Exception $e) {
            \Log::error('Catch error berita detail', ['message' => $e->getMessage()]);
            abort(500, 'Terjadi kesalahan saat mengambil detail berita');
        }
    }
}
