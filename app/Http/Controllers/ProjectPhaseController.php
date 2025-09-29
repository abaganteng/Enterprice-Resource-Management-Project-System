<?php

namespace App\Http\Controllers;

use App\Models\ProjectPhase;
use Illuminate\Http\Request;
use App\Data\ProjectDetailData;
use App\Data\ProjectPhaseDetailData;

class ProjectPhaseController extends Controller
{
    public function store(Request $request)
    {
       
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);
        
        $phase = ProjectPhase::create([
            'project_id' => $validated['project_id'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'start_date' => $validated['start_date'] ?? null,
            'end_date' => $validated['end_date'] ?? null,
            'status' => 'draft'
        ]);

        flash('Project phase created successfully!');

        return to_route('projects.show', $phase->project_id);
    }

public function update(Request $request, ProjectPhase $phase)
{
    // Base rules
    $rules = [
        'name'        => ['required', 'string', 'max:255'],
        'project_id' => ['required', 'exists:projects,id'],
        'description' => ['nullable', 'string'],
        'start_date'  => ['required', 'date'],
        'end_date'    => ['required', 'date', 'after_or_equal:start_date'],
        'status'      => ['required'],
    ];

    $validated = $request->validate($rules);


    // 🔄 Update langsung semua field tervalidasi
    $phase->fill($validated);
    $phase->save();

    flash('Project phase updated successfully!');

    return to_route('projects.show', $phase->project_id);
}


    public function show(ProjectPhase $phase)
    {
        $phase->load(['project.phases', 'milestones.tasks']);


        return inertia('phases/show', [
            'project' => ProjectDetailData::from($phase->project), // sidebar
            'phase'   => ProjectPhaseDetailData::from($phase),
            'update' => [
                'title' => 'Update Phase',
                'description' => 'Update the phase details here.',
                'buttonText' => 'Update Phase',
                'method' => 'put',
                'url' => route('phases.update', $phase->id),
            ]
        ]);
        }
}
