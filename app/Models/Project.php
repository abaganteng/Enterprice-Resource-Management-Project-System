<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Models\ProjectGroup;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'created_by',
        'start_date',
        'end_date',
        'due_date'
    ];

    public function getStartDate(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->start_date 
                ? Carbon::createFromFormat('Y-m-d', $this->start_date)->translatedFormat('d F Y') 
                : null
        );
    }

    public function getEndDate(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->end_date 
                ? Carbon::createFromFormat('Y-m-d', $this->end_date)->translatedFormat('d F Y') 
                : null
        );
    }

    public function getCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->created_at 
                ? Carbon::parse($this->created_at)->translatedFormat('d F Y') 
                : null
        );
    }

    public function getUpdatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->updated_at 
                ? Carbon::parse($this->updated_at)->translatedFormat('d F Y') 
                : null
        );
    }
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'project_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function projectGroups(): HasMany 
    {
        return  $this->hasMany(ProjectGroup::class, 'project_id');
    }   
}
