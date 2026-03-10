<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MetaSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (\Illuminate\Support\Facades\Schema::hasColumn('meta_settings', 'pages_id')) {
            DB::table('meta_settings')
                ->whereNotNull('pages_id')
                ->update([
                    'seoable_id' => DB::raw('pages_id'),
                    'seoable_type' => 'App\\Models\\Pages',
                ]);
        }
    }
}
