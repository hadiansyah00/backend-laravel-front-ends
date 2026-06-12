<?php

use App\Models\FrontSetting as Setting;

if (! function_exists('setting')) {
    function setting(string $key, $default = null)
    {
        $settings = cache()->remember('front_settings.all', 3600, function () {
            return Setting::pluck('value', 'key')->toArray();
        });

        return $settings[$key] ?? $default;
    }
}
