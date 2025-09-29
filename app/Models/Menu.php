<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menus';

    protected $fillable = [
        'name',
        'slug',
        'url',
        'type',
        'parent_id',
        'order',
        'is_active',
    ];

    /**
     * Menu induk (jika ini submenu)
     */
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->where('is_active', 1)->orderBy('order');
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
    /**
     * Scope untuk hanya menu aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Route atau link yang digunakan menu ini
     */
    public function getLinkAttribute()
    {
        if ($this->type === 'page') {
            // 1. Kalau ada relasi page & slugnya ada
            if ($this->page && $this->page->slug) {
                return route('front.pages.show', $this->page->slug);
            }

            // 2. Kalau tidak ada relasi page, coba pakai slug dari menu
            if ($this->slug) {
                return route('front.pages.show', $this->slug);
            }

            // 3. Kalau dua-duanya kosong → fallback
            return '#';
        }

        if ($this->type === 'link') {
            return $this->url ?: '#';
        }

        return '#';
    }


    public function page()
    {
        return $this->belongsTo(Pages::class);
    }
}
