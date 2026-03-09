import React from 'react';

export default function RichTextSection({ data }) {
    // Fallback dummy html chunk
    const htmlContent = data?.content || `
        <h2>Sejarah Pendirian Institusi</h2>
        <p>STIKes Bogor Husada didirikan atas dasar kepedulian yang mendalam terhadap dunia kesehatan dan pentingnya menciptakan tenaga medis yang profesional di wilayah Bogor dan sekitarnya. Perjalanan kami dimulai dari...</p>
        <p>Seiring berkembangnya zaman, kami terus berupaya mengintegrasikan kurikulum berbasis kompetensi yang selalu relevan dengan kebutuhan industri. Lulusan dipersiapkan secara matang teori dan praktek di lapangan nyata.</p>
        <blockquote>"Kesehatan adalah investasi masa depan, dan pendidikan adalah kunci untuk menjaganya."</blockquote>
        <h3>Fokus Kami ke Depan</h3>
        <p>Membuka wawasan riset skala internasional serta membangun jejaring dengan institusi global demi kualitas lulusan yang diakui dunia.</p>
    `;

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="prose prose-lg dark:prose-invert prose-orange max-w-none 
                               prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 
                               prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed 
                               prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 dark:prose-blockquote:bg-orange-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:font-medium prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200 prose-blockquote:italic
                               prose-a:text-blue-600 hover:prose-a:text-blue-500"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </section>
    );
}
