<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->where('role', 'customer')
            ->when($request->search, function ($q, $search) {
                $q->whereAny(['name', 'email'], 'LIKE', "%$search%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }
}
