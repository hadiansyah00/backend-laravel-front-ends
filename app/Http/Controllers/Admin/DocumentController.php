<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::latest()->paginate(15);

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Documents/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'file_path' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->filled('file_path')) {
            $parsedPath = parse_url($request->file_path, PHP_URL_PATH);
            $validated['file_path'] = ltrim($parsedPath, '/');
        }

        Document::create($validated);

        return redirect()->route('admin.documents.index')->with('success', 'Dokumen berhasil diunggah!');
    }

    public function edit(Document $document)
    {
        return Inertia::render('Admin/Documents/Form', [
            'document' => $document,
        ]);
    }

    public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'file_path' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->filled('file_path')) {
            $parsedPath = parse_url($request->file_path, PHP_URL_PATH);
            $validated['file_path'] = ltrim($parsedPath, '/');
        } else {
            $validated['file_path'] = null;
        }

        $document->update($validated);

        return redirect()->route('admin.documents.index')->with('success', 'Dokumen berhasil diperbarui!');
    }

    public function destroy(Document $document)
    {
        if ($document->file_path && str_starts_with($document->file_path, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $document->file_path));
        }
        $document->delete();

        return redirect()->route('admin.documents.index')->with('success', 'Dokumen berhasil dihapus!');
    }
}
