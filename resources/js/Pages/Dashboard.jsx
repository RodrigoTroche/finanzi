import TransactionItem from "@/Components/TransactionItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, ...props }) {
    const { wallets, totalMoney } = props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 text-white">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {wallets.length > 0 ? (
                        wallets.map((wallet) => (
                            <div key={wallet.id} className="">
                                <Link
                                    href={route("wallets.show", wallet.id)}
                                    className="block bg-[#171717] hover:bg-white/20 transition delay-100 p-4 rounded-lg col-span-1 shadow"
                                >
                                    <span className="block text-gray-400 mb-2">
                                        {wallet.name}
                                    </span>
                                    <p className="text-2xl text-white font-bold">
                                        {wallet.formatted_balance}{" "}
                                        {wallet.currency
                                            ? wallet.currency.code
                                            : null}
                                    </p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            No wallets found.
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                    <div>
                        <span className="block text-gray-400 mb-2">
                            Last Transactions
                        </span>
                        <ul className="mt-3 space-y-4">
                            {props.lastTransactions.map((transaction) => (
                                <li>
                                    <TransactionItem
                                        transaction={transaction}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <span className="block text-gray-400 mb-2">
                            Total Money
                        </span>
                        <ul className="mt-3 space-y-4">
                            {totalMoney.map((money) => (
                                <li>
                                    <div className="bg-[#171717] p-4 rounded-lg col-span-1 shadow">
                                        <div>
                                            <p className="text-2xl text-white font-bold flex items-center justify-between">
                                                <span>
                                                    {
                                                        money.formattedTotalInWallet
                                                    }
                                                </span>
                                                <span>{money.code}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <span className="block text-gray-400 mb-2">
                            All Subscriptions
                        </span>
                        <ul className="mt-3 space-y-4 bg-[#171717] rounded-lg p-3">
                            <li>
                                <div className="bg-[#171717] p-4 rounded-lg col-span-1 shadow">
                                    <div>
                                        <p className="text-white font-bold flex items-center justify-between">
                                            <span className="text-lg">
                                                Spotify
                                            </span>
                                            <span className="text-lg">
                                                71.800 PYG
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="bg-[#171717] p-4 rounded-lg col-span-1 shadow">
                                    <div>
                                        <p className="text-white font-bold flex items-center justify-between">
                                            <span className="text-lg">
                                                PS Plus
                                            </span>
                                            <span className="text-lg">
                                                35.000 PYG
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="bg-[#171717] p-4 rounded-lg col-span-1 shadow">
                                    <div>
                                        <p className="text-white font-bold flex items-center justify-between">
                                            <span className="text-lg">
                                                Netflix
                                            </span>
                                            <span className="text-lg">
                                                99.000 PYG
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
