import React from 'react';
import SectionTitle from './SectionTitle';

export default function DosenSection({ data }) {
    const title = data?.title || "Dosen STIKes Bogor Husada";
    const subtitle = data?.subtitle || "Tenaga pendidik profesional yang mendukung kegiatan akademik.";
    const dosenGroups = data?.dosen || []; // Array of { prodi, tetap: [], tidak_tetap: [] }

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <SectionTitle title={title} icon="fa-users" />
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                </div>

                {dosenGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="mb-20 last:mb-0">
                        {/* Group Title (Prodi) */}
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-orange-500 pb-2 inline-block">
                                {group.prodi}
                            </h3>
                            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                        </div>

                        {/* Dosen Tetap */}
                        {group.tetap && group.tetap.length > 0 && (
                            <div className="mb-12">
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 flex items-center gap-2">
                                    <i className="fas fa-chalkboard-teacher text-blue-500"></i> Dosen Tetap
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {group.tetap.map((dosen) => (
                                        <DosenCard key={dosen.id} dosen={dosen} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dosen Tidak Tetap */}
                        {group.tidak_tetap && group.tidak_tetap.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 flex items-center gap-2">
                                    <i className="fas fa-user-tie text-blue-400"></i> Dosen Tidak Tetap
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {group.tidak_tetap.map((dosen) => (
                                        <DosenCard key={dosen.id} dosen={dosen} />
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                ))}

                {dosenGroups.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <i className="fas fa-folder-open text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                        <p className="text-gray-500 dark:text-gray-400">Data dosen belum tersedia.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

function DosenCard({ dosen }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                <img
                    src={dosen.photo || '/assets/img/dosen/default.png'}
                    alt={dosen.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/hero-fallback.png"
                    }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/90 text-white backdrop-blur-sm">
                        <i className="fas fa-star text-[10px]"></i> {dosen.position}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
                    {dosen.name}
                </h4>
            </div>
        </div>
    );
}
