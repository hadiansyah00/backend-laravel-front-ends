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
            $table->string('template')->default('default')->after('type');
            $table->string('category')->nullable()->after('template');
            $table->string('icon')->nullable()->after('category');
            $table->integer('order')->default(0)->after('icon');
            $table->string('parent_slug')->nullable()->after('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['template', 'category', 'icon', 'order', 'parent_slug']);
        });
    }
};
