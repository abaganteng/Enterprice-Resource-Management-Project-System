<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function dashboard()
    {
        return inertia('human-resources/organizations/index');
    }
}
