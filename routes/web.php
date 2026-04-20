<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ImageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VariantController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin')->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('users.index');

        Route::get('brands', [BrandController::class, 'index'])->name('brands.index');
        Route::post('brands', [BrandController::class, 'store'])->name('brands.store');
        Route::put('brands/{brand}', [BrandController::class, 'update'])->name('brands.update');
        Route::delete('brands/{brand}', [BrandController::class, 'destroy'])->name('brands.destroy');

        Route::get('products', [ProductController::class, 'index'])->name('products.index');
        Route::post('products', [ProductController::class, 'store'])->name('products.store');
        Route::get('products/{product}', [ProductController::class, 'show'])->name('products.show');
        Route::put('products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        Route::post('images/{product}', [ImageController::class, 'store'])->name('images.store');
        Route::patch('images/{image}', [ImageController::class, 'setMain'])->name('images.setMain');
        Route::delete('images/{image}', [ImageController::class, 'destroy'])->name('images.destroy');

        Route::get('variants/{product}', [VariantController::class, 'index'])->name('variants.index');
        Route::post('variants/{product}', [VariantController::class, 'store'])->name('variants.store');
        Route::put('variants/{variant}', [VariantController::class, 'update'])->name('variants.update');
        Route::delete('variants/{variant}', [VariantController::class, 'destroy'])->name('variants.destroy');
    });
});

require __DIR__ . '/settings.php';
