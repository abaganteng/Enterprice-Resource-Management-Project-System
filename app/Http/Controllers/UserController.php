<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Data\ManageUserDetailData;
use App\Data\ManageUserListData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->paginate(10);
        
        return inertia('user/index', [
            'users' => fn () => ManageUserListData::collect($users)
        ]);
    }

    public function show(User $user)
    {
        $user->load('roles.permissions');
        return inertia('user/show', [
            'user' => fn () => ManageUserDetailData::from($user),
        ]);
    }

    public function create()
    {
        return inertia('user/form', [
            'user' => new User,
            'page_settings' => [
                'tittle' => 'Create user',
                'description' => 'Create a new user',
                'method' => 'post',
                'url' => route('manage-user.store')
            ]
        ]);
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

    public function edit(User $user)
    {
        return inertia('user/form', [
            'user' => $user,
            'page_settings' => [
                'tittle' => 'Update user',
                'description' => 'Update a user',
                'method' => 'put',
                'url' => route('manage-user.update', $user)
            ]
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
        'password' => ['nullable', 'min:8', 'confirmed'], // boleh kosong
        ]);

        $user->name = $validated['name']; 

        $user->email = $validated['email']; 

        if (!empty($validated['password'])) { 
            $user->password = Hash::make($validated['password']); 
        } 

        $user->save();

        flash('Account has been successfully updated.');

        return to_route('manage-user.show', ['user' => $user->id]);
    }

    
}
