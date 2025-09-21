<?php

namespace App\Http\Controllers;

use App\Data\PermissionData;
use App\Data\RoleDetailData;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesPermissionsController extends Controller
{
    public function index()
    {
        $rolesPermissions = Role::with('permissions:id,name')
        ->select('id','name')->get();

        $permissions = Permission::select(['id', 'name'])->get();

    return inertia('roles-permissions/index', [
        'rolesPermissions' => RoleDetailData::collect($rolesPermissions),
        'permissions' => PermissionData::collect($permissions),
    ]);
    }
}
