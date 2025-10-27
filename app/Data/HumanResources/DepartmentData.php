<?php

namespace App\Data\HumanResources;

use App\Data\UserData;
use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;
use App\Data\HumanResources\EmployeeData;
use App\Data\HumanResources\PositionData;

class DepartmentData extends Data
{
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?UserData $head,
        /** @var Collection<int, PositionData> */
        public ?Collection $positions,
        /** @var Collection<int, EmployeeData> */
        public ?Collection $employees,
    ) {}
}
