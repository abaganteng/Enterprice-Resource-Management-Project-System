<?php

namespace App\Console\Commands;

use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use App\Models\EmployeeContract;

class UpdateExpiredContracts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-expired-contracts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today();

        $updated = EmployeeContract::where('end_date', '<', $today)
            ->where('status', '!=', 'expired')
            ->update(['status' => 'expired']);

        $this->info("Berhasil memperbarui {$updated} kontrak menjadi expired.");
    }
}
