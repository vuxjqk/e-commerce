<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Variant>
 */
class VariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->numberBetween(5000000, 30000000);
        $salePrice = fake()->boolean(50)
            ? $price - fake()->numberBetween(500000, 3000000)
            : null;

        return [
            'product_id' => Product::query()->inRandomOrder()->value('id')
                ?? Product::factory(),
            'name' => fake()->randomElement([
                '128GB - Đen',
                '256GB - Trắng',
                '512GB - Xanh',
                '1TB - Titan'
            ]),
            'price' => $price,
            'sale_price' => $salePrice,
            'stock' => fake()->numberBetween(0, 100),
            'is_active' => fake()->boolean(80),
        ];
    }
}
