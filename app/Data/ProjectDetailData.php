<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\ProjectGroupData;
use Illuminate\Support\Collection;


class ProjectDetailData extends Data
{
    /**
     * @param DataCollection<int, ProjectGroupData> $projectGroups
     */
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?string $start_date,
        public ?string $end_date,
        public ?string $due_date,
        /** @var Collection<int, ProjectGroupData> */
        public ?Collection $projectGroups
    ) {}
}
