<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'product_id',
    'path',
    'is_main',
])]
#[Appends('url')]
class Image extends Model
{
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
