<?php

namespace App\Models;

use App\Models\Salary;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payroll extends Model
{
    protected $fillable = [
        'year',
        'month',
        'reference'
    ];

    public function salaries(): HasMany
    {
        return $this->hasMany(Salary::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
