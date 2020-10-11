import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';
import { CurrencyHistoryMySuffixService } from './currency-history-my-suffix.service';

@Component({
  templateUrl: './currency-history-my-suffix-delete-dialog.component.html',
})
export class CurrencyHistoryMySuffixDeleteDialogComponent {
  currencyHistory?: ICurrencyHistoryMySuffix;

  constructor(
    protected currencyHistoryService: CurrencyHistoryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.currencyHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('currencyHistoryListModification');
      this.activeModal.close();
    });
  }
}
