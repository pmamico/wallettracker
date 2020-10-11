import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';
import { WalletMySuffixService } from './wallet-my-suffix.service';

@Component({
  templateUrl: './wallet-my-suffix-delete-dialog.component.html',
})
export class WalletMySuffixDeleteDialogComponent {
  wallet?: IWalletMySuffix;

  constructor(
    protected walletService: WalletMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.walletService.delete(id).subscribe(() => {
      this.eventManager.broadcast('walletListModification');
      this.activeModal.close();
    });
  }
}
