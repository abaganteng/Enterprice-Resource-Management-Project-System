<?php

namespace App\Data;

use App\Data\PermissionData;
use Spatie\LaravelData\Data;
use Spatie\Permission\Models\Role;

class RoleData extends Data
{
    /**
     * @param Collection<int, PermissionData> $permissions
     */
    public function __construct(
        public int $id,
        public string $name,
        public array $permissions,
    ) {}

    public static function fromModel(Role $role): self
    {
        return new self(
            $role->id,
            $role->name,
            PermissionData::collect($role->permissions()->toArray())->toArray()
        );
    }
}
