import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'currency-my-suffix',
        loadChildren: () => import('./currency-my-suffix/currency-my-suffix.module').then(m => m.WallethistoryCurrencyMySuffixModule),
      },
      {
        path: 'wallet-my-suffix',
        loadChildren: () => import('./wallet-my-suffix/wallet-my-suffix.module').then(m => m.WallethistoryWalletMySuffixModule),
      },
      {
        path: 'currency-history-my-suffix',
        loadChildren: () =>
          import('./currency-history-my-suffix/currency-history-my-suffix.module').then(m => m.WallethistoryCurrencyHistoryMySuffixModule),
      },
      {
        path: 'wallet-history-my-suffix',
        loadChildren: () =>
          import('./wallet-history-my-suffix/wallet-history-my-suffix.module').then(m => m.WallethistoryWalletHistoryMySuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class WallethistoryEntityModule {}
