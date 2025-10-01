<?php

namespace App\Http\Resources;

use App\Models\Menu;
use App\Models\Pages;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SearchResultResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public static function fromPage(Pages $page, string $q)
    {
        return (object) [
            'title'     => str_ireplace($q, "<mark>{$q}</mark>", $page->title),
            'url'       => url($page->slug),
            'snippet'   => $page->meta->meta_description ?: Str::limit(strip_tags($page->content), 150),
            'thumbnail' => $page->meta->og_image
                ? asset(
                    'storage/' . $page->meta->og_image
                )
                : (setting('og_image') ? asset('storage/' . setting('og_image')) : asset('assets/img/default-thumbnail.jpg')),
            'type'      => 'Halaman',
        ];
    }

    public static function fromMenu(Menu $menu, string $q)
    {
        return (object) [
            'title'     => str_ireplace($q, "<mark>{$q}</mark>", $menu->name),
            'url'       => $menu->url,
            'snippet'   => $menu->description ?: 'Tautan navigasi dalam situs.',
            'type'      => 'Menu',
        ];
    }
}
