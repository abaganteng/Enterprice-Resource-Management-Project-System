<?php

namespace App\Data;

use App\Data\UserData;
use App\Data\ManageUserData;
use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class TaskData extends Data
{
    /**
     * @param DataCollection<int, UserData> $assignedTo
     */
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?string $due_date,
        public ?string $start_date,
        public ?string $end_date,
        public ?string $priority,
        /** @var Collection<int, UserData> */
        public ?Collection $assignees,
        public ?int $parent_id,
    ) {}
}
