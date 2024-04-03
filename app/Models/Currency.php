<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    protected $table = 'currencies';

    protected $fillable = [
        'code',
        'name',
        'exchange_rate',
        'decimal_places',
        'enabled',
        'default',
    ];

    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }
}
