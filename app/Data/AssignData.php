<?php

namespace App\Data;

use Spatie\LaravelData\Data;
class AssignData extends Data
{
    public function __construct(
        public ?string $name,
    ) {}
}
