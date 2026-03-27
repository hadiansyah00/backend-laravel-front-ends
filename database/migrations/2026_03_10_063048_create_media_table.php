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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Original file name
            $table->string('file_name'); // Stored file name (unique)
            $table->string('mime_type')->nullable(); // e.g. image/jpeg, application/pdf
            $table->string('path'); // Path within the disk e.g. uploads/media/2026/03/file.jpg
            $table->string('disk')->default('public');
            $table->string('collection_name')->nullable()->default('default'); // To group media visually
            $table->unsignedBigInteger('size'); // File size in bytes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
