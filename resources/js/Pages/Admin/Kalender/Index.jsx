import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ kalenders, filters, tahunList }) {
    const { data, links } = kalenders;

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus agenda akademik ini?')) {
            router.delete(route('admin.kalender.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const handleFilter = (e) => {
        router.get(route('admin.kalender.index'), { semester: e.target.value }, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Kalender Akademik</h2>}>
            <Head title="Kalender Akademik" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Agenda Akademik</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola kalender akademik per semester.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                            <select 
                                onChange={handleFilter} 
                                value={filters?.semester || ''}
                                className="w-full sm:w-auto rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                            >
                                <option value="">Semua Semester</option>
                                <option value="Ganjil">Ganjil</option>
                                <option value="Genap">Genap</option>
                            </select>

                            <Link href={route('admin.kalender.create')} className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm whitespace-nowrap">
                                <i className="fas fa-plus mr-2"></i> Tambah Agenda
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Semester / Tahun</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kegiatan</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Waktu Pelaksanaan</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Urutan</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    item.semester === 'Ganjil' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                                                }`}>
                                                    {item.semester}
                                                </span>
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1 pt-0">{item.tahun_akademik}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{item.kegiatan}</div>
                                                {item.keterangan && (
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate max-w-xs">{item.keterangan}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {item.mulai} {item.selesai && item.selesai !== item.mulai ? ` - ${item.selesai}` : ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {item.order}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {item.is_active ? 'Aktif' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={route('admin.kalender.edit', item.id)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors" title="Edit">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors" title="Hapus">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <i className="fas fa-calendar-times text-4xl mb-3 text-gray-300"></i>
                                                <p className="text-lg font-medium">Belum ada agenda akademik</p>
                                                <p className="text-sm mt-1">Silakan tambahkan agenda baru untuk ditampilkan.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination component logic would go here if you use standard Laravel pagination mapping */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
