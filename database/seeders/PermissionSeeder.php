<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    protected function generatePermissions(): array
{
    $permissionsList = [];

    // default CRUD permissions
    $defaultPermissions = ['create', 'read', 'update', 'delete'];

    // tambahan custom permission per model (optional)
    $customPermissions = [];

    // model yang ingin di-skip
    $excludeModels = [];

    $path = app_path('Models');

    foreach (glob($path . '/*.php') as $file) {
        $modelName = basename($file, '.php');

        // skip kalau ada di exclude
        if (in_array($modelName, $excludeModels)) {
            continue;
        }

        // ubah model jadi lowercase + spasi → "UserProfile" -> "user profile"
        $readableName = strtolower(preg_replace('/(?<!^)[A-Z]/', ' $0', $modelName));

        // mulai dengan CRUD default
        foreach ($defaultPermissions as $perm) {
            $permissionsList[] = "{$perm} {$readableName}";
        }

        // tambahkan custom permission jika ada
        if (isset($customPermissions[$modelName])) {
            foreach ($customPermissions[$modelName] as $perm) {
                $permissionsList[] = "{$perm} {$readableName}";
            }
        }
    }

    return $permissionsList;
}
    public function run(): void
{
    // generate permissions
    collect($this->generatePermissions())
        ->each(fn ($permission) => Permission::findOrCreate($permission, 'web'));

        $rolesPermissions = collect([
            'Manager' => [
                'read project', 'create project', 'update project', 'delete project',
            ],
            'Client' => [
                'read project'
                ],
        ]);

        $rolesPermissions->each(function ($permissions, $role) {
            $roleInstance = Role::create(['name' => $role]);
            $roleInstance->givePermissionTo($permissions);
        });

    // buat role admin dengan semua permissions
    $adminRole = Role::findOrCreate('super-admin', 'web');

    // assign role ke user id=1 (kalau ada)
    if ($user = User::find(1)) {
        $user->assignRole($adminRole);
    }

    User::find(2)->assignRole('Manager');
    User::find(3)->assignRole('Manager');
    User::find(4)->assignRole('Manager');
    User::find(5)->assignRole('Manager');
    User::find(6)->assignRole('Client');
    User::find(7)->assignRole('Client');
    User::find(8)->assignRole('Client');
    User::find(9)->assignRole('Client');
}
}
