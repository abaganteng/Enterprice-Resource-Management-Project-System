<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\ProjectType;
use App\ProjectStatus;
use App\Models\Project;
use App\Data\ProjectData;
use App\Data\ManageUserData;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function dashboard()
    {
        return inertia('projects/dashbaord');
    }

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
    ]);

    $project = Project::create([
        'name'        => $validated['name'],
        'created_by'  => Auth::id(),
    ]);

    flash('Project created successfully!');

    return to_route('home');

    }

    public function update(Request $request, Project $project)
{
    // Semua rules divalidasi di sini
    $rules = [
        'name'         => ['required', 'string', 'max:255'],
        'description'  => ['nullable', 'string'],
        'budget'       => ['nullable', 'numeric', 'min:0'],
        'start_date'   => ['required', 'date'],
        'end_date'     => ['required', 'date', 'after_or_equal:start_date'],
        'project_type' => ['required', Rule::enum(ProjectType::class)],
        'client_id'    => ['nullable', 'exists:users,id'],
        // ⚠ status_id sengaja dihapus → update status pakai endpoint lain
    ];

    $validated = $request->validate($rules);

    // Update semua field tervalidasi
    $project->fill($validated);


    $project->save();

    flash('Project updated successfully!');

    return to_route('tasks/overview');
}

    public function show(Project $project)
    {
        $lists = $project->projectGroups()
        ->with([
            'statuses.tasks.subtasks', // status -> tasks -> subtasks
        ])
        ->get();

        return inertia('projects/show', [
            'project' => ProjectDetailData::from($lists),
        ]);
    }
}
