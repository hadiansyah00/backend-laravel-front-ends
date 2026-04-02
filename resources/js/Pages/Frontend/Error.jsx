import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Layanan Tidak Tersedia',
        500: '500: Kesalahan Server',
        404: '404: Halaman Tidak Ditemukan',
        403: '403: Akses Ditolak',
    }[status] || 'Error';

    const description = {
        503: 'Maaf, kami sedang melakukan perawatan server. Silakan coba beberapa saat lagi.',
        500: 'Whoops, sesuatu berjalan tidak semestinya pada server kami.',
        404: 'Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin telah dihapus atau URL-nya salah.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status] || 'Terjadi kesalahan yang tidak terduga pada halaman yang Anda kunjungi.';

    const icon = {
        503: 'fas fa-tools text-orange-400',
        500: 'fas fa-server text-red-500',
        404: 'fas fa-compass text-blue-500',
        403: 'fas fa-lock text-yellow-500',
    }[status] || 'fas fa-exclamation-triangle text-gray-400';

    return (
        <MainLayout title={`${title} | STIKes Bogor Husada`}>
            <Head>
                <title>{`${title} | STIKes Bogor Husada`}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <section className="min-h-screen py-32 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white" style={{ opacity: 0.8, backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="container relative z-10 px-4 mx-auto text-center max-w-2xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-8 border border-gray-100">
                        <i className={`${icon} text-6xl md:text-7xl`}></i>
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400 mb-2 drop-shadow-sm">
                        {status || 'Error'}
                    </h1>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-display">
                        {title.split(': ')[1] || title}
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-600 mb-10 font-medium leading-relaxed max-w-lg mx-auto">
                        {description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 hover:text-orange-600 font-bold rounded-xl shadow-sm border border-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-arrow-left"></i> Kembali ke Sebelumnya
                        </button>
                        
                        <Link 
                            href="/"
                            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-home"></i> Beranda
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
