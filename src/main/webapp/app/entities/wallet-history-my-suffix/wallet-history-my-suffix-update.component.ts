import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWalletHistoryMySuffix, WalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';
import { WalletHistoryMySuffixService } from './wallet-history-my-suffix.service';

@Component({
  selector: 'jhi-wallet-history-my-suffix-update',
  templateUrl: './wallet-history-my-suffix-update.component.html',
})
export class WalletHistoryMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    walletId: [],
    timestamp: [],
    value: [],
  });

  constructor(
    protected walletHistoryService: WalletHistoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ walletHistory }) => {
      if (!walletHistory.id) {
        const today = moment().startOf('day');
        walletHistory.timestamp = today;
      }

      this.updateForm(walletHistory);
    });
  }

  updateForm(walletHistory: IWalletHistoryMySuffix): void {
    this.editForm.patchValue({
      id: walletHistory.id,
      walletId: walletHistory.walletId,
      timestamp: walletHistory.timestamp ? walletHistory.timestamp.format(DATE_TIME_FORMAT) : null,
      value: walletHistory.value,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const walletHistory = this.createFromForm();
    if (walletHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.walletHistoryService.update(walletHistory));
    } else {
      this.subscribeToSaveResponse(this.walletHistoryService.create(walletHistory));
    }
  }

  private createFromForm(): IWalletHistoryMySuffix {
    return {
      ...new WalletHistoryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      walletId: this.editForm.get(['walletId'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value ? moment(this.editForm.get(['timestamp'])!.value, DATE_TIME_FORMAT) : undefined,
      value: this.editForm.get(['value'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWalletHistoryMySuffix>>): void {
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
}
