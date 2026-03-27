<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    use HasFactory;

    protected $table = 'pages';

    protected $primaryKey = 'id'; // default, pastikan ada

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'menu_id',
        'title',
        'slug',
        'type',
        'content',
        'is_published',
        'template',
        'category',
        'icon',
        'order',
        'parent_slug',
        'hero_bg_image',
        'hero_title',
        'hero_subtitle',
    ];

    /**
     * Relasi ke section modular jika type = 'modular'
     */
    public function sections()
    {
        return $this->hasMany(PageSections::class, 'page_id');
    }

    /**
     * Scope published
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Route binding berdasarkan slug
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Relasi ke MetaSetting berdasarkan slug
     */
    public function meta()
    {
        return $this->morphOne(MetaSettings::class, 'seoable');
    }

    /**
     * Relasi ke Menu (hierarki struktur halaman)
     */
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
