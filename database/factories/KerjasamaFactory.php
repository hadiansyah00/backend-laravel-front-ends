<?php

namespace Database\Factories;

use App\Models\Kerjasama;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Kerjasama>
 */
class KerjasamaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'logo' => 'logos/dummy.png',
            'url' => $this->faker->url,
            'is_active' => true,
        ];
    }
}
