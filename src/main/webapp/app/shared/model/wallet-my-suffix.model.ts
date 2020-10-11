export interface IWalletMySuffix {
  id?: number;
  currencyId?: number;
  currentValue?: number;
  name?: string;
  walletHistoryId?: number;
}

export class WalletMySuffix implements IWalletMySuffix {
  constructor(
    public id?: number,
    public currencyId?: number,
    public currentValue?: number,
    public name?: string,
    public walletHistoryId?: number
  ) {}
}
