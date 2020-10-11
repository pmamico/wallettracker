import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WallethistorySharedModule } from 'app/shared/shared.module';
import { CurrencyHistoryMySuffixComponent } from './currency-history-my-suffix.component';
import { CurrencyHistoryMySuffixDetailComponent } from './currency-history-my-suffix-detail.component';
import { CurrencyHistoryMySuffixUpdateComponent } from './currency-history-my-suffix-update.component';
import { CurrencyHistoryMySuffixDeleteDialogComponent } from './currency-history-my-suffix-delete-dialog.component';
import { currencyHistoryRoute } from './currency-history-my-suffix.route';

@NgModule({
  imports: [WallethistorySharedModule, RouterModule.forChild(currencyHistoryRoute)],
  declarations: [
    CurrencyHistoryMySuffixComponent,
    CurrencyHistoryMySuffixDetailComponent,
    CurrencyHistoryMySuffixUpdateComponent,
    CurrencyHistoryMySuffixDeleteDialogComponent,
  ],
  entryComponents: [CurrencyHistoryMySuffixDeleteDialogComponent],
})
export class WallethistoryCurrencyHistoryMySuffixModule {}
