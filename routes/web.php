<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');

    Route::group(['middleware' => ['permission:create user']], function () { 
        Route::get('/manage-user/create', [Controllers\UserController::class, 'create'])->name('manage-user.create');
        Route::post('/manage-user/store', [Controllers\UserController::class, 'store'])->name('manage-user.store');

        Route::get('/manage-user/update/{user}', [Controllers\UserController::class, 'edit'])->name('manage-user.edit');
        Route::put('/manage-user/update/{user}', [Controllers\UserController::class, 'update'])->name('manage-user.update');

        Route::get('/manage-role/view', [Controllers\RoleController::class, 'view'])->name('manage-role.view');
        Route::post('/manage-role/store', [Controllers\RoleController::class, 'store'])->name('manage-role.store');

        Route::put('/manage-role/update', [Controllers\RoleController::class, 'update'])->name('manage-role.update');

        Route::delete('/manage-role/delete/{role}', [Controllers\RoleController::class, 'delete'])->name('manage-role.delete');

        Route::post('/manage-role/revoke/{role}', [Controllers\RoleController::class, 'revokePermission'])->name('manage-role.revoke');

        Route::get('/manage-role/assign-role', [Controllers\RoleController::class, 'assignRole'])->name('manage-role.assign-role');
        Route::post('/manage-role/assign-role', [Controllers\RoleController::class, 'storeAssignRole'])->name('manage-role.storeAssignRole');
        
        Route::delete('/manage-role/revoke-role/{user}', [Controllers\RoleController::class, 'revokeRole'])->name('manage-role.revokeRole');

        Route::get('/manage-permission/view', [Controllers\PermissionController::class, 'view'])->name('manage-permission.view');
        Route::post('/manage-permission/store', [Controllers\PermissionController::class, 'storeAssignPermission'])->name('manage-permission.storeAssignPermission');
    });   

    Route::group(['middleware' => ['permission:read user']], function () { 
       Route::get('/manage-user/index', [Controllers\UserController::class, 'index'])->name('manage-user.index');
       Route::get('/manage-user/show/{user}', [Controllers\UserController::class, 'show'])->name('manage-user.show');

       Route::get('/manage-roles-permissions/index', [Controllers\RolesPermissionsController::class, 'index'])->name('manage-roles-permissions.index');
    });    

    Route::group(['middleware' => ['permission:read project']], function () { 
        Route::get('/projects/index', [Controllers\ProjectController::class, 'index'])->name('projects.index');
        Route::get('/projects/show/{project}', [Controllers\ProjectController::class, 'show'])->name('projects.show');
    });

    Route::group(['middleware' => ['permission:create project']], function () { 
        Route::post('/projects/store', [Controllers\ProjectController::class, 'store'])->name('projects.store');
    });

    Route::group(['middleware' => ['permission:update project']], function () { 
        Route::put('/projects/update', [Controllers\ProjectController::class, 'update'])->name('projects.update');
    });

    Route::post('/phases/store', [Controllers\ProjectPhaseController::class, 'store'])->name('phases.store');
    Route::put('/phases/update', [Controllers\ProjectPhaseController::class, 'update'])->name('phases.update');

    Route::get('/phases/show/{phase}', [Controllers\ProjectPhaseController::class, 'show'])->name('phases.show');
   
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dev.php';
