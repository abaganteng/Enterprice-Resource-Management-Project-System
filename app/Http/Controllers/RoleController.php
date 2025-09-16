<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function view()
    {
        return inertia('role/view');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        Role::create([
            'name' => $request->name,
            'guard_name' => 'web'
        ]);

        flash('New role has been successfully created.');

        return back();
        
    }

    public function assignRole()
    {


        return inertia('role/assign-role');
    }

    public function storeAssignRole()
    {
        dd('hy');
    }
}
