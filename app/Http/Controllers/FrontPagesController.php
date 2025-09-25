<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfileVideo;
use App\Models\Menu;
use App\Models\Slider;
use Illuminate\View\View;
use App\Models\ProgramStudi;
use App\Models\Statistic;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // Pastikan ini diimport

class FrontPagesController extends Controller
{
    /**
     * Menampilkan halaman utama
     */
    public function index(): View
    {
        $menus = Menu::whereNull('parent_id')
            ->where('is_active', 1)
            ->with('children')
            ->orderBy('order')
            ->get();

        $berita = [];
        $buku = [];

        try {
            // Ambil data berita
            $response_berita = Http::get('https://api.sbh.ac.id/wp-json/wp/v2/posts', [
                '_embed' => true,
                'per_page' => 6
            ]);

            // Convert JSON
            if ($response_berita->successful()) {
                $berita = $response_berita->json();
            } else {
                \Log::error('Gagal fetch berita', ['status' => $response_berita->status()]);
            }
        } catch (\Exception $e) {
            \Log::error('Catch error', ['message' => $e->getMessage()]);
        }

        $mitra = [
            ['nama' => 'Mitra 1', 'logo' => '1.png'],
            ['nama' => 'Mitra 2', 'logo' => '2.jpeg'],
            ['nama' => 'Mitra 3', 'logo' => '3.png'],
            ['nama' => 'Mitra 4', 'logo' => '4.png'],
            ['nama' => 'Mitra 5', 'logo' => '5.png'],
            ['nama' => 'Mitra 6', 'logo' => '6.jpeg'],
        ];

        $sliders = Slider::orderBy('order', 'asc')->get();
        $programStudis = ProgramStudi::all();
        $statistic = Statistic::all();
        $videoContent = CompanyProfileVideo::where('is_active', true)->first(); // Ambil satu video aktif
        $testimonials = Testimonial::all(); // Ambil semua testimonial
        return view('front-pages.index', compact('berita', 'mitra', 'sliders', 'programStudis', 'menus', 'statistic', 'videoContent', 'testimonials'));
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
