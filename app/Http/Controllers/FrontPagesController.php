<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\View\View;
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
        try {
            // Ambil data kategori berita
            $response_berita = Http::get('https://perempuanaman.or.id/wp-json/wp/v2/posts', [
                'categories' => 179,
                '_embed' => true,
                'per_page' => 6
            ]);

            // Ambil data kategori buku
            $response_buku = Http::get('https://perempuanaman.or.id/wp-json/wp/v2/posts', [
                'categories' => 180,
                '_embed' => true,
                'per_page' => 6
            ]);

            $berita = $response_berita->successful() ? $response_berita->json() : [];
            $buku = $response_buku->successful() ? $response_buku->json() : [];

            if (!$response_berita->successful()) {
                \Log::error('Gagal fetch berita', ['status' => $response_berita->status()]);
            }

            if (!$response_buku->successful()) {
                \Log::error('Gagal fetch buku', ['status' => $response_buku->status()]);
            }

        } catch (\Exception $e) {
            $berita = [];
            $buku = [];
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
        return view('front-pages.index', compact('berita', 'buku','mitra'));
    }
     public function wilayahOrganisasi(): View
    {
        // Di sini Anda bisa mengambil data dari database jika perlu.
        // Untuk saat ini, kita hanya akan menampilkan view-nya.
        return view('front-pages.wilayah-organisasi.index');
    }
}
