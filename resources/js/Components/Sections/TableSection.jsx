import React from 'react';
import SectionTitle from './SectionTitle';

export default function TableSection({ data }) {
    const title = data?.title || "Data Akademik";
    const subtitle = data?.subtitle || "";
    const headers = data?.headers || []; // ['Kolom 1', 'Kolom 2', ...]
    const rows = data?.rows || [];       // [['Isi 1', 'Isi 2'], ['Isi A', 'Isi B']]
    const notes = data?.notes || [];     // ['Catatan 1', 'Catatan 2']

    return (
        <section className="py-20 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-4xl mx-auto mb-12">
                    <SectionTitle title={title} icon="fa-calendar-alt" />
                    {subtitle && (
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    {/* Kolom Nomor (Otomatis) */}
                                    <th scope="col" className="px-6 py-4 w-16 text-center">No.</th>
                                    {headers.map((header, idx) => (
                                        <th key={idx} scope="col" className="px-6 py-4 whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                                            {rowIdx + 1}
                                        </td>
                                        {row.map((cell, cellIdx) => (
                                            <td key={cellIdx} className={`px-6 py-4 ${cellIdx === 0 ? 'font-medium text-gray-900 dark:text-white' : ''}`}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr>
                                        <td colSpan={headers.length + 1} className="px-6 py-8 text-center text-gray-400">
                                            Data belum tersedia
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Catatan Tambahan (Bawah Tabel) */}
                {notes && notes.length > 0 && (
                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/50">
                        <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
                            <i className="fas fa-info-circle"></i> Catatan Penting
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                            {notes.map((note, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="font-bold">{idx + 1}.</span>
                                    <span dangerouslySetInnerHTML={{ __html: note }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </section>
    );
}
