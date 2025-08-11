<?php

namespace App\Models;

use App\Models\MetaSettings;
use App\Models\PageSections;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pages extends Model
{
    use HasFactory;

    protected $table = 'pages';

    protected $fillable = [
        'title',
        'slug',
        'type',
        'content',
        'is_published',
    ];

    /**
     * Relasi ke MetaSetting berdasarkan slug
     */
    public function meta()
    {
        return $this->hasOne(MetaSettings::class, 'page_slug', 'slug');
    }

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
}