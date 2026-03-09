<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectSeoMeta
{
    /**
     * Share default SEO meta data with all frontend views.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $defaults = [
            'meta_title'       => config('app.name', 'STIKes Bogor Husada'),
            'meta_description' => 'STIKes Bogor Husada — Kampus Kesehatan Terdepan di Bogor. Program Studi S1 Farmasi, S1 Gizi, dan D3 Kebidanan.',
            'meta_keywords'    => 'STIKes Bogor Husada, kampus kesehatan, farmasi, gizi, kebidanan, kuliah di bogor',
            'og_type'          => 'website',
            'og_url'           => $request->url(),
            'og_site_name'     => config('app.name', 'STIKes Bogor Husada'),
        ];

        // If the controller already shared seo data, merge (controller wins)
        $existing = view()->getShared();
        foreach ($defaults as $key => $value) {
            if (!isset($existing[$key]) || empty($existing[$key])) {
                view()->share($key, $value);
            }
        }

        return $next($request);
    }
}
