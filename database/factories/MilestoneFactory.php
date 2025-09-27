<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Milestone>
 */
class MilestoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'project_id' => 1,
            'phase_id' => 1,
            'approved_by' => 2,
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(2),
            'due_date' => $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }
}
