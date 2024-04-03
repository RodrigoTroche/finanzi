import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function WalletsForm({ auth, ...props }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        currency_id: "",
        balance: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("wallets.store"));
    };

    const { currencies } = props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-white leading-tight">
                        Add Wallet
                    </h2>
                    {/* <Link
                        href={route("wallets.create")}
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                    >
                        Create Wallet
                    </Link> */}
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 text-white w-2/4">
                <form onSubmit={submit}>
                    <div className="">
                        {/* <h2 className="text-base font-semibold leading-7 text-white">
                        Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Use a permanent address where you can receive mail.
                    </p> */}

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="col-span-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Name *
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    {errors.name && (
                                        <div className="mt-2">
                                            <span className="text-red">
                                                {errors.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="currency_id"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Currency *
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="currency_id"
                                        name="currency_id"
                                        autoComplete="currency_id"
                                        className="block w-full rounded-md border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                                        onChange={(e) =>
                                            setData(
                                                "currency_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {currencies.length > 0
                                            ? currencies.map((currency) => (
                                                  <option
                                                      key={currency.id.toString()}
                                                      value={currency.id}
                                                  >
                                                      {currency.code} (
                                                      {currency.name})
                                                  </option>
                                              ))
                                            : null}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="balance"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Balance *
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="balance"
                                        id="balance"
                                        autoComplete="balance"
                                        className="block w-full rounded-md border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={(e) =>
                                            setData("balance", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-white px-3 py-3 text-md font-semibold text-black shadow-sm hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                            >
                                Save
                            </button>

                            <Link
                                href={route("wallets.index")}
                                className="block w-full rounded-md px-3 py-3 text-md font-semibold text-white text-center mt-3 shadow-sm hover:underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
