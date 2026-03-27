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
        Schema::create('kalender_akademiks', function (Blueprint $table) {
            $table->id();
            $table->enum('semester', ['Ganjil', 'Genap']);
            $table->string('tahun_akademik')->nullable(); // e.g. "2023/2024"
            $table->string('kegiatan');
            $table->string('mulai')->nullable(); // string like "11 Desember 2023"
            $table->string('selesai')->nullable(); // string like "12 Januari 2024"
            $table->text('keterangan')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kalender_akademiks');
    }
};
