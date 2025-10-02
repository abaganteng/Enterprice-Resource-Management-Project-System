<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required',
            'project_group_id' => 'required',
            'status_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        Task::create([
            'name' => $validated['name'],
            'project_id' => $validated['project_id'],
            'project_group_id' => $validated['project_group_id'],
            'status_id' => $validated['status_id']
        ]);

        flash('New task has been created');

        return back();
    }
}