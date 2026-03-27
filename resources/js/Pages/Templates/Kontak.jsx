import React from 'react';

export default function Kontak() {
    return (
        <div className="py-16 md:py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-full text-sm mb-4 tracking-wide uppercase">
                                Call Center
                            </span>
                            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">Berikan Saran <br />Atau <span className="text-indigo-600">Pertanyaan</span></h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Kami selalu siap membantu Anda. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan seputar pendaftaran, program studi, atau kerjasama.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-phone-alt text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Telepon</h4>
                                    <p className="text-gray-500">(0251) 8355xxx</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fab fa-whatsapp text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">WhatsApp</h4>
                                    <p className="text-gray-500">+62 812-xxxx-xxxx</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 sm:col-span-2">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-map-marker-alt text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Alamat Kampus</h4>
                                    <p className="text-gray-500">Jl. Letjen Ibrahim Adjie No. 180, Sindangbarang, Kota Bogor, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Block / Maps */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-indigo-100/50 border border-gray-200 relative">
                        {/* Kita bisa embed maps Google disini */}
                        <div className="h-full min-h-[400px] w-full bg-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3963.456673898031!2d106.7720235!3d-6.5899981!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5ec82d1c699%3A0xc3f848fd2f3922d4!2sSTIKes%20Bogor%20Husada!5e0!3m2!1sid!2sid!4v1709403330364!5m2!1sid!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '100%' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
