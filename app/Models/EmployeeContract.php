<?php

namespace App\Models;

use App\Models\Employee;
use App\Models\Position;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeContract extends Model
{
    protected $fillable = [
        'employee_id',
        'position_id', 
        'contract_type',
        'start_date',
        'end_date',
        'benefits',
        'status',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}
