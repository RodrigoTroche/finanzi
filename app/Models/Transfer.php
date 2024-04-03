<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Helpers\CurrencyHelper;

class Transfer extends Model
{
    use HasFactory;

    protected $table = 'transfers';

    protected $fillable = [
        'transaction_id',
        'from_wallet_id',
        'to_wallet_id',
        'amount',
        'user_id',
        'description',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    protected $appends = [
        'formatted_amount',
    ];

    public function fromWallet()
    {
        return $this->belongsTo(Wallet::class, 'from_wallet_id');
    }

    public function toWallet()
    {
        return $this->belongsTo(Wallet::class, 'to_wallet_id');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFormattedAmountAttribute()
    {
        return CurrencyHelper::formatCurrency($this->amount, $this->fromWallet->currency);
    }
}
