<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\SubtaskCalendarData;
use Illuminate\Support\Collection;

class ProjectCalendarData extends Data
{
    /**
     * @param DataCollection<int, SubtaskCalendarData> $subtasks
     */
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?string $due_date,
        public ?string $priority,
        public ?AssignData $assignees,
        public ?StatusCalendarData $status,
        public ?ProjectGroupCalendarData $projectGroup,
        /** @var Collection<int, SubtaskCalendarData> */
        public ?Collection $subtasks,
    ) {}
}
