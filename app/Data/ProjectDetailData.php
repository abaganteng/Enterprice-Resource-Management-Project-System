<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;


class ProjectDetailData extends Data
{
        /**
     * @param DataCollection<int, ProjectPhaseData> $project_phases
     * @param DataCollection<int, MilestoneData> $milestones
     */
    public function __construct(
        public ?int $id,
        public ?UserData $manager,
        public ?UserData $client,
        public ?string $name,
        public ?string $description,
        public ?string $project_type,
        public ?string $start_date,
        public ?string $end_date,
        public ?float $budget,
        public ?string $status,
        public string $created_at,
        public string $updated_at,
        /** @var Collection<int, ProjectPhaseData> */
        public ?Collection $phases,
        /** @var Collection<int, MilestoneData> */
        public ?Collection $milestones
    ) {}
}
