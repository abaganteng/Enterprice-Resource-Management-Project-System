<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects');
            $table->foreignId('milestone_id')->constrained('milestones');
            $table->foreignId('phase_id')->constrained('project_phases');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('priority')->nullable();
            $table->string('status');
            $table->foreignId('assign_to')->nullable()->constrained('users');
            $table->datetime('due_date');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
