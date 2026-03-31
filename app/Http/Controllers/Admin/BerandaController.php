<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Beranda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BerandaController extends Controller
{
    public function index()
    {
        $berandas = Beranda::all()->keyBy('type');
        
        return Inertia::render('Admin/Beranda/Index', [
            'data' => $berandas,
            'types' => Beranda::TYPES,
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'type'      => 'required|string|in:' . implode(',', array_keys(Beranda::TYPES)),
            'title'     => 'required|string|max:255',
            'content'   => 'nullable|string',
            'image'     => 'nullable|string',
            'is_active' => 'nullable|boolean'
        ]);

        try {
            // 1. Sanitasi URL Gambar (Jika pakai MediaPicker)
            $imagePath = null;
            if (!empty($validated['image'])) {
                // Ekstrak path dari URL penuh (mencegah simpan domain localhost di DB)
                $parsedPath = parse_url($validated['image'], PHP_URL_PATH);
                $imagePath = ltrim($parsedPath, '/'); 
            }

            // 2. Simpan atau Update Data
            Beranda::updateOrCreate(
                ['type' => $validated['type']],
                [
                    'title'     => $validated['title'],
                    'content'   => $validated['content'],
                    'image'     => $imagePath,
                    // Pastikan default true jika tidak ada input
                    'is_active' => $request->boolean('is_active', true), 
                ]
            );

            // Tampilkan nama tipe yang ramah dibaca
            $typeName = Beranda::TYPES[$validated['type']] ?? 'Bagian';

            // 3. Hapus cache terkait agar perubahan langsung terlihat di frontend
            Cache::forget('beranda_data');
            Cache::forget('berita_terbaru_home');
            Cache::forget('menus_active');
            Cache::forget('program_studis_active');
            Cache::forget('pengumuman_terbaru');
            Cache::forget('events_terbaru');
            Cache::forget('galleries_terbaru');
            Cache::forget('alumnis_home');
            Cache::forget('kerjasamas_home');

            return redirect()->back()->with('success', "Pengaturan {$typeName} berhasil disimpan.");

        } catch (\Exception $e) {
            // 3. Catat error di file log agar mudah di-debug developer
            Log::error("Gagal menyimpan data beranda (Type: {$validated['type']}): " . $e->getMessage());

            // Kembalikan dengan pesan error yang rapi
            return redirect()->back()->with('error', 'Terjadi kesalahan sistem saat menyimpan pengaturan. Silakan coba lagi.');
        }
    }
}