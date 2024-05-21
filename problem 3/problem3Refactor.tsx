enum BLOCKCHAIN_TYPE {
  OSMOSIS = "Osmosis",
  ETHEREUM = "Ethereum",
  ARBITRUM = "Arbitrum",
  ZILLIQA = "Zilliqa",
  NEO = "Neo",
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BLOCKCHAIN_TYPE;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: BLOCKCHAIN_TYPE): number => {
    switch (blockchain) {
      case BLOCKCHAIN_TYPE.OSMOSIS:
        return 100;
      case BLOCKCHAIN_TYPE.ETHEREUM:
        return 50;
      case BLOCKCHAIN_TYPE.ARBITRUM:
        return 30;
      case BLOCKCHAIN_TYPE.ZILLIQA:
        return 20;
      case BLOCKCHAIN_TYPE.NEO:
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
