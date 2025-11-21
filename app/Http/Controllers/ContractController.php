<?php

namespace App\Http\Controllers;

use App\Data\HumanResources\EmployeeContractData;
use App\Models\EmployeeContract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index(Request $request)
    {
        $query = EmployeeContract::with(['employee', 'position'])->latest();

        $contracts = $query->paginate(10);
        return inertia('human-resources/organizations/contracts/index', [
            'contracts' => EmployeeContractData::collect($contracts),
        ]);
    }
}
