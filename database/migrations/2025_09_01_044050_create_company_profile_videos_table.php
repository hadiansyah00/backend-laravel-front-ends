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
        Schema::create('company_profile_videos', function (Blueprint $table) {
        $table->id();
        $table->string('title')->nullable();      // Judul video
        $table->text('description')->nullable();  // Deskripsi singkat
        $table->string('video_url');              // Link YouTube/Vimeo/MP4
        $table->boolean('is_active')->default(true); // Bisa set aktif/nonaktif
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profile_videos');
    }
};
