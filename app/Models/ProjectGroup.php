<?php

namespace App\Models;

use App\Models\Task;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectGroup extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_id',
        'name'
    ];
    public function statuses(): HasMany
    {
        return $this->hasMany(Status::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
