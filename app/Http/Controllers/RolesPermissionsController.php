<?php

namespace App\Http\Controllers;

use App\Data\RolesPermissionsData;
use Spatie\Permission\Models\Role;
use Spatie\LaravelData\PaginatedDataCollection;

class RolesPermissionsController extends Controller
{
    public function index()
    {
        $rolesPermissions = Role::with('permissions:id,name')
        ->select('id','name')
        ->paginate(10);

    return inertia('roles-permissions/index', [
        'rolesPermissions' => RolesPermissionsData::collect($rolesPermissions, PaginatedDataCollection::class),
    ]);
    }
}
