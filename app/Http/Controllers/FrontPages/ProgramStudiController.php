<?php

namespace App\Http\Controllers\FrontPages;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgramStudiController extends Controller
{
    public function index()
    {
        $programs = ProgramStudi::latest()->paginate(10);

        return Inertia::render('Admin/ProgramStudi/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Form tambah program baru.
     */
    public function create()
    {
        return Inertia::render('Admin/ProgramStudi/Form', [
            'program' => null,
        ]);
    }

    /**
     * Simpan program baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'link' => 'nullable|url',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

        ProgramStudi::create($validated);

        return redirect()->route('admin.programstudi.index')->with('success', 'Program berhasil ditambahkan.');
    }

    /**
     * Form edit program.
     */
    public function edit($id)
    {
        $program = ProgramStudi::findOrFail($id);

        return Inertia::render('Admin/ProgramStudi/Form', [
            'program' => $program,
        ]);
    }

    /**
     * Update program.
     */
    public function update(Request $request, $id)
    {
        $program = ProgramStudi::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'link' => 'nullable|url',
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama kalau ada
            if ($program->image && Storage::disk('public')->exists($program->image)) {
                Storage::disk('public')->delete($program->image);
            }
            $validated['image'] = $request->file('image')->store('programs', 'public');
        }

        $program->update($validated);

        return redirect()->route('admin.programstudi.index')->with('success', 'Program berhasil diperbarui.');
    }

    /**
     * Hapus program.
     */
    public function destroy($id)
    {
        $program = ProgramStudi::findOrFail($id);

        // Hapus gambar dari storage
        if ($program->image && Storage::disk('public')->exists($program->image)) {
            Storage::disk('public')->delete($program->image);
        }

        $program->delete();

        return redirect()->route('admin.programstudi.index')->with('success', 'Program berhasil dihapus.');
    }
}
