import { Moment } from 'moment';
import { IWalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';

export interface IWalletHistoryMySuffix {
  id?: number;
  walletId?: number;
  timestamp?: Moment;
  value?: number;
  currencyIds?: IWalletMySuffix[];
}

export class WalletHistoryMySuffix implements IWalletHistoryMySuffix {
  constructor(
    public id?: number,
    public walletId?: number,
    public timestamp?: Moment,
    public value?: number,
    public currencyIds?: IWalletMySuffix[]
  ) {}
}
