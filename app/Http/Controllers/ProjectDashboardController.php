<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;

class ProjectDashboardController extends Controller
{
        public function dashboard(Project $project)
    {
        $project->load(['projectGroups.statuses.tasks.subtasks', 'projectGroups.statuses.tasks.assignees']);
        return inertia('projects/dashboard/dashboard', [
            'project' => ProjectDetailData::from($project),
        ]);
    }
}
