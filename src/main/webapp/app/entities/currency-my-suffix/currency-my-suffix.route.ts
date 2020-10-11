import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICurrencyMySuffix, CurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';
import { CurrencyMySuffixService } from './currency-my-suffix.service';
import { CurrencyMySuffixComponent } from './currency-my-suffix.component';
import { CurrencyMySuffixDetailComponent } from './currency-my-suffix-detail.component';
import { CurrencyMySuffixUpdateComponent } from './currency-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class CurrencyMySuffixResolve implements Resolve<ICurrencyMySuffix> {
  constructor(private service: CurrencyMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICurrencyMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((currency: HttpResponse<CurrencyMySuffix>) => {
          if (currency.body) {
            return of(currency.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CurrencyMySuffix());
  }
}

export const currencyRoute: Routes = [
  {
    path: '',
    component: CurrencyMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currency.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CurrencyMySuffixDetailComponent,
    resolve: {
      currency: CurrencyMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currency.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CurrencyMySuffixUpdateComponent,
    resolve: {
      currency: CurrencyMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currency.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CurrencyMySuffixUpdateComponent,
    resolve: {
      currency: CurrencyMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.currency.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
