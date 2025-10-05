<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;

class TaskController extends Controller
{
    public function store(Request $request, $project, $status)
    {
        $validated = $request->validate([
            'project_id' => 'required',
            'project_group_id' => 'required',
            'status_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        $task = Task::create([
            'name' => $validated['name'],
            'project_id' => $validated['project_id'],
            'project_group_id' => $validated['project_group_id'],
            'status_id' => $validated['status_id']
        ]);

        flash('New task has been created');

        return back();
    }

    public function show(Project $project, $group, $status, $task)
{
    $task = Task::where([
        'id' => $task,
        'status_id' => $status,
        'project_group_id' => $group,
        'project_id' => $project->id,
    ])
    ->with(['status.group.project', 'subtasks'])
    ->firstOrFail();

    $subtasks = Task::where('parent_id', $task->id)->get();

    return inertia('projects/groups/statuses/tasks/show', [
        'project' => $project,
        'task' => $task,
        'subtasks' => $subtasks,
    ]);
}

}