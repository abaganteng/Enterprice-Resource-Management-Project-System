<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\ProjectType;
use App\ProjectStatus;
use App\Models\Project;
use App\Data\ProjectData;
use App\Data\ManageUserData;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
        $types = collect(ProjectType::cases())->map(function ($type) {
            return [
                'id' => $type->value,  // draft, in_progress, etc
                'name' => ucfirst(str_replace('_', ' ', $type->name)),
            ];
        });
        $clients = User::role('client')->get();
        $query = Project::with(['manager', 'client']);

        // Jika bukan super-admin, filter berdasarkan manager_id
        if (!Auth::user()->hasRole('super-admin')) {
            $query->where('manager_id', Auth::id());
        }

        $projects = $query->paginate(10);

        return inertia('projects/index', [
            'projects' => ProjectData::collect($projects),
            'statuses' => $statuses,
            'types' => $types,
            'clients' => ManageUserData::collect($clients),
            'create' => [
                'title' => 'Create New Project',
                'description' => 'Create a new project here.',
                'buttonText' => 'Create Project',
                'method' => 'post',
                'url' => route('projects.store'),
            ],
            'update' => [
                'title' => 'Update Project',
                'description' => 'Update the project details here.',
                'buttonText' => 'Update Project',
                'method' => 'put',
                'url' => route('projects.update'),
            ]
        ]);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
        'name'         => 'required|string|max:255',
        'description'  => 'nullable|string',
        'budget'       => 'nullable|numeric|min:0',
        'status_id'    => ['required', Rule::enum(ProjectStatus::class)],
        'start_date'   => 'required|date',
        'end_date'     => 'required|date|after_or_equal:start_date',
        'project_type' => ['required', Rule::enum(ProjectType::class)],
        'client_id'    => [
            'nullable',
            'exists:users,id'
        ],
    ]);
    

    $project = Project::create([
        'name'        => $validated['name'],
        'description' => $validated['description'] ?? null,
        'budget'      => $validated['budget'] ?? 0,
        'status'      => $validated['status_id'],
        'start_date'  => $validated['start_date'],
        'end_date'    => $validated['end_date'],
        'project_type'=> $validated['project_type'],
        'client_id'   => $validated['client_id'] ?? null,
        'manager_id'  => Auth::id(),
    ]);

    flash('Project created successfully!');

    return to_route('projects.index');

    }

    public function update()
    {
        dd('update project');
    }
}
