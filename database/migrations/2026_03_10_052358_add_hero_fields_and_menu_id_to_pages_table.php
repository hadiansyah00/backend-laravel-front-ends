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
        Schema::table('pages', function (Blueprint $table) {
            if (!Schema::hasColumn('pages', 'menu_id')) {
                $table->foreignId('menu_id')->nullable()->after('id')->constrained('menus')->nullOnDelete();
            }
            if (!Schema::hasColumn('pages', 'hero_bg_image')) {
                $table->string('hero_bg_image')->nullable()->after('slug');
            }
            if (!Schema::hasColumn('pages', 'hero_title')) {
                $table->string('hero_title')->nullable()->after('hero_bg_image');
            }
            if (!Schema::hasColumn('pages', 'hero_subtitle')) {
                $table->text('hero_subtitle')->nullable()->after('hero_title');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign(['menu_id']);
            $table->dropColumn(['menu_id', 'hero_bg_image', 'hero_title', 'hero_subtitle']);
        });
    }
};
