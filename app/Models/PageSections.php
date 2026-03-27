<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageSections extends Model
{
    use HasFactory;

    protected $table = 'page_sections';

    protected $fillable = [
        'page_id',
        'type',
        'content',
        'order',
    ];

    protected $casts = [
        'content' => 'array', // otomatis decode/encode JSON
    ];

    /**
     * Relasi ke Page
     */
    public function page()
    {
        return $this->belongsTo(Pages::class);
    }

    /**
     * Scope: urutkan berdasarkan 'order'
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
