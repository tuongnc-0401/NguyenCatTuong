interface WalletBalance { // missing blockchain attribute
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  // this interface could extend from WalletBalance with adding new properties (formattedAmount)
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {} // Redundancy:  The Props interface is declared but doesn't introduce any new properties or extend the BoxProps interface with additional functionality or constraints.
const WalletPage: React.FC<Props> = (props: Props) => {
  // We can use BoxProps instead of Props
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    // typeof blockchain should be string, Moreover, ENUM for this is better
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain); // not having `blockchain` attribute in WalletBalance type
        if (lhsPriority > -99) {
          // not declare, could be balancePriority
          if (balance.amount <= 0) {
            // could combine this condition with above condition, and logic of is condition is incorrect, should be amount is bigger than 0
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain); // not having `blockchain` attribute in WalletBalance type
        const rightPriority = getPriority(rhs.blockchain); // not having `blockchain` attribute in WalletBalance type
        if (leftPriority > rightPriority) {
          // it is right but not clean, could be in one line return rightPriority < leftPriority
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]); // we don't use prices in this useMemo, should remove prices in this dependencies

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    // redundant formatting step, it could move into useMemo
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    // sortedBalances is not having formatted amount
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row} // classes is not declared
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted} // not having formatted amount
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>; // could move sortedBalance.map into here
};
