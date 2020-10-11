import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWalletMySuffix, WalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';
import { WalletMySuffixService } from './wallet-my-suffix.service';
import { WalletMySuffixComponent } from './wallet-my-suffix.component';
import { WalletMySuffixDetailComponent } from './wallet-my-suffix-detail.component';
import { WalletMySuffixUpdateComponent } from './wallet-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class WalletMySuffixResolve implements Resolve<IWalletMySuffix> {
  constructor(private service: WalletMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWalletMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wallet: HttpResponse<WalletMySuffix>) => {
          if (wallet.body) {
            return of(wallet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WalletMySuffix());
  }
}

export const walletRoute: Routes = [
  {
    path: '',
    component: WalletMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.wallet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WalletMySuffixDetailComponent,
    resolve: {
      wallet: WalletMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.wallet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WalletMySuffixUpdateComponent,
    resolve: {
      wallet: WalletMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.wallet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WalletMySuffixUpdateComponent,
    resolve: {
      wallet: WalletMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wallethistoryApp.wallet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
