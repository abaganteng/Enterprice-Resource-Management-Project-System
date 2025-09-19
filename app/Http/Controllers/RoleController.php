<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Data\ManageUserData;
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
            'role'  => $currentRole ? fn () => ManageUserData::from($currentRole) : null,
            'roles' => fn () => ManageUserData::collect($roles),
        ]);
    }

    // Kalau tidak ada user.id → fallback ke mode lama
    $users = User::all(['id', 'name']);

    return inertia('role/assign-role', [
        'users' => fn () => ManageUserData::collect($users),
        'roles' => fn () => ManageUserData::collect($roles),
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
}
