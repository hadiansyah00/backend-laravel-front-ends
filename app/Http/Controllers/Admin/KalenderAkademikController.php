<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KalenderAkademik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KalenderAkademikController extends Controller
{
    public function index(Request $request)
    {
        $query = KalenderAkademik::query();

        if ($request->filled('semester')) {
            $query->where('semester', $request->semester);
        }

        $kalenders = $query->orderBy('tahun_akademik', 'desc')
                           ->orderBy('semester')
                           ->orderBy('order')
                           ->paginate(15)
                           ->withQueryString();

        $tahunList = KalenderAkademik::select('tahun_akademik')->distinct()->orderBy('tahun_akademik', 'desc')->pluck('tahun_akademik');

        return Inertia::render('Admin/Kalender/Index', [
            'kalenders' => $kalenders,
            'filters' => $request->only(['semester']),
            'tahunList' => $tahunList
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kalender/Form', [
            'kalender' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'semester' => 'required|in:Ganjil,Genap',
            'tahun_akademik' => 'required|string|max:50',
            'kegiatan' => 'required|string|max:255',
            'mulai' => 'nullable|string|max:100',
            'selesai' => 'nullable|string|max:100',
            'keterangan' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        KalenderAkademik::create($validated);

        return redirect()->route('admin.kalender.index')->with('success', 'Agenda Kalender Akademik berhasil ditambahkan.');
    }

    public function edit(KalenderAkademik $kalender)
    {
        return Inertia::render('Admin/Kalender/Form', [
            'kalender' => $kalender
        ]);
    }

    public function update(Request $request, KalenderAkademik $kalender)
    {
        $validated = $request->validate([
            'semester' => 'required|in:Ganjil,Genap',
            'tahun_akademik' => 'required|string|max:50',
            'kegiatan' => 'required|string|max:255',
            'mulai' => 'nullable|string|max:100',
            'selesai' => 'nullable|string|max:100',
            'keterangan' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $kalender->update($validated);

        return redirect()->route('admin.kalender.index')->with('success', 'Agenda Kalender Akademik berhasil diperbarui.');
    }

    public function destroy(KalenderAkademik $kalender)
    {
        $kalender->delete();

        return redirect()->route('admin.kalender.index')->with('success', 'Agenda Kalender Akademik berhasil dihapus.');
    }
}
