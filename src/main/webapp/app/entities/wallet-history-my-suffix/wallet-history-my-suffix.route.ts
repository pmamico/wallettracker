import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWalletHistoryMySuffix, WalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';
import { WalletHistoryMySuffixService } from './wallet-history-my-suffix.service';
import { WalletHistoryMySuffixComponent } from './wallet-history-my-suffix.component';
import { WalletHistoryMySuffixDetailComponent } from './wallet-history-my-suffix-detail.component';
import { WalletHistoryMySuffixUpdateComponent } from './wallet-history-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class WalletHistoryMySuffixResolve implements Resolve<IWalletHistoryMySuffix> {
  constructor(private service: WalletHistoryMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWalletHistoryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((walletHistory: HttpResponse<WalletHistoryMySuffix>) => {
          if (walletHistory.body) {
            return of(walletHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WalletHistoryMySuffix());
  }
}

export const walletHistoryRoute: Routes = [
  {
    path: '',
    component: WalletHistoryMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'wallethistoryApp.walletHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WalletHistoryMySuffixDetailComponent,
    resolve: {
      walletHistory: WalletHistoryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.walletHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WalletHistoryMySuffixUpdateComponent,
    resolve: {
      walletHistory: WalletHistoryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.walletHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WalletHistoryMySuffixUpdateComponent,
    resolve: {
      walletHistory: WalletHistoryMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.walletHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
