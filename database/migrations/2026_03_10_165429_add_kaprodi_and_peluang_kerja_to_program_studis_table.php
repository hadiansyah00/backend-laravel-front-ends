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
        Schema::table('program_studis', function (Blueprint $table) {
            $table->string('kaprodi_name')->nullable()->after('lama_studi');
            $table->string('kaprodi_photo')->nullable()->after('kaprodi_name');
            $table->text('kaprodi_profile')->nullable()->after('kaprodi_photo');
            $table->json('peluang_kerja')->nullable()->after('kaprodi_profile');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('program_studis', function (Blueprint $table) {
            $table->dropColumn(['kaprodi_name', 'kaprodi_photo', 'kaprodi_profile', 'peluang_kerja']);
        });
    }
};
