<?php

namespace App\Data\HumanResources;

use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class PositionData extends Data
{
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?DepartmentData $department,
        /** @var Collection<int, EmployeeData> */
        public ?Collection $employees,
        public ?float $base_salary,
        public ?int $level,
    ) {}
}
