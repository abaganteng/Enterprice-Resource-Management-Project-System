<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MilestoneData extends Data
{
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?string $description,
        public ?string $due_date,
        public ?string $status,
        public ?string $created_at,
        public ?string $updated_at,
    ) {}
}
