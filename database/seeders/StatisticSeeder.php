<?php

namespace Database\Seeders;

use App\Models\Statistic;
use Illuminate\Database\Seeder;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statistics = [
            [
                'title' => 'Mahasiswa',
                'value' => 1200,
                'icon' => 'fas fa-user-graduate',
                'order' => 1,
            ],
            [
                'title' => 'Alumni',
                'value' => 3500,
                'icon' => 'fas fa-users',
                'order' => 2,
            ],
            [
                'title' => 'Dosen',
                'value' => 80,
                'icon' => 'fas fa-chalkboard-teacher',
                'order' => 3,
            ],
            [
                'title' => 'Program Studi',
                'value' => 5,
                'icon' => 'fas fa-book',
                'order' => 4,
            ],
        ];

        foreach ($statistics as $stat) {
            Statistic::updateOrCreate(
                ['title' => $stat['title']], // kalau sudah ada, update
                $stat
            );
        }
    }
}
