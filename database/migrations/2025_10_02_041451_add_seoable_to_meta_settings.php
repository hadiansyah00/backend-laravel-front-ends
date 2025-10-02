<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('meta_settings', function (Blueprint $table) {
            $table->unsignedBigInteger('seoable_id')->nullable()->after('id');
            $table->string('seoable_type')->nullable()->after('seoable_id');
            $table->index(['seoable_type', 'seoable_id'], 'meta_settings_seoable_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meta_settings', function (Blueprint $table) {
            $table->dropIndex('meta_settings_seoable_idx');
            $table->dropColumn(['seoable_id', 'seoable_type']);
        });
    }
};
