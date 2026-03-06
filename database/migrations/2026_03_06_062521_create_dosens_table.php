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
        Schema::create('dosens', function (Blueprint $table) {
            $table->id();
            $table->string('nip')->nullable()->unique();
            $table->string('nidn')->nullable()->unique();
            $table->string('name');
            $table->string('position')->nullable(); // Jabatan fungsional/struktural
            $table->string('prodi')->nullable(); // Sementara pakai string enum (D3 Kebidanan, S1 Farmasi, S1 Gizi)
            $table->string('photo')->nullable();
            $table->text('bio')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('email')->nullable();
            $table->integer('order')->default(0); // Urutan tampil
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosens');
    }
};
