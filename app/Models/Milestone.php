<?php

namespace App\Models;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectPhase;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Milestone extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'due_Date',
        'status'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function phase(): BelongsTo
    {
        return $this->belongsTo(ProjectPhase::class, 'phase_id');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'upproved_by');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
