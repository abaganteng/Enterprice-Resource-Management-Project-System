<?php

namespace App\Http\Controllers;

use App\ProjectStatus;
use App\Models\Project;
use App\Data\ProjectData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
   public function index()
    {   
        $statuses = collect(ProjectStatus::cases())->map(function ($status) {
            return [
                'id' => $status->value,  // draft, in_progress, etc
                'name' => ucfirst(str_replace('_', ' ', $status->name)),
            ];
        });
        $query = Project::with(['manager', 'client']);

        // Jika bukan super-admin, filter berdasarkan manager_id
        if (!Auth::user()->hasRole('super-admin')) {
            $query->where('manager_id', Auth::id());
        }

        $projects = $query->paginate(10);

        return inertia('projects/index', [
            'projects' => ProjectData::collect($projects),
            'statuses' => $statuses,
        ]);
    }

    public function store(Request $request)
    {
        dd($request->all());
    }
}
