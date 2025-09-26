<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProjectDetailData extends Data
{
    public function __construct(
        public ?int $id,
        public UserData $manager,
        public UserData $client,
        public string $name,
        public string $description,
        public string $project_type,
        public ?string $start_date,
        public ?string $end_date,
        public ?float $budget,
        public ?string $status,
        public string $created_at,
        public string $updated_at,
    ) {}
}
