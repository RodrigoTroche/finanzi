import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { DocumentTextIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import AddTransactionModal from "@/Components/Transactions/AddTransactionModal";
import TransactionItem from "@/Components/TransactionItem";

export default function WalletsShow({ auth, ...props }) {
    const { wallet, transactions } = props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between w-1/2">
                    <h2 className="font-semibold text-xl text-white leading-tight">
                        {wallet.name} ({wallet.currency.code})
                    </h2>
                    <div>
                        <button className="p-3 hover:bg-[#171717] rounded-full">
                            <DocumentTextIcon className="h-6 w-6 text-white" />
                        </button>
                        <button className="p-3 hover:bg-[#171717] rounded-full">
                            <Cog6ToothIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    {/* <Link
                        href={route("wallets.create")}
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                    >
                        Create Wallet
                    </Link> */}
                </div>
            }
            flash={props.flash}
        >
            <Head title="Dashboard" />

            <div className="py-6 text-white">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-400">
                                Transactions
                            </h3>
                            <Link
                                href={route("transactions.create", {
                                    wallet: wallet.id,
                                })}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 focus:bg-white/70"
                            >
                                Add Transaction
                            </Link>
                            {/* <AddTransactionModal /> */}
                        </div>

                        <div className="py-6">
                            {Object.keys(transactions).length > 0 ? (
                                Object.keys(transactions).map(
                                    (date, transaction) => (
                                        <div className="mb-4">
                                            {console.log(transaction)}
                                            <span className="text-gray-400">
                                                {date}
                                            </span>
                                            <div>
                                                <ul className="mt-3 space-y-4">
                                                    {props.transactions[
                                                        date
                                                    ].map((transaction) => (
                                                        <li>
                                                            <TransactionItem
                                                                transaction={
                                                                    transaction
                                                                }
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="text-center text-gray-400">
                                    No transactions yet
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                            <div className="col-span-1">
                                <Link
                                    href={route("wallets.show", 1)}
                                    className="block bg-[#171717] hover:bg-white/20 transition delay-100 p-4 rounded-lg col-span-1 shadow"
                                >
                                    <span className="block text-gray-400 mb-2">
                                        Expected Balance
                                    </span>
                                    <p className="text-2xl text-white font-bold">
                                        {wallet.formatted_balance}{" "}
                                        {wallet.currency
                                            ? wallet.currency.code
                                            : null}
                                    </p>
                                </Link>
                            </div>
                            <div className="col-span-1">
                                <Link
                                    href={route("wallets.show", 1)}
                                    className="block bg-[#171717] hover:bg-white/20 transition delay-100 p-4 rounded-lg col-span-1 shadow"
                                >
                                    <span className="block text-gray-400 mb-2">
                                        Days Befero Salary
                                    </span>
                                    <p className="text-2xl text-white font-bold">
                                        test
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
