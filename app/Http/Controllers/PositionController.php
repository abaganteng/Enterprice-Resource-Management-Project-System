<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    //
    public function store(Request $request)
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

    public function update(Request $request, Position $position)
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

    public function destroy(Request $request, Position $position)
    {
        $position->delete();

        flash('Position deleted successfully');

        return back();
    }
}
