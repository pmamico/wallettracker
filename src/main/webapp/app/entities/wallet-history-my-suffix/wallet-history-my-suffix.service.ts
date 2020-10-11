import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';

type EntityResponseType = HttpResponse<IWalletHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<IWalletHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class WalletHistoryMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/wallet-histories';

  constructor(protected http: HttpClient) {}

  create(walletHistory: IWalletHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(walletHistory);
    return this.http
      .post<IWalletHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(walletHistory: IWalletHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(walletHistory);
    return this.http
      .put<IWalletHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWalletHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWalletHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(walletHistory: IWalletHistoryMySuffix): IWalletHistoryMySuffix {
    const copy: IWalletHistoryMySuffix = Object.assign({}, walletHistory, {
      timestamp: walletHistory.timestamp && walletHistory.timestamp.isValid() ? walletHistory.timestamp.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp ? moment(res.body.timestamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((walletHistory: IWalletHistoryMySuffix) => {
        walletHistory.timestamp = walletHistory.timestamp ? moment(walletHistory.timestamp) : undefined;
      });
    }
    return res;
  }
}
