<?php

namespace App\Http\Middleware;

use Closure;
use DB;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $exp = $request->header('Authorization');
        $token = explode(" ", $exp);

        try
        {
            $test = DB::table('users')->where([
            'api_token' =>  $token[1],
        ])->get();

        if ($test[0]->admin === 1) {
            return response()->json(true, 200);

        } else {
            return response()->json(false, 200);
        }
    }
        catch(Exception $e)
        {
            return response()->json(false, 401);
        }

        return $next($request);
    }
}
