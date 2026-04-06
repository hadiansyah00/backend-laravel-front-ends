import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import MediaPicker from "@/Components/MediaPicker";

const EVENT_TYPES = [
    'Seminar',
    'Workshop',
    'Lomba',
    'Kegiatan Kampus',
    'Wisuda',
    'Lainnya',
];

export default function Form({ event }) {
    const isEdit = !!event;

    // Helper to format datetime for input type="datetime-local"
    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        // Format: YYYY-MM-DDTHH:mm
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    const { data, setData, post, put, errors, processing } = useForm({
        title: event?.title || '',
        content: event?.content || '',
        location: event?.location || '',
        contact_person: event?.contact_person || '',
        registration_link: event?.registration_link || '',
        map_embed_url: event?.map_embed_url || '',
        event_type: event?.event_type || '',
        start_date: formatDateTimeLocal(event?.start_date),
        end_date: formatDateTimeLocal(event?.end_date),
        image: event?.image || '',
        is_active: event?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.events.update', event.id), {
                preserveScroll: true,
            });
        } else {
            post(route('admin.events.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEdit ? 'Edit Event & Agenda' : 'Tambah Event & Agenda'}</h2>}>
            <Head title={isEdit ? 'Edit Event' : 'Tambah Event'} />

            <div className="max-w-4xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.events.index')} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isEdit ? 'Form Edit Event' : 'Form Tambah Event / Agenda Baru'}
                            </h3>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* ====== SECTION: Informasi Dasar ====== */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-5 border border-gray-100 dark:border-gray-800">
                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <i className="fas fa-info-circle text-indigo-500"></i> Informasi Dasar
                            </h4>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Kegiatan <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Cth: Seminar Nasional Gizi 2026..."
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                            </div>

                            {/* Event Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Event</label>
                                <select
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.event_type ? 'border-red-500' : ''}`}
                                    value={data.event_type}
                                    onChange={e => setData('event_type', e.target.value)}
                                >
                                    <option value="">— Pilih Jenis Event —</option>
                                    {EVENT_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.event_type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.event_type}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Kegiatan</label>
                                <textarea
                                    rows={6}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.content ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    placeholder="Jelaskan detail dari kegiatan ini..."
                                ></textarea>
                                {errors.content && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>}
                            </div>
                        </div>

                        {/* ====== SECTION: Jadwal & Lokasi ====== */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-5 border border-gray-100 dark:border-gray-800">
                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <i className="fas fa-calendar-alt text-indigo-500"></i> Jadwal & Lokasi
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal & Jam Mulai <span className="text-red-500">*</span></label>
                                    <input
                                        type="datetime-local"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.start_date ? 'border-red-500' : ''}`}
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                    />
                                    {errors.start_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.start_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal & Jam Selesai</label>
                                    <input
                                        type="datetime-local"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.end_date ? 'border-red-500' : ''}`}
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                    />
                                    {errors.end_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi Kegiatan</label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.location ? 'border-red-500' : ''}`}
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    placeholder="Cth: Aula Utama STIKes Bogor Husada"
                                />
                                {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                            </div>

                            {/* Map Embed URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Google Maps Embed URL</label>
                                <textarea
                                    rows={2}
                                    className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono text-xs ${errors.map_embed_url ? 'border-red-500' : ''}`}
                                    value={data.map_embed_url}
                                    onChange={e => setData('map_embed_url', e.target.value)}
                                    placeholder="https://www.google.com/maps/embed?pb=..."
                                ></textarea>
                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                    <i className="fas fa-lightbulb text-yellow-500 mr-1"></i>
                                    Cara mendapatkan: Buka Google Maps → Cari lokasi → Klik "Bagikan" → Tab "Sematkan peta" → Salin URL dari <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">src="..."</code>
                                </p>
                                {errors.map_embed_url && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.map_embed_url}</p>}
                            </div>
                        </div>

                        {/* ====== SECTION: Kontak & Registrasi ====== */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-5 border border-gray-100 dark:border-gray-800">
                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <i className="fas fa-address-book text-indigo-500"></i> Kontak & Registrasi
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.contact_person ? 'border-red-500' : ''}`}
                                        value={data.contact_person}
                                        onChange={e => setData('contact_person', e.target.value)}
                                        placeholder="Cth: Budi (0812-xxxx-xxxx)"
                                    />
                                    {errors.contact_person && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contact_person}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link Pendaftaran</label>
                                    <input
                                        type="url"
                                        className={`w-full rounded-xl border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.registration_link ? 'border-red-500' : ''}`}
                                        value={data.registration_link}
                                        onChange={e => setData('registration_link', e.target.value)}
                                        placeholder="https://forms.google.com/..."
                                    />
                                    {errors.registration_link && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.registration_link}</p>}
                                </div>
                            </div>
                        </div>

                        {/* ====== SECTION: Poster / Media ====== */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-5 border border-gray-100 dark:border-gray-800">
                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <i className="fas fa-image text-indigo-500"></i> Poster / Media
                            </h4>

                            <div className="flex flex-col gap-4">
                                {/* Preview Selected Image */}
                                {data.image && (
                                    <div className="relative group overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-700 border-dashed rounded-2xl w-full max-w-sm aspect-video">
                                        <img 
                                            src={typeof data.image === 'string' ? (data.image.startsWith('http') || data.image.startsWith('/') ? data.image : `/storage/${data.image}`) : ''} 
                                            alt="Preview Poster" 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button 
                                                type="button" 
                                                onClick={() => setData('image', '')} 
                                                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all flex items-center shadow-lg"
                                            >
                                                <i className="fas fa-trash-alt mr-2"></i> Hapus Poster
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Trigger MediaPicker */}
                                {!data.image && (
                                    <MediaPicker
                                        acceptType="image"
                                        onSelect={(url) => setData("image", url)}
                                        trigger={
                                            <div className="w-full max-w-sm aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl cursor-pointer bg-white hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-900/20 transition-all flex flex-col items-center justify-center group overflow-hidden">
                                                <div className="w-16 h-16 mb-3 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                                    <i className="fas fa-image text-2xl"></i>
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Pilih Poster Kegiatan</span>
                                                <span className="text-xs text-gray-500 text-center max-w-[80%]">Klik di sini untuk membuka Media Library dan memilih gambar dari koleksi Anda.</span>
                                            </div>
                                        }
                                    />
                                )}
                            </div>
                            
                            {errors.image && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium"><i className="fas fa-exclamation-circle mr-1"></i> {errors.image}</p>}
                        </div>

                        {/* Status / Is Active */}
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 transition-colors"></div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Publikasikan Event</span>
                                    <p className="text-xs text-gray-500">Tampilkan kegiatan ini di halaman publik.</p>
                                </div>
                            </label>
                            {errors.is_active && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.is_active}</p>}
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                            <Link href={route('admin.events.index')} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                            >
                                {processing ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Menyimpan...</>
                                ) : (
                                    <><i className="fas fa-save"></i> Simpan Event</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
