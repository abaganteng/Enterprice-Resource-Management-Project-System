<?php

namespace App\Models;

use App\Models\Task;
use App\Models\Project;
use App\Models\Milestone;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectPhase extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'start_date',
        'end_date',
        'status'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(Milestone::class, 'phase_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'phase_id');
    }
}
