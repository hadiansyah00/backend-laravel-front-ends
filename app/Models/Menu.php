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
        // Jika ada URL manual, pakai itu
        if (!empty($this->url)) {
            return $this->url;
        }

        // Kalau slug ada, buatkan route default
        return url('/' . ltrim($this->slug, '/'));
    }
}