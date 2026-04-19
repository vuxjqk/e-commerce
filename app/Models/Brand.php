<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'slug',
    'logo',
])]
#[Appends('logo_url')]
class Brand extends Model
{
    public function getLogoUrlAttribute()
    {
        return asset('storage/' . $this->logo);
    }
}
