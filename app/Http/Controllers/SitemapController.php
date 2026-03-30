<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Event;
use App\Models\Pengumuman;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index(Request $request)
    {
        // 1. Static Routes (Main Pages)
        $staticUrls = [
            '/', '/search', '/artikel', '/pengumuman', '/event',
            '/dokumen', '/galeri', '/kontak', '/alumni', '/lowongan', '/kerjasama', '/dosen',
            '/tentang/profil-stikes', '/tentang/sambutan-ketua', '/tentang/visi-misi',
            '/tentang/sejarah', '/tentang/struktur-organisasi',
            '/farmasi', '/gizi', '/kebidanan', '/kalender-akademik',
            '/laboratorium', '/perpustakaan', '/unit-penelitian-dan-pengabdian-masyarakat',
            '/unit-penjaminan-mutu-internal'
        ];

        // Ensure development domain (or fallback to app.url)
        // Hardcoding development URL if user runs it locally, or let Laravel handle it
        $baseUrl = config('app.url', 'https://build.sbh.ac.id');
        
        // Ensure $baseUrl doesn't end with a slash
        $baseUrl = rtrim($baseUrl, '/');

        // Create the XML structure
        $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');

        // Add static URLs
        foreach ($staticUrls as $url) {
            $urlElement = $xml->addChild('url');
            $urlElement->addChild('loc', $baseUrl . $url);
            $urlElement->addChild('lastmod', date('Y-m-d'));
            $urlElement->addChild('changefreq', 'daily');
            $urlElement->addChild('priority', $url === '/' ? '1.0' : '0.8');
        }

        // 2. Dynamic Articles (Berita)
        $articles = Article::where('status', 'published')->orderBy('published_at', 'desc')->get();
        foreach ($articles as $article) {
            $urlElement = $xml->addChild('url');
            $urlElement->addChild('loc', $baseUrl . '/artikel/' . $article->slug);
            // Defaulting to created_at if published_at is empty
            $lastmod = $article->published_at ? $article->published_at->format('Y-m-d') : $article->created_at->format('Y-m-d');
            $urlElement->addChild('lastmod', $lastmod);
            $urlElement->addChild('changefreq', 'weekly');
            $urlElement->addChild('priority', '0.7');
        }

        // 3. Dynamic Events
        $events = Event::where('is_active', 1)->orderBy('updated_at', 'desc')->get();
        foreach ($events as $event) {
            $urlElement = $xml->addChild('url');
            $urlElement->addChild('loc', $baseUrl . '/event/' . $event->slug);
            $urlElement->addChild('lastmod', $event->updated_at->format('Y-m-d'));
            $urlElement->addChild('changefreq', 'weekly');
            $urlElement->addChild('priority', '0.6');
        }

        // 4. Dynamic Announcements (Pengumuman)
        $announcements = Pengumuman::where('is_active', 1)->orderBy('updated_at', 'desc')->get();
        foreach ($announcements as $announcement) {
            $urlElement = $xml->addChild('url');
            $urlElement->addChild('loc', $baseUrl . '/pengumuman/' . $announcement->slug);
            $urlElement->addChild('lastmod', $announcement->updated_at->format('Y-m-d'));
            $urlElement->addChild('changefreq', 'weekly');
            $urlElement->addChild('priority', '0.6');
        }

        // 5. Dynamic Program Studi
        $programStudis = ProgramStudi::where('is_active', 1)->orderBy('updated_at', 'desc')->get();
        foreach ($programStudis as $prodi) {
            $urlElement = $xml->addChild('url');
            $urlElement->addChild('loc', $baseUrl . '/prodi/' . $prodi->slug);
            $urlElement->addChild('lastmod', $prodi->updated_at->format('Y-m-d'));
            $urlElement->addChild('changefreq', 'monthly');
            $urlElement->addChild('priority', '0.8');
        }

        // Return the XML with correct content type
        return Response::make($xml->asXML(), 200, [
            'Content-Type' => 'text/xml'
        ]);
    }
}
