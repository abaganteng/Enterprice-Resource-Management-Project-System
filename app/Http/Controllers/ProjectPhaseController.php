<?php

namespace App\Http\Controllers;

use App\Models\ProjectPhase;
use Illuminate\Http\Request;

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
        $user = $request->user();

    // 🔐 Cek role & akses
    if ($user->hasRole('manager') && $phase->project->manager_id !== $user->id) {
        abort(403, 'Anda tidak memiliki akses untuk mengupdate phase ini.');
    }
    // Super Admin → bisa override, tidak perlu cek

    // 📌 Aturan validasi
    $rules = [
        'name'        => 'required|string|max:255',
        'description' => 'nullable|string',
        'end_date'    => 'nullable|date|after_or_equal:' . $phase->start_date,
        // 'status'      => 'required|string|in:draft,in_progress,completed',
    ];

    // Jika status bukan draft, start_date tidak boleh diubah
    if ($phase->status === 'draft') {
        $rules['start_date'] = 'required|date|before_or_equal:end_date';
    }

    $validated = $request->validate($rules);

    // 🚫 Status tidak boleh mundur ke draft
    if ($phase->status !== 'draft' && $validated['status'] === 'draft') {
        return back()->withErrors([
            'status' => 'Status tidak bisa dikembalikan ke draft.'
        ]);
    }

    // 🔄 Update field yang diizinkan
    $phase->fill([
        'name'        => $validated['name'],
        'description' => $validated['description'] ?? $phase->description,
        'end_date'    => $validated['end_date'] ?? $phase->end_date,
        'status'      => 'draft',
        'start_date'  => $validated['start_date'] ?? $phase->start_date,
    ]);

    // Jika phase bukan draft, pastikan start_date tidak diubah
    if ($phase->status !== 'draft') {
        unset($phase->start_date);
    }

    $phase->save();

    flash('Project phase updated successfully!');
    return to_route('projects.show', $phase->project_id);
    }

    public function show(ProjectPhase $phase)
    {
        dd('hello world');
        $phase->load(['milestones.tasks']);

        return inertia('phases/show', [
            'phase' => $phase
        ]);
    }
}
