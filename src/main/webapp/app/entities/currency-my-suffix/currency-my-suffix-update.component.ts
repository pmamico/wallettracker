import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICurrencyMySuffix, CurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';
import { CurrencyMySuffixService } from './currency-my-suffix.service';
import { ICurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';
import { CurrencyHistoryMySuffixService } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix.service';

@Component({
  selector: 'jhi-currency-my-suffix-update',
  templateUrl: './currency-my-suffix-update.component.html',
})
export class CurrencyMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  currencyhistories: ICurrencyHistoryMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    iso: [],
    currencyHistoryId: [],
  });

  constructor(
    protected currencyService: CurrencyMySuffixService,
    protected currencyHistoryService: CurrencyHistoryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currency }) => {
      this.updateForm(currency);

      this.currencyHistoryService
        .query()
        .subscribe((res: HttpResponse<ICurrencyHistoryMySuffix[]>) => (this.currencyhistories = res.body || []));
    });
  }

  updateForm(currency: ICurrencyMySuffix): void {
    this.editForm.patchValue({
      id: currency.id,
      iso: currency.iso,
      currencyHistoryId: currency.currencyHistoryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const currency = this.createFromForm();
    if (currency.id !== undefined) {
      this.subscribeToSaveResponse(this.currencyService.update(currency));
    } else {
      this.subscribeToSaveResponse(this.currencyService.create(currency));
    }
  }

  private createFromForm(): ICurrencyMySuffix {
    return {
      ...new CurrencyMySuffix(),
      id: this.editForm.get(['id'])!.value,
      iso: this.editForm.get(['iso'])!.value,
      currencyHistoryId: this.editForm.get(['currencyHistoryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurrencyMySuffix>>): void {
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

  trackById(index: number, item: ICurrencyHistoryMySuffix): any {
    return item.id;
  }
}
