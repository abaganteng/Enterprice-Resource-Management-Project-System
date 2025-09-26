<?php

namespace App\Data;

use App\Models\Project;
use Spatie\LaravelData\Data;

class ProjectData extends Data
{

        public function __construct(
        public int $id,
        public ?ManageUserData $manager,
        public ?ManageUserData $client,
        public string $name,
        public ?string $description,
        public ?string $project_type,
        public ?float $budget,
        public ?string $status,
        public ?string $start_date,
        public ?string $end_date,
    ) {}

}
