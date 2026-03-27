<?php

namespace Database\Seeders;
use App\Models\Event;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $faker = Faker::create('id_ID');

        for ($i = 1; $i <= 20; $i++) {

            $title = $faker->sentence(3);

            Event::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => $faker->paragraph(5),
                'image' => 'events/default.jpg',
                'location' => $faker->city,
                'start_date' => $faker->dateTimeBetween('now', '+1 month'),
                'end_date' => $faker->dateTimeBetween('+1 month', '+2 month'),
                'is_active' => true,
                'user_id' => 1
            ]);
        }
    }
}
