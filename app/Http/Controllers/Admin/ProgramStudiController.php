<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramStudiController extends Controller
{
    public function index()
    {
        $programStudis = ProgramStudi::latest()->paginate(15);

        return Inertia::render('Admin/ProgramStudis/Index', [
            'programStudis' => $programStudis
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ProgramStudis/Form', [
            'programStudi' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'akreditasi' => 'nullable|string|max:50',
            'gelar' => 'nullable|string|max:100',
            'lama_studi' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'link' => 'nullable|string|url',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->name);
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('program_studi', 'public');
            $validated['image'] = 'storage/'.$path;
        }

        ProgramStudi::create($validated);

        return redirect()->route('admin.program-studis.index')->with('success', 'Program Studi berhasil ditambahkan!');
    }

    public function edit(ProgramStudi $programStudi)
    {
        return Inertia::render('Admin/ProgramStudis/Form', [
            'programStudi' => $programStudi
        ]);
    }

    public function update(Request $request, ProgramStudi $programStudi)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'akreditasi' => 'nullable|string|max:50',
            'gelar' => 'nullable|string|max:100',
            'lama_studi' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'link' => 'nullable|string|url',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($request->name);
        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if ($programStudi->image && str_starts_with($programStudi->image, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $programStudi->image));
            }
            $path = $request->file('image')->store('program_studi', 'public');
            $validated['image'] = 'storage/'.$path;
        }

        $programStudi->update($validated);

        return redirect()->route('admin.program-studis.index')->with('success', 'Program Studi berhasil diperbarui!');
    }

    public function destroy(ProgramStudi $programStudi)
    {
        if ($programStudi->image && str_starts_with($programStudi->image, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $programStudi->image));
        }
        $programStudi->delete();

        return redirect()->route('admin.program-studis.index')->with('success', 'Program Studi berhasil dihapus!');
    }
}
