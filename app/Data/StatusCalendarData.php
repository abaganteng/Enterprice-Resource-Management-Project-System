<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\ProjectGroupCalendarData;

class StatusCalendarData extends Data
{
    public function __construct(
        public ?string $name,
    ) {}
}
