<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'product_id',
    'name',
    'price',
    'sale_price',
    'stock',
    'is_active',
])]
#[Appends('final_price')]
class Variant extends Model
{
    /** @use HasFactory<\Database\Factories\VariantFactory> */
    use HasFactory;

    public function getFinalPriceAttribute()
    {
        return $this->sale_price ?? $this->price;
    }
}
