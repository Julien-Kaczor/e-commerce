<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use DB;
use Auth;  
use Str;
use App\User; 
use Carbon\Carbon;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;

class AuthController extends Controller
{
    public function index()
    {

    }

    public function login(Request $request)
    {
        $user_data = array(
            'name'  => $request->name,
            'password' => $request->password,
        );

        if(Auth::attempt($user_data))
        {
            $token = Str::random(60);

            $request->user()->forceFill([
                'api_token' => hash('sha256', $token),
            ])->save();

            return response()->json($token, 200);
        } else {
            return response()->json(false, 401);
        }
    }

    public function register(Request $request)
    {
        try
        {
            DB::table('users')->insert([
            'name' =>  $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'api_token' => Str::random(60),
            'created_at' => Carbon::now(),
        ]);
        return response()->json(true, 200);
    }
        catch(Exception $e)
        {
            return response()->json(false, 401);
        }
    } 
}
