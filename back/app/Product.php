<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['categorie_id', 'title', 'description', 'price', 'pictures', 'availability', 'popularity'];
}
