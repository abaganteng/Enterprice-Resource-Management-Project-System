<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [];
        
        // Get all departments
        $departments = DB::table('departments')->get();
        
        $positionTemplates = [
            [
                'name' => 'Manager',
                'base_salary' => 15000000,
                'level' => 5,
            ],
            [
                'name' => 'Senior Specialist',
                'base_salary' => 12000000,
                'level' => 4,
            ],
            [
                'name' => 'Specialist',
                'base_salary' => 9000000,
                'level' => 3,
            ],
            [
                'name' => 'Junior Specialist',
                'base_salary' => 7000000,
                'level' => 2,
            ],
            [
                'name' => 'Staff',
                'base_salary' => 5000000,
                'level' => 1,
            ],
        ];

        foreach ($departments as $department) {
            foreach ($positionTemplates as $template) {
                $positions[] = [
                    'department_id' => $department->id,
                    'name' => $department->name . ' ' . $template['name'],
                    'base_salary' => $template['base_salary'],
                    'level' => $template['level'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('positions')->insert($positions);
    }
}
