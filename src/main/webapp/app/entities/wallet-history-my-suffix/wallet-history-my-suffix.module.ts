import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WallethistorySharedModule } from 'app/shared/shared.module';
import { WalletHistoryMySuffixComponent } from './wallet-history-my-suffix.component';
import { WalletHistoryMySuffixDetailComponent } from './wallet-history-my-suffix-detail.component';
import { WalletHistoryMySuffixUpdateComponent } from './wallet-history-my-suffix-update.component';
import { WalletHistoryMySuffixDeleteDialogComponent } from './wallet-history-my-suffix-delete-dialog.component';
import { walletHistoryRoute } from './wallet-history-my-suffix.route';

@NgModule({
  imports: [WallethistorySharedModule, RouterModule.forChild(walletHistoryRoute)],
  declarations: [
    WalletHistoryMySuffixComponent,
    WalletHistoryMySuffixDetailComponent,
    WalletHistoryMySuffixUpdateComponent,
    WalletHistoryMySuffixDeleteDialogComponent,
  ],
  entryComponents: [WalletHistoryMySuffixDeleteDialogComponent],
})
export class WallethistoryWalletHistoryMySuffixModule {}
