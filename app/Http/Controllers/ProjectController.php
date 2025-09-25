<?php

namespace App\Http\Controllers;

use App\Data\ProjectData;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {   
        $projects = Project::with(['manager', 'client'])->paginate(10);

        return inertia('projects/index', [
            'projects' => ProjectData::collect($projects),
            
        ]);
        
    }
}
