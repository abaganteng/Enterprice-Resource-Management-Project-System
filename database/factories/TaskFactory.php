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
            'project_id' => 1,
            'project_group_id' => 1,
            'status_id' => 1,
            'parent_id' => 6,
            'name' => $this->faker->sentence(3),
        ];
    }
}
