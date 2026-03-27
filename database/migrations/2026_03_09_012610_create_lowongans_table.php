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
        Schema::create('lowongans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('company');
            $table->string('location')->nullable();
            $table->enum('type', ['full-time', 'part-time', 'magang', 'kontrak'])->default('full-time');
            $table->text('description')->nullable();
            $table->text('requirements')->nullable();
            $table->string('salary_range')->nullable();
            $table->date('deadline')->nullable();
            $table->string('contact_info')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lowongans');
    }
};
