<?php

namespace App\Data\HumanResources;

use Spatie\LaravelData\Data;
use App\Data\HumanResources\EmployeeData;
use App\Data\HumanResources\PositionData;

class EmployeeContractData extends Data
{
    public function __construct(
        public ?int $id,
        public ?EmployeeData $employee,
        public ?PositionData $position,
        public ?bool $has_active_contract,
        public ?string $contract_type,
        public ?string $start_date,
        public ?string $end_date,
        public ?string $benefits,
        public ?string $status,
    ) {}
}
