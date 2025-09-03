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
        // Validasi dinamis sesuai key
        $validated = $request->validate([
            'site_logo'        => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
            'site_favicon'     => 'nullable|image|mimes:png,ico|max:1024',
            'meta_title'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'google_analytics' => 'nullable|string',
        ]);

        // Simpan site_logo
        if ($request->hasFile('site_logo')) {
            $path = $request->file('site_logo')->store('settings', 'public');
            FrontSetting::updateOrCreate(
                ['key' => 'site_logo'],
                ['value' => $path, 'type' => 'image']
            );
        }

        // Simpan site_favicon
        if ($request->hasFile('site_favicon')) {
            $path = $request->file('site_favicon')->store('settings', 'public');
            FrontSetting::updateOrCreate(
                ['key' => 'site_favicon'],
                ['value' => $path, 'type' => 'image']
            );
        }

        // Simpan meta_title
        if ($request->filled('meta_title')) {
            FrontSetting::updateOrCreate(
                ['key' => 'meta_title'],
                ['value' => $request->meta_title, 'type' => 'text']
            );
        }

        // Simpan meta_description
        if ($request->filled('meta_description')) {
            FrontSetting::updateOrCreate(
                ['key' => 'meta_description'],
                ['value' => $request->meta_description, 'type' => 'text']
            );
        }

        // Simpan google_analytics
        if ($request->filled('google_analytics')) {
            FrontSetting::updateOrCreate(
                ['key' => 'google_analytics'],
                ['value' => $request->google_analytics, 'type' => 'text']
            );
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui!');
    }
}