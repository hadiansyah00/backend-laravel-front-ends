<?php

namespace App\Http\Controllers\FrontPages;

use App\Http\Controllers\Controller;
use App\Models\FrontSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class FrontSettingController extends Controller
{
    /**
     * Menampilkan halaman daftar pengaturan front.
     */
    public function index()
    {
        // Ambil semua setting (nanti bisa difilter berdasarkan kebutuhan)
        $settings = FrontSetting::all()->keyBy('key');

        return Inertia::render('Admin/FrontSettings/Index', [
            'settings' => $settings
        ]);
    }

    /**
     * Simpan/update pengaturan.
     */
    public function update(Request $request)
    {
        $data = $request->except('_token');

        // Fields that are stored as JSON
        $jsonFields = ['footer_links', 'social_links'];

        // Remap form field names → DB key names
        // Ini diperlukan karena beberapa field di form menggunakan nama berbeda dari key di DB.
        $keyMap = [
            'og_default_image' => 'og_image',
        ];

        foreach ($data as $key => $value) {
            // Skip null values (e.g. file inputs that weren't changed)
            if (is_null($value)) {
                continue;
            }

            // Remap key jika ada pemetaan
            $dbKey = $keyMap[$key] ?? $key;

            // handle upload file
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('uploads/settings', 'public');
                $value = $path;
                $type = 'image';
            } elseif (in_array($dbKey, $jsonFields)) {
                $type = 'json';
            } else {
                $type = 'text';
            }

            FrontSetting::updateOrCreate(
                ['key' => $dbKey],
                ['value' => $value, 'type' => $type]
            );

        }

        Cache::forget('front_settings.all');

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}
