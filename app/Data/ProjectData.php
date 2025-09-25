<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProjectData extends Data
{
    public function __construct(
        public ?int $id,
        public ManageUserData $manager,
        public ManageUserData $client,
        public string $name,
        public ?string $start_date,
        public ?string $end_date,
        public ?float $budget,
        public ?string $status,
    ) {}
}
