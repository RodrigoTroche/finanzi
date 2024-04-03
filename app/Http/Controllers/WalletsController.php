<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\Wallet;

class WalletsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wallets = Wallet::with([
            'currency'
        ])->where('user_id', auth()->id())
            ->orderBy('name', 'asc')
            ->get();

        return Inertia::render('Wallets/Index', [
            'wallets' => $wallets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $currencies = Currency::all();

        return Inertia::render('Wallets/Form', [
            'currencies' => $currencies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $wallet = Wallet::create([
                'name' => $request->name,
                'currency_id' => $request->currency_id,
                'user_id' => auth()->id(),
                'balance' => $request->balance,
            ]);
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->route('wallets.index')->with('error', 'Wallet not created.');
        }

        return redirect()->route('wallets.index')->with('success', 'Wallet created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $wallet = Wallet::with(['currency'])
                ->where('id', $id)->where('user_id', auth()->id())
                ->firstOrFail();

            $transactions = Transaction::with([
                'category',
                'wallet',
                'wallet.currency',
                'transfer',
                'transfer.fromWallet',
                'transfer.toWallet'
            ])->where('user_id', auth()->id())
                ->where('wallet_id', $wallet->id)->orderBy('date', 'desc')->orderBy('created_at', 'desc')
                ->get()->groupBy(function ($date) {
                    return Carbon::parse($date->date)->format('M j, Y');
                });

            // return $transactions;
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->route('wallets.index')->with('error', 'Wallet not found.');
        }

        return Inertia::render('Wallets/Show', [
            'wallet' => $wallet,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $wallet = Wallet::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->route('wallets.index')->with('error', 'Wallet not found.');
        }

        return Inertia::render('Wallets/Form', [
            'wallet' => $wallet,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $wallet = Wallet::find($id);
            $wallet->update([
                'name' => $request->name,
                'currency_id' => $request->currency_id,
            ]);
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->route('wallets.index')->with('error', 'Wallet not updated.');
        }

        return redirect()->route('wallets.index')->with('success', 'Wallet updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Wallet::where('id', $id)->where('user_id', auth()->id())->delete();
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return redirect()->route('wallets.index')->with('error', 'Wallet not deleted.');
        }

        return redirect()->route('wallets.index')->with('success', 'Wallet deleted.');
    }
}
