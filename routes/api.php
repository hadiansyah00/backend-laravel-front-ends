<?php

use App\Http\Controllers\Api\TestimoniController;
use Illuminate\Support\Facades\Route;

Route::get('/testimoni', [TestimoniController::class, 'index']);
Route::get('/testimoni/{id}', [TestimoniController::class, 'show']);