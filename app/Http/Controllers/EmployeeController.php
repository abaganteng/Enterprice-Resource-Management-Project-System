<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Position;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Data\HumanResources\EmployeeData;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with(['user', 'department', 'position', 'contracts']);

        if($request->has('department_id')){
            $employees = $query->where('department_id', $request->input('department_id'));
        }

        if($request->has('position_id')){
            $employees = $query->where('position_id', $request->input('position_id'));
        }

        $employees = $query->paginate(10);

        $departments = Department::select('id', 'name')->get();

        $positions = Position::select('id', 'name')->get();

        return inertia('human-resources/organizations/employees/index', [
            'employees' => EmployeeData::collect($employees),
            'departments' => $departments,
            'positions' => $positions,
            'filters' => $request->only(['department_id', 'position_id']),
        ]);
    }

    public function show(Request $request, Employee $employee)
    {
        $employee->load(['user', 'department', 'position', 'contracts']);

        return inertia('human-resources/organizations/employees/show', [
            'employee' => EmployeeData::from($employee),
            'isOpen' => true,
        ]);
    }
}
