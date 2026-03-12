<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FasilitasController extends Controller
{
    public function index(Request $request)
    {
        $allFasilitas = Fasilitas::orderBy('order')->orderBy('name')->get()->groupBy('type');

        $types = [
            'Laboratorium' => 'Laboratorium',
            'Perpustakaan' => 'Perpustakaan',
            'UPPM' => 'UPPM',
            'UPMI' => 'UPMI',
        ];

        return Inertia::render('Admin/Fasilitas/Index', [
            'fasilitasGrouped' => $allFasilitas,
            'types' => $types,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Fasilitas/Form', [
            'fasilitasData' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:Laboratorium,Perpustakaan,UPPM,UPMI',
            'description' => 'nullable|string',
            'facilities' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
            'image' => 'nullable',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('uploads/fasilitas', 'public');
        } elseif (is_string($request->image)) {
            $validated['image'] = $request->image;
        }

        Fasilitas::create($validated);

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    public function edit(Fasilitas $fasilita)
    {
        return Inertia::render('Admin/Fasilitas/Form', [
            'fasilitasData' => $fasilita
        ]);
    }

    public function update(Request $request, Fasilitas $fasilita)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:Laboratorium,Perpustakaan,UPPM,UPMI',
            'description' => 'nullable|string',
            'facilities' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
            'image' => 'nullable',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($fasilita->image) {
                Storage::disk('public')->delete(str_replace('storage/', '', $fasilita->image));
            }
            $validated['image'] = $request->file('image')->store('uploads/fasilitas', 'public');
        } elseif (is_string($request->image)) {
            $validated['image'] = $request->image;
        } else {
            // keep old image if not uploading a new file and not explicitly sending empty string
            if ($request->has('image') && is_null($request->image)) {
               if ($fasilita->image) {
                   Storage::disk('public')->delete(str_replace('storage/', '', $fasilita->image));
               }
               $validated['image'] = null;
            } else {
               $validated['image'] = $fasilita->image;
            }
        }

        $fasilita->update($validated);

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil diperbarui.');
    }

    public function destroy(Fasilitas $fasilita)
    {
        if ($fasilita->image && str_starts_with($fasilita->image, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $fasilita->image));
        }

        $fasilita->delete();

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil dihapus.');
    }
}
