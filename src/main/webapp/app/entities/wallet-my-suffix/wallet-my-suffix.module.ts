import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WallethistorySharedModule } from 'app/shared/shared.module';
import { WalletMySuffixComponent } from './wallet-my-suffix.component';
import { WalletMySuffixDetailComponent } from './wallet-my-suffix-detail.component';
import { WalletMySuffixUpdateComponent } from './wallet-my-suffix-update.component';
import { WalletMySuffixDeleteDialogComponent } from './wallet-my-suffix-delete-dialog.component';
import { walletRoute } from './wallet-my-suffix.route';

@NgModule({
  imports: [WallethistorySharedModule, RouterModule.forChild(walletRoute)],
  declarations: [
    WalletMySuffixComponent,
    WalletMySuffixDetailComponent,
    WalletMySuffixUpdateComponent,
    WalletMySuffixDeleteDialogComponent,
  ],
  entryComponents: [WalletMySuffixDeleteDialogComponent],
})
export class WallethistoryWalletMySuffixModule {}
