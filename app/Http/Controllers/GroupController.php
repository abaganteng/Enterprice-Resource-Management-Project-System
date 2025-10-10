<?php

namespace App\Http\Controllers;

use App\Data\ManageUserData;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectGroup;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;

class GroupController extends Controller
{
    public function index(Project $project)
    {
        
        $project->load(['projectGroups.statuses.tasks.subtasks', 'projectGroups.statuses.tasks.assignees']);

        $users = User::select('id', 'name')->get();

        return inertia('projects/groups/index', [
            'project' => ProjectDetailData::from($project),
            'users' => ManageUserData::collect($users)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        ProjectGroup::create([
            'name' => $validated['name'],
            'project_id' => $validated['project_id']
        ]);

        flash('New list has been created');

        return back();
    }

    public function rename(Project $project, ProjectGroup $group, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $group->update($validated);

        flash('Rename List Successfuly');

        return back();
    }
}
