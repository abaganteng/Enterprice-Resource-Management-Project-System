<?php

namespace App\Data;

use App\Models\User;
use App\Data\ManageUserData;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class UserData extends Data
{
    /**
     * @param Collection<int, ManageUserData> $roles
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
            ManageUserData::collect($user->roles->toArray())
        );
    }
}
