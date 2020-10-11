import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';

type EntityResponseType = HttpResponse<ICurrencyHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<ICurrencyHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyHistoryMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/currency-histories';

  constructor(protected http: HttpClient) {}

  create(currencyHistory: ICurrencyHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(currencyHistory);
    return this.http
      .post<ICurrencyHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(currencyHistory: ICurrencyHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(currencyHistory);
    return this.http
      .put<ICurrencyHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICurrencyHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICurrencyHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(currencyHistory: ICurrencyHistoryMySuffix): ICurrencyHistoryMySuffix {
    const copy: ICurrencyHistoryMySuffix = Object.assign({}, currencyHistory, {
      timestamp: currencyHistory.timestamp && currencyHistory.timestamp.isValid() ? currencyHistory.timestamp.toJSON() : undefined,
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
      res.body.forEach((currencyHistory: ICurrencyHistoryMySuffix) => {
        currencyHistory.timestamp = currencyHistory.timestamp ? moment(currencyHistory.timestamp) : undefined;
      });
    }
    return res;
  }
}
