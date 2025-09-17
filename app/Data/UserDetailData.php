<?php

namespace App\Data;

use App\Models\User;
use App\Data\RoleData;
use Spatie\LaravelData\Data;

class UserDetailData extends Data
{
     /**
     * @param Collection<int, RoleData> $roles
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public array $roles, 
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            $user->id,
            $user->name,
            $user->email,
            RoleData::collect($user->roles->toArray())
        );
    }
}
