<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Status;
use Illuminate\Database\Seeder;
use Database\Seeders\PositionSeeder;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\PermissionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(100)->create();

        $this->call([
            PermissionSeeder::class,
            DepartmentSeeder::class,
            PositionSeeder::class,
            EmployeeSeeder::class,
            EmployeeContractSeeder::class,
        ]);

        $defaults = [
            ['name' => 'TO DO', 'color' => '#90a1b9'],
            ['name' => 'DRAFT', 'color' => '#00c950'],
            ['name' => 'IN PROGRESS', 'color' => '#4f39f6'],
            ['name' => 'ON PROGRESS', 'color' => '#8e51ff'],
            ['name' => 'AT RISK', 'color' => '#ff6900'],
            ['name' => "UPDATE REQUIRED", 'color' => '#ffb900'],
            ['name' => 'ON HOLD', 'color' => '#894b00'],
            ['name' => 'COMPLETE', 'color' => '#00bba7'],
            ['name' => 'CANCELLED', 'color' => '#00bba7'],
        ];

        foreach ($defaults as $status) {
            Status::firstOrCreate(
                ['name' => $status['name'], 'is_default' => true],
                $status
            );
        }
    }
}
