<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Acl\Database\Seeders\AclDatabaseSeeder;
use Modules\Admin\Database\Seeders\AdminDatabaseSeeder;
use Modules\Customer\Database\Seeders\CustomerDatabaseSeeder;
use Modules\Shipping\Database\Seeders\ShippingDatabaseSeeder;
use Modules\Store\Database\Seeders\StoreDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ShippingDatabaseSeeder::class);
        $this->call(AclDatabaseSeeder::class);
        $this->call(AdminDatabaseSeeder::class);
        $this->call(StoreDatabaseSeeder::class);
        $this->call(CustomerDatabaseSeeder::class);
    }
}
