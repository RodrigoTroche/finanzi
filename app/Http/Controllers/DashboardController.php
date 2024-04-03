<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\CurrencyHelper;
use App\Models\Currency;
use Inertia\Inertia;
use App\Models\Wallet;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        $wallets = Wallet::with([
            'currency'
        ])->where('user_id', auth()->id());

        $wallets = $wallets->orderBy('id', 'desc')
            ->limit(4)
            ->get();

        $currenciesWithTotal  = Currency::with(['wallets' => function ($query) {
            $query->where('user_id', auth()->id());
        }])->whereHas('wallets', function ($query) {
            $query->where('user_id', auth()->id());
        })->get();


        $currenciesWithTotal->map(function ($currency) {
            $sum = $currency->wallets->sum('balance');
            $currency->totalInWallet = $sum;
            $currency->formattedTotalInWallet = CurrencyHelper::formatCurrency($sum, $currency);
            return $currency;
        });

        $lastTransactions = Transaction::with([
            'category',
            'wallet',
            'wallet.currency',
            'transfer',
            'transfer.fromWallet',
            'transfer.toWallet'
        ])
            ->where('user_id', auth()->id())
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get();

        // return $lastTransactions;

        return Inertia::render('Dashboard', [
            'wallets' => $wallets,
            'totalMoney' => $currenciesWithTotal,
            'lastTransactions' => $lastTransactions,
        ]);
    }
}
