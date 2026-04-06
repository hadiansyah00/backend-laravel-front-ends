import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.jsx",
                "resources/js/berita-filter.js",
                "resources/js/ckeditor.js",
                "resources/js/swiper.js",
            ],
            refresh: true,
        }),
        react(),
    ],
    build: {
        // Increase chunk size warning limit (Tailwind can produce larger CSS)
        chunkSizeWarningLimit: 1500,
    },
});
