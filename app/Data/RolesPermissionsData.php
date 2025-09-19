<?php

namespace App\Data;

use App\Data\PermissionData;
use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
use Spatie\LaravelData\DataCollection;

class RolesPermissionsData extends Data
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
