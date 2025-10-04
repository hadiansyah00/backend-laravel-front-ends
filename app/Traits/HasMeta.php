<?php

namespace App\Traits;

use App\Models\MetaSettings;

trait HasMeta
{
    public function meta()
    {
        return $this->morphOne(MetaSettings::class, 'seoable');
    }
}
