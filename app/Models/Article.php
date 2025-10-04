<?php

namespace App\Models;

use App\Models\Tags;
use App\Models\ArticleTag;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HasMeta;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'thumbnail',
        'status',
        'published_at'
    ];
    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'article_tag', 'article_id', 'tag_id')
            ->withTimestamps()
            ->withPivot('is_featured');
    }
    public function featuredTags()
    {
        return $this->belongsToMany(Tags::class, 'article_tag', 'article_id', 'tag_id')
            ->withTimestamps()
            ->withPivot('is_featured')
            ->wherePivot('is_featured', true);
    }
    public function meta()
    {
        return $this->morphOne(MetaSettings::class, 'seoable');
    }
    public function getRouteKeyName()
    {
        return 'slug'; // Beritahu Laravel untuk menggunakan kolom 'slug' untuk binding
    }
}
