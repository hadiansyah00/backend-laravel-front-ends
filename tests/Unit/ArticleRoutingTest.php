<?php

use App\Models\Article;

it('uses the article id for route model binding', function () {
    $article = new Article(['slug' => 'contoh-berita']);
    $article->id = 42;

    expect($article->getRouteKeyName())->toBe('id')
        ->and($article->getRouteKey())->toBe(42);
});
