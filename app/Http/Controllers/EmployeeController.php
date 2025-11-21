<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use App\Models\Position;
use App\Models\Department;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Data\HumanResources\EmployeeData;
use App\Data\HumanResources\EmployeeContractData;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with(['user', 'department', 'position', 'contracts'])->latest();

        if($request->has('department_id')){
            $employees = $query->where('department_id', $request->input('department_id'));
        }

        if($request->has('position_id')){
            $employees = $query->where('position_id', $request->input('position_id'));
        }

        $employees = $query->paginate(10);

        $departments = Department::select('id', 'name')->get();

        $positions = Position::select('id', 'name', 'department_id')->get();

        return inertia('human-resources/organizations/employees/index', [
            'employees' => EmployeeData::collect($employees),
            'departments' => $departments,
            'positions' => $positions,
            'filters' => $request->only(['department_id', 'position_id']),
        ]);
    }

    public function profile(Request $request, Employee $employee)
    {
        $employee->load(['user', 'department', 'position', 'contracts']);

        return inertia('human-resources/organizations/employees/profile', [
            'employee' => EmployeeData::from($employee),
            'isOpen' => true,
        ]);
    }

    public function contract(Request $request, Employee $employee)
    {
        $employee->load(['contracts']);

        return inertia('human-resources/organizations/employees/contract', [
            'employee' => EmployeeData::from($employee),
            'contracts' => EmployeeContractData::collect($employee->contracts),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'makeUserAccount' => 'nullable|boolean',
            'department_id' => 'nullable|integer|exists:departments,id',
            'position_id'   => 'nullable|integer|exists:positions,id',
            'name'          => 'required|string|max:255',
            'gender'        => 'nullable|string|in:male,female,other',
            'email'         => 'nullable|email|max:255',
            'phone'         => 'nullable|string|max:20',
            'address'       => 'nullable|string|max:500',
            'date_of_birth' => 'nullable|date',
            'start_date'    => 'nullable|date',
            'end_date'      => 'nullable|date',
            'contract_type' => 'nullable',
            'benefits'      => 'nullable|string|max:500',
        ]);
        $departmentCode = Department::select('name')->find($validated['department_id'])->name;
        $departmentCode = strtoupper(Str::substr(str_replace(' ', '', $departmentCode), 0, 3));

        $employee = Employee::create([
            'employee_code' => $departmentCode . '-' . str_pad(Employee::count() + 1, 4, '0', STR_PAD_LEFT), 
            'department_id' => $validated['department_id'],
            'position_id'   => $validated['position_id'],
            'name'          => $validated['name'],
            'gender'        => $validated['gender'],
            'email'         => $validated['email'],
            'phone'         => $validated['phone'],
            'address'       => $validated['address'],
            'status'        => 'active',
            'date_of_birth' => $validated['date_of_birth'],
            'join_date' => now()
        ]);

        if($validated['makeUserAccount']){
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt('password'),
            ]);

            $employee->user()->associate($user);
            $employee->save();
        }

        if($validated['contract_type'] ){
            $employee->contracts()->create([
                'employee_id' => $employee->id,
                'position_id' => $validated['position_id'],
                'contract_type' => $validated['contract_type'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'benefits' => $validated['benefits'],
            ]);
        }

        flash('Employee created successfully');

        return back();
    }
}
