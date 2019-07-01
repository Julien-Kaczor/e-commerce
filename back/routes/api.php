<?php

use Illuminate\Http\Request;

// PRODUCTS 
Route::get('products', 'ProductsController@index');
Route::get('products/popularity', 'ProductsController@index_popularity');
Route::get('product/{id}', 'ProductsController@show');
Route::delete('product/delete/{id}', 'ProductsController@delete');
Route::post('edit/product/{id}', 'ProductsController@update');
Route::get('edit/product/{id}', 'ProductsController@update');
Route::post('product/add', 'ProductsController@store');
Route::post('product/popularity/{id}', 'ProductsController@update_popularity');


// CATEGORY
Route::get('categories', 'CategoriesController@index');
Route::get('categorie/{id}', 'CategoriesController@show');


// AUTHENTIFICATION
Route::post('/register','AuthController@register');
Route::post('/login','AuthController@login');
Route::get('/login','AuthController@login');
Route::middleware('checkadmin:api')->get('/loginCheck', function(Request $request) {
    return $request->user();
});


// USER
Route::get('/profil','UserController@index');
