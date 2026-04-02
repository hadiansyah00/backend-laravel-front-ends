import React, { useState, useEffect, useRef } from 'react';
import { usePage, Link, router } from '@inertiajs/react';

export default function Navbar() {
    const { settings, menus } = usePage().props;
    const [atTop, setAtTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const searchInputRef = useRef(null);

    // Menghitung status scroll dan visibilitas footer
    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY < 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        const footer = document.querySelector('#page-footer') || document.querySelector('#footer');
        if (footer && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                ([e]) => { setIsFooterVisible(e.isIntersecting); },
                { threshold: [0.1] }
            );
            observer.observe(footer);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                observer.unobserve(footer);
            };
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Tutup search dengan escape & auto-focus
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        if (isSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 100);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isSearchOpen]);

    // Handle Form Pencarian Inertia Route
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery });
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const socials = [
        { icon: 'fab fa-instagram', url: 'https://www.instagram.com/stikesbogorhusada/', label: 'Instagram' },
        { icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@stikesbogorhusada', label: 'TikTok' },
        { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/stikesboda', label: 'Facebook' },
        { icon: 'fab fa-youtube', url: 'https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA', label: 'YouTube' },
    ];

    const getLogoUrl = () => {
        if (atTop && !isMobileMenuOpen) {
            return settings?.logo_main ? `/storage/${settings.logo_main}` : '/assets/img/icon/logo_sbh_persegi.png';
        }
        return settings?.logo_sticky ? `/storage/${settings.logo_sticky}` : '/assets/img/icon/logo_sbh_persegi.png';
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${!atTop ? '-translate-y-10' : ''}`}>
            {/* Top Bar - Sleek & Modern */}
            <div className="w-full text-white bg-gradient-to-r from-orange-800 via-orange-700 to-orange-600 relative z-50 overflow-hidden">
                {/* Subtle animated shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_6s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }}></div>

                <div className="container relative flex items-center justify-between px-6 py-2 mx-auto max-w-7xl">
                    {/* Left: Social Icons */}
                    <div className="hidden md:flex items-center gap-1">
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300 text-xs"
                            >
                                <i className={social.icon}></i>
                            </a>
                        ))}
                        <span className="w-px h-4 bg-white/20 mx-2"></span>
                        <span className="text-[11px] text-white/60 font-medium tracking-wide">
                            <i className="fas fa-envelope mr-1.5 text-[10px]"></i>info@sbh.ac.id
                        </span>
                    </div>

                    {/* Center: Running Text (mobile shows this) */}
                    <div className="flex-1 md:flex-initial overflow-hidden mx-4">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-white/80 whitespace-nowrap animate-[marquee_25s_linear_infinite] md:animate-none">
                            <i className="fas fa-graduation-cap text-orange-300 text-[10px]"></i>
                            <span>Selamat Datang di Website Resmi STIKes Bogor Husada</span>
                            <span className="hidden md:inline text-white/40 mx-2">•</span>
                            <span className="hidden md:inline">Kampus Unggulan Bidang Kesehatan di Kota Bogor</span>
                        </div>
                    </div>

                    {/* Right: PMB CTA */}
                    <a
                        href="https://pmb.sbh.ac.id/"
                        target="_blank"
                        rel="noreferrer"
                        className="relative group flex items-center gap-2 px-4 py-1.5 text-[11px] font-extrabold tracking-wider text-orange-700 uppercase bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                    >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-200/50 to-yellow-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <i className="fas fa-user-plus relative text-[10px] text-orange-500 group-hover:text-orange-600 transition-colors"></i>
                        <span className="relative hidden sm:inline">Pendaftaran PMB</span>
                        <span className="relative sm:hidden">PMB</span>
                    </a>
                </div>
            </div>

            {/* Main Nav - Modern Backdrop Blur */}
            <nav className={`fixed left-0 right-0 z-40 w-full transition-all duration-500 ease-in-out top-10 border-b border-gray-100/50 ${atTop ? 'bg-white/95 shadow-sm' : 'bg-white/80 backdrop-blur-lg shadow-md'}`}>
                <div className={`container flex items-center justify-between px-6 mx-auto max-w-7xl transition-all duration-500 ${atTop && !isMobileMenuOpen ? 'h-24 py-4' : 'h-20 py-2'}`}>

                    {/* Logo */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="relative z-50 flex-shrink-0 group mr-4 md:mr-8">
                        <img src={getLogoUrl()} alt="Logo SBH" className="h-[40px] md:h-[50px] max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-105" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="items-center hidden gap-3 lg:gap-5 xl:gap-7 text-[13px] xl:text-[14px] font-bold tracking-tight text-gray-700 md:flex flex-1 justify-end">
                        <Link href="/" className="relative py-2 transition-colors hover:text-orange-600 group whitespace-nowrap">
                            Beranda
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                        
                        {menus?.map((menu) => (
                            <MenuItem key={menu.id} menu={menu} variant="desktop" />
                        ))}

                        {/* Search Bar Desktop (Pill Shape Focus) */}
                        <form onSubmit={handleSearch} className="relative flex items-center ml-2 xl:ml-4 group">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari..." 
                                className="w-28 lg:w-36 xl:w-44 px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-gray-100/80 border-transparent rounded-full focus:w-48 lg:focus:w-56 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 placeholder-gray-400 focus:shadow-sm outline-none" 
                            />
                            <button type="submit" className="absolute right-1 w-8 h-8 flex items-center justify-center text-gray-400 bg-transparent rounded-full hover:text-white hover:bg-orange-600 transition-colors active:scale-95">
                                <i className="fas fa-search text-xs"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation - Aesthetic Iconography */}
            <div className={`fixed bottom-0 left-0 right-0 z-[90] h-[72px] bg-white/95 backdrop-blur-md shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.08)] md:hidden transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isFooterVisible ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="flex items-center justify-around h-full max-w-md mx-auto font-medium">
                    <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-gray-500 transition-colors active:bg-gray-50 hover:text-orange-600 group">
                        <i className="mb-1.5 text-xl fas fa-home group-hover:-translate-y-1 transition-transform"></i>
                        <span className="text-[10px] uppercase tracking-wider font-bold">Home</span>
                    </Link>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className={`flex flex-col items-center justify-center w-full h-full transition-colors active:bg-gray-50 group ${isMobileMenuOpen ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'}`}>
                        <div className="relative mb-1.5 w-6 h-6 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                            <i className={`text-xl transition-all duration-300 absolute ${isMobileMenuOpen ? 'fas fa-times scale-100 opacity-100 rotate-90' : 'fas fa-bars scale-100 opacity-100 rotate-0'}`}></i>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold">{isMobileMenuOpen ? 'Tutup' : 'Menu'}</span>
                    </button>

                    <button onClick={() => { setIsSearchOpen(true); }} type="button" className="flex flex-col items-center justify-center w-full h-full text-gray-500 transition-colors active:bg-gray-50 hover:text-orange-600 group">
                        <i className="mb-1.5 text-xl fas fa-search group-hover:-translate-y-1 transition-transform"></i>
                        <span className="text-[10px] uppercase tracking-wider font-bold">Cari</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel - Elegant Slide-over */}
            <div className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
            
            <div className={`fixed inset-y-0 right-0 z-50 flex flex-col w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900">Eksplorasi</h2>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-gray-800">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="flex flex-col px-4 py-2 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar pb-24">
                    <div className="mb-2">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-3.5 text-base font-bold text-gray-800 transition-colors rounded-xl hover:bg-orange-50 hover:text-orange-600">
                            <i className="w-6 text-orange-500 fas fa-home opacity-70"></i>Beranda
                        </Link>
                    </div>
                    {menus?.map((menu) => (
                        <MenuItem key={menu.id} menu={menu} variant="mobile" onClose={() => setIsMobileMenuOpen(false)} />
                    ))}
                </div>
            </div>

            {/* Search Modal Pop up - Redesigned cleanly */}
            <div className={`fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 bg-gray-900/50 backdrop-blur-md transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
                
                <div className={`relative w-full max-w-xl mx-4 transition-all duration-500 ${isSearchOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
                    <div className="p-6 overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Pencarian</h3>
                            <button onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <i className="text-lg fas fa-times"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSearch} className="relative">
                            <input 
                                ref={searchInputRef} 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ketikkan layanan, artikel, atau pengumuman..." 
                                className="w-full py-4 pl-6 pr-16 text-lg text-gray-800 transition-all bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 placeholder:text-gray-400 shadow-inner" 
                            />
                            <button type="submit" className="absolute inset-y-2 right-2 flex items-center justify-center px-5 text-white transition-all bg-orange-600 rounded-xl hover:bg-orange-700 active:scale-95 shadow-md hover:shadow-lg">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        
                        <p className="flex items-center justify-center gap-2 mt-5 text-xs font-semibold text-center text-gray-400">
                            <i className="fas fa-keyboard opacity-60"></i> Tekan <kbd className="px-2 py-0.5 border border-gray-200 rounded-md bg-gray-100 text-[10px] shadow-sm text-gray-500 font-sans">Esc</kbd> untuk kembali
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Komponen Pembantu (MenuItem)
function MenuItem({ menu, variant, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = menu.children && menu.children.length > 0;

    // helper untuk resolver string link
    const getUrl = (m) => {
        if (m.type === 'link') return m.url;
        
        // Pengecualian (Override) untuk sub-menu Tentang Kami yang sekarang pakai dedicated routes
        const customRoutes = {
            'profil-stikes': '/tentang/profil-stikes',
            'sambutan-ketua': '/tentang/sambutan-ketua',
            'visi-misi': '/tentang/visi-misi',
            'sejarah': '/tentang/sejarah',
            'struktur-organisasi': '/tentang/struktur-organisasi'
        };

        if (m.slug && customRoutes[m.slug]) return customRoutes[m.slug];
        return m.slug ? `/${m.slug}` : '#';
    };

    if (variant === 'desktop') {
        if (hasChildren) {
            return (
                <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    <button type="button" className={`relative py-2 flex items-center transition-colors focus:outline-none whitespace-nowrap ${isOpen ? 'text-orange-600' : 'hover:text-orange-600'}`}>
                        {menu.name}
                        <i className={`fas fa-chevron-down ml-1.5 text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-600' : 'text-gray-400'}`}></i>
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-600 transition-all duration-300 ease-out ${isOpen ? 'w-full' : 'w-0'}`}></span>
                    </button>

                    <div className={`absolute left-0 min-w-[240px] pt-5 z-[100] transition-all duration-300 origin-top-left ${isOpen ? 'opacity-100 translate-y-0 visible shadow-xl' : 'opacity-0 translate-y-4 invisible pointer-events-none'}`}>
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] overflow-hidden py-3 relative before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-orange-500">
                            {menu.children.map(child => (
                                <Link key={child.id} href={getUrl(child)} className="block px-6 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:bg-orange-50 hover:text-orange-600 relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-orange-500 before:transition-transform before:scale-y-0 hover:before:scale-y-100 hover:pl-8 whitespace-nowrap">
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Link href={getUrl(menu)} className="relative py-2 transition-colors hover:text-orange-600 group text-sm font-bold tracking-tight whitespace-nowrap">
                {menu.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
        );
    } else {
        // Mobile Layout Modernizations
        if (hasChildren) {
            return (
                <div className="mb-2">
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className={`flex items-center justify-between w-full px-4 py-3.5 text-base font-bold transition-all rounded-xl focus:outline-none ${isOpen ? 'bg-orange-50 text-orange-600' : 'text-gray-800 hover:bg-gray-50'}`}>
                        <span>{menu.name}</span>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isOpen ? 'bg-orange-100/50 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                            <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                        </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                        <div className="py-2 pl-6 ml-4 space-y-1 border-l-2 border-orange-100/50">
                            {menu.children.map(child => (
                                <Link key={child.id} href={getUrl(child)} onClick={onClose} className="block px-4 py-2.5 text-sm font-semibold text-gray-500 transition-all rounded-lg hover:bg-orange-50 hover:text-orange-600 hover:translate-x-1">
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="mb-2">
                <Link href={getUrl(menu)} onClick={onClose} className="block px-4 py-3.5 text-base font-bold text-gray-800 transition-all rounded-xl hover:bg-orange-50 hover:text-orange-600">
                    {menu.name}
                </Link>
            </div>
        );
    }
}
