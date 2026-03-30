import React, { useState } from 'react';

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false);

    // Nomor WhatsApp Admin (pastikan menggunakan format 62 tanpa + atau 0)
    const ADMINS = [
        {
            id: 1,
            name: "Admin Informasi Akademik",
            role: "Penerimaan Mahasiswa Baru",
            phone: "6281234567890",
            message: "Halo STIKes Bogor Husada, saya ingin bertanya tentang informasi pendaftaran mahasiswa baru."
        },
        {
            id: 2,
            name: "Admin Layanan Akademik",
            role: "Bantuan Mahasiswa/Umum",
            phone: "6289876543210",
            message: "Halo STIKes Bogor Husada, saya ingin bertanya seputar layanan akademik."
        }
    ];

    return (
        <div className="fixed z-[9999] bottom-6 right-6 font-sans">
            {/* Popup Menu */}
            {isOpen && (
                <div className="absolute overflow-hidden text-gray-800 transition-all duration-300 origin-bottom-right bg-white shadow-2xl bottom-20 right-0 w-[320px] sm:w-[350px] rounded-2xl border border-gray-100 flex flex-col">
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 px-6 py-5 bg-[#075E54] text-white rounded-t-2xl relative">
                        <div className="relative">
                            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                                <img src="/assets/img/logo.png" alt="Logo" className="object-contain w-8 h-8" 
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                                    }}
                                />
                            </div>
                            <div className="absolute right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full bottom-0"></div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold leading-tight">STIKes Bogor Husada</h3>
                            <p className="text-xs text-green-100">Biasanya membalas dalam beberapa jam</p>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-white/20 top-4 right-4 flex"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Chat Area Simulation */}
                    <div className="p-5 bg-[#E5DDD5] max-h-[160px] overflow-y-auto relative">
                        {/* Motif Background ala WA */}
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-solid-color-thumbnail.jpg')" }}></div>
                        
                        <div className="relative p-3 mb-2 text-sm text-gray-800 bg-white shadow-sm rounded-xl rounded-tl-none w-[90%] float-left">
                            <p>Halo! 👋<br />Ada yang bisa kami bantu? Silakan pilih admin di bawah ini untuk memulai obrolan.</p>
                            <span className="block mt-1 text-[10px] text-gray-400 text-right">{new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="clear-both"></div>
                    </div>

                    {/* Contact List */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <p className="mb-3 text-xs font-semibold text-gray-500 uppercase">Mulai Obrolan Dengan:</p>
                        <div className="space-y-3">
                            {ADMINS.map(admin => (
                                <a 
                                    key={admin.id}
                                    href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(admin.message)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 p-3 transition-colors border border-gray-100 group hover:bg-green-50 rounded-xl hover:border-green-200"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-white bg-[#25D366] rounded-full group-hover:bg-[#128C7E] transition-colors">
                                        <i className="text-xl fab fa-whatsapp"></i>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-800">{admin.name}</h4>
                                        <p className="text-xs text-gray-500">{admin.role}</p>
                                    </div>
                                    <div className="text-gray-300 transition-transform group-hover:text-[#25D366] group-hover:translate-x-1">
                                        <i className="fas fa-chevron-right"></i>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 ${isOpen ? 'bg-red-500 hover:bg-red-600 scale-90' : 'bg-[#25D366] hover:bg-[#128C7E] animate-[bounce_3s_infinite]'}`}
                title="Chat with us on WhatsApp"
                aria-label="Toggle WhatsApp Menu"
            >
                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute flex w-3 h-3 top-0 right-0">
                        <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                        <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </span>
                )}
                
                <i className={`text-3xl text-white transition-opacity duration-300 ${isOpen ? 'fas fa-times text-2xl' : 'fab fa-whatsapp'}`}></i>
            </button>
        </div>
    );
}
