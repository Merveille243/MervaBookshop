<?php
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerAuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('admin/login',        [AuthController::class,         'login']);
Route::post('customer/register',  [CustomerAuthController::class, 'register']);
Route::post('customer/login',     [CustomerAuthController::class, 'login']);
Route::get('books',               [BookController::class,         'index']);
Route::get('books/{book}',        [BookController::class,         'show']);

// Admin protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('admin/logout',       [AuthController::class,   'logout']);
    Route::apiResource('books',       BookController::class)->except(['index', 'show']);
    Route::get('orders',              [OrderController::class,  'index']);
    Route::put('orders/{id}/status',  [OrderController::class,  'updateStatus']);
    Route::apiResource('customers',   CustomerController::class);
});

// Customer protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('customer/logout',    [CustomerAuthController::class, 'logout']);
    Route::post('orders',             [OrderController::class,        'store']);
    Route::get('my-orders',           [OrderController::class,        'myOrders']);
});