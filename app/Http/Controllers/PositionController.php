<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Data\HumanResources\PositionData;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $query = Position::with(['department', 'employees']);

        if ($request->has('department_id') && $request->department_id) {
        $query->where('department_id', $request->department_id);
        }

        $positions = $query->paginate(10);

        $departments = Department::select('id', 'name')->get();

        return inertia('human-resources/organizations/positions/index', [
            'positions' => PositionData::collect($positions),
            'departments' => $departments,
            'filters' => $request->only('department_id'),
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|integer',
            'base_salary' => 'required',
        ]);

        $position = Position::create($request->all());

        flash('Position created successfully');

        return back();
    }

    public function update(Request $request, Position $position)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|integer',
            'base_salary' => 'required|numeric',
        ]);

        $position->update($request->all());

        flash('Position updated successfully');

        return back();
    }

    public function destroy(Request $request, Position $position)
    {
        $position->delete();

        flash('Position deleted successfully');

        return back();
    }


    public function storePositionByDepartment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|integer',
            // 'base_salary' => 'required|numeric',
        ]);

        $position = Position::create($request->all());

        flash('Position created successfully');

        return back();
    }

    public function updatePositionByDepartment(Request $request, Position $position)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            // 'department_id' => 'required|integer',
            'base_salary' => 'required|numeric',
        ]);

        $position->update($request->all());

        flash('Position updated successfully');

        return back();
    }

    public function destroyPositionByDepartment(Request $request, Position $position)
    {
        $position->delete();

        flash('Position deleted successfully');

        return back();
    }
}
