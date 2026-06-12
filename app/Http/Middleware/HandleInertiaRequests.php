<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app-inertia';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $shared = array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            // if using flash messages
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);

        if (! $request->routeIs('admin.*', 'dashboard')) {
            $shared['settings'] = fn () => Cache::remember('front_settings.all', 3600, fn () =>
                \App\Models\FrontSetting::pluck('value', 'key')->toArray()
            );

            $shared['menus'] = fn () => Cache::remember('menus.active_tree', 3600, fn () =>
                \App\Models\Menu::query()
                    ->select(['id', 'name', 'slug', 'url', 'type', 'parent_id', 'order', 'is_active'])
                    ->with(['children:id,name,slug,url,type,parent_id,order,is_active'])
                    ->where('is_active', true)
                    ->whereNull('parent_id')
                    ->orderBy('order')
                    ->get()
            );
        }

        return $shared;
    }
}
