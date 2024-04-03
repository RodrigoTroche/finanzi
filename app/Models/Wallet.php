<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wallet extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'wallets';

    protected $fillable = [
        'name',
        'currency_id',
        'user_id',
        'balance',
    ];

    protected $appends = [
        'formatted_balance',
    ];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function getFormattedBalanceAttribute()
    {
        $currencyCode = $this->currency->code;
        $separators = [
            'USD' => ['thousands_separator' => ',', 'decimal_separator' => '.'],
            'EUR' => ['thousands_separator' => '.', 'decimal_separator' => ','],
            'PYG' => ['thousands_separator' => '.', 'decimal_separator' => ','],
        ];

        if (isset($separators[$currencyCode])) {
            $thousandsSeparator = $separators[$currencyCode]['thousands_separator'];
            $decimalSeparator = $separators[$currencyCode]['decimal_separator'];
        } else {
            $thousandsSeparator = ',';
            $decimalSeparator = '.';
        }

        return number_format($this->balance, $this->currency->decimal_places, $decimalSeparator, $thousandsSeparator);
    }
}
