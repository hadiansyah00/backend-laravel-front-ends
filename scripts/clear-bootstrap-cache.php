<?php

$basePath = dirname(__DIR__);

foreach (['packages.php', 'services.php'] as $cacheFile) {
    $path = $basePath.'/bootstrap/cache/'.$cacheFile;

    if (is_file($path)) {
        unlink($path);
    }
}
