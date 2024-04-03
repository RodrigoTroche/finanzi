import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

export default function WalletsIndex({ auth, ...props }) {
    // const [wallets, setWallets] = useState(props.wallets);

    const handleGetWallets = async () => {
        const response = await axios.get("/api/wallets");
        setWallets(response.data);
    };

    const { wallets } = props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-white leading-tight">
                        Wallets
                    </h2>
                    <Link
                        href={route("wallets.create")}
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                    >
                        Create Wallet
                    </Link>
                </div>
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
            </div>
        </AuthenticatedLayout>
    );
}
