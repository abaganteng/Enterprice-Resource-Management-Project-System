<?php

namespace App\Data;


use Spatie\LaravelData\Data;
use Illuminate\Support\Collection;

class ManageUserListData extends Data
{
    /**
     * @param DataCollection<int, RoleData> $roles
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        /** @var Collection<int, RoleData> */
        public Collection $roles
    ) {}
}
