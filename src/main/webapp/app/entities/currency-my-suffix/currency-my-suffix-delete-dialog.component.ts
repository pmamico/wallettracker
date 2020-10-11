import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';
import { CurrencyMySuffixService } from './currency-my-suffix.service';

@Component({
  templateUrl: './currency-my-suffix-delete-dialog.component.html',
})
export class CurrencyMySuffixDeleteDialogComponent {
  currency?: ICurrencyMySuffix;

  constructor(
    protected currencyService: CurrencyMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.currencyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('currencyListModification');
      this.activeModal.close();
    });
  }
}
