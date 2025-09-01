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
       Schema::create('front_settings', function (Blueprint $table) {
        $table->id();
        $table->string('key')->unique();   // contoh: site_logo, site_favicon, meta_title, meta_description
        $table->text('value')->nullable(); // simpan string / path gambar / kode script
        $table->string('type')->default('text'); // text, image, json
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('front_settings');
    }
};
