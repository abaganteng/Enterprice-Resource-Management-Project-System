<?php

namespace App\Http\Controllers;

use App\Data\ManageUserData;
use Illuminate\Http\Request;
use App\Data\RoleAssignRoleData;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function view()
    {
        $roles = Role::select(['id', 'name'])->get();
        $permissions = Permission::select(['id', 'name'])->get();
        return inertia('permission/view', [
            'roles' => fn () => ManageUserData::collect($roles),
            'permissions' => fn () => ManageUserData::collect($permissions),
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
