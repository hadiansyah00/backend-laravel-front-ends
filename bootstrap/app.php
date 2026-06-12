<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Aliases
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'seo' => \App\Http\Middleware\InjectSeoMeta::class,
        ]);

        // Append SEO and Inertia middleware to all web routes
        $middleware->web(append: [
            \App\Http\Middleware\InjectSeoMeta::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, \Illuminate\Http\Request $request) {
            // Render React Error page for 404, 403, 500, 503 statuses
            $status = $response->getStatusCode();
            
            // Render custom 404 page locally too, but only 500/etc in Prod to preserve debug screen locally
            if (in_array($status, [500, 503, 404, 403])) {
                if ($status === 404 || !app()->environment(['local', 'testing'])) {
                    \Inertia\Inertia::setRootView('app-inertia');

                    return \Inertia\Inertia::render('Frontend/Error', ['status' => $status])
                        ->toResponse($request)
                        ->setStatusCode($status);
                }
            }

            return $response;
        });
    })->create();
