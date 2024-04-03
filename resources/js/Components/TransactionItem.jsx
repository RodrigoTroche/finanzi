import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function TransactionItem({ transaction }) {
    return (
        <div className="bg-[#171717] p-4 rounded-lg col-span-1 shadow flex items-center">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#4e4e4e] p-3 rounded-full flex items-center align-center">
                    <span className="text-lg">
                        {transaction.category
                            ? transaction.category.icon
                            : transaction.category.name.charAt(0)}
                    </span>
                </div>
            </div>
            <div className="min-w-0 ml-6 flex flex-1 items-center justify-between truncate">
                <div>
                    {transaction.type === "income" ? (
                        <span className="block text-lg font-semibold text-green-300">
                            +{transaction.formatted_amount}{" "}
                            {transaction.wallet.currency.code}
                        </span>
                    ) : null}

                    {transaction.type === "expense" ? (
                        <span className="block text-lg font-semibold text-white">
                            {transaction.formatted_amount}{" "}
                            {transaction.wallet.currency.code}
                        </span>
                    ) : null}

                    {transaction.type === "transfer" ? (
                        <span className="block text-lg font-semibold text-white">
                            {transaction.formatted_amount}{" "}
                            {transaction.wallet.currency.code}
                        </span>
                    ) : null}

                    {transaction.type === "transfer" ? (
                        <>
                            <div className="flex items-center mb-2">
                                <span className="block text-gray-400">
                                    {transaction.transfer.from_wallet.name}{" "}
                                    {
                                        transaction.transfer.from_wallet
                                            .currency.code
                                    }
                                </span>
                                <div className="w-[50px] flex items-end">
                                    <div className="w-full h-[20px] flex items-center justify-center">
                                        <span>
                                            <ArrowRightIcon className="h-4 w-4 text-white" />
                                        </span>
                                    </div>
                                </div>
                                <span className="block text-gray-400">
                                    {transaction.transfer.to_wallet.name}{" "}
                                    {
                                        transaction.transfer.to_wallet.currency
                                            .code
                                    }
                                </span>
                            </div>
                        </>
                    ) : (
                        <span className={"block mb-2 text-gray-400"}>
                            {transaction.category
                                ? transaction.category.name
                                : "Uncategorized"}
                        </span>
                    )}
                </div>
                <div className="flex-shrink-0 pr-2">
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4e4e4e] focus:ring-offset-2"
                    >
                        <span className="sr-only">Open options</span>
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
