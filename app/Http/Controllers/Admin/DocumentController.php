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
            'file_path' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:10240', // Max 10MB
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');
        $validated['user_id'] = auth()->id();

        if ($request->hasFile('file_path')) {
            $path = $request->file('file_path')->store('documents', 'public');
            $validated['file_path'] = 'storage/'.$path;
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
            'file_path' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->has('is_active');

        if ($request->hasFile('file_path')) {
            if ($document->file_path && str_starts_with($document->file_path, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $document->file_path));
            }
            $path = $request->file('file_path')->store('documents', 'public');
            $validated['file_path'] = 'storage/'.$path;
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
