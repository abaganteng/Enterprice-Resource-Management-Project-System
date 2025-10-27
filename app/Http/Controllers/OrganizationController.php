<?php

namespace App\Http\Controllers;

use App\Data\HumanResources\DepartmentData;
use App\Models\Department;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function dashboard()
    {
        return inertia('human-resources/organizations/index');
    }

    public function departments()
    {
        $departments = Department::with([
            'head', // Relasi ke employee yang menjadi head
            'positions.employees', // Position dan jumlah employee di setiap position
            'employees' // Semua employee di department
        ])->get();

        return inertia('human-resources/organizations/departments/index', [
            'departments' => DepartmentData::collect($departments),
        ]);
    }

    public function departmentRename(Request $request, Department $department)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $department->update([
            'name' => $request->input('name'),
        ]);

        flash('Department renamed successfully');

        return back();
    }

    public function departmentDestroy(Request $request, Department $department)
    {
        $department->delete();

        flash('Department deleted successfully');

        return back();
    }
}
