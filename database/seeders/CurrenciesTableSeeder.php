<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currencies = [
            [
                'code' => 'USD',
                'name' => 'US Dollar',
                'exchange_rate' => 1.0,
                'decimal_places' => 2,
                'enabled' => true,
                'default' => true,
            ],
            //guarani pyg
            [
                'code' => 'PYG',
                'name' => 'Guarani',
                'exchange_rate' => 7000.0,
                'decimal_places' => 0,
                'enabled' => true,
                'default' => false,
            ],
            [
                'code' => 'EUR',
                'name' => 'Euro',
                'exchange_rate' => 0.85,
                'decimal_places' => 2,
                'enabled' => true,
                'default' => false,
            ],
            [
                'code' => 'JPY',
                'name' => 'Japanese Yen',
                'exchange_rate' => 109.0,
                'decimal_places' => 0,
                'enabled' => true,
                'default' => false,
            ],
            [
                'code' => 'BRL',
                'name' => 'Brazilian Real',
                'exchange_rate' => 5.5,
                'decimal_places' => 2,
                'enabled' => true,
                'default' => false,
            ],
            [
                'code' => 'ARS',
                'name' => 'Argentine Peso',
                'exchange_rate' => 95.0,
                'decimal_places' => 2,
                'enabled' => true,
                'default' => false,
            ]
        ];

        foreach ($currencies as $currency) {
            \App\Models\Currency::updateOrCreate($currency);
        }
    }
}
