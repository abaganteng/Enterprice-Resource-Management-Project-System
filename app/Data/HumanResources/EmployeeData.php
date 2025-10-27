<?php

namespace App\Data\HumanResources;

use App\Data\UserData;
use Spatie\LaravelData\Data;

class EmployeeData extends Data
{
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?string $email,
        public ?string $phone,
        public ?string $address,
        public ?string $date_of_birth,
        public ?string $gender,
        public ?string $status,
        public ?PositionData $position,
        public ?UserData $user,
        public ?string $join_date,
    ) {}
}
