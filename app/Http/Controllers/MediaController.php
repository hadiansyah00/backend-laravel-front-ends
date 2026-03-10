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

        if ($request->wantsJson()) {
            return response()->json($query->paginate(24));
        }

        return Inertia::render('Admin/Media/Index', [
            'media' => $query->paginate(24)->withQueryString(),
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'collection_name' => 'nullable|string'
        ]);

        $file = $request->file('file');
        
        $originalName = $file->getClientOriginalName();
        $mimeType = $file->getClientMimeType();
        $size = $file->getSize();
        
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
            'collection_name' => $request->collection_name ?? 'default'
        ]);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Upload success', 'media' => $media]);
        }

        return back()->with('success', 'Media berhasil diupload.');
    }

    public function destroy(Media $media, Request $request)
    {
        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $media->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Media deleted successfully']);
        }

        return back()->with('success', 'Media berhasil dihapus.');
    }
}
