import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/berita-filter.js",
                "resources/js/ckeditor.js",
                "resources/js/swiper.js",
            ],
            refresh: true,
        }),
    ],
});
