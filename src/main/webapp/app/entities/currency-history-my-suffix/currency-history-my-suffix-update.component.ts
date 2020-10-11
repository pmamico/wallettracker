import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICurrencyHistoryMySuffix, CurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';
import { CurrencyHistoryMySuffixService } from './currency-history-my-suffix.service';

@Component({
  selector: 'jhi-currency-history-my-suffix-update',
  templateUrl: './currency-history-my-suffix-update.component.html',
})
export class CurrencyHistoryMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    timestamp: [],
    currencyId: [],
    value: [],
  });

  constructor(
    protected currencyHistoryService: CurrencyHistoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currencyHistory }) => {
      if (!currencyHistory.id) {
        const today = moment().startOf('day');
        currencyHistory.timestamp = today;
      }

      this.updateForm(currencyHistory);
    });
  }

  updateForm(currencyHistory: ICurrencyHistoryMySuffix): void {
    this.editForm.patchValue({
      id: currencyHistory.id,
      timestamp: currencyHistory.timestamp ? currencyHistory.timestamp.format(DATE_TIME_FORMAT) : null,
      currencyId: currencyHistory.currencyId,
      value: currencyHistory.value,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const currencyHistory = this.createFromForm();
    if (currencyHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.currencyHistoryService.update(currencyHistory));
    } else {
      this.subscribeToSaveResponse(this.currencyHistoryService.create(currencyHistory));
    }
  }

  private createFromForm(): ICurrencyHistoryMySuffix {
    return {
      ...new CurrencyHistoryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value ? moment(this.editForm.get(['timestamp'])!.value, DATE_TIME_FORMAT) : undefined,
      currencyId: this.editForm.get(['currencyId'])!.value,
      value: this.editForm.get(['value'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurrencyHistoryMySuffix>>): void {
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
