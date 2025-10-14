<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Status;
use App\Models\Project;
use App\Models\ProjectGroup;
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

        $project = $validated['project_id'];

        $task = Task::create([
            'name' => $validated['name'],
            'project_id' => $validated['project_id'],
            'project_group_id' => $validated['project_group_id'],
            'status_id' => $validated['status_id']
        ]);

        flash('New task has been created');

        return to_route('projects.groups.index', $project);
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

    public function assignTask(Project $project, ProjectGroup $projectGroup, $status, Task $task, Request $request)
    {
        $validated = $request->validate([
            'assigned_to' => ['required', 'exists:users,id'],
        ]);

        // Tambahkan user ke task (tanpa menghapus user lain yang sudah di-assign)
        $task->assignees()->syncWithoutDetaching([$validated['assigned_to']]);

        flash('Assign task successfully');

        return back();
    }

    public function assignRemove(Project $project, ProjectGroup $projectGroup, $status, Task $task, $assign ,Request $request)
    {
            // Pastikan task dan user benar-benar terhubung
        $exists = $task->assignees()->where('user_id', $assign)->exists();

        if (! $exists) {
            return back()->with('error', 'User tidak ter-assign ke task ini.');
        }

        // Lepas relasi di pivot table
        $task->assignees()->detach($assign);

        flash('Remove succesfully');

        // Kembalikan respon inertia
        return to_route('projects.groups.index', $project);
    }

    public function taskDate(Project $project, ProjectGroup $projectGroup, $status, Task $task, Request $request)
    {
        $validated = $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'due_date' => ['nullable', 'date'],
        ]);

        $task->update($validated);

        flash('Date already set');

        return back();
    }

    public function priorityTask(Project $project, ProjectGroup $projectGroup, $status, Task $task, Request $request)
    {
        $validated = $request->validate([
            'priority' => ['required'],
        ]);
        
        $task->update([
            'priority' => $validated['priority'],
        ]);
        
        flash('Add Priority successfully');

        return back();
    }

    public function subtaskStore(Project $project, ProjectGroup $projectGroup, $status, Task $task, Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required',
            'project_group_id' => 'required',
            'status_id' => 'required',
            'parent_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        $project = $validated['project_id'];

        $task = Task::create([
            'name' => $validated['name'],
            'project_id' => $validated['project_id'],
            'project_group_id' => $validated['project_group_id'],
            'status_id' => $validated['status_id'],
            'parent_id' => $validated['parent_id'],
        ]);

        flash('New subtask has been created');

        return to_route('projects.groups.index', $project);
    }

    public function renameTask(Project $project, ProjectGroup $projectGroup, $status, Task $task, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $task->update($validated);

        flash('Rename Task Successfuly');

        return back();
    }

}