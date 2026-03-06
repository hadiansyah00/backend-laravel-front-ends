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
        Schema::table('program_studis', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('name');
            $table->text('visi')->nullable()->after('description');
            $table->text('misi')->nullable()->after('visi');
            $table->string('akreditasi')->nullable()->after('misi');
            $table->string('gelar')->nullable()->after('akreditasi');
            $table->string('lama_studi')->nullable()->after('gelar'); // e.g., '8 Semester'
            $table->boolean('is_active')->default(true)->after('lama_studi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('program_studis', function (Blueprint $table) {
            $table->dropColumn(['slug', 'visi', 'misi', 'akreditasi', 'gelar', 'lama_studi', 'is_active']);
        });
    }
};
