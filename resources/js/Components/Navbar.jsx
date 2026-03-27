import React, { useState, useEffect, useRef } from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Navbar() {
    const { settings, menus } = usePage().props;
    const [atTop, setAtTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const searchInputRef = useRef(null);

    // Menghitung status scroll dan visibilitas footer
    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY < 10);
        };

        window.addEventListener('scroll', handleScroll);

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

    // Tutup search dengan escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const socials = [
        { icon: 'fab fa-instagram', url: 'https://www.instagram.com/stikesbogorhusada/' },
        { icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@stikesbogorhusada' },
        { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/stikesboda' },
        { icon: 'fab fa-youtube', url: 'https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA' },
    ];

    const contacts = [
        { icon: 'fab fa-whatsapp', text: '0811-1011-1560', url: 'https://wa.me/6281110111560' },
    ];

    const getLogoUrl = () => {
        if (atTop && !isMobileMenuOpen) {
            return settings?.logo_main ? `/storage/${settings.logo_main}` : '/assets/img/icon/logo_sbh_persegi.png';
        }
        return settings?.logo_sticky ? `/storage/${settings.logo_sticky}` : '/assets/img/icon/logo_sbh_persegi.png';
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!atTop ? '-translate-y-10' : ''}`}>
            {/* Top Bar */}
            <div className="w-full text-white bg-orange-600 shadow-sm">
                <div className="container flex flex-col items-center justify-between gap-2 px-4 py-2 mx-auto md:flex-row md:gap-0">
                    <div className="flex items-center space-x-5">
                        {socials.map((social, idx) => (
                            <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
                                <i className={`${social.icon} text-lg`}></i>
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                        <div className="flex items-center space-x-6">
                            {contacts.map((contact, idx) => (
                                <a key={idx} href={contact.url} className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                                    <i className={`${contact.icon} text-base`}></i>
                                    <span className="hidden text-xs font-semibold sm:inline">{contact.text}</span>
                                </a>
                            ))}
                        </div>
                        <a href="https://pmb.sbh.ac.id/" className="px-5 py-1.5 text-xs font-bold text-orange-700 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-orange-100 hover:shadow-lg">
                            Pendaftaran PMB
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <nav className="fixed left-0 right-0 z-40 w-full h-16 transition-all duration-300 shadow-md top-10 bg-white/95 backdrop-blur-sm">
                <div className={`container flex items-center justify-between px-6 mx-auto transition-all duration-300 ${atTop && !isMobileMenuOpen ? 'py-4' : 'py-2'}`}>

                    {/* Logo */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="z-50">
                        <img src={getLogoUrl()} alt="Logo" className="h-[30px] w-auto transition-all" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="items-center hidden space-x-6 text-sm font-semibold text-gray-700 md:flex">
                        <Link href="/" className="py-2 transition-colors hover:text-orange-600">
                            Beranda
                        </Link>
                        {menus?.map((menu) => (
                            <MenuItem key={menu.id} menu={menu} variant="desktop" />
                        ))}

                        {/* Search Icon Form */}
                        <form action="/search" method="GET" className="relative">
                            <input type="text" name="q" placeholder="Cari..." className="px-3 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                            <button type="submit" className="absolute text-gray-500 -translate-y-1/2 right-2 top-1/2 hover:text-orange-600">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className={`fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-sm shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ${isFooterVisible ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                    <Link href="/" className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 hover:text-orange-600">
                        <i className="mb-1 text-lg fas fa-home"></i>
                        <span className="text-xs">Home</span>
                    </Link>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 hover:text-orange-600">
                        <i className="mb-1 text-lg fas fa-bars"></i>
                        <span className="text-xs">Menu</span>
                    </button>

                    <button onClick={() => { setIsSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }} type="button" className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 hover:text-orange-600">
                        <i className="mb-1 text-lg fas fa-search"></i>
                        <span className="text-xs">Cari</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="fixed inset-0 z-50 flex flex-col w-full max-w-sm ml-auto overflow-y-auto bg-white shadow-lg animate-slide-left md:hidden">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="flex flex-col p-4 mt-2 space-y-1">
                            <div className="border-b border-gray-100">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 font-semibold text-gray-700 transition-colors hover:text-orange-600">
                                    Beranda
                                </Link>
                            </div>
                            {menus?.map((menu) => (
                                <MenuItem key={menu.id} menu={menu} variant="mobile" onClose={() => setIsMobileMenuOpen(false)} />
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Search Modal Pop up */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-gray-900/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg p-4 bg-white shadow-lg animate-fade-in rounded-xl">
                        <form action="/search" method="GET" className="relative">
                            <input ref={searchInputRef} type="text" name="q" placeholder="Ketikkan kata kunci..." className="w-full py-3 pl-4 pr-12 text-base text-gray-800 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500" />
                            <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 transition-colors rounded-r-lg hover:text-orange-600">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <p className="mt-2 text-xs text-center text-gray-500">Tekan 'Esc' untuk menutup</p>
                    </div>
                    <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
                </div>
            )}
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

        if (m.slug && customRoutes[m.slug]) {
            return customRoutes[m.slug];
        }

        return m.slug ? `/${m.slug}` : '#';
    };

    if (variant === 'desktop') {
        if (hasChildren) {
            return (
                <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    <button type="button" className="flex items-center py-2 transition-colors hover:text-orange-600 focus:outline-none">
                        {menu.name}
                        <i className={`fas fa-chevron-down ml-1 text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`}></i>
                    </button>

                    {/* Menggunakan transition agar menu tidak tampil kaku */}
                    <div className={`absolute left-0 min-w-[200px] py-3 mt-0 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] top-full z-[100] transition-all duration-200 origin-top-left ${isOpen ? 'opacity-100 scale-100 pointer-events-auto visible' : 'opacity-0 scale-95 pointer-events-none invisible'}`}>
                        {menu.children.map(child => (
                            <Link key={child.id} href={getUrl(child)} className="block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600 hover:pl-6">
                                {child.name}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <Link href={getUrl(menu)} className="py-2 transition-colors hover:text-orange-600">
                {menu.name}
            </Link>
        );
    } else {
        // Mobile
        if (hasChildren) {
            return (
                <div className="text-gray-700 border-b border-gray-100 last:border-0">
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="flex items-center justify-between w-full py-3 font-semibold transition-colors hover:text-orange-600 focus:outline-none">
                        <span>{menu.name}</span>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                            <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                        </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                        <div className="pt-1 pb-2 pl-4 space-y-1 border-l-2 border-orange-100 ml-2">
                            {menu.children.map(child => (
                                <Link key={child.id} href={getUrl(child)} onClick={onClose} className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-600 hover:translate-x-1">
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="border-b border-gray-100 last:border-0">
                <Link href={getUrl(menu)} onClick={onClose} className="block py-3 font-semibold text-gray-700 transition-colors hover:text-orange-600">
                    {menu.name}
                </Link>
            </div>
        );
    }
}
