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
          Schema::create('statistics', function (Blueprint $table) {
        $table->id();
        $table->string('title');   // Mahasiswa Aktif, Lulusan, dll
        $table->integer('value');  // angka counter
        $table->string('icon')->nullable(); // path icon
        $table->integer('order')->default(0);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistics');
    }
};
