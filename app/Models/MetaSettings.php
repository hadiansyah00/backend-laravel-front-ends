<?php

namespace App\Models;

use App\Models\Pages;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MetaSettings extends Model
{
    use HasFactory;

    protected $table = 'meta_settings';

    protected $fillable = [
        'page_slug',
        'title',
        'meta_description',
        'keywords',
        'robots',

        'og_title',
        'og_description',
        'og_image',
        'og_url',
        'og_type',
        'og_site_name',

        'twitter_card',
        'twitter_title',
        'twitter_description',
        'twitter_image',
        'twitter_site',

        'canonical_url',
    ];

    /**
     * Jika suatu saat kamu ingin menghubungkan ke Page via slug
     * Pastikan Page juga punya kolom `slug` yang unik
     */
    public function page()
    {
        return $this->belongsTo(Pages::class, 'page_slug', 'slug');
    }

    /**
     * Scope: Get meta default
     */
    public function scopeDefault($query)
    {
        return $query->where('page_slug', 'default');
    }
}
