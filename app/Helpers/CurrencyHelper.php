<?php

namespace App\Helpers;

class CurrencyHelper
{
    public static function formatCurrency($value, $currency)
    {
        $currencyCode = $currency->code;
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

        return number_format($value, $currency->decimal_places, $decimalSeparator, $thousandsSeparator);
    }
}
