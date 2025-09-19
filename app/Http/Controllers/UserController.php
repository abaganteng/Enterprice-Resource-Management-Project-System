<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Data\UserData;
use App\Data\ManageUserData;
use App\Data\UserDetailData;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function view()
    {
        return inertia('user/view');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'email_verified_at' => now(),
        ]);


        flash('New account has been successfully created.');

        return back();
    }

    public function index()
    {
        $users = User::with(['roles' => function ($query) {
            $query->select('id', 'name');
        }])->paginate(10);
        
        $roles = Role::select(['id', 'name'])->get();
        
        return inertia('user/index', [
            'users' => fn () => UserData::collect($users),
            'roles' => fn () => ManageUserData::collect($roles)
        ]);
    }

    public function show(User $user)
    {
        $user->load('roles.permissions');
        return inertia('user/show', [
            'user' => fn () => UserDetailData::from($user),
        ]);
    }
}
