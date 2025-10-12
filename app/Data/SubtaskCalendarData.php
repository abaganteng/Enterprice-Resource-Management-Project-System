<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SubtaskCalendarData extends Data
{
    public function __construct(
        public ?string $name,
        public ?AssignData $assign
    ) {}
}
