import { CurrencyType } from "../components/type";

// This func to get lasted currency if date have duplicate currency
export const transformData = (data: CurrencyType[]) => {
  const latestPricesMap: { [key: string]: CurrencyType } = {};

  data.forEach((item) => {
    const current = latestPricesMap[item.currency];
    if (!current || new Date(item.date) > new Date(current.date)) {
      latestPricesMap[item.currency] = item;
    }
  });

  return latestPricesMap;
};
