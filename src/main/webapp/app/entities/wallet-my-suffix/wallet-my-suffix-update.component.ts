import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWalletMySuffix, WalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';
import { WalletMySuffixService } from './wallet-my-suffix.service';
import { IWalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';
import { WalletHistoryMySuffixService } from 'app/entities/wallet-history-my-suffix/wallet-history-my-suffix.service';

@Component({
  selector: 'jhi-wallet-my-suffix-update',
  templateUrl: './wallet-my-suffix-update.component.html',
})
export class WalletMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  wallethistories: IWalletHistoryMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    currencyId: [],
    currentValue: [],
    name: [],
    walletHistoryId: [],
  });

  constructor(
    protected walletService: WalletMySuffixService,
    protected walletHistoryService: WalletHistoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wallet }) => {
      this.updateForm(wallet);

      this.walletHistoryService.query().subscribe((res: HttpResponse<IWalletHistoryMySuffix[]>) => (this.wallethistories = res.body || []));
    });
  }

  updateForm(wallet: IWalletMySuffix): void {
    this.editForm.patchValue({
      id: wallet.id,
      currencyId: wallet.currencyId,
      currentValue: wallet.currentValue,
      name: wallet.name,
      walletHistoryId: wallet.walletHistoryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wallet = this.createFromForm();
    if (wallet.id !== undefined) {
      this.subscribeToSaveResponse(this.walletService.update(wallet));
    } else {
      this.subscribeToSaveResponse(this.walletService.create(wallet));
    }
  }

  private createFromForm(): IWalletMySuffix {
    return {
      ...new WalletMySuffix(),
      id: this.editForm.get(['id'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
      currentValue: this.editForm.get(['currentValue'])!.value,
      name: this.editForm.get(['name'])!.value,
      walletHistoryId: this.editForm.get(['walletHistoryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWalletMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IWalletHistoryMySuffix): any {
    return item.id;
  }
}
