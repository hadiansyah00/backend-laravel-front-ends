<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimoniController extends Controller
{
    /**
     * GET /api/testimoni
     * List testimoni (pagination)
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit', 10);

        $testimoni = Testimonial::query()
            ->orderByDesc('id')
            ->paginate($limit);

        return response()->json([
            'success' => true,
            'message' => 'Data testimoni berhasil diambil',
            'data' => $testimoni
        ]);
    }

    /**
     * GET /api/testimoni/{id}
     * Detail testimoni
     */
    public function show($id)
    {
        $testimoni = Testimonial::find($id);

        if (!$testimoni) {
            return response()->json([
                'success' => false,
                'message' => 'Data testimoni tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $testimoni
        ]);
    }

    /**
     * GET /api/testimoni/latest
     * Testimoni terbaru (landing page)
     */
    public function latest()
    {
        $testimoni = Testimonial::latest()
            ->limit(6)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $testimoni
        ]);
    }
}