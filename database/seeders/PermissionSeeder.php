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
    $defaultPermissions = ['create', 'read', 'update', 'delete', 'approve', 'assign'];

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

        // $rolesPermissions = collect([
        //     'Manager' => [
        //         'read project', 'create project', 'update project',
        //         'read project phase', 'create project phase', 'update project phase',
        //         'read milestone', 'create milestone', 'update milestone',
        //         'read task', 'create task', 'update task',
        //     ],
        //     'Client' => [
        //         'read project', 'approve milestone'
        //         ],
        //     'Team Lead' => [
        //         'read milestone', 'create milestone', 'update milestone',
        //         'read task', 'create task', 'update task', 'assign task',
        //     ],
        //     'Employee' => [
        //         'read task', 'update task',
        //     ],
        // ]);

        // $rolesPermissions->each(function ($permissions, $role) {
        //     $roleInstance = Role::create(['name' => $role]);
        //     $roleInstance->givePermissionTo($permissions);
        // });

    // buat role admin dengan semua permissions
    $adminRole = Role::findOrCreate('super-admin', 'web');

    // assign role ke user id=1 (kalau ada)
    if ($user = User::find(1)) {
        $user->assignRole($adminRole);
    }

    // $managers = [2, 3, 4, 5];
    // $clients  = [6, 7, 8, 9];
    // $teamLeads = [10, 11, 12, 13];
    // $employees = [14, 15, 16, 17, 18];


    // // Assign role Manager
    // User::whereIn('id', $managers)->get()->each->assignRole('Manager');

    // // Assign role Client
    // User::whereIn('id', $clients)->get()->each->assignRole('Client');

    // // Assign role Team Lead
    // User::whereIn('id', $teamLeads)->get()->each->assignRole('Team Lead');

    // // Assign role Employee
    // User::whereIn('id', $employees)->get()->each->assignRole('Employee');
}
}
