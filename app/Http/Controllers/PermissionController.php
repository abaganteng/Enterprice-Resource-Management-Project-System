<?php

namespace App\Http\Controllers;

use App\Data\ManageUserData;
use App\Data\PermissionData;
use Illuminate\Http\Request;
use App\Data\RoleAssignRoleData;
use App\Data\RoleData;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function view()
    {
        $roles = Role::all(['id', 'name']);
        $permissions = Permission::all(['id', 'name']);
        return inertia('permission/view', [
            'roles' => fn () => RoleData::collect($roles),
            'permissions' => fn () => PermissionData::collect($permissions),
        ]);
    }

    public function storeAssignPermission(Request $request)
    {
        $request->validate([
            'permission_id' => 'required|integer|exists:permissions,id',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $permission = Permission::findOrFail($request->permission_id);
        $role = Role::findOrFail($request->role_id);

        $role->givePermissionTo($permission->name);

        flash("Permission {$permission->name} has been successfully assigned to  role {$role->name}.");

        return back();
    }
}
