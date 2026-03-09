<?php

namespace App\Http\Controllers\Admin;

use App\Models\Alumni;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AlumniController extends Controller
{
    public function index()
    {
        $alumnis = Alumni::latest()->paginate(15);
        return view('admin.alumnis.index', compact('alumnis'));
    }

    public function create()
    {
        return view('admin.alumnis.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'nim'            => 'nullable|string|max:50',
            'program_studi'  => 'nullable|string|max:100',
            'tahun_lulus'    => 'nullable|string|max:10',
            'tempat_kerja'   => 'nullable|string|max:255',
            'jabatan'        => 'nullable|string|max:255',
            'testimonial'    => 'nullable|string',
            'photo'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_featured'    => 'boolean',
            'is_active'      => 'boolean',
        ]);

        $validated['is_featured'] = $request->has('is_featured');
        $validated['is_active']   = $request->has('is_active');

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('alumni', 'public');
            $validated['photo'] = 'storage/' . $path;
        }

        Alumni::create($validated);

        return redirect()->route('admin.alumnis.index')->with('success', 'Data Alumni berhasil ditambahkan!');
    }

    public function edit(Alumni $alumni)
    {
        return view('admin.alumnis.edit', compact('alumni'));
    }

    public function update(Request $request, Alumni $alumni)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'nim'            => 'nullable|string|max:50',
            'program_studi'  => 'nullable|string|max:100',
            'tahun_lulus'    => 'nullable|string|max:10',
            'tempat_kerja'   => 'nullable|string|max:255',
            'jabatan'        => 'nullable|string|max:255',
            'testimonial'    => 'nullable|string',
            'photo'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'is_featured'    => 'boolean',
            'is_active'      => 'boolean',
        ]);

        $validated['is_featured'] = $request->has('is_featured');
        $validated['is_active']   = $request->has('is_active');

        if ($request->hasFile('photo')) {
            if ($alumni->photo && str_starts_with($alumni->photo, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $alumni->photo));
            }
            $path = $request->file('photo')->store('alumni', 'public');
            $validated['photo'] = 'storage/' . $path;
        }

        $alumni->update($validated);

        return redirect()->route('admin.alumnis.index')->with('success', 'Data Alumni berhasil diperbarui!');
    }

    public function destroy(Alumni $alumni)
    {
        if ($alumni->photo && str_starts_with($alumni->photo, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $alumni->photo));
        }
        $alumni->delete();

        return redirect()->route('admin.alumnis.index')->with('success', 'Data Alumni berhasil dihapus!');
    }
}
