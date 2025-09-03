<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FrontSetting extends Model
{
     protected $fillable = [
        'key',
        'value',
        'type',
    ];

    /**
     * Helper untuk ambil value setting berdasarkan key
     */
    public static function getValue(string $key, $default = null)
    {
        return static::where('key', $key)->value('value') ?? $default;
    }
}