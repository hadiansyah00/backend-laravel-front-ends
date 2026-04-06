import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * SplashScreen — Premium animated logo splash for STIKes Bogor Husada
 * 
 * Sequence:
 * 1. Dark backdrop fades in
 * 2. Glowing ring appears behind the logo
 * 3. Logo scales in with spring animation
 * 4. "s | b | h" letters animate one-by-one
 * 5. Full institution name types in
 * 6. Progress bar fills
 * 7. Everything fades out gracefully
 */
export default function SplashScreen({ onFinish, minimumDuration = 2200 }) {
    const [phase, setPhase] = useState(0); // 0=mount, 1=logo, 2=text, 3=bar, 4=exit, 5=done
    const [progress, setProgress] = useState(0);
    const startTime = useRef(Date.now());
    const frameRef = useRef(null);

    // Progress bar animation
    const animateProgress = useCallback(() => {
        const elapsed = Date.now() - startTime.current;
        const pct = Math.min((elapsed / minimumDuration) * 100, 100);
        setProgress(pct);

        if (pct < 100) {
            frameRef.current = requestAnimationFrame(animateProgress);
        }
    }, [minimumDuration]);

    useEffect(() => {
        // Sequence timing
        const timers = [
            setTimeout(() => setPhase(1), 100),    // Logo appear
            setTimeout(() => setPhase(2), 600),     // Text appear
            setTimeout(() => setPhase(3), 1100),    // Progress bar
        ];

        // Start progress animation
        startTime.current = Date.now();
        frameRef.current = requestAnimationFrame(animateProgress);

        // Finish after minimum duration
        const exitTimer = setTimeout(() => {
            setPhase(4); // Start exit
            setTimeout(() => {
                setPhase(5);
                onFinish?.();
            }, 500); // Exit animation duration
        }, minimumDuration);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(exitTimer);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [minimumDuration, onFinish, animateProgress]);

    if (phase === 5) return null;

    return (
        <div className={`splash-screen ${phase >= 4 ? 'splash-screen--exit' : ''}`}>
            {/* Animated background particles */}
            <div className="splash-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="splash-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="splash-center">
                {/* Glowing ring behind logo */}
                <div className={`splash-ring ${phase >= 1 ? 'splash-ring--visible' : ''}`}>
                    <div className="splash-ring__inner"></div>
                </div>

                {/* Logo */}
                <div className={`splash-logo ${phase >= 1 ? 'splash-logo--visible' : ''}`}>
                    <img
                        src="/assets/img/icon/logo-bulet-sbh.png"
                        alt="STIKes Bogor Husada"
                        className="splash-logo__img"
                        draggable="false"
                    />
                </div>

                {/* Animated S | B | H Letters */}
                <div className={`splash-letters ${phase >= 2 ? 'splash-letters--visible' : ''}`}>
                    <span className="splash-letter" style={{ animationDelay: '0s' }}>s</span>
                    <span className="splash-letter-divider" style={{ animationDelay: '0.15s' }}>|</span>
                    <span className="splash-letter" style={{ animationDelay: '0.3s' }}>b</span>
                    <span className="splash-letter-divider" style={{ animationDelay: '0.45s' }}>|</span>
                    <span className="splash-letter" style={{ animationDelay: '0.6s' }}>h</span>
                </div>

                {/* Institution Name */}
                <div className={`splash-name ${phase >= 2 ? 'splash-name--visible' : ''}`}>
                    <span className="splash-name__line1">Sekolah Tinggi Ilmu Kesehatan</span>
                    <span className="splash-name__line2">BOGOR HUSADA</span>
                </div>

                {/* Progress Bar */}
                <div className={`splash-progress ${phase >= 3 ? 'splash-progress--visible' : ''}`}>
                    <div className="splash-progress__track">
                        <div
                            className="splash-progress__fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="splash-progress__text">Memuat...</span>
                </div>
            </div>

            <style>{`
                .splash-screen {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0c1220 100%);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                    overflow: hidden;
                }
                .splash-screen--exit {
                    opacity: 0;
                    transform: scale(1.05);
                    pointer-events: none;
                }

                /* ===== PARTICLES ===== */
                .splash-particles {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }
                .splash-particle {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%);
                    animation: splash-float ease-in-out infinite;
                }
                @keyframes splash-float {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
                    50% { transform: translateY(-40px) scale(1.5); opacity: 0.7; }
                }

                /* ===== CENTER ===== */
                .splash-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 10;
                }

                /* ===== GLOWING RING ===== */
                .splash-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 180px;
                    height: 180px;
                    margin-left: -90px;
                    margin-top: -130px;
                    opacity: 0;
                    transform: scale(0.5);
                    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .splash-ring--visible {
                    opacity: 1;
                    transform: scale(1);
                }
                .splash-ring__inner {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid rgba(249,115,22,0.15);
                    box-shadow:
                        0 0 40px rgba(249,115,22,0.1),
                        0 0 80px rgba(249,115,22,0.05),
                        inset 0 0 30px rgba(249,115,22,0.05);
                    animation: splash-ringPulse 2.5s ease-in-out infinite;
                }
                @keyframes splash-ringPulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.12); opacity: 1; }
                }

                /* ===== LOGO ===== */
                .splash-logo {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    opacity: 0;
                    transform: scale(0.3) rotate(-10deg);
                    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow:
                        0 8px 32px rgba(0,0,0,0.3),
                        0 0 0 3px rgba(249,115,22,0.2);
                    margin-bottom: 2rem;
                    background: #fff;
                }
                .splash-logo--visible {
                    opacity: 1;
                    transform: scale(1) rotate(0deg);
                }
                .splash-logo__img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    padding: 8px;
                }

                /* ===== LETTERS s | b | h ===== */
                .splash-letters {
                    display: flex;
                    align-items: center;
                    gap: 0.15rem;
                    margin-bottom: 0.75rem;
                    height: 52px;
                }
                .splash-letter {
                    font-family: 'Georgia', 'Times New Roman', serif;
                    font-size: 2.8rem;
                    font-weight: 400;
                    color: #f97316;
                    opacity: 0;
                    transform: translateY(20px) scale(0.5);
                    display: inline-block;
                    letter-spacing: -1px;
                }
                .splash-letters--visible .splash-letter {
                    animation: splash-letterIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .splash-letter-divider {
                    font-family: 'Georgia', serif;
                    font-size: 2.8rem;
                    font-weight: 100;
                    color: rgba(249,115,22,0.4);
                    opacity: 0;
                    transform: scaleY(0);
                    display: inline-block;
                    margin: 0 2px;
                }
                .splash-letters--visible .splash-letter-divider {
                    animation: splash-dividerIn 0.4s ease forwards;
                }
                @keyframes splash-letterIn {
                    0% { opacity: 0; transform: translateY(20px) scale(0.5); }
                    60% { opacity: 1; transform: translateY(-4px) scale(1.1); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes splash-dividerIn {
                    0% { opacity: 0; transform: scaleY(0); }
                    100% { opacity: 1; transform: scaleY(1); }
                }

                /* ===== INSTITUTION NAME ===== */
                .splash-name {
                    text-align: center;
                    margin-bottom: 2.5rem;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s;
                }
                .splash-name--visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .splash-name__line1 {
                    display: block;
                    font-family: 'Georgia', serif;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.5);
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    margin-bottom: 0.2rem;
                }
                .splash-name__line2 {
                    display: block;
                    font-family: 'Georgia', serif;
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.85);
                    font-weight: 700;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                }

                /* ===== PROGRESS BAR ===== */
                .splash-progress {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    width: 200px;
                    opacity: 0;
                    transform: translateY(8px);
                    transition: opacity 0.4s ease, transform 0.4s ease;
                }
                .splash-progress--visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .splash-progress__track {
                    width: 100%;
                    height: 3px;
                    background: rgba(255,255,255,0.08);
                    border-radius: 10px;
                    overflow: hidden;
                }
                .splash-progress__fill {
                    height: 100%;
                    background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
                    border-radius: 10px;
                    transition: width 0.15s linear;
                    box-shadow: 0 0 8px rgba(249,115,22,0.5);
                    background-size: 200% 100%;
                    animation: splash-progressShimmer 1.5s linear infinite;
                }
                @keyframes splash-progressShimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                .splash-progress__text {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.35);
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 480px) {
                    .splash-logo {
                        width: 90px;
                        height: 90px;
                    }
                    .splash-ring {
                        width: 140px;
                        height: 140px;
                        margin-left: -70px;
                        margin-top: -110px;
                    }
                    .splash-letter, .splash-letter-divider {
                        font-size: 2.2rem;
                    }
                    .splash-name__line1 { font-size: 0.65rem; }
                    .splash-name__line2 { font-size: 0.85rem; }
                    .splash-progress { width: 160px; }
                }
            `}</style>
        </div>
    );
}
