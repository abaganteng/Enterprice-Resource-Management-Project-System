<?php

namespace App\Http\Controllers;

use App\Data\PermissionData;
use App\Data\RolesPermissionsData;
use Spatie\Permission\Models\Role;
use Spatie\LaravelData\DataCollection;
use Spatie\Permission\Models\Permission;
use Spatie\LaravelData\PaginatedDataCollection;

class RolesPermissionsController extends Controller
{
    public function index()
    {
        $rolesPermissions = Role::with('permissions:id,name')
        ->select('id','name')->get();

        $permissions = Permission::select(['id', 'name'])->get();

    return inertia('roles-permissions/index', [
        'rolesPermissions' => RolesPermissionsData::collect($rolesPermissions, DataCollection::class),
        'permissions' => PermissionData::collect($permissions),
    ]);
    }
}
