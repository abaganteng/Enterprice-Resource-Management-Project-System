<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Data\ManageUserData;
use App\Data\RoleData;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function view()
    {
        return inertia('role/view');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        Role::create([
            'name' => $request->name,
            'guard_name' => 'web'
        ]);

        flash('New role has been successfully created.');

        return back();
        
    }

public function assignRole(Request $request)
{
    // Ambil semua role untuk pilihan
    $roles = Role::all(['id', 'name']);

    // Kalau ada user
    if ($request->has('user')) {
        $user = User::with('roles:id,name')->select('id', 'name')->findOrFail($request->user);

        // Ambil role terbaru milik user (ingat: 1 user hanya punya 1 role)
        $currentRole = $user->roles->first();

        return inertia('role/assign-role', [
            'user'  => fn () => ManageUserData::from($user),
            'role'  => $currentRole ? fn () => RoleData::from($currentRole) : null,
            'roles' => fn () => RoleData::collect($roles),
        ]);
    }

    // Kalau tidak ada user.id → fallback ke mode lama
    $users = User::all(['id', 'name']);

    return inertia('role/assign-role', [
        'users' => fn () => ManageUserData::collect($users),
        'roles' => fn () => RoleData::collect($roles),
    ]);
}

    public function storeAssignRole(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $user = User::findOrFail($request->user_id);
        $role = Role::findOrFail($request->role_id);

        $user->syncRoles($role->name);

        flash("Role {$role->name} has been successfully assigned to {$user->name}.");

        return to_route('manage-user.show', ['user' => $user->id]);
    }

    public function revokeRole(User $user)
    {
        $role = $user->roles->first();

        if ($role) {
            $user->removeRole($role->name);

            flash("Role {$role->name} has been successfully revoked from {$user->name}.");
        } else {
            flash("User {$user->name} does not have any role assigned.");
        }

        return back();
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
        'id'   => ['required', 'exists:roles,id'],
        'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $request->id],
        ]);

        // Cari role berdasarkan ID
        $role = Role::findOrFail($validated['id']);

        // Update nama role
        $role->update([
            'name' => $validated['name'],
        ]);

        flash('Update role telah berhasil dilakukan.');

        return to_route('manage-roles-permissions.index');
    }

    public function delete(Request $request, Role $role)
    {
        if (! $role) {
        return back()->withErrors(['error' => 'Role not found.']);
        }

        // 1. Cabut role dari semua user yang masih pakai role ini
        $usersWithRole = User::role($role->name)->get();
        foreach ($usersWithRole as $user) {
            $user->removeRole($role->name);
        }

        // 2. Cabut semua permission dari role ini
        if ($role->permissions()->count() > 0) {
            $role->syncPermissions([]);
        }

        // 3. Hapus role
        $role->delete();

        flash('Role has successfully delete');

        return to_route('manage-roles-permissions.index');
    }

    public function revokePermission(Request $request, Role $role)
{
    $request->validate([
        'permissions'   => 'required|array',
        'permissions.*' => 'exists:permissions,name',
    ]);

    foreach ($request->permissions as $permissionName) {
        if ($role->hasPermissionTo($permissionName)) {
            $role->revokePermissionTo($permissionName);
        }
    }

    flash('Revoke permission has been successfully');

    return to_route('manage-roles-permissions.index');
}

}
