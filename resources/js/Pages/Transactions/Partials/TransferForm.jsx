import CurrencyInput from "@/Components/CurrencyInput";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function TransferForm({
    wallet,
    data,
    setData,
    errors,
    walletsTo,
}) {
    return (
        <>
            <div className="col-span-2">
                <div className="flex justify-between">
                    <div className="w-full">
                        <label
                            htmlFor="from"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            From *
                        </label>
                        <div className="mt-2">
                            <Input
                                id={"from"}
                                name="from"
                                type="text"
                                value={
                                    wallet.name +
                                    " (" +
                                    wallet.currency.code +
                                    ")"
                                }
                                readOnly
                                className="block w-full rounded-md border-0 bg-white/5 py-3 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />

                            {errors.from && (
                                <div className="mt-2">
                                    <span className="text-red">
                                        {errors.from}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-[200px] flex items-end">
                        <div className="w-full h-[45px] flex items-center justify-center">
                            <span>
                                <ArrowRightIcon className="h-6 w-6 text-white" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="to"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            To *
                        </label>
                        <div className="mt-2">
                            <Select
                                name="wallet_to_id"
                                onValueChange={(value) => {
                                    setData("wallet_to_id", value);
                                }}
                                defaultValue={data.wallet_to_id ?? ""}
                                value={
                                    data.wallet_to_id
                                        ? parseInt(data.wallet_to_id)
                                        : ""
                                }
                            >
                                <SelectTrigger className="w-full bg-white/5 border-0 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white/10">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {walletsTo.length > 0
                                        ? walletsTo.map((walletTo) => (
                                              <SelectItem
                                                  key={walletTo.id.toString()}
                                                  value={parseInt(walletTo.id)}
                                              >
                                                  {walletTo.name} + (
                                                  {walletTo.currency.code})
                                              </SelectItem>
                                          ))
                                        : null}
                                </SelectContent>
                            </Select>

                            {errors.wallet_to_id && (
                                <div className="mt-2">
                                    <span className="text-red">
                                        {errors.wallet_to_id}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
