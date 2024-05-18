export type CurrencyType = {
  currency: string;
  date: string;
  price: number;
};

export type CurrencyResponseType = Record<string, CurrencyType>;
