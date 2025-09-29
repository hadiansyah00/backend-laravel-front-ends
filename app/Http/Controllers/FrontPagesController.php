<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Slider;
use App\Models\Statistic;
use Illuminate\View\View;
use App\Models\Testimonial;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use App\Models\CompanyProfileVideo;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http; // Pastikan ini diimport

class FrontPagesController extends Controller
{
    /**
     * Menampilkan halaman utama
     */
    public function index(): View
    {
        // Ambil berita dengan cache 10 menit
        $berita = Cache::remember('berita_terbaru', 600, function () {
            try {
                $response = Http::get('https://api.sbh.ac.id/wp-json/wp/v2/posts', [
                    '_embed' => true,
                    'per_page' => 6
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
        $menus = Menu::whereNull('parent_id')
            ->active()
            ->with('children')
            ->orderBy('order')
            ->get();

        $sliders       = Slider::orderBy('order')->get();
        $programStudis = ProgramStudi::all();
        $statistic     = Statistic::all();
        $videoContent  = CompanyProfileVideo::where('is_active', true)->first();
        $testimonials  = Testimonial::all();

        return view('front-pages.index', compact(
            'berita',
            'menus',
            'sliders',
            'programStudis',
            'statistic',
            'videoContent',
            'testimonials'
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
            $response = Http::get("https://api.sbh.ac.id/wp-json/wp/v2/posts", [
                'slug' => $slug,
                '_embed' => true,
            ]);

            if ($response->successful()) {
                $posts = $response->json();

                // Pastikan ada data
                if (!empty($posts)) {
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
