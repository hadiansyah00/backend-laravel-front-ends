<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PengumumanController extends Controller
{
    public function index()
    {
        $pengumumans = Pengumuman::latest()->paginate(15);

        return Inertia::render('Admin/Pengumumans/Index', [
            'pengumumans' => $pengumumans,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pengumumans/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'      => 'required|string|max:255',
            'content'    => 'nullable|string',
            // UBAH: Sekarang berupa string URL, bukan file fisik
            'attachment' => 'nullable|string', 
            'is_active'  => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->title).'-'.uniqid();
        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        // LOGIKA BARU UNTUK MEDIAPICKER
        if ($request->filled('attachment')) {
            // Bersihkan domain utama, ambil path-nya saja (misal: "storage/media/file.pdf")
            $parsedPath = parse_url($request->attachment, PHP_URL_PATH);
            $validated['attachment'] = ltrim($parsedPath, '/'); 
        }

        Pengumuman::create($validated);

        return redirect()->route('admin.pengumumans.index')->with('success', 'Pengumuman berhasil ditambahkan!');
    }

   

    public function edit(Pengumuman $pengumuman)
    {
        return Inertia::render('Admin/Pengumumans/Form', [
            'pengumuman' => $pengumuman,
        ]);
    }

     public function update(Request $request, Pengumuman $pengumuman)
    {
        $validated = $request->validate([
            'title'      => 'required|string|max:255',
            'content'    => 'nullable|string',
            // UBAH: Validasi string
            'attachment' => 'nullable|string',
            'is_active'  => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        // LOGIKA BARU UNTUK MEDIAPICKER
        if ($request->filled('attachment')) {
            // Ambil path relatifnya saja
            $parsedPath = parse_url($request->attachment, PHP_URL_PATH);
            $validated['attachment'] = ltrim($parsedPath, '/');
        } else {
            // Jika user menghapus teks di inputan (mengosongkan attachment)
            $validated['attachment'] = null;
        }

        $pengumuman->update($validated);

        return redirect()->route('admin.pengumumans.index')->with('success', 'Pengumuman berhasil diperbarui!');
    }

    public function destroy(Pengumuman $pengumuman)
    {
        if ($pengumuman->attachment && str_starts_with($pengumuman->attachment, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $pengumuman->attachment));
        }
        $pengumuman->delete();

        return redirect()->route('admin.pengumumans.index')->with('success', 'Pengumuman berhasil dihapus!');
    }
}
