import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Galeri() {
    return (
        <MainLayout title="Galeri Kampus">
            <Head title="Galeri Kampus" />
            <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
                <div className="container px-6 mx-auto lg:px-12">
                    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-3xl text-center">
                        <i className="fas fa-images text-6xl text-orange-500 mb-6"></i>
                        <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl mb-6">
                            Galeri Kampus
                        </h1>
                        <div className="w-24 h-1.5 mx-auto mt-6 mb-8 bg-orange-600 rounded-full"></div>
                        <p className="text-gray-500 text-lg">Dokumentasi kegiatan dan fasilitas kampus sedang dalam penyusunan.</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
