import React from "react";
import { CurrencyResponseType, CurrencyType } from "./type";

type SelectCurrencyProps = {
  currencyList: CurrencyResponseType;
  handleOnSelect: (item: any) => void;
  handleResetOutput: () => void;
  selectedValue?: string;
};

const SelectCurrency: React.FC<SelectCurrencyProps> = ({
  currencyList,
  handleOnSelect,
  handleResetOutput,
  selectedValue,
}) => {
  return (
    <>
      <img
        className="h-10 w-10"
        src={`src/assets/tokens/${
          selectedValue === "" ? "BTC" : selectedValue
        }.svg`}
      ></img>
      <select
        id="countries"
        className="w-[30%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          handleOnSelect(e.target.value);
          handleResetOutput();
        }}
        value={selectedValue}
        required
      >
        <option value="" disabled>
          Select
        </option>
        {Object.keys(currencyList).map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default SelectCurrency;
