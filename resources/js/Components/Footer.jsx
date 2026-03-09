import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { settings } = usePage().props;

    const partners = [
        {
            logo: '/assets/img/icon/logo_putih_sbh.png',
            alt: 'Sekolah Tinggi Ilmu Kesehatan Bogor Husada'
        },
        {
            logo: '/assets/img/icon/logo_putih_diktisaintek.webp',
            url: 'https://kemdiktisaintek.go.id/',
            alt: 'DIKTISAINTEK BERDAMPAK'
        },
        {
            logo: '/assets/img/icon/rs-azra.png',
            url: 'https://rsazra.co.id/',
            alt: 'Rumah Sakit AZRA Bogor'
        },
        {
            logo: '/assets/img/icon/logo-tagline-sbh.png',
            alt: 'Sustainable Development Goals'
        },
    ];

    const footerLinks = settings?.footer_links ? JSON.parse(settings.footer_links) : [];
    const socials = settings?.social_links ? JSON.parse(settings.social_links) : [];

    return (
        <footer className="text-white" id="page-footer">
            {/* Partner Logos */}
            <div className="bg-orange-700">
                <div className="container px-6 py-8 mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:justify-around">
                        {partners.map((partner, index) => (
                            partner.url ? (
                                <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="block">
                                    <img src={partner.logo} alt={partner.alt} className="h-10 transition duration-300 md:h-12 opacity-80 hover:opacity-100" />
                                </a>
                            ) : (
                                <div key={index} className="block">
                                    <img src={partner.logo} alt={partner.alt} className="h-10 transition duration-300 md:h-12 opacity-80 hover:opacity-100" />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Links Area */}
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
                <div className="container px-6 py-12 mx-auto">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Contact Info */}
                        <div>
                            <p className="mt-4 text-sm text-white">
                                {settings?.contact_address || 'TBA'}
                            </p>
                            <div className="mt-4 space-y-2 text-sm">
                                <a href={`tel:${settings?.contact_phone_link || '#'}`} className="flex items-center gap-2 text-white transition-colors duration-300 hover:text-orange-400">
                                    <i className="fas fa-phone"></i>
                                    <span>{settings?.contact_phone || 'TBA'}</span>
                                </a>
                                <a href={`mailto:${settings?.contact_email_link || '#'}`} className="flex items-center gap-2 text-white transition-colors duration-300 hover:text-orange-400">
                                    <i className="fas fa-envelope"></i>
                                    <span>{settings?.contact_email || 'TBA'}</span>
                                </a>
                            </div>
                        </div>

                        {/* Footer Links from Settings */}
                        {footerLinks.map((group, groupIdx) => (
                            <div key={groupIdx}>
                                <h3 className="font-semibold text-white uppercase">{group.title}</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {group.links?.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a href={link.url || '#'} className="text-gray-300 transition-colors duration-300 hover:text-white">
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <hr className="my-10 border-gray-600" />

                    {/* Copyright & Socials */}
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                        <p className="text-sm text-gray-300">
                            {settings?.copyright_text || `© Copyright ${new Date().getFullYear()}. All Rights Reserved.`}
                        </p>

                        <div className="flex items-center mt-4 -mx-2 sm:mt-0">
                            {socials.map((social, idx) => (
                                <a key={idx} href={social.url || '#'} className="px-2 text-gray-300 transition-colors duration-300 hover:text-white" aria-label={social.name}>
                                    <i className={`${social.icon} w-5 h-5`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
