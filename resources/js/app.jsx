import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'STIKes Bogor Husada';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        // Hilangkan preloader instan bawaan server setelah React siap
        const preloader = document.getElementById('server-preloader');
        if (preloader) preloader.remove();

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#f97316',
        showSpinner: true,
    },
});
