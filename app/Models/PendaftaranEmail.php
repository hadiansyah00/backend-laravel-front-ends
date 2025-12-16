<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PendaftaranEmail extends Model
{
    protected $table = 'pendaftaran_email';
    protected $fillable = [
        'first_name',
        'last_name',
        'program_studi',
        'phone',
        'status',
        'email',
        'password'
    ];
}
