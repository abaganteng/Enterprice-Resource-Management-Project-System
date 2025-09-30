<?php

namespace App\Data;

use App\Data\TaskData;
use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class StatusData extends Data
{
    /**
     * @param DataCollection<int, TaskData> $tasks
     */
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?int $parent_id,
        /** @var Collection<int, TaskData> */
        public ?Collection $tasks,
    ) {}
}
