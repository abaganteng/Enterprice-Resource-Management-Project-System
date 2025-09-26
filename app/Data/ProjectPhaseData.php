<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class ProjectPhaseData extends Data
{
        /**
     * @param DataCollection<int, MilestoneData> $milestones
     */
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        public ?string $start_date,
        public ?string $end_date,
        public string $status,
        public ?string $created_at,
        public ?string $updated_at,
        /** @var Collection<int, MilestoneData> */
        public ?Collection $milestones
    ) {}
}
