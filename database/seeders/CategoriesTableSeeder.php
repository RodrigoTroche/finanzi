<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Food',
                'handle' => 'food',
                'icon' => '🍔',
            ],
            [
                'name' => 'Work',
                'handle' => 'work',
                'icon' => '💼',
            ],
            [
                'name' => 'Entertainment',
                'handle' => 'entertainment',
                'icon' => '🎉',
            ],
            [
                'name' => 'Travel',
                'handle' => 'travel',
                'icon' => '✈️',
            ],
            [
                'name' => 'Subscriptions',
                'handle' => 'subscriptions',
                'icon' => '🔒',
            ],
            [
                'name' => 'Car',
                'handle' => 'car',
                'icon' => '🚗',
            ],
            [
                'name' => 'Transportation',
                'handle' => 'transportation',
                'icon' => '🚌',
            ],
            [
                'name' => 'Health',
                'handle' => 'health',
                'icon' => '🏥',
            ],
            [
                'name' => 'Education',
                'handle' => 'education',
                'icon' => '📚',
            ],
            [
                'name' => 'Shopping',
                'handle' => 'shopping',
                'icon' => '🛍️',
            ],
            [
                'name' => 'Utilities',
                'handle' => 'utilities',
                'icon' => '💡',
            ],
            [
                'name' => 'Rent',
                'handle' => 'rent',
                'icon' => '🏠',
            ],
            [
                'name' => 'Gift',
                'handle' => 'gift',
                'icon' => '🎁',
            ],
            [
                'name' => 'Salary',
                'handle' => 'salary',
                'icon' => '💰',
            ],
            [
                'name' => 'Investment',
                'handle' => 'investment',
                'icon' => '📈',
            ],
            [
                'name' => 'Other',
                'handle' => 'other',
                'icon' => '🧾',
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::updateOrCreate($category);
        }
    }
}
