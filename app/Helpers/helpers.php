<?php

use App\Models\FrontSetting as Setting;

if (!function_exists('setting')) {
   function setting(string $key, $default = null)
    {
        return cache()->rememberForever('settings.' . $key, function () use ($key, $default) {
            $setting = Setting::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }

}
