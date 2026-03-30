import React, { useState, useEffect, useCallback } from 'react';

const MODES = {
    epilepsy: {
        title: 'Epilepsy Safe Mode',
        desc: 'Dampens colors and eliminates flashes.',
        icon: 'fa-bolt-slash',
        color: 'bg-amber-500'
    },
    visuallyImpaired: {
        title: 'Visual Impaired Mode',
        desc: 'Enhances colors and increases text size.',
        icon: 'fa-eye',
        color: 'bg-cyan-500'
    },
    cognitive: {
        title: 'Cognitive Disability',
        desc: 'Assistive features for focus and reading.',
        icon: 'fa-brain',
        color: 'bg-purple-500'
    },
    adhd: {
        title: 'ADHD Friendly Mode',
        desc: 'Focus mask and reduced distractions.',
        icon: 'fa-low-vision',
        color: 'bg-green-500'
    },
    blindness: {
        title: 'Blindness Mode',
        desc: 'Optimizes site for screen readers.',
        icon: 'fa-braille',
        color: 'bg-blue-600'
    }
};

export default function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [hiddenForever, setHiddenForever] = useState(false);
    const [config, setConfig] = useState({
        epilepsy: false,
        visuallyImpaired: false,
        cognitive: false,
        adhd: false,
        blindness: false,
    });

    // 1. Load Initial State
    useEffect(() => {
        const saved = localStorage.getItem('sbh-a11y-config');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed) setConfig(parsed);
            } catch (e) { console.error("A11y Load Error", e); }
        }
        if (localStorage.getItem('sbh-a11y-hidden') === 'true') setHiddenForever(true);
    }, []);

    // 2. Apply Styles Globally
    useEffect(() => {
        localStorage.setItem('sbh-a11y-config', JSON.stringify(config));

        const id = 'sbh-a11y-styles';
        let styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = id;
            document.head.appendChild(styleTag);
        }

        let css = '';
        if (config.epilepsy) {
            css += `*,*:before,*:after{transition:none!important;animation:none!important;scroll-behavior:auto!important;} body{filter:saturate(0.5);}`;
        }
        if (config.visuallyImpaired) {
            css += `body{filter:contrast(125%) saturate(110%)!important;} h1,h2,h3,h4,h5,h6,p,a,span{font-weight:700!important;}`;
        }
        if (config.cognitive) {
            css += `a:hover,button:hover{outline:3px solid #3b82f6!important;outline-offset:2px!important;background-color:#eff6ff!important;color:#1e40af!important;}`;
        }
        if (config.blindness) {
            css += `html{font-size:115%!important;} p,a,li{line-height:1.8!important;letter-spacing:0.5px!important;}`;
        }

        styleTag.innerHTML = css;
    }, [config]);

    // 3. ADHD Mouse Tracking Logic
    const handleMouseMove = useCallback((e) => {
        if (config.adhd) {
            document.documentElement.style.setProperty('--a11y-mouse-y', `${e.clientY}px`);
        }
    }, [config.adhd]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    const toggleMode = (key) => {
        setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetSettings = () => {
        setConfig({ epilepsy: false, visuallyImpaired: false, cognitive: false, adhd: false, blindness: false });
    };

    if (hiddenForever) return null;

    return (
        <>
            {/* ADHD FOCUS MASK OVERLAY */}
            {config.adhd && (
                <div
                    className="fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) calc(var(--a11y-mouse-y, 50vh) - 70px), transparent calc(var(--a11y-mouse-y, 50vh) - 70px), transparent calc(var(--a11y-mouse-y, 50vh) + 70px), rgba(0,0,0,0.6) calc(var(--a11y-mouse-y, 50vh) + 70px), rgba(0,0,0,0.6) 100%)'
                    }}
                />
            )}

            {/* MAIN FLOATING BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed z-[9999] bottom-6 left-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group ${isOpen ? 'bg-white text-blue-600' : 'bg-[#2152ff] text-white'}`}
                aria-label="Accessibility Menu"
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-universal-access'} text-2xl`}></i>
                {/* Tooltip on Hover */}
                {!isOpen && (
                    <span className="absolute left-20 bg-gray-900 text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                        Accessibility Options
                    </span>
                )}
            </button>

            {/* ACCESSIBILITY PANEL */}
            {isOpen && (
                <div className="fixed z-[9999] bottom-28 left-6 w-[400px] max-w-[calc(100vw-48px)] bg-[#1a1d23]/95 backdrop-blur-xl rounded-[2rem] text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                    {/* Header */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <i className="fas fa-universal-access text-2xl"></i>
                                </div>
                                <div>
                                    <h2 className="text-xl font-extrabold tracking-tight">Accessibility</h2>
                                    <p className="text-blue-100 text-xs font-medium">SBH BOGOR HUSADA Interface</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                        <div className="grid gap-4">
                            {Object.entries(MODES).map(([key, info]) => (
                                <div
                                    key={key}
                                    onClick={() => toggleMode(key)}
                                    className={`relative group flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${config[key]
                                        ? 'bg-blue-600/20 border-blue-500/50 shadow-inner'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${config[key] ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                                        <i className={`fas ${info.icon} text-lg`}></i>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-[15px]">{info.title}</h3>
                                            {/* Custom Switch Visual */}
                                            <div className={`w-10 h-5 rounded-full transition-colors relative ${config[key] ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config[key] ? 'left-6' : 'left-1'}`}></div>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-xs mt-1 leading-snug">{info.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Control Buttons */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <button
                                onClick={resetSettings}
                                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold transition-all active:scale-95"
                            >
                                <i className="fas fa-sync-alt text-xs"></i> Reset
                            </button>
                            <button
                                onClick={() => { resetSettings(); setHiddenForever(true); localStorage.setItem('sbh-a11y-hidden', 'true'); }}
                                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 hover:bg-red-500/20 border border-white/10 text-sm font-bold transition-all hover:text-red-400"
                            >
                                <i className="fas fa-eye-slash text-xs"></i> Hide Widget
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <a href="#" className="text-[10px] text-gray-500 uppercase tracking-[2px] hover:text-blue-400 transition font-bold">
                                Accessibility Statement
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}