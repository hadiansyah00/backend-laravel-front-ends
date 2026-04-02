<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AlumniController extends Controller
{
    public function index()
    {
        $alumnis = Alumni::with('programStudi')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Alumnis/Index', [
            'alumnis' => $alumnis,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Alumnis/Form', [
            'alumni' => null,
            'programStudis' => ProgramStudi::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nim' => 'nullable|string|max:50',
            'program_studi_id' => 'nullable|exists:program_studis,id',
            'tahun_lulus' => 'nullable|integer',
            'tempat_kerja' => 'nullable|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'testimonial' => 'nullable|string',
'photo' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['photo'] = $request->photo;
        // Upload photo
       

        Alumni::create($validated);

        return redirect()->route('admin.alumnis.index')
            ->with('success', 'Data Alumni berhasil ditambahkan!');
    }

    public function edit(Alumni $alumni)
    {
        return Inertia::render('Admin/Alumnis/Form', [
            'alumni' => $alumni->load('programStudi'),
            'programStudis' => ProgramStudi::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Alumni $alumni)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nim' => 'nullable|string|max:50',
            'program_studi_id' => 'nullable|exists:program_studis,id',
            'tahun_lulus' => 'nullable|integer',
            'tempat_kerja' => 'nullable|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'testimonial' => 'nullable|string',
            'photo' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['photo'] = $request->photo;

        $alumni->update($validated);

        return redirect()->route('admin.alumnis.index')
            ->with('success', 'Data Alumni berhasil diperbarui!');
    }

    public function destroy(Alumni $alumni)
    {
        if ($alumni->photo) {
            Storage::disk('public')->delete($alumni->photo);
        }

        $alumni->delete();

        return redirect()->route('admin.alumnis.index')
            ->with('success', 'Data Alumni berhasil dihapus!');
    }
}