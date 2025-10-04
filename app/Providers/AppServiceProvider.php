<?php

namespace App\Providers;

use App\Models\Menu;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register application services here if needed
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Grant all permissions to users with the 'admin' role before any other checks
        View::composer(['layouts.app-front', 'layouts.app-berita'], function ($view) {
            $menus = Menu::whereNull('parent_id')
                ->active()
                ->with(['children' => function ($q) {
                    $q->active()->orderBy('order');
                }])
                ->orderBy('order')
                ->get();

            $view->with('menus', $menus);
        });
    }
}
