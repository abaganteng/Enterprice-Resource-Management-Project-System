<?php

namespace App\Models;

use App\Models\User;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\ProjectPhase;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'due_date'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function phase(): BelongsTo
    {
        return $this->belongsTo(ProjectPhase::class, 'phase_id');
    }

    public function milestone(): BelongsTo
    {
        return $this->belongsTo(Milestone::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assign_to');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
