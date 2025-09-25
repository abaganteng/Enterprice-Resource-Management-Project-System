<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Project;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function gravatar(): Attribute
    {
        return Attribute::make(fn () => $this->avatar());
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function avatar($size = 200): string
    {
        return 'https://www.gravatar.com/avatar/'.md5(strtolower(trim($this->email))).'?s='.$size.'&d=mp';
    }

    public function managedProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'manager_id');
    }

    public function clientProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function approvedMilestones(): HasMany
    {
        return $this->hasMany(Milestone::class, 'approved_by');
    }

    public function assignedTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'assign_to');
    }

    public function createdTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by');
    }
}
