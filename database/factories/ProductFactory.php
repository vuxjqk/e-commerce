<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand_id' => Brand::query()->inRandomOrder()->value('id')
                ?? Brand::factory(),
            'name' => $name = fake()->unique()->words(3, true),
            'slug' => Str::slug($name),
            'description' => fake()->optional()->paragraph(),
            'is_active' => fake()->boolean(80),
        ];
    }
}
