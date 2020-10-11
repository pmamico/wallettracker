import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';

@Component({
  selector: 'jhi-wallet-history-my-suffix-detail',
  templateUrl: './wallet-history-my-suffix-detail.component.html',
})
export class WalletHistoryMySuffixDetailComponent implements OnInit {
  walletHistory: IWalletHistoryMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ walletHistory }) => (this.walletHistory = walletHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
