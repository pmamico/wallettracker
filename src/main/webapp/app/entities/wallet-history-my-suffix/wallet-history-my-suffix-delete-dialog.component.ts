import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';
import { WalletHistoryMySuffixService } from './wallet-history-my-suffix.service';

@Component({
  templateUrl: './wallet-history-my-suffix-delete-dialog.component.html',
})
export class WalletHistoryMySuffixDeleteDialogComponent {
  walletHistory?: IWalletHistoryMySuffix;

  constructor(
    protected walletHistoryService: WalletHistoryMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.walletHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('walletHistoryListModification');
      this.activeModal.close();
    });
  }
}
