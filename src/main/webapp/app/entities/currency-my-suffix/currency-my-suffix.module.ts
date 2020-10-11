import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WallethistorySharedModule } from 'app/shared/shared.module';
import { CurrencyMySuffixComponent } from './currency-my-suffix.component';
import { CurrencyMySuffixDetailComponent } from './currency-my-suffix-detail.component';
import { CurrencyMySuffixUpdateComponent } from './currency-my-suffix-update.component';
import { CurrencyMySuffixDeleteDialogComponent } from './currency-my-suffix-delete-dialog.component';
import { currencyRoute } from './currency-my-suffix.route';

@NgModule({
  imports: [WallethistorySharedModule, RouterModule.forChild(currencyRoute)],
  declarations: [
    CurrencyMySuffixComponent,
    CurrencyMySuffixDetailComponent,
    CurrencyMySuffixUpdateComponent,
    CurrencyMySuffixDeleteDialogComponent,
  ],
  entryComponents: [CurrencyMySuffixDeleteDialogComponent],
})
export class WallethistoryCurrencyMySuffixModule {}
