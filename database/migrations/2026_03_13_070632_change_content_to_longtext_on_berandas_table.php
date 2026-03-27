<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('berandas', function (Blueprint $table) {
            // Ubah menjadi LONGTEXT agar muat banyak slider
            $table->longText('content')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('berandas', function (Blueprint $table) {
            $table->string('content', 255)->nullable()->change();
        });
    }
};
