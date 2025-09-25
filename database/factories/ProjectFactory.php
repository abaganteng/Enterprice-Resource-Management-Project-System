<?php

namespace Database\Factories;

use App\Models\User;
use App\ProjectStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 year', 'now');
        $endDate = $this->faker->dateTimeBetween($startDate, '+1 year');

        return [
            'client_id' => User::factory(),
            'manager_id' => User::factory(),
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(4),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'budget' => $this->faker->randomFloat(2, 5_000_000, 100_000_000),
            'status' => $this->faker->randomElement(ProjectStatus::cases())->value,
        ];
    }
}
