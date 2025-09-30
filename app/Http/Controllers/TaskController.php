<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;

class TaskController extends Controller
{
    public function list(Project $project)
    {
        
        $project->load(['projectGroups.statuses.tasks.subtasks']);

        return inertia('tasks/list', [
            'project' => ProjectDetailData::from($project),
        ]);
    }

    public function overview(Project $project)
    {
        $project->load(['projectGroups.statuses.tasks.subtasks']);

        return inertia('tasks/overview', [
            'project' => ProjectDetailData::from($project),
        ]);
    }
}