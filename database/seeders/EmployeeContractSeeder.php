<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EmployeeContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contracts = [];
        
        // Get all active employees
        $employees = DB::table('employees')->where('status', 'active')->get();
        
        foreach ($employees as $employee) {
            $contractType = $this->getContractType();
            $startDate = $employee->join_date;
            
            $contracts[] = [
                'employee_id' => $employee->id,
                'position_id' => $employee->position_id,
                'contract_type' => $contractType,
                'start_date' => $startDate,
                'end_date' => $this->getEndDate($startDate, $contractType),
                'benefits' => $this->getBenefits($contractType),
                'status' => $this->getContractStatus($startDate),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('employee_contracts')->insert($contracts);
    }

    private function getContractType()
    {
        $types = ['permanent', 'contract', 'permanent', 'permanent', 'contract']; // lebih banyak permanent
        return $types[array_rand($types)];
    }

    private function getEndDate($startDate, $contractType)
    {
        if ($contractType === 'permanent') {
            return null; // permanent contract tidak ada end date
        }
        
        // Contract type: 1-2 tahun dari start date
        $years = rand(1, 2);
        $endDate = date('Y-m-d', strtotime("$startDate + $years years"));
        
        return $endDate;
    }

    private function getBenefits($contractType)
    {
        $baseBenefits = ['BPJS Kesehatan', 'BPJS Ketenagakerjaan'];
        
        if ($contractType === 'permanent') {
            $additionalBenefits = ['Tunjangan Hari Raya', 'Bonus Tahunan', 'Asuransi Kesehatan Keluarga', 'Cuti Tahunan 12 hari'];
            $selectedBenefits = array_merge($baseBenefits, [array_rand(array_flip($additionalBenefits))]);
        } else {
            $additionalBenefits = ['Tunjangan Hari Raya', 'Cuti Tahunan 6 hari'];
            $selectedBenefits = array_merge($baseBenefits, [array_rand(array_flip($additionalBenefits))]);
        }
        
        return implode(', ', $selectedBenefits);
    }

    private function getContractStatus($startDate)
    {
        // Jika kontrak sudah lewat dari sekarang, status expired
        $endDate = $this->getEndDate($startDate, 'contract'); // sample check
        if ($endDate && strtotime($endDate) < time()) {
            return 'expired';
        }
        
        return 'active';
    }
}
