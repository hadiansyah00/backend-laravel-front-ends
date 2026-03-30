<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::latest();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('type') && in_array($request->type, ['image', 'document'])) {
            $query->where('type', $request->type);
        }

        if ($request->wantsJson()) {
            return response()->json($query->paginate(24));
        }

        return Inertia::render('Admin/Media/Index', [
            'media' => $query->paginate(24)->withQueryString(),
            'filters' => $request->only('search', 'type')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:5120', // 5MB max
            'collection_name' => 'nullable|string'
        ], [
            'file.required' => 'Pilih file yang ingin diupload.',
            'file.file' => 'File yang diupload tidak valid.',
            'file.max' => 'Gagal upload: Ukuran file maksimal adalah 5MB.',
        ]);

        $file = $request->file('file');
        
        $originalName = $file->getClientOriginalName();
        $mimeType = $file->getClientMimeType();
        $size = $file->getSize();
        
        // Auto-detect type from mime_type
        $type = str_starts_with($mimeType, 'image/') ? 'image' : 'document';

        // Generate a safe unique name
        $extension = $file->getClientOriginalExtension();
        $safeName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME));
        $uniqueName = $safeName . '-' . uniqid() . '.' . $extension;

        $path = $file->storeAs('uploads/media/' . date('Y/m'), $uniqueName, 'public');

        $media = Media::create([
            'name' => $originalName,
            'file_name' => $uniqueName,
            'mime_type' => $mimeType,
            'path' => $path,
            'disk' => 'public',
            'size' => $size,
            'collection_name' => $request->collection_name ?? 'default',
            'type' => $type,
        ]);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Upload success', 'media' => $media]);
        }

        return back()->with('success', 'Media berhasil diupload.');
    }

    public function destroy(Media $medium, Request $request)
    {
        if ($medium->path && Storage::disk($medium->disk)->exists($medium->path)) {
            Storage::disk($medium->disk)->delete($medium->path);
        }

        $medium->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Media deleted successfully']);
        }

        return back()->with('success', 'Media berhasil dihapus.');
    }
}
