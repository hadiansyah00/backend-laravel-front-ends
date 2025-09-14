<?php

namespace App\Http\Controllers\FrontPages;

use App\Models\FrontSetting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FrontSettingController extends Controller
{
     /**
     * Menampilkan halaman daftar pengaturan front.
     */
    public function index()
    {
        // Ambil semua setting (nanti bisa difilter berdasarkan kebutuhan)
        $settings = FrontSetting::all()->keyBy('key');

        return view('admin.front_settings.index', compact('settings'));
    }

    /**
     * Simpan/update pengaturan.
     */
  public function update(Request $request)
    {
        // Validasi dinamis sesuai kebutuhan
        $validated = $request->validate([
            'logo_main'        => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
            'logo_sticky'      => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
            'site_favicon'     => 'nullable|image|mimes:png,ico|max:1024',
            'meta_title'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords'    => 'nullable|string|max:255',
            'og_title'         => 'nullable|string|max:255',
            'og_description'   => 'nullable|string|max:500',
            'og_image'         => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'twitter_card'     => 'nullable|string|max:50',
            'google_analytics' => 'nullable|string',
        ]);

        // Daftar field yang berupa file upload
        $fileFields = ['logo_main', 'logo_sticky', 'site_favicon', 'og_image'];

        foreach ($validated as $key => $value) {
            // Jika field adalah file upload
            if (in_array($key, $fileFields) && $request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                FrontSetting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $path, 'type' => 'image']
                );
            }
            // Jika field text biasa
            elseif (!in_array($key, $fileFields) && $request->filled($key)) {
                FrontSetting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value, 'type' => 'text']
                );
            }
        }

        // Hapus cache biar setting() ambil data terbaru
        cache()->flush();

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui!');
    }

}
