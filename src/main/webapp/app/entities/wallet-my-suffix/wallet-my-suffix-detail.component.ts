import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';

@Component({
  selector: 'jhi-wallet-my-suffix-detail',
  templateUrl: './wallet-my-suffix-detail.component.html',
})
export class WalletMySuffixDetailComponent implements OnInit {
  wallet: IWalletMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wallet }) => (this.wallet = wallet));
  }

  previousState(): void {
    window.history.back();
  }
}
