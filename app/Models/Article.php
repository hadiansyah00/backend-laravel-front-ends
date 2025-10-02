<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }



    public function meta()
    {
        return $this->morphOne(MetaSettings::class, 'seoable');
    }
    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'article_tag')
            ->using(Article_tag::class) // pakai pivot model custom
            ->withPivot('is_featured')
            ->withTimestamps();
    }
}
