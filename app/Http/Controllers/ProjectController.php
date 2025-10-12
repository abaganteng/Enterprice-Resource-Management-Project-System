<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\ProjectType;
use App\ProjectStatus;
use App\Models\Project;
use App\Data\ProjectData;
use App\Data\ManageUserData;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;
use Illuminate\Validation\Rule;
use App\Data\ProjectCalendarData;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
        public function overview(Project $project)
    {
        $project->load(['projectGroups.statuses.tasks.subtasks', 'projectGroups.statuses.tasks.assignees']);

        return inertia('projects/overview', [
            'project' => ProjectDetailData::from($project),
        ]);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
        'name'         => 'required|string|max:255',
    ]);

    $project = Project::create([
        'name'        => $validated['name'],
        'created_by'  => Auth::id(),
    ]);

    flash('Project created successfully!');
    

    return to_route('home');

    }

    public function dateStore(Request $request, Project $project)
    {
        $validated = $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'due_date' => ['nullable', 'date'],
        ]);

        $project->update($validated);

        flash('Date already set');

        return back();
    
    }

    public function calendarPage(Project $project)
    {
        $project->load(['projectGroups.statuses.tasks.subtasks', 'projectGroups.statuses.tasks.assignees']);

        $tasks = Task::with(['assignees', 'status.group', 'subtasks.assignees'])
            ->where('project_id', $project->id)
            ->get();

        return inertia('projects/calendars/project-calendar-page', [
            'project' => ProjectDetailData::from($project),
            'tasks' => ProjectCalendarData::collect($tasks),
        ]);
    }


}
