import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import TransferForm from "./Partials/TransferForm";
import CurrencyInput from "@/Components/CurrencyInput";

export default function TransactionsCreate({ auth, ...props }) {
    const { data, setData, post, processing, errors } = useForm({
        type: "income",
        amount: "",
        amount_to: "",
        amount_from: "",
        masked_amount: "",
        masked_amount_to: "",
        masked_amount_from: "",
        category_id: "",
        wallet_to_id: "",
        wallet_id: props.wallet.id,
        date: props.dateOptions[0].value,
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("transactions.store", { wallet: props.wallet.id }));
    };

    const handleChangeType = (e) => {
        setData("type", e.target.value);
        console.log(e.target.value);
    };

    const { wallet, categories, transactionTypes, dateOptions } = props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-white leading-tight">
                        Add Transaction
                    </h2>
                </div>
            }
            flash={props.flash}
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

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                            <div className="col-span-2">
                                <div className="w-full grid grid-cols-3 border border-white/10 border-2 rounded-full p-1">
                                    {transactionTypes.map((transactionType) => (
                                        <div
                                            key={transactionType.id}
                                            className="col-span-1 p-1"
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    id={transactionType.id}
                                                    name="type"
                                                    type="radio"
                                                    defaultChecked={
                                                        transactionType.id ===
                                                        "expense"
                                                    }
                                                    value={
                                                        transactionType.value
                                                    }
                                                    className="absolute hidden"
                                                    onChange={handleChangeType}
                                                />
                                                <label
                                                    htmlFor={transactionType.id}
                                                    className={`w-full block text-center text-sm font-medium rounded-full p-4 cursor-pointer hover:bg-white/10 transition ${
                                                        transactionType.value ===
                                                        data.type
                                                            ? "bg-white/10"
                                                            : "bg-transparent text-gray-400"
                                                    }`}
                                                >
                                                    {transactionType.label}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {data.type === "transfer" && (
                                <TransferForm
                                    wallet={wallet}
                                    data={data}
                                    walletsTo={props.walletsTo}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {["income", "expense", "transfer"].includes(
                                data.type
                            ) && (
                                <div
                                    className={`${
                                        data.type === "transfer"
                                            ? "col-span-2"
                                            : "col-span-1"
                                    }`}
                                >
                                    <label
                                        htmlFor="amount"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Amount *
                                    </label>
                                    <div className="mt-2">
                                        <CurrencyInput
                                            placeholder={
                                                "0.000 " + wallet.currency.code
                                            }
                                            type="text"
                                            className="h-10 border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            value={data.masked_amount ?? ""}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    masked_amount:
                                                        e.target.value,
                                                    amount: e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    ),
                                                });
                                            }}
                                        />

                                        {errors.amount && (
                                            <div className="mt-2">
                                                <span className="text-red">
                                                    {errors.amount}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div
                                className={`${
                                    data.type === "transfer"
                                        ? "col-span-2"
                                        : "col-span-1"
                                }`}
                            >
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <Input
                                        type="text"
                                        name="description"
                                        id="description"
                                        autoComplete="description"
                                        className="block w-full rounded-md border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        value={data.description ?? ""}
                                        placeholder="Just saved some money"
                                    />

                                    {errors.description && (
                                        <div className="mt-2">
                                            <span className="text-red">
                                                {errors.description}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label
                                    htmlFor="category_id"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Category *
                                </label>
                                <div className="mt-2">
                                    <Select
                                        name="category_id"
                                        onValueChange={(value) => {
                                            setData("category_id", value);
                                        }}
                                        defaultValue={data.category_id ?? ""}
                                        value={
                                            data.category_id
                                                ? parseInt(data.category_id)
                                                : ""
                                        }
                                    >
                                        <SelectTrigger className="w-full bg-white/5 border-0 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white/10">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.length > 0
                                                ? categories.map((category) => (
                                                      <SelectItem
                                                          key={category.id.toString()}
                                                          value={parseInt(
                                                              category.id
                                                          )}
                                                      >
                                                          {category.icon}{" "}
                                                          {category.name}
                                                      </SelectItem>
                                                  ))
                                                : null}
                                        </SelectContent>
                                    </Select>

                                    {errors.category_id && (
                                        <div className="mt-2">
                                            <span className="text-red">
                                                {errors.category_id}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label
                                    htmlFor="category_id"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Date *
                                </label>
                                <div className="mt-2">
                                    <Select
                                        name="date"
                                        onValueChange={(value) => {
                                            setData("date", value);
                                        }}
                                        defaultValue={data.date ?? ""}
                                        value={data.date ? data.date : ""}
                                    >
                                        <SelectTrigger className="w-full bg-white/5 border-0 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white/10">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dateOptions.length > 0
                                                ? dateOptions.map(
                                                      (dateOption) => (
                                                          <SelectItem
                                                              key={
                                                                  dateOption.value
                                                              }
                                                              value={
                                                                  dateOption.value
                                                              }
                                                          >
                                                              {dateOption.label}
                                                          </SelectItem>
                                                      )
                                                  )
                                                : null}
                                        </SelectContent>
                                    </Select>

                                    {errors.date && (
                                        <div className="mt-2">
                                            <span className="text-red">
                                                {errors.date}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-white px-3 py-3 text-md font-semibold text-black shadow-sm hover:bg-gray-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 focus:bg-white/80"
                            >
                                Save
                            </button>

                            <Link
                                href={route("wallets.index")}
                                className="block w-full rounded-md px-3 py-3 text-md font-semibold text-white text-center mt-3 shadow-sm hover:underline 
                                transition focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-gray-200"
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
