<?php

namespace App\Data;

use App\Data\StatusData;
use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class ProjectGroupData extends Data
{
    /**
     * @param DataCollection<int, StatusData> $statuses
     */
    public function __construct(
        public ?int $id,
        public ?string $name,
        /** @var Collection<int, StatusData> */
        public ?Collection $statuses
    ) {}
}
