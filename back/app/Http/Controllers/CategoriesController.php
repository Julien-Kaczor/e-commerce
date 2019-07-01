<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categories;

class CategoriesController extends Controller
{
    public function index(Request $request, Categories $categories){
        $categories = Categories::all();

        return response()->json($categories);
    }

    public function show(Request $request, $id, Categories $categories){
        $categories = Categories::find($id);

        return response()->json($categories);
    }
}
