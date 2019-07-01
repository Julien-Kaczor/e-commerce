<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;

class UserController extends Controller
{
    public function index(Request $request){
        $exp = $request->header('Authorization');
        $token = explode(" ", $exp);

        try
        {
            $user = DB::table('users')->where(['api_token' =>  $token[1], ])->get();
            return response()->json($user, 200);
        } catch(Exception $e) {
            return response()->json(false, 401);
        }
        return $next($request);
    }
}
