<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreTransactionFormRequest;
use Carbon\Carbon;
use App\Models\Transaction;
use App\Models\Wallet;
use Inertia\Inertia;
use App\Models\Transfer;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($wallet)
    {
        $wallet = Wallet::where('user_id', auth()->id())->where('id', $wallet)->firstOrFail();

        $walletsTo = Wallet::where('user_id', auth()->id())->where('id', '!=', $wallet->id)->get();

        $transactionTypes = [
            [
                'id' => 1,
                'value' => 'expense',
                'label' => 'Expense'
            ],
            [
                'id' => 2,
                'value' => 'income',
                'label' => 'Income'
            ],
            [
                'id' => 3,
                'value' => 'transfer',
                'label' => 'Transfer'
            ]
        ];

        $categories = Category::whereNull('user_id')->orWhere('user_id', auth()->id())->get();

        // Crear un array con los últimos 7 días
        $id = 1;
        $dateOptions = [];
        $dateOptions[] = ['id' => $id++, 'value' => Carbon::today()->format('d-m-Y'), 'label' => 'Today'];
        $dateOptions[] = ['id' => $id++, 'value' => Carbon::yesterday()->format('d-m-Y'), 'label' => 'Yesterday'];

        for ($i = 2; $i < 7; $i++) {
            $date = Carbon::today()->subDays($i);
            $dateOptions[] = [
                'id' => $id++,
                'value' => $date->format('d-m-Y'),
                'label' => $date->format('D d')
            ];
        }

        // Agregar la opción para fecha personalizada
        // $dateOptions[] = [
        //     'id' => $id++,
        //     'value' => 'custom',
        //     'label' => 'Custom'
        // ];

        return Inertia::render('Transactions/Create', [
            'wallet' => $wallet,
            'transactionTypes' => $transactionTypes,
            'categories' => $categories,
            'dateOptions' => $dateOptions,
            'walletsTo' => $walletsTo
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionFormRequest $request)
    {
        DB::beginTransaction();
        try {
            $wallet = Wallet::where('id', $request->wallet_id)->where('user_id', auth()->id())->firstOrFail();
            $balance = $wallet->balance;

            // Verificar si hay fondos suficientes para transferencias y gastos
            if (($request->type === 'transfer' || $request->type === 'expense') && $balance < $request->amount) {
                return redirect()->back()->with('error', 'Insufficient funds.');
            }

            // Crear la transacción
            $transaction = Transaction::create([
                'type' => $request->type,
                'user_id' => auth()->id(),
                'wallet_id' => $wallet->id,
                'currency_id' => $wallet->currency_id,
                'category_id' => $request->category_id,
                'amount' => $request->amount,
                'balance' => $balance, // Asegurarse de que el balance de la transacción sea el balance actual de la billetera
                'date' => $request->date,
                'description' => $request->description,
            ]);

            // Si es una transferencia, crear las transacciones para el destinatario
            if ($request->type === 'transfer') {
                $walletTo = Wallet::where('id', $request->wallet_to_id)->where('user_id', auth()->id())->firstOrFail();

                // Crear la transacción para el destinatario
                $transactionReceived = Transaction::create([
                    'type' => 'transfer',
                    'user_id' => auth()->id(),
                    'wallet_id' => $request->wallet_to_id,
                    'currency_id' => $wallet->currency_id,
                    'category_id' => $request->category_id,
                    'amount' => $request->amount,
                    'balance' => $walletTo->balance + $request->amount, // Actualizar el balance del destinatario
                    'date' => $request->date,
                    'description' => $request->description,
                ]);

                // Registrar la transferencia
                $transfer = Transfer::create([
                    'transaction_id' => $transaction->id,
                    'from_wallet_id' => $wallet->id,
                    'to_wallet_id' => $request->wallet_to_id,
                    'amount' => $request->amount,
                    'user_id' => auth()->id(),
                    'date' => $request->date,
                    'description' => $request->description,
                ]);

                // Registrar la transferencia para el destinatario
                $transferReceived = Transfer::create([
                    'transaction_id' => $transactionReceived->id,
                    'from_wallet_id' => $request->wallet_to_id,
                    'to_wallet_id' => $wallet->id,
                    'amount' => $request->amount,
                    'user_id' => auth()->id(),
                    'date' => $request->date,
                    'description' => $request->description,
                ]);

                $walletTo->balance += $request->amount; // Actualizar el balance del destinatario
                $walletTo->save(); // Asegurarse de guardar los cambios en el balance del destinatario
            }

            // Actualizar los balances de la billetera
            switch ($request->type) {
                case 'expense':
                    $wallet->balance -= $request->amount;
                    break;
                case 'income':
                    $wallet->balance += $request->amount;
                    break;
                case 'transfer':
                    $wallet->balance -= $request->amount;
                    break;
            }

            // Guardar el balance actualizado de la billetera
            $wallet->save(); // Asegurarse de guardar los cambios en el balance de la billetera

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return redirect()->route('transactions.create', ['wallet' => $wallet->id])->with('error', 'Transaction not created.');
        }

        return redirect()->route('wallets.show', ['wallet' => $wallet->id])->with('success', 'Transaction created.');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
