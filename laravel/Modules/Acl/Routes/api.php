<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Acl\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('users/me', [UserController::class, 'getAuthentcatedUser']);
});
