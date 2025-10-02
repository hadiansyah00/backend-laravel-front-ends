<?php

namespace Database\Seeders;

use App\Models\MetaSettings;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MetaSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('meta_settings')
            ->whereNotNull('pages_id')
            ->update([
                'seoable_id' => DB::raw('pages_id'),
                'seoable_type' => 'App\\Models\\Pages',
            ]);
    }
}
