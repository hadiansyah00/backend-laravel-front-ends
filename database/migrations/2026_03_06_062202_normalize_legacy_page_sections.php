<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Map old section types to new generic generic types.
     */
    protected $typeMap = [
        // Hero variants -> hero
        'hero-sejarah'       => 'hero',
        'hero-visi'          => 'hero',
        'hero-pimpinan'      => 'hero',
        'hero-dosen'         => 'hero',
        'hero-organisasi'    => 'hero',
        'hero-prodi'         => 'hero',
        'hero-kebidanan'     => 'hero',
        'hero-farmasi'       => 'hero',
        'hero-gizi'          => 'hero',

        // Content with image variants -> content-with-image
        'title-sejarah'      => 'content-with-image',
        'profil-stikes'      => 'content-with-image',

        // Visi-misi variants -> visi-misi
        'visi-misi-farmasi'  => 'visi-misi',
        'visi-misi-gizi'     => 'visi-misi',

        // Sambutan / Image-text
        'sambutan-ketua'     => 'image-text',

        // Dosen / Team grid -> team-grid
        'dosen-stikes'       => 'team-grid',

        // Prodi profile variants -> prodi-profile
        'profil_prodi'              => 'prodi-profile',
        'profil_prodi_farmasi'      => 'prodi-profile',
        'profil_prodi_gizi'         => 'prodi-profile',

        // Peluang kerja / program studi variants -> card-grid
        'peluang-kerja'          => 'card-grid',
        'peluang-kerja-farmasi'  => 'card-grid',
        'peluang-kerja-gizi'     => 'card-grid',
        'program-studi'          => 'card-grid',

        // Timeline
        'timeline-sejarah'   => 'timeline',

        // Struktur Organisasi
        'struktur-organisasi' => 'org-chart',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Gunakan chunking untuk menghindari kelebihan memori jika data banyak
        DB::table('page_sections')->orderBy('id')->chunkById(50, function ($sections) {
            foreach ($sections as $section) {
                // Lewati tipe yang sudah baru (tidak ada di map)
                if (!array_key_exists($section->type, $this->typeMap)) {
                    continue;
                }

                $oldType = $section->type;
                $newType = $this->typeMap[$oldType];
                
                // Decode JSON mentah dari DB (string) menjadi array asosiatif
                $oldContent = json_decode($section->content, true) ?? [];
                
                // Siapkan wadah konten baru
                $newContent = $oldContent; // Base copy
                
                // Simpan state lama persis aslinya jika nanti ingin rollback
                $newContent['_old_state'] = [
                    'type'    => $oldType,
                    'content' => $oldContent,
                ];

                // === TRANSFORMASI LOGA === 
                // Berikut adalah transformasi kunci spesifik per tipe
                switch ($newType) {
                    case 'hero':
                        // Ubah 'background' lama menjadi 'background_image' jika belum ada
                        if (isset($oldContent['background']) && !isset($newContent['background_image'])) {
                            $newContent['background_image'] = $oldContent['background'];
                        }
                        // Path breadcrumbs di old data seringkali 'breadcrumbs' atau tidak ada
                        // Biarkan aslinya, form Alpine baru sudah support
                        break;

                    case 'content-with-image':
                        // Pastikan key-key standard tersedia.
                        // Jika old data ada 'text', pindah jadi array 'content' bentuk paragraf
                        if (isset($oldContent['text']) && is_string($oldContent['text']) && !isset($newContent['content'])) {
                            // Split per tag p <p> atau paragraf text
                            $newContent['content'] = array_filter(array_map('trim', explode("\n", strip_tags(str_replace(['</p>', '<br>'], "\n", $oldContent['text'])))));
                        }
                        
                        // Menangani old visi misi text
                        if (isset($oldContent['visi'])) {
                            $newContent['vision'] = $oldContent['visi'];
                        }
                        if (isset($oldContent['misi'])) {
                            $newContent['mission'] = $oldContent['misi'];
                        }
                        break;
                        
                    case 'visi-misi':
                        // Standarisasi key 'vision' menjadi 'visi' dan 'mission' menjadi 'misi'
                        if (isset($oldContent['vision']) && !isset($newContent['visi'])) {
                            $newContent['visi'] = $oldContent['vision'];
                        }
                        if (isset($oldContent['mission']) && !isset($newContent['misi'])) {
                            $newContent['misi'] = $oldContent['mission'];
                        }
                        break;
                        
                    case 'team-grid':
                        // Old format dosen-stikes: { title, d3_kebidanan: [], s1_farmasi: [], s1_gizi: [] }
                        // New format team-grid: { title, groups: [ { title: 'S1 Farmasi', members: [] } ] }
                        if (!isset($newContent['groups'])) {
                            $groups = [];
                            
                            // Cek jika style prodi
                            $prodiMap = [
                                'd3_kebidanan' => 'D3 Kebidanan',
                                's1_farmasi'   => 'S1 Farmasi',
                                's1_gizi'      => 'S1 Gizi',
                                'tim'          => 'Tim Manajemen'
                            ];
                            
                            foreach ($prodiMap as $key => $title) {
                                if (isset($oldContent[$key]) && is_array($oldContent[$key])) {
                                    $members = [];
                                    foreach ($oldContent[$key] as $member) {
                                        // Standardisasi member format
                                        $members[] = [
                                            'name'     => $member['name'] ?? $member['nama'] ?? '',
                                            'position' => $member['position'] ?? $member['jabatan'] ?? '',
                                            'photo'    => $member['photo'] ?? $member['gambar'] ?? $member['image'] ?? '',
                                            'nidn'     => $member['nidn'] ?? ''
                                        ];
                                    }
                                    
                                    if (count($members) > 0) {
                                        $groups[] = [
                                            'title'   => $title,
                                            'members' => $members
                                        ];
                                    }
                                }
                            }
                            
                            // Jika bukan format prodi tab, tapi format direct (misal 'items')
                            if (empty($groups) && isset($oldContent['items']) && is_array($oldContent['items'])) {
                                $groups[] = [
                                    'title'   => 'Anggota',
                                    'members' => $oldContent['items']
                                ];
                            }
                            
                            $newContent['groups'] = $groups;
                        }
                        break;
                        
                    case 'image-text':
                        // Sambutan Format lama: { title, subtitle, image, content (html/string) }
                        // Format baru: { title, subtitle, image, paragraphs (array) }
                        if (isset($oldContent['content']) && is_string($oldContent['content']) && !isset($newContent['paragraphs'])) {
                            // Pecah HTML ke paragraf plain array
                            $newContent['paragraphs'] = array_filter(array_map('trim', explode("\n", strip_tags(str_replace(['</p>', '<br>'], "\n", $oldContent['content'])))));
                            unset($newContent['content']); // Hapus string lama
                        }
                        break;
                        
                    case 'card-grid':
                        // Peluang kerja dll
                        // Pastikan items ditransformasi menjadi cards
                        if (isset($oldContent['items']) && !isset($newContent['cards'])) {
                            $newContent['cards'] = $oldContent['items'];
                        }
                        break;
                        
                    case 'timeline':
                        // Format lama: { title, items: [ { year, title, desc } ] }
                        // Umumnya sudah sama dengan struktur item timeline baru.
                        break;
                        
                    case 'org-chart':
                        // Struktur organisasi punya level yang lebih kompleks, ubah items -> groups
                        if (isset($oldContent['yayasan']) || isset($oldContent['pimpinan'])) {
                             $groups = [];
                             $mapping = [
                                 'yayasan'            => 'Yayasan Bina Husada',
                                 'pimpinan'           => 'Pimpinan STIKes',
                                 'senat'              => 'Senat Akademik',
                                 'prodi_kebidanan'    => 'Prodi Kebidanan',
                                 'prodi_farmasi'      => 'Prodi Farmasi',
                                 'prodi_gizi'         => 'Prodi Gizi',
                                 'unit_laboratorium'  => 'Laboratorium',
                                 'unit_perpustakaan'  => 'Perpustakaan'
                             ];
                             
                             foreach ($mapping as $key => $title) {
                                 if (isset($oldContent[$key]) && is_array($oldContent[$key])) {
                                     $members = array_map(function($m) {
                                         // Konversi manual mapping
                                         return [
                                             'name'     => $m['name'] ?? '',
                                             'position' => $m['position'] ?? '',
                                             'photo'    => $m['photo'] ?? $m['image'] ?? '',
                                             'level'    => $m['level'] ?? 'staff' // Default staff
                                         ];
                                     }, $oldContent[$key]);
                                     
                                     $groups[] = [
                                         'title'   => $title,
                                         'members' => $members
                                     ];
                                 }
                             }
                             $newContent['groups'] = $groups;
                        }
                        break;
                        
                    case 'prodi-profile':
                        // Format lama: { title, sk_number, accreditation, description (array/string), image }
                        if (isset($oldContent['description'])) {
                            if (is_string($oldContent['description'])) {
                                $newContent['paragraphs'] = array_filter(array_map('trim', explode("\n", strip_tags(str_replace(['</p>', '<br>'], "\n", $oldContent['description'])))));
                            } else if (is_array($oldContent['description'])) {
                                $newContent['paragraphs'] = $oldContent['description'];
                            }
                        }
                        break;
                }

                // Simpan record yang sudah dinormalisasi
                DB::table('page_sections')
                    ->where('id', $section->id)
                    ->update([
                        'type'    => $newType,
                        'content' => json_encode($newContent)
                    ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback ke struktur aslinya
        DB::table('page_sections')->orderBy('id', 'desc')->chunkById(50, function ($sections) {
            foreach ($sections as $section) {
                $content = json_decode($section->content, true);
                
                // Jika memiliki state _old_state, gunakan data tersebut untuk rollback
                if (isset($content['_old_state'])) {
                    $oldState = $content['_old_state'];
                    
                    DB::table('page_sections')
                        ->where('id', $section->id)
                        ->update([
                            'type'    => $oldState['type'],
                            'content' => json_encode($oldState['content'])
                        ]);
                }
            }
        });
    }
};
