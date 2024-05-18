import React from "react";
import { IoMdSwap } from "react-icons/io";

type SwapCurrencyProps = {
  handleSwapCurrency: () => void;
};

const SwapCurrency: React.FC<SwapCurrencyProps> = ({ handleSwapCurrency }) => {
  return (
    <button
      type="button"
      className="p-3 text-sm font-medium text-gray-500 focus:outline-none bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      onClick={handleSwapCurrency}
    >
      <IoMdSwap />
    </button>
  );
};

export default SwapCurrency;
