<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;
use Spatie\LaravelData\DataCollection;

class RoleDetailData extends Data
{
    /**
     * @param DataCollection<int, PermissionData> $permissions
     */
    public function __construct(
        public int $id,
        public string $name,
        /** @var Collection<int, PermissionData> */
        public Collection $permissions
    ) {}
}
