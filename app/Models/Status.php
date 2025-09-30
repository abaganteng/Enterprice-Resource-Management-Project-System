<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [
        'list_id',
        'name'
    ];
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
