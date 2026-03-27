<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use App\Models\Dosen;
use App\Models\KalenderAkademik;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AkademikController extends Controller
{
    public function index()
    {
        // Program Studi grouped by slug key
        $allProdi = ProgramStudi::orderBy('name')->get();
        $prodiMap = [];
        foreach ($allProdi as $prodi) {
            $prodiMap[$prodi->slug ?? Str::slug($prodi->name)] = $prodi;
        }

        // Dosen summary
        $dosenCount = Dosen::count();
        $dosenRecent = Dosen::latest()->take(5)->get();

        // Kalender summary
        $kalenderCount = KalenderAkademik::count();
        $kalenderRecent = KalenderAkademik::orderBy('mulai', 'desc')->take(5)->get();

        return Inertia::render('Admin/Akademik/Index', [
            'prodiMap' => $prodiMap,
            'dosenCount' => $dosenCount,
            'dosenRecent' => $dosenRecent,
            'kalenderCount' => $kalenderCount,
            'kalenderRecent' => $kalenderRecent,
        ]);
    }

    public function storeOrUpdateProdi(Request $request)
    {
        $validated = $request->validate([
            'id' => 'nullable|integer|exists:program_studis,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'akreditasi' => 'nullable|string|max:50',
            'gelar' => 'nullable|string|max:100',
            'lama_studi' => 'nullable|string|max:50',
            'kaprodi_name' => 'nullable|string|max:255',
            'kaprodi_profile' => 'nullable|string',
            'kaprodi_photo' => 'nullable|string|max:500',
            'peluang_kerja' => 'nullable|array',
            'image' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->name);

        if ($request->filled('id')) {
            $prodi = ProgramStudi::findOrFail($request->id);
            $prodi->update($validated);
        } else {
            ProgramStudi::create($validated);
        }

        return redirect()->route('admin.akademik.index')->with('success', 'Program Studi berhasil disimpan!');
    }
}
