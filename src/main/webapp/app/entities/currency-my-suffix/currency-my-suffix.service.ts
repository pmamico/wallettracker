import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';

type EntityResponseType = HttpResponse<ICurrencyMySuffix>;
type EntityArrayResponseType = HttpResponse<ICurrencyMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/currencies';

  constructor(protected http: HttpClient) {}

  create(currency: ICurrencyMySuffix): Observable<EntityResponseType> {
    return this.http.post<ICurrencyMySuffix>(this.resourceUrl, currency, { observe: 'response' });
  }

  update(currency: ICurrencyMySuffix): Observable<EntityResponseType> {
    return this.http.put<ICurrencyMySuffix>(this.resourceUrl, currency, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICurrencyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrencyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
