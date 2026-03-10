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

        foreach ($data as $key => $value) {
            // handle upload file
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('uploads/settings', 'public');
                $value = $path;
            }

            FrontSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'type' => is_file($value) ? 'image' : 'text']
            );

            // clear cache supaya setting() baca ulang
            Cache::forget('settings.'.$key);
        }

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}
