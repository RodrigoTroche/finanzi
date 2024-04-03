<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'type',
        'user_id',
        'wallet_id',
        'currency_id',
        'category_id',
        'amount',
        'balance',
        'date',
        'description',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    protected $appends = [
        'formatted_amount',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function transfer()
    {
        return $this->hasOne(Transfer::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFormattedAmountAttribute()
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

        return number_format($this->amount, $this->currency->decimal_places, $decimalSeparator, $thousandsSeparator);
    }
}
