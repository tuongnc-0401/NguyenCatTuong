import React, { useEffect, useState } from "react";
import SelectCurrency from "./SelectCurrency";
import SwapCurrency from "./SwapCurrency";
import axios from "axios";
import { CurrencyResponseType, CurrencyType } from "./type";
import { transformData } from "../utils/currency.utils";
import LoadingIndicator from "./LoadingIndicator";

const FancyForm = () => {
  const [dataCurrency, setDataCurrency] = useState<CurrencyResponseType>({});
  const [currencyFrom, setCurrencyFrom] = useState<string>("");
  const [currencyTo, setCurrencyTo] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>();
  const [outputAmount, setOutputAmount] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://interview.switcheo.com/prices.json"
    );

    setDataCurrency(transformData(data));
  };

  const handleSwapCurrency = () => {
    const tmpCurrencyFrom = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(tmpCurrencyFrom);
    setOutputAmount("");
  };

  const handleCalculate = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const result =
      (Number(inputAmount) / dataCurrency[currencyFrom].price) *
      dataCurrency[currencyTo].price;
    setTimeout(() => {
      setIsLoading(false);
      setOutputAmount(result.toString());
    }, 2000);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          SWAP
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-4"
          onSubmit={(e) => handleCalculate(e)}
          method="POST"
        >
          {/* AMOUNT TO SEND */}
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="input-amount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount to send
              </label>

              <div className="block text-sm font-medium leading-6 text-gray-900">
                {currencyFrom}
              </div>
            </div>

            <div className="mt-2">
              <input
                id="input-amount"
                name="input-amount"
                type="text"
                required
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          {/* CURRENCY */}
          <div className="flex justify-between">
            <label
              htmlFor="input-amount"
              className=" text-sm font-medium leading-6 text-gray-900"
            >
              From
            </label>
            <label
              htmlFor="input-amount"
              className=" text-sm font-medium leading-6 text-gray-900"
            >
              To
            </label>
          </div>
          <div className="flex justify-between">
            <SelectCurrency
              currencyList={dataCurrency}
              handleOnSelect={setCurrencyFrom}
              selectedValue={currencyFrom}
              handleResetOutput={() => setOutputAmount("")}
            />
            <SwapCurrency handleSwapCurrency={handleSwapCurrency} />
            <SelectCurrency
              currencyList={dataCurrency}
              handleOnSelect={setCurrencyTo}
              selectedValue={currencyTo}
              handleResetOutput={() => setOutputAmount("")}
            />
          </div>

          {/* AMOUNT TO RECEIVE */}
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="input-amount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount to receive
              </label>

              <div className="block text-sm font-medium leading-6 text-gray-900">
                {currencyTo}
              </div>
            </div>
            <div className="mt-2">
              <input
                id="output-amount"
                name="output-amount"
                readOnly
                value={outputAmount}
                className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full h-8 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? <LoadingIndicator /> : "Swap"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FancyForm;
