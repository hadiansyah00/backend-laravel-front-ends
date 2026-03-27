import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ menus }) {

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus menu ini beserta semua sub-menunya?')) {
            router.delete(route('admin.menus.destroy', id));
        }
    };

    const renderMenuLevel = (items, level = 0) => {
        return items.map((menu) => (
            <React.Fragment key={menu.id}>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className={`mr-2 ${level > 0 ? 'ml-6 text-gray-300' : ''}`} style={{ marginLeft: `${level * 1.5}rem` }}>
                                {level > 0 ? '↳' : <i className="fas fa-folder text-indigo-400 mr-2"></i>}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white">{menu.name}</div>
                                {menu.slug && <div className="text-xs text-gray-500">{menu.slug}</div>}
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${menu.type === 'page' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {menu.type.toUpperCase()}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {menu.url || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${menu.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {menu.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                        {menu.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Link href={route('admin.menus.edit', menu.id)} title="Edit Menu" className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors">
                                <i className="fas fa-edit"></i>
                            </Link>
                            <button onClick={() => handleDelete(menu.id)} title="Hapus Menu" className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                {menu.children && menu.children.length > 0 && renderMenuLevel(menu.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Menu Navigasi</h2>}>
            <Head title="Manajemen Menu" />

            <div className="max-w-7xl mx-auto py-6">
                <div className="bg-white dark:bg-gray-900 shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Struktur Menu Website</h3>
                            <p className="text-sm text-gray-500 mt-1">Kelola hierarki navigasi, tautan halaman, dan urutan menu.</p>
                        </div>
                        <Link href={route('admin.menus.create')} className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm">
                            <i className="fas fa-plus mr-2"></i> Tambah Menu
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama Menu</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipe</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">URL Redirect</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Urutan</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {menus.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            <i className="fas fa-folder-open text-4xl mb-3 text-gray-300"></i>
                                            <p>Belum ada menu yang dibuat.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    renderMenuLevel(menus)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
