import { Moment } from 'moment';
import { ICurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';

export interface ICurrencyHistoryMySuffix {
  id?: number;
  timestamp?: Moment;
  currencyId?: number;
  value?: number;
  currencyIds?: ICurrencyMySuffix[];
}

export class CurrencyHistoryMySuffix implements ICurrencyHistoryMySuffix {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public currencyId?: number,
    public value?: number,
    public currencyIds?: ICurrencyMySuffix[]
  ) {}
}
