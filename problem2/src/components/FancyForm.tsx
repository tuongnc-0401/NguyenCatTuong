import React from "react";
import SelectCurrency from "./SelectCurrency";
import SwapCurrency from "./SwapCurrency";

const FancyForm = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          SWAP
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          {/* AMOUNT TO SEND */}
          <div>
            <label
              htmlFor="input-amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount to send
            </label>
            <div className="mt-2">
              <input
                id="input-amount"
                name="input-amount"
                type="text"
                required
                className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          {/* CURRENCY */}
          <div className="flex justify-between">
            <SelectCurrency />
            <SwapCurrency />
            <SelectCurrency />
          </div>

          {/* AMOUNT TO RECEIVE */}
          <div>
            <label
              htmlFor="input-amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount to receive
            </label>
            <div className="mt-2">
              <input
                id="input-amount"
                name="input-amount"
                type="text"
                required
                className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Swap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FancyForm;
