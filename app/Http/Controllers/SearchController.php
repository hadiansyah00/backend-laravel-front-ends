<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Pages;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\SearchResultResource;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q = trim($request->input('q', ''));

        // handle jika query kosong / terlalu pendek
        if (strlen($q) < 2) {
            return view('search.results', [
                'q' => $q,
                'results' => new LengthAwarePaginator([], 0, 10),
            ]);
        }

        // ambil data hanya dari Pages
        $pages = Pages::where('title', 'like', "%$q%")
            ->orWhere('content', 'like', "%$q%")
            ->get();

        // mapping via Resource
        $results = $pages->map(fn($p) => SearchResultResource::fromPage($p, $q));

        // pagination manual
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();

        $paginatedResults = new LengthAwarePaginator(
            $results->forPage($currentPage, $perPage),
            $results->count(),
            $perPage,
            $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return view('search.results', [
            'q'       => $q,
            'results' => $paginatedResults,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
