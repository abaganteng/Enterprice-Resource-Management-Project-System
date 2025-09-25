<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\ProjectPhase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
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
            'milestone_id' => Milestone::factory(),
            'phase_id' => ProjectPhase::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(3),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'status' => $this->faker->randomElement(['todo', 'in-progress', 'done']),
            'assign_to' => User::factory(),
            'due_date' => $this->faker->dateTimeBetween('now', '+6 months'),
            'created_by' => User::factory(),
        ];
    }
}
