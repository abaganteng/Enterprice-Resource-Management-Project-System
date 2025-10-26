<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [];
        
        // Get all positions
        $positions = DB::table('positions')->get();
        
        $counter = 1;
        
        foreach ($positions as $position) {
            $department = DB::table('departments')->where('id', $position->department_id)->first();
            $departmentCode = strtoupper(Str::substr(str_replace(' ', '', $department->name), 0, 3));
            
            $gender = $counter % 2 == 0 ? 'male' : 'female';
            $firstName = $gender == 'male' ? $this->getMaleName() : $this->getFemaleName();
            $lastName = $this->getLastName();
            
            $employees[] = [
                'user_id' => null, // bisa dihubungkan dengan user nanti
                'department_id' => $position->department_id,
                'position_id' => $position->id,
                'employee_code' => $departmentCode . '-' . str_pad($counter, 4, '0', STR_PAD_LEFT),
                'name' => $firstName . ' ' . $lastName,
                'gender' => $gender,
                'date_of_birth' => $this->generateBirthDate(25, 45),
                'phone' => $this->generatePhoneNumber(),
                'email' => Str::lower($firstName . '.' . $lastName . '@company.com'),
                'address' => $this->generateAddress(),
                'join_date' => $this->generateJoinDate(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ];
            
            $counter++;
        }

        DB::table('employees')->insert($employees);
    }

    private function getMaleName()
    {
        $names = ['Budi', 'Ahmad', 'Joko', 'Surya', 'Rizky', 'Dimas', 'Fajar', 'Hendra', 'Irfan', 'Kevin'];
        return $names[array_rand($names)];
    }

    private function getFemaleName()
    {
        $names = ['Sari', 'Dewi', 'Rina', 'Maya', 'Linda', 'Ani', 'Citra', 'Eka', 'Gita', 'Intan'];
        return $names[array_rand($names)];
    }

    private function getLastName()
    {
        $names = ['Santoso', 'Wijaya', 'Pratama', 'Kusuma', 'Hadi', 'Nugroho', 'Putra', 'Siregar', 'Tanuwijaya', 'Halim'];
        return $names[array_rand($names)];
    }

    private function generateBirthDate($minAge, $maxAge)
    {
        $age = rand($minAge, $maxAge);
        $year = date('Y') - $age;
        $month = rand(1, 12);
        $day = rand(1, 28); // untuk menghindari masalah bulan Februari
        
        return date('Y-m-d', strtotime("$year-$month-$day"));
    }

    private function generatePhoneNumber()
    {
        $prefixes = ['0812', '0813', '0857', '0858', '0878', '0896'];
        return $prefixes[array_rand($prefixes)] . rand(1000000, 9999999);
    }

    private function generateAddress()
    {
        $streets = ['Jl. Merdeka No.', 'Jl. Sudirman No.', 'Jl. Thamrin No.', 'Jl. Gatot Subroto No.', 'Jl. Hayam Wuruk No.'];
        $cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang'];
        
        return $streets[array_rand($streets)] . rand(1, 100) . ', ' . $cities[array_rand($cities)];
    }

    private function generateJoinDate()
    {
        // Join date antara 1-5 tahun yang lalu
        $yearsAgo = rand(1, 5);
        $month = rand(1, 12);
        $day = rand(1, 28);
        
        $year = date('Y') - $yearsAgo;
        
        return date('Y-m-d', strtotime("$year-$month-$day"));
    }
}
