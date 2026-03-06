<?php

namespace App\Http\Controllers\Admin;

use App\Models\Pengumuman;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PengumumanController extends Controller
{
    public function index()
    {
        $pengumumans = Pengumuman::latest()->paginate(15);
        return view('admin.pengumumans.index', compact('pengumumans'));
    }

    public function create()
    {
        return view('admin.pengumumans.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . uniqid();
        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('pengumumans', 'public');
            $validated['attachment'] = 'storage/' . $path;
        }

        Pengumuman::create($validated);

        return redirect()->route('admin.pengumumans.index')->with('success', 'Pengumuman berhasil ditambahkan!');
    }

    public function edit(Pengumuman $pengumuman)
    {
        return view('admin.pengumumans.edit', compact('pengumuman'));
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
            'is_active' => 'boolean',
        ]);

        // Only update slug if title changed significantly (optional, keeping it simple here without changing slug)
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('attachment')) {
            if ($pengumuman->attachment && str_starts_with($pengumuman->attachment, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $pengumuman->attachment));
            }
            $path = $request->file('attachment')->store('pengumumans', 'public');
            $validated['attachment'] = 'storage/' . $path;
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
