<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Project;
use App\Models\ProjectPhase;
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
            'project_id' => Project::factory(),
            'phase_id' => ProjectPhase::factory(),
            'approved_by' => User::factory(),
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(2),
            'due_date' => $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }
}
