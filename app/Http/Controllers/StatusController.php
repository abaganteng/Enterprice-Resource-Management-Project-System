<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Models\Project;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function rename(Project $project, Status $status, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required'
        ]);

        $status->update($validated);

        flash('Rename List Successfuly');

        return back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_group_id' => 'required',
            'name' => 'required|string|max:255',
            'color' => 'required',
        ]);

        Status::create([
            'project_group_id' => $validated['project_group_id'],
            'name' => $validated['name'],
            'color' => $validated['color'],
        ]);

        flash('New task has been created');

        return back();
    }
}
