<?php

namespace App\Data;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class ManageUserDetailData extends Data
{
    /**
     * @param DataCollection<int, RoleDetailData> $roles
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        /** @var Collection<int, RoleDetailData> */
        public Collection $roles
    ) {}
}
