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
        Schema::create('meta_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug'); // slug halaman atau 'default'
            $table->string('title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('keywords')->nullable();
            $table->string('robots')->nullable(); // index, noindex, dll

            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('og_url')->nullable();
            $table->string('og_type')->nullable();
            $table->string('og_site_name')->nullable();

            $table->string('twitter_card')->nullable();
            $table->string('twitter_title')->nullable();
            $table->text('twitter_description')->nullable();
            $table->string('twitter_image')->nullable();
            $table->string('twitter_site')->nullable();

            $table->string('canonical_url')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meta_settings');
    }
};
