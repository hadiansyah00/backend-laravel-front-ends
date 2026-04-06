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
        Schema::table('events', function (Blueprint $table) {
            $table->string('contact_person')->nullable()->after('location');
            $table->string('registration_link')->nullable()->after('contact_person');
            $table->text('map_embed_url')->nullable()->after('registration_link');
            $table->string('event_type')->nullable()->after('map_embed_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['contact_person', 'registration_link', 'map_embed_url', 'event_type']);
        });
    }
};
