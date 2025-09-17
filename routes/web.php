<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');

    Route::group(['middleware' => ['permission:create user']], function () { 
        Route::get('/manage-user/view', [Controllers\UserController::class, 'view'])->name('manage-user.view');
        Route::post('/manage-user/store', [Controllers\UserController::class, 'store'])->name('manage-user.store');

        Route::get('/manage-role/view', [Controllers\RoleController::class, 'view'])->name('manage-role.view');
        Route::post('/manage-role/store', [Controllers\RoleController::class, 'store'])->name('manage-role.store');

        Route::get('/manage-role/assign-role', [Controllers\RoleController::class, 'assignRole'])->name('manage-role.assign-role');
        Route::post('/manage-role/assign-role', [Controllers\RoleController::class, 'storeAssignRole'])->name('manage-role.storeAssignRole');

        Route::get('/manage-permission/view', [Controllers\PermissionController::class, 'view'])->name('manage-permission.view');
        Route::post('/manage-permission/store', [Controllers\PermissionController::class, 'storeAssignPermission'])->name('manage-permission.storeAssignPermission');
    });   

    Route::group(['middleware' => ['permission:read user']], function () { 
       Route::get('/manage-user/index', [Controllers\UserController::class, 'index'])->name('manage-user.index');
    });    

    Route::group(['middleware' => ['permission:create user']], function () { 
        
    });
   
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dev.php';
