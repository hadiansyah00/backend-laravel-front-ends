import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'STIKes Bogor Husada';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        // Lazy-load pages for code-splitting — each page becomes its own chunk
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const importPage = pages[`./Pages/${name}.jsx`];
        if (!importPage) {
            throw new Error(`Page not found: ./Pages/${name}.jsx`);
        }
        return importPage().then(module => module.default ? module : { default: module });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#f97316',
        showSpinner: true,
    },
});
