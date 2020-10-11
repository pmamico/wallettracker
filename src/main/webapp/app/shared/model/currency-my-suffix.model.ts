export interface ICurrencyMySuffix {
  id?: number;
  iso?: string;
  currencyHistoryId?: number;
}

export class CurrencyMySuffix implements ICurrencyMySuffix {
  constructor(public id?: number, public iso?: string, public currencyHistoryId?: number) {}
}
