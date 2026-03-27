<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->string('type')->default('image')->after('collection_name');
        });

        // Auto-populate existing records based on mime_type
        DB::table('media')
            ->where('mime_type', 'like', 'image/%')
            ->update(['type' => 'image']);

        DB::table('media')
            ->where('mime_type', 'not like', 'image/%')
            ->update(['type' => 'document']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
