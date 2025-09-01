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
        Schema::create('program_studis', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // S1 Keperawatan, D3 Kebidanan, dll
        $table->text('description')->nullable();
        $table->string('image')->nullable(); // cover prodi
        $table->string('link')->nullable();  // url detail prodi
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_studis');
    }
};