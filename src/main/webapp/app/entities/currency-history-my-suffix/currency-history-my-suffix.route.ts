import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICurrencyHistoryMySuffix, CurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';
import { CurrencyHistoryMySuffixService } from './currency-history-my-suffix.service';
import { CurrencyHistoryMySuffixComponent } from './currency-history-my-suffix.component';
import { CurrencyHistoryMySuffixDetailComponent } from './currency-history-my-suffix-detail.component';
import { CurrencyHistoryMySuffixUpdateComponent } from './currency-history-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class CurrencyHistoryMySuffixResolve implements Resolve<ICurrencyHistoryMySuffix> {
  constructor(private service: CurrencyHistoryMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICurrencyHistoryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((currencyHistory: HttpResponse<CurrencyHistoryMySuffix>) => {
          if (currencyHistory.body) {
            return of(currencyHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CurrencyHistoryMySuffix());
  }
}

export const currencyHistoryRoute: Routes = [
  {
    path: '',
    component: CurrencyHistoryMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'wallethistoryApp.currencyHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CurrencyHistoryMySuffixDetailComponent,
    resolve: {
      currencyHistory: CurrencyHistoryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currencyHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CurrencyHistoryMySuffixUpdateComponent,
    resolve: {
      currencyHistory: CurrencyHistoryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currencyHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CurrencyHistoryMySuffixUpdateComponent,
    resolve: {
      currencyHistory: CurrencyHistoryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currencyHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
