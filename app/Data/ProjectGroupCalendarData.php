<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProjectGroupCalendarData extends Data
{
    public function __construct(
        public ?int $id,
        public ?string $name
    ) {}
}
