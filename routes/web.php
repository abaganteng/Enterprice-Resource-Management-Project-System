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
        
    });

    Route::group(['middleware' => ['permission:create project']], function () { 
        Route::post('/projects/store', [Controllers\ProjectController::class, 'store'])->name('projects.store');
    });

    Route::group(['middleware' => ['permission:update project']], function () { 
        Route::put('/projects/update', [Controllers\ProjectController::class, 'update'])->name('projects.update');
    });

    Route::get('/projects/dashboard', [Controllers\ProjectController::class, 'dashboard'])->name('projects.dashboard');


    Route::prefix('projects/{project}')->scopeBindings()->group(function () {

        // Overview project
        Route::get('/overview', [Controllers\ProjectController::class, 'overview'])->name('projects.overview');

        /**
         * Group
         */
        Route::get('/groups', [Controllers\GroupController::class, 'index'])->name('projects.groups.index');
        Route::post('/groups', [Controllers\GroupController::class, 'store'])->name('projects.groups.create');
        Route::put('/groups/{group}/rename', [Controllers\GroupController::class, 'rename'])->name('projects.groups.rename');

        /**
         * Status dalam group
         */
        Route::put('/groups/statuses/{status}/rename', [Controllers\StatusController::class, 'rename'])->name('projects.groups.statuses.rename');
        Route::post('/groups/{group}/statuses', [Controllers\StatusController::class, 'store'])->name('projects.groups.statuses.create');

        /**
         * Tasks dalam status
         */
        Route::get('/groups/{group}/statuses/{status}/tasks/{task}', [Controllers\TaskController::class, 'show'])->name('projects.groups.statuses.tasks.show');
        Route::post('/groups/statuses/{status}/tasks', [Controllers\TaskController::class, 'store'])->name('projects.groups.statuses.tasks.create');
        Route::put('/groups/statuses/{status}/tasks', [Controllers\TaskController::class, 'update'])->name('projects.groups.statuses.tasks.create');
    });


   
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dev.php';
