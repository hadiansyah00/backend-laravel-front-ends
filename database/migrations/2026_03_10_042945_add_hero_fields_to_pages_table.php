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
            $table->foreignId('menu_id')->nullable()->after('id')->constrained('menus')->nullOnDelete();
            $table->string('hero_bg_image')->nullable()->after('slug');
            $table->string('hero_title')->nullable()->after('hero_bg_image');
            $table->text('hero_subtitle')->nullable()->after('hero_title');
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
