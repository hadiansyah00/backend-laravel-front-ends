<?php

namespace App\Http\Controllers\FrontPages;

use App\Models\FrontSetting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

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
            Cache::forget('settings.' . $key);
        }

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}
