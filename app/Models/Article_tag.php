<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article_tag extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleTagFactory> */
    use HasFactory;
    protected $table = 'article_tag';

    protected $fillable = ['article_id', 'tag_id', 'is_featured'];
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_tag');
    }
}
