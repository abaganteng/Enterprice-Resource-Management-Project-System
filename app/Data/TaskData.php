<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class TaskData extends Data
{
    /**
     * @param DataCollection<int, PermissionData> $permissions
     */
    public function __construct(
        public ?int $id,
        public ?string $name,
        public ?int $parent_id,
    ) {}
}
