<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\User;
use DB;


class ProductsController extends Controller
{
    public function index(Request $request, Product $product, User $user)
    {
        $products = [];

        $products['produits'] = Product::orderBy('id', 'desc')->get();
        foreach ($products['produits'] as $value) {
            $value->pictures = explode('|/|/|', $value->pictures);
        }
        $products['count'] = Product::count(); 
        $products['countAvailability'] = Product::where('availability', false)->count();
        $products['countAvailabilityT'] = Product::where('availability', true)->count(); 
        $products['countUser'] = User::count(); 

        return response()->json($products);
    }

    public function index_popularity(Request $request, Product $product, User $user)
    {
        $products = [];

        $products['produits'] = Product::orderBy('popularity', 'desc')->get();
        foreach ($products['produits'] as $value) {
            $value->pictures = explode('|/|/|', $value->pictures);
        }
        $products['count'] = Product::count();
        $products['countAvailability'] = Product::where('availability', false)->count();
        $products['countAvailabilityT'] = Product::where('availability', true)->count();
        $products['countUser'] = User::count();

        return response()->json($products);
    }
 
    public function show(Request $request, $id, Product $product)
    {
        $products = Product::find($id);
        $image = $products->pictures;
        $image = explode('|/|/|', $image);
        $products->pictures = $image;
        

        return response()->json($products)
        ->header('X-Content-Type-Options', 'nosniff');
    }

    public function store(Request $request, Product $product)
    {
        $image = implode('|/|/|', $request->image);
        $product->title = $request->title;
        $product->description =$request->description;
        $product->price = $request->price;
        $product->pictures = $image;
        $product->availability = 0;
        $product->popularity = 0;

        $product->save();
    }
 
    public function update(Request $request, Product $product, $id)
    {
        // $product = Product::find($id);
        $image = implode('|/|/|', $request->pictures);
        DB::table('products')
            ->where('id', $id)
            ->update([
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'availability' => $request->availability,
                'pictures' => $image,
                ]);
 
        return response()->json(true, 200);
    }
 
    public function delete(Product $product, $id)
    {
        $product = Product::find($id);
        $product->delete();
        $product->delete($id);
 
        return response()->json(null, 204);
    }

    public function update_popularity(Product $product, $id)
    {
        $product = Product::find($id);
        $product->popularity++;
        if ($product->save())
            return response()->json(true, 200);
        else
            return response()->json(false, 400);
    }
}
